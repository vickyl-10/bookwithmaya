// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/complete_automated_booking',
        destination: '/instructions',
      },
    ];
  },
};
