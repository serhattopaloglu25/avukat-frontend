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
};

module.exports = nextConfig;
