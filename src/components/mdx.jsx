import Link from 'next/link'
import clsx from 'clsx'
import VideoComponent from '@/components/Video'

import { Heading } from '@/components/Heading'

export const a = Link
export { Button } from '@/components/Button'
export { CodeGroup, Code as code, Pre as pre } from '@/components/Code'

export const h2 = function H2(props) {
  return <Heading level={2} {...props} />
}

function InfoIcon(props) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="8" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 7.75h1.5v3.5"
      />
      <circle cx="8" cy="4" r=".5" fill="none" />
    </svg>
  )
}

export function Note(props) {
  return (
    <div className={`my-6 flex gap-2.5 rounded-2xl border ${props.danger ? 'border-red/20 bg-red/10 text-red' : 'border-green/20 bg-green/10 text-green dark:border-yellow/30 dark:bg-yellow/5 dark:text-yellow dark:[--tw-prose-links:theme(colors.yellow)] dark:[--tw-prose-links-hover:theme(colors.yellow)]'} p-4 leading-6`}>
      <InfoIcon className={`flex-none w-4 h-4 mt-1 ${props.danger ? 'fill-red/80 stroke-light dark:fill-red/40' : 'fill-green/80 stroke-light dark:fill-yellow/20 dark:stroke-yellow'}`} />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {props.children}
      </div>
    </div>
  )
}

export function Row({ children }) {
  return (
    <div className="grid items-start grid-cols-1 gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">
      {children}
    </div>
  )
}

export function Col({ children, sticky = false }) {
  return (
    <div
      className={clsx(
        '[&>:first-child]:mt-0 [&>:last-child]:mb-0',
        sticky && 'xl:sticky xl:top-24'
      )}
    >
      {children}
    </div>
  )
}

export function Properties({ children }) {
  return (
    <div className="my-6">
      <ul
        role="list"
        className="m-0 max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))] list-none divide-y divide-dark/5 p-0 dark:divide-light/5"
      >
        {children}
      </ul>
    </div>
  )
}

export function Property({ name, type, children }) {
  return (
    <li className="px-0 py-4 m-0 first:pt-0 last:pb-0">
      <dl className="flex flex-wrap items-center m-0 gap-x-3 gap-y-2">
        <dt className="sr-only">Name</dt>
        <dd>
          <code>{name}</code>
        </dd>
        <dt className="sr-only">Type</dt>
        <dd className="font-mono text-xs text-dark dark:text-light">
          {type}
        </dd>
        <dt className="sr-only">Description</dt>
        <dd className="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
          {children}
        </dd>
      </dl>
    </li>
  )
}

export function Video(props) {
  return (
    <VideoComponent {...props} />
  )
}
