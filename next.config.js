/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 256, 384],
    formats: ["image/avif", "image/webp"],
    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
};
