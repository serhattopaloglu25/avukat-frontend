/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/calendar',
        destination: '/events',
        permanent: true,
      },
      {
        source: '/calender',
        destination: '/events',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://avukat-ajanda-backend.onrender.com/:path*',
      },
    ];
  },
  // ESLint'i build sırasında geçici olarak devre dışı bırak
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;