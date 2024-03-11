/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["raw.githubusercontent.com"],
  },
  distDir: "out",
};

module.exports = nextConfig;
