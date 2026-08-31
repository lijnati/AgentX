const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@agentx/domain',
    '@agentx/validation',
    '@agentx/blockchain',
    '@agentx/agents',
    '@agentx/db',
    '@agentx/ui',
  ],
  outputFileTracingRoot: path.join(__dirname, '../../'),
  reactStrictMode: true,
};

module.exports = nextConfig;
