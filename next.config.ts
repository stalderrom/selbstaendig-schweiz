import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/artikel/selbststaendig-machen-schweiz",
        destination: "/artikel/selbstaendig-machen-schweiz",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
