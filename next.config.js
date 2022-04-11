/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: ["images.unsplash.com"],
  },
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
};
