import { useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'

import { Button } from '@/components/Button'
import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'
import { useSectionStore } from '@/components/SectionProvider'
import { Tag } from '@/components/Tag'
import { remToPx } from '@/lib/remToPx'

function useInitialValue(value, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

function TopLevelNavItem({ href, children }) {
  return (
    <li className="md:hidden">
      <Link
        href={href}
        className="block py-1 text-sm transition text-dark hover:text-dark dark:text-light dark:hover:text-light"
      >
        {children}
      </Link>
    </li>
  )
}

function NavLink({ href, tag, active, isAnchorLink = false, children }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex justify-between gap-2 py-1 pr-3 text-sm text-dark dark:text-light transition',
        isAnchorLink ? 'pl-7' : 'pl-4',
      )}
    >
      <span className="truncate">{children}</span>
      {tag && (
        <Tag variant="small" color="emerald">
          {tag}
        </Tag>
      )}
    </Link>
  )
}

function VisibleSectionHighlight({ group, pathname }) {
  let [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s) => s.sections),
      useSectionStore((s) => s.visibleSections),
    ],
    useIsInsideMobileNavigation()
  )

  let isPresent = useIsPresent()
  let firstVisibleSectionIndex = Math.max(
    0,
    [{ id: '_top' }, ...sections].findIndex(
      (section) => section.id === visibleSections[0]
    )
  )
  let itemHeight = remToPx(2)
  let height = isPresent
    ? Math.max(1, visibleSections.length) * itemHeight
    : itemHeight
  let top =
    group.links.findIndex((link) => link.href === pathname) * itemHeight +
    firstVisibleSectionIndex * itemHeight

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-x-0 top-0 bg-dark/2.5 will-change-transform dark:bg-light/2.5"
      style={{ borderRadius: 8, height, top }}
    />
  )
}

function ActivePageMarker({ group, pathname }) {
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  let activePageIndex = group.links.findIndex((link) => link.href === pathname)
  let top = offset + activePageIndex * itemHeight

  return (
    <motion.div
      layout
      className="absolute w-px h-6 left-2 bg-green dark:bg-yellow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  )
}

function NavigationGroup({ group, className }) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let [router, sections] = useInitialValue(
    [useRouter(), useSectionStore((s) => s.sections)],
    isInsideMobileNavigation
  )

  let isActiveGroup =
    group.links.findIndex((link) => link.href === router.pathname) !== -1

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.div
        layout="position"
        className="text-xs font-semibold text-dark dark:text-light"
      >
        {group.title}
      </motion.div>
      <div className="relative pl-2 mt-3">
        <AnimatePresence initial={!isInsideMobileNavigation}>
          {isActiveGroup && (
            <VisibleSectionHighlight group={group} pathname={router.pathname} />
          )}
        </AnimatePresence>
        <motion.div
          layout
          className="absolute inset-y-0 w-px left-2 bg-dark/10 dark:bg-light/5"
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker group={group} pathname={router.pathname} />
          )}
        </AnimatePresence>
        <ul role="list" className="border-l border-transparent">
          {group.links.map((link) => (
            <motion.li key={link.href} layout="position" className="relative">
              <NavLink href={link.href} active={link.href === router.pathname} tag={link.tag}>
                {link.title}
                {/* {link.tag && <Tag variant="small">{link.tag}</Tag>} */}
              </NavLink>
              <AnimatePresence mode="popLayout" initial={false}>
                {link.href === router.pathname && sections.length > 0 && (
                  <motion.ul
                    role="list"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.1 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15 },
                    }}
                  >
                    {sections.map((section) => (
                      <li key={section.id}>
                        <NavLink
                          href={`${link.href}#${section.id}`}
                          tag={section.tag}
                          isAnchorLink
                        >
                          {section.title}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export const navigation = [
  {
    title: 'Getting started',
    links: [
      { title: 'Introduction', href: '/' },
      { title: 'Quickstart guide', href: '/quickstart' },
    ],
  },
  {
    title: 'Inside BCMS',
    links: [
      { title: 'Overview', href: '/inside-bcms' },
      { title: 'Templates', href: '/inside-bcms/templates' },
      { title: 'Entries', href: '/inside-bcms/entries' },
      { title: 'Widgets', href: '/inside-bcms/widgets' },
      { title: 'Groups', href: '/inside-bcms/groups' },
      { title: 'Media', href: '/inside-bcms/media' },
      { title: 'API manager', href: '/inside-bcms/api-keys' },
      { title: 'Settings', href: '/inside-bcms/settings' },
      { title: 'Properties', href: '/inside-bcms/properties' },
    ],
  },
  {
    title: 'Integrations',
    links: [
      { title: 'Next.js', href: '/integrations/next-js' },
      { title: 'Gatsby.js', href: '/integrations/gatsby-js' },
      { title: 'Nuxt.js', href: '/integrations/nuxt-js' },
      { title: 'Astro.js', href: '/integrations/astro-js', tag: 'Coming soon' },
      { title: 'SvelteKit', href: '/integrations/sveltekit', tag: 'Coming soon'  },
    ],
  },
  // {
  //   title: 'Extending BCMS',
  //   links: [
  //     { title: 'Overview', href: '/customization' },
  //     { title: 'Functions', href: '/customization/functions' },
  //     { title: 'Events', href: '/customization/events' },
  //     { title: 'Jobs', href: '/customization/jobs' },
  //     { title: 'Plugins', href: '/customization/plugins' },
  //   ],
  // },
  // {
  //   title: 'Cloud',
  //   links: [
  //     { title: 'Overview', href: '/cloud' },
  //     // { title: 'Team', href: '/cloud/team' },
  //     // { title: 'Instances', href: '/cloud/instances' },
  //     // { title: 'Nginx config', href: '/cloud/nginx' },
  //     { title: 'Dependencies', href: '/cloud/dependencies' },
  //     { title: 'Functions', href: '/cloud/functions' },
  //     { title: 'Events', href: '/cloud/events' },
  //     { title: 'Jobs', href: '/cloud/jobs' },
  //     // { title: 'Plugins', href: '/cloud/plugins' },
  //     { title: 'Environment variables', href: '/cloud/env-variables' },
  //     // { title: 'Domains', href: '/cloud/domains' },
  //     // { title: 'Account settings', href: '/cloud/account-settings' },
  //   ],
  // },
  // {
  //   title: 'CLI Tool',
  //   links: [
  //     { title: 'Overview', href: '/cli' },
  //   ],
  // },
]

export function Navigation(props) {
  return (
    <nav {...props}>
      <ul role="list">
        {/* <TopLevelNavItem href="#">API</TopLevelNavItem> */}
        <TopLevelNavItem href="#">Documentation</TopLevelNavItem>
        <TopLevelNavItem href="#">Support</TopLevelNavItem>
        {navigation.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 && 'md:mt-0'}
          />
        ))}
        <li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
          <Button href="#" variant="filled" className="w-full">
            Sign in
          </Button>
        </li>
      </ul>
    </nav>
  )
}
