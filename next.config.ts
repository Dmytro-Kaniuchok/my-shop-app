import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    optimizeCss: true,
    // serverActions: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyimage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // headers: async () => [
  //   {
  //     source: "/(.*)",
  //     headers: [
  //       {
  //         key: "Cache-Control",
  //         value: "no-store",
  //       },
  //     ],
  //   },
  // ],
};

export default nextConfig;
