/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  /*
    Pin the workspace root. A stray package-lock.json in a parent directory
    made Turbopack infer that folder as the root and warn on every build.
    Pinning here fixes it inside the repo, without touching files outside it.
  */
  turbopack: { root: __dirname },
  // For GitHub Pages: uncomment and set basePath to '/repo-name' if using project repo
  // basePath: '/aliakarma.github.io',
}
module.exports = nextConfig
