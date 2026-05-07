import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.macc-cino.com",
      },
    ],
  },
};

export default nextConfig;
