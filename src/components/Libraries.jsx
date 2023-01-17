import Image from 'next/image'

import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import logoGatsby from '@/images/logos/gatsby.svg'
import logoNuxt from '@/images/logos/nuxt.svg'
import logoNext from '@/images/logos/nextjs.svg'
import logoNextDark from '@/images/logos/nextjs-dark.svg'

const libraries = [
  {
    href: '/integrations/next-js',
    name: 'Next.js plugin for BCMS',
    description:
      'Integrate BCMS smoothly to any Next.js project. BCMS comes with a straight-forward Next.js SDK.',
    logo: [logoNext, logoNextDark],
  },
  {
    href: '/integrations/gatsby-js',
    name: 'Gatsby plugin for BCMS',
    description:
      'Integrate BCMS smoothly to any Gatsby project. BCMS comes with a straight-forward Gatsby SDK.',
    logo: [logoGatsby],
  },
  {
    href: '/integrations/nuxt-js',
    name: 'Nuxt.js plugin for BCMS',
    description:
      'Integrate BCMS smoothly to any Nuxt.js project. BCMS comes with a straight-forward Nuxt.js SDK.',
    logo: [logoNuxt],
  },
]

function LibraryLogoImage({ images, alt }) {
  const darkLogoExists = images.length > 1;
  return images.map((image, index) => {
    return (
      <Image
        src={image}
        key={index}
        alt={alt}
        unoptimized
        className={`h-12 w-12
          ${darkLogoExists && index === 0 && 'dark:hidden'}
          ${darkLogoExists && index === 1 && 'hidden dark:block'}
        `}
      />
    )
  })
}

export function Libraries() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="official-libraries">
        Official Integrations
      </Heading>
      <div className="grid grid-cols-1 pt-10 mt-4 border-t not-prose gap-x-6 gap-y-10 border-zinc-900/5 dark:border-white/5 sm:grid-cols-2 xl:max-w-none xl:grid-cols-3">
        {libraries.map((library) => (
          <div key={library.name} className="flex flex-row-reverse gap-6">
            <div className="flex-auto">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                {library.name}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {library.description}
              </p>
              <p className="mt-4">
                <Button href={library.href} variant="text" arrow="right">
                  Read more
                </Button>
              </p>
            </div>
            <LibraryLogoImage images={library.logo} alt={library.name + ' logo'} />
          </div>
        ))}
      </div>
    </div>
  )
}
