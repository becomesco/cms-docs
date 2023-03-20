const crypto = require('crypto')
const { StringUtility } = require('@banez/string-utility')
const { createConfig } = require('@banez/npm-tool')
const { createFS } = require('@banez/fs')
const algoliaSearch = require('algoliasearch')
const removeMd = require('remove-markdown-and-html');


const algolia = algoliaSearch.default(
  process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
)
const algIndex = algolia.initIndex('docs')
const fs = createFS({
  base: process.cwd(),
})

function parseContent(content) {
  const strip1 = content.replace(/\{{[^{{}}]*\}}/g, '');
  const strip2 = removeMd(strip1);
  const strip3 = strip2.replace(/<\/?[^>]+(>|$)/g, '').replace('#', '').replace('##', '')
  return strip3
}

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
              uri: `/${item.path.rel.replace('/index.mdx', '')}`,
              title: title.replace('# ', ''),
              content: parseContent(lines.slice(j + 1).join(' ')),
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
