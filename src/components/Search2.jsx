import { useEffect } from 'react'
import { DocSearch } from '@docsearch/react'
import '@docsearch/css'
import Head from 'next/head'

function DocSearchElement() {
  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              #docSearch .DocSearch-Button {
                width: 100% !important;
                margin-left: 0 !important;
                padding-left: 16px;
              }
              #docSearch .DocSearch-Button .DocSearch-Button-Container .DocSearch-Search-Icon {
                width: 12px !important;
                height: 12px !important;
              }
              #docSearch .DocSearch-Button:hover {
                background: transparent !important;
              }

              .DocSearch-Button-Placeholder {
                font-size: .875rem !important;
                line-height: 1.5rem !important;
                font-weight: inherit !important;
                font-family: inherit !important;
              }
              .dark .DocSearch-Button-Container .DocSearch-Search-Icon,
              .dark .DocSearch-Button-Placeholder {
                color: rgba(248,248,252,1) !important;
              }
        `,
          }}
        />
      </Head>
      <DocSearch
        appId={process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID}
        indexName={process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME}
        apiKey={process.env.NEXT_PUBLIC_DOCSEARCH_API_KEY}
      />
    </>
  )
}

export function Search() {
  return (
    <div className="hidden lg:block lg:max-w-md lg:flex-auto">
      <div
        id="docSearch"
        className="hidden h-8 w-full items-center gap-2 rounded-full bg-light text-sm text-dark ring-1 ring-dark/10 transition hover:ring-dark/20 dark:bg-light/5 dark:text-light dark:ring-inset dark:ring-light/10 dark:hover:ring-light/20 lg:flex focus:[&:not(:focus-visible)]:outline-none"
      >
        <DocSearchElement />
      </div>
    </div>
  )
}

export function MobileSearch() {
  return (
    <div className="contents lg:hidden">
      <div
        className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-dark/5 dark:hover:bg-light/5 lg:hidden focus:[&:not(:focus-visible)]:outline-none"
        aria-label="Find something..."
      >
        <DocSearchElement />
      </div>
    </div>
  )
}
