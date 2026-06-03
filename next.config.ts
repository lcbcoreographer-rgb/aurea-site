import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/falar", destination: "/forms", permanent: true },
    ];
  },
};

export default nextConfig;
