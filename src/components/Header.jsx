import { forwardRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'
import GitHubButton from 'react-github-btn'

import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
} from '@/components/MobileNavigation'
import { useMobileNavigationStore } from '@/components/MobileNavigation'
import { ModeToggle } from '@/components/ModeToggle'
import { MobileSearch, Search } from '@/components/Search2'

function TopLevelNavItem({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm leading-5 transition text-dark dark:text-light"
      >
        {children}
      </Link>
    </li>
  )
}

export const Header = forwardRef(function Header({ className }, ref) {
  let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
  let isInsideMobileNavigation = useIsInsideMobileNavigation()

  let { scrollY } = useScroll()
  let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])
  let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8])

  return (
    <motion.div
      ref={ref}
      className={clsx(
        className,
        'fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:z-30 lg:px-8',
        !isInsideMobileNavigation &&
        'backdrop-blur-sm dark:backdrop-blur lg:left-72 xl:left-80',
        isInsideMobileNavigation
          ? 'bg-light dark:bg-dark'
          : 'bg-light/[var(--bg-opacity-light)] dark:bg-dark/[var(--bg-opacity-dark)]'
      )}
      style={{
        '--bg-opacity-light': bgOpacityLight,
        '--bg-opacity-dark': bgOpacityDark,
      }}
    >
      <div
        className={clsx(
          'absolute inset-x-0 top-full h-px transition',
          (isInsideMobileNavigation || !mobileNavIsOpen) &&
          'bg-dark/7.5 dark:bg-light/7.5'
        )}
      />
      <Search />
      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation />
        <Link href="/" aria-label="Home">
          <Logo className="h-6" />
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <nav className="hidden md:block">
          <ul role="list" className="flex items-center gap-8">
            <TopLevelNavItem href="https://rest-apis.thebcms.com/bcms-backend/3-0-0">API</TopLevelNavItem>
            <TopLevelNavItem href="/">Documentation</TopLevelNavItem>
            <TopLevelNavItem href="https://thebcms.com">Website</TopLevelNavItem>
            <li className='mt-2'>
              <GitHubButton href="https://github.com/bcms/cms" data-color-scheme="no-preference: light; light: light; dark: light;" data-size="large" data-show-count="true" aria-label="Star BCMS on GitHub">Star</GitHubButton>
            </li>
          </ul>
        </nav>
        <div className="hidden md:block md:h-5 md:w-px md:bg-dark/10 md:dark:bg-light/15" />
        <div className="flex gap-4">
          <MobileSearch />
          <ModeToggle />
        </div>
        <div className="hidden min-[416px]:contents">
          <Button target="_blank" href="https://cloud.thebcms.com/">Sign in</Button>
        </div>
      </div>
    </motion.div>
  )
})
