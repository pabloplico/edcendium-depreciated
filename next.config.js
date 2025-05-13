/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Fix for bcrypt in client components
    if (!isServer) {
      config.externals = [...(config.externals || []), 'bcrypt', 'bcryptjs'];
    }
    return config;
  },
  swcMinify: true,
  images: {
    domains: [],
  },
}

module.exports = nextConfig
