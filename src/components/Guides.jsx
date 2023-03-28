import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'

const guides = [
  {
    href: '/quickstart',
    name: 'How to start BCMS locally',
    description: 'Learn how to start BCMS locally on your machine in just a 3 minutes.',
  },
  {
    href: '/integrations',
    name: 'How to connect BCMS with your favorite framework',
    description:
      'Understand how to work with BCMS and Nuxt.js, Gatsby.js, Next.js, etc.',
  },
  {
    href: '/install/locally',
    name: 'How to start BCMS locally',
    description:
      'Read about the different types of errors returned by the API.',
  },
  {
    href: '/install/digitalocean',
    name: 'How to install BCMS on Ubuntu Server',
    description: "Learn how to install BCMS on DigitalOcean's Ubuntu Server.",
  },
]

export function Guides() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="guides">
        Guides
      </Heading>
      <div className="grid grid-cols-1 gap-8 pt-10 mt-4 border-t not-prose border-dark/5 dark:border-light/5 sm:grid-cols-2 xl:grid-cols-4">
        {guides.map((guide) => (
          <div key={guide.href}>
            <h3 className="text-sm font-semibold text-dark dark:text-light">
              {guide.name}
            </h3>
            <p className="mt-1 text-sm text-dark dark:text-light">
              {guide.description}
            </p>
            <p className="mt-4">
              <Button href={guide.href} variant="text" arrow="right">
                Read more
              </Button>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
