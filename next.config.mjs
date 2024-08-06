/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "techswipe-images.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
