/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_16_JS_PROJECTS_PRICE: process.env.NEXT_16_JS_PROJECTS_PRICE, // pulls from .env file
  },
  images: {
    domains: [
      "localhost",
      "i.ytimg.com",
      "xplodivity.graphy.com",
      "d1ty23sn1lw3wk.cloudfront.net",
      "xplodivity.xyz",
    ],
  },
  experimental: {
    webpackBuildWorker: true,
  },
};

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});
module.exports = withMDX(nextConfig);
