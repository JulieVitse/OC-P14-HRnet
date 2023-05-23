/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  transpilePackages: ['julie-react-ts-modal'],
  ...nextConfig,
}
