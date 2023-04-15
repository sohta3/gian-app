/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
    loaderFile: "./libs/cloudflareLoader.ts",
  },
};

module.exports = nextConfig;
