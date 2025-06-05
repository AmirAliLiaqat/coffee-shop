/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: false,
  },
  images: {
    domains: ["placehold.co"],
  },
};

module.exports = nextConfig;
