import type { NextConfig } from "next";
import heroSequence from "./app/hero-sequence.json";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    }, {
      source: "/images/hero-sequence/:path*",
      has: [{ type: "query", key: "v", value: heroSequence.version }],
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
