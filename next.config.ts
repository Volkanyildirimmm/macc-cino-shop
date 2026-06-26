import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  // geoip-lite reads its country DB from disk and ships native-ish data files;
  // don't bundle it — load it from node_modules at runtime (the proxy runs on
  // the Node.js runtime, so a plain require works).
  serverExternalPackages: ["geoip-lite"],
  // The proxy (src/proxy.ts) reads geoip-lite's offline country database from
  // disk at runtime. Next's file tracer can miss those fs reads, so include the
  // data explicitly in the standalone output. (The Dockerfile also copies it as
  // a belt-and-suspenders for the production image.)
  outputFileTracingIncludes: {
    "/": ["./node_modules/geoip-lite/data/**"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.macc-cino.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
