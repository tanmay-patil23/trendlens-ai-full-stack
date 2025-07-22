/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Remove 'appDir' - it's deprecated in Next.js 14
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
}

module.exports = nextConfig
