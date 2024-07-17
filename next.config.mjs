/** @type {import('next').NextConfig} */
const nextConfig = {
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
