/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: "https://xplodivity.xyz",
  },
  images: {
    domains: [
      "localhost",
      "i.ytimg.com",
      "xplodivity.graphy.com",
      "d1ty23sn1lw3wk.cloudfront.net",
      "xplodivity.xyz",
      "devapi.xplodivity.xyz",
      "api.xplodivity.com",
    ],
  },
  experimental: {
    appDir: true,
    serverActions: true,
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
