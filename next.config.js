/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}`],
  },
  i18n,
};

module.exports = nextConfig;
