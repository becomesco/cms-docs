import Link from 'next/link'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

import { Heading } from '@/components/Heading'
import { ChatBubbleIcon } from '@/components/icons/ChatBubbleIcon'
import { EnvelopeIcon } from '@/components/icons/EnvelopeIcon'
import { UserIcon } from '@/components/icons/UserIcon'
import { UsersIcon } from '@/components/icons/UsersIcon'

const cloud = [
  {
    href: '/cloud/team',
    name: 'Team',
    description:
      'Learn how to integrate BCMS into your codebase(s) and tools.',
    icon: UserIcon,
  },
  {
    href: 'https://github.com/becomesco/cms',
    name: 'Instances',
    description:
      'BCMS is open-source software. Favorite the repository and help us spread a word!',
    icon: ChatBubbleIcon,
  },
  {
    href: 'https://thebcms.com/blog/tags/tutorials',
    name: 'Ngnix configuration',
    description:
      'Add custom Nginix configuration. For when you want to configure custom proxy or stuff.',
    icon: EnvelopeIcon,
  },
  {
    href: 'https://thebcms.com/slack',
    name: 'Dependencies',
    description:
      'Join BCMS Slack community to learn from other developers and stay up-to-date with new features.',
    icon: UsersIcon,
  },
  {
    href: 'https://thebcms.com/slack',
    name: 'Functions',
    description:
      'JavaScript functions which can be executed by sending an HTTP request to the BCMS backend API.',
    icon: UsersIcon,
  },
  {
    href: 'https://thebcms.com/slack',
    name: 'Events',
    description:
      'Subscribe to any add, update or delete event in your BCMS.',
    icon: UsersIcon,
  },
  {
    href: 'https://thebcms.com/slack',
    name: 'Jobs',
    description:
      'A way to execute a custom code on the BCMS Backend at specified interval.',
    icon: UsersIcon,
  },
  {
    href: 'https://thebcms.com/slack',
    name: 'Plugins',
    description:
      'Use to extend functionality of your BCMS’s backend and UI.',
    icon: UsersIcon,
  },
  {
    href: 'https://thebcms.com/slack',
    name: 'Environment variables',
    description:
      'Your environment variables, which you can access from your Functions, Events, Jobs and Plugins.',
    icon: UsersIcon,
  },
  {
    href: 'https://thebcms.com/slack',
    name: 'Domains',
    description:
      'Add custom domains to access your CMS',
    icon: UsersIcon,
  },
  {
    href: 'https://thebcms.com/slack',
    name: 'Account settings',
    description:
      'Update your email, change password, upload avatar. Regular stuff.',
    icon: UsersIcon,
  },
]

function ResourceIcon({ icon: Icon }) {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400">
      <Icon className="w-5 h-5 transition-colors duration-300 fill-zinc-700/10 stroke-zinc-700 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400" />
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
      className="group relative flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
    >
      <ResourcePattern {...resource.pattern} mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
      <div className="relative px-4 pt-16 pb-4 rounded-2xl">
        <ResourceIcon icon={resource.icon} />
        <h3 className="mt-4 text-sm font-semibold leading-7 text-zinc-900 dark:text-white">
          <Link href={resource.href}>
            <span className="absolute inset-0 rounded-2xl" />
            {resource.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {resource.description}
        </p>
      </div>
    </div>
  )
}

export function Cloud() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="cloud">
        Cloud Features
      </Heading>
      <div className="grid grid-cols-1 gap-8 pt-10 mt-4 border-t not-prose border-zinc-900/5 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-4">
        {cloud.map((feature) => (
          <Resource key={feature.href} resource={feature} />
        ))}
      </div>
    </div>
  )
}
