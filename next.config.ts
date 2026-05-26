import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Allow SVG placeholders during development
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Disable optimization for placeholder images (re-enable when real images are added)
    unoptimized: true,
  },
  poweredByHeader: false,
  output: 'standalone',
}

export default nextConfig
