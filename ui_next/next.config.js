/* eslint-disable no-undef */

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5328/api/:path*'
            : 'https://jellyfish-app-ll6mk.ondigitalocean.app/api/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
