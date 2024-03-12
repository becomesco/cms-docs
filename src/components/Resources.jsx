import Link from 'next/link'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

import { Heading } from '@/components/Heading'
import { ChatBubbleIcon } from '@/components/icons/ChatBubbleIcon'
import { UserIcon } from '@/components/icons/UserIcon'
import { UsersIcon } from '@/components/icons/UsersIcon'

const resources = [
  {
    href: '/',
    name: 'Documentation',
    description:
      'Learn how to integrate BCMS into your codebase(s) and tools.',
    icon: UserIcon,
  },
  {
    href: 'https://github.com/bcms/cms',
    name: 'Github',
    description:
      'BCMS is open-source software. Favorite the repository and help us spread a word!',
    icon: ChatBubbleIcon,
  },
  {
    href: 'https://discord.com/invite/SYBY89ccaR',
    name: 'Discord Community',
    description:
      'Join BCMS Discord community to learn from other developers and stay up-to-date with new features.',
    icon: UsersIcon,
  },
]

function ResourceIcon({ icon: Icon }) {
  return (
    <div className="flex w-7 h-7 items-center justify-center rounded-full ring-1 ring-dark/25 backdrop-blur-[2px] transition duration-300 group-hover:ring-dark group-hover:bg-light/50 dark:bg-light/7.5 dark:ring-light/15 dark:group-hover:bg-light/10 dark:group-hover:ring-light">
      <Icon className="w-5 h-5 transition-colors duration-300 fill-none stroke-dark dark:stroke-light" />
    </div>
  )
}

function ResourcePattern({ mouseX, mouseY, ...gridProps }) {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202D2E] dark:to-[#303428]"
        style={style}
      />
    </div>
  )
}

function Resource({ resource }) {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      key={resource.href}
      onMouseMove={onMouseMove}
      className="group relative flex rounded-2xl bg-light transition-shadow hover:shadow-md hover:shadow-dark/5 dark:bg-light/2.5 dark:hover:shadow-dark/5"
    >
      <ResourcePattern {...resource.pattern} mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-dark/7.5 group-hover:ring-dark/10 dark:ring-light/10 dark:group-hover:ring-light/20" />
      <div className="relative px-4 pt-16 pb-4 rounded-2xl">
        <ResourceIcon icon={resource.icon} />
        <h3 className="mt-4 text-sm font-semibold leading-7 text-dark dark:text-light">
          <Link href={resource.href}>
            <span className="absolute inset-0 rounded-2xl" />
            {resource.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-dark dark:text-light">
          {resource.description}
        </p>
      </div>
    </div>
  )
}

export function Resources() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="resources">
        Resources
      </Heading>
      <div className="grid grid-cols-1 gap-8 pt-10 mt-4 border-t not-prose border-dark/5 dark:border-light/5 sm:grid-cols-2 xl:grid-cols-4">
        {resources.map((resource) => (
          <Resource key={resource.href} resource={resource} />
        ))}
      </div>
    </div>
  )
}
