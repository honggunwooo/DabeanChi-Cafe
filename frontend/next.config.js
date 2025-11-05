/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  optimizeFonts: false,  // experimental 객체 밖으로 이동
}

export default nextConfig