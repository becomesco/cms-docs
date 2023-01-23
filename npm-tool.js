const crypto = require('crypto')
const { StringUtility } = require('@banez/string-utility')
const { createConfig } = require('@banez/npm-tool')
const { createFS } = require('@banez/fs')
const algoliaSearch = require('algoliasearch')

const algolia = algoliaSearch.default(
  '6VKFS5NOO9',
  '09e3edac6d30b94064be44f1fb745697'
)
const algIndex = algolia.initIndex('docs')
const fs = createFS({
  base: process.cwd(),
})

module.exports = createConfig({
  custom: {
    '--build:search': async () => {
      const fileTree = (await fs.fileTree(['src', 'pages'], '')).filter((e) =>
        e.path.rel.endsWith('.mdx')
      )
      /**
       * @type {{
       *  [path: string]: {
       *    objectID: string;
       *    uri: string;
       *    title: string;
       *    content: string;
       *  }
       * }}
       */
      const output = {}
      for (let i = 0; i < fileTree.length; i++) {
        const item = fileTree[i]
        const data = await fs.readString(item.path.abs)
        const lines = data.split('\n')
        for (let j = 0; j < lines.length; j++) {
          const line = lines[j]
          if (line.startsWith('# ')) {
            let title = line
            for (let k = j + 1; k < lines.length; k++) {
              const nextLine = lines[k]
              if (nextLine === '') {
                break
              } else {
                title += ' ' + nextLine
              }
            }
            output[item.path.rel] = {
              objectID: crypto
                .createHash('sha1')
                .update(`/${item.path.rel.replace('.mdx', '')}`)
                .digest('hex'),
              uri: `/${item.path.rel.replace('.mdx', '')}`,
              title: title.replace('# ', ''),
              content: lines.slice(j + 1).join('\n'),
            }
            break
          }
        }
      }
      const result = Object.keys(output).map((key) => output[key])
      await fs.save(['public', 'search.json'], JSON.stringify(result))
      await algIndex.saveObjects(result)
      await algIndex.setSettings({
        searchableAttributes: ['title', 'content'],
      })
    },
  },
})
