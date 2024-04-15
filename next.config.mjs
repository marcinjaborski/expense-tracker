import createNextIntlPlugin from "next-intl/plugin";
import createNextPwaPlugin from 'next-pwa'


const withNextIntl = createNextIntlPlugin();

const withPWA = createNextPwaPlugin({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
};

export default withNextIntl(withPWA(nextConfig));
