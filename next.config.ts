import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos", "cdn.dummyjson.com"],
  },
  matcher: ["/"],
};

export default nextConfig;
