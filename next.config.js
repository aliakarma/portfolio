/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // For GitHub Pages: uncomment and set basePath to '/repo-name' if using project repo
  // basePath: '/aliakarma.github.io',
}
module.exports = nextConfig
