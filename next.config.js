/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    formats: ["image/avif", "image/webp", "image/jpeg"],
    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
};
