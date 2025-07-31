// next.config.js
module.exports = {
    async redirects() {
      return [
        {
          source: '/availbility/:path*',
          destination: '/availability',
          permanent: true,
        },
      ];
    },
  };
  