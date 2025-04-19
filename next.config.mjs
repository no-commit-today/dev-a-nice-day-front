/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "techswipe-images.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "t1.kakaocdn.net",
      },
      {
        protocol: "https",
        hostname: "static.toss.im",
      },
      {
        protocol: "https",
        hostname: "techblog.woowahan.com",
      },
      {
        protocol: "https",
        hostname: "engineering.linecorp.com",
      },
      {
        protocol: "https",
        hostname: "d1.awsstatic.com",
      },
      {
        protocol: "https",
        hostname: "d2.naver.com",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
