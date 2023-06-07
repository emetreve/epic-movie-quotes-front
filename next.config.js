/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}`],
  },
  i18n: {
    locales: ['en', 'ka'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
