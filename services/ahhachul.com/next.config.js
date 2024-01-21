/** @type {import('next').NextConfig} */

const { version } = require("./package.json");

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  env: {
    WEB_VERSION: version,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    forceSwcTransforms: true,
  },
  swcMinify: true,
  compiler: {
    emotion: true,
    reactRemoveProperties: isProd && {
      properties: ["^data-testid"],
    },
    removeConsole: isProd && {
      exclude: ["error", "warn"],
    },
  },
};

module.exports = nextConfig;
