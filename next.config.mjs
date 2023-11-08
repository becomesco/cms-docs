import nextMDX from '@next/mdx'
import { remarkPlugins } from './mdx/remark.mjs'
import { rehypePlugins } from './mdx/rehype.mjs'
import { recmaPlugins } from './mdx/recma.mjs'

console.log(process.env);

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.loom.com',
        port: '',
        pathname: '/sessions/thumbnails/**',
      },
    ],
  },
}

export default withMDX(nextConfig)
