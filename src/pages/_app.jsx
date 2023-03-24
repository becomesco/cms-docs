import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'

import { Layout } from '@/components/Layout'
import * as mdxComponents from '@/components/mdx'
import { useMobileNavigationStore } from '@/components/MobileNavigation'

import '@/styles/tailwind.css'
import 'focus-visible'

function onRouteChange() {
  useMobileNavigationStore.getState().close()
}

Router.events.on('hashChangeStart', onRouteChange)
Router.events.on('routeChangeComplete', onRouteChange)
Router.events.on('routeChangeError', onRouteChange)

export default function App({ Component, pageProps }) {
  let router = useRouter()
  const uriName = encodeURIComponent(pageProps.title);
  return (
    <>
      <Head>
        {router.pathname === '/' ? (
          <title>BCMS documentation</title>
        ) : (
          <title>{`${pageProps.title} - BCMS`}</title>
        )}
        <meta name="description" content={pageProps.description} />
        <meta
          property="og:image"
          content={`https://docs.thebcms.com/api/og-image?name=${uriName}&description=${pageProps.description}`}
        />
      </Head>
      <MDXProvider components={mdxComponents}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    </>
  )
}
