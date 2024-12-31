/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: "https://devapi.xplodivity.xyz",
    NEXT_16_JS_PROJECTS_PRICE: "64900", // pulls from .env file
    NEXTAUTH_URL: "https://xplodivity.xyz",
    NEXT_RAZORPAY_KEY_ID: "rzp_test_HwwK3yQRnEOlhI",
  },
  images: {
    domains: [
      "localhost",
      "i.ytimg.com",
      "xplodivity.graphy.com",
      "d1ty23sn1lw3wk.cloudfront.net",
      "xplodivity.xyz",
      "devapi.xplodivity.xyz",
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
