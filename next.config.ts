import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_TINY_MCE_API_KEY: process.env.NEXT_PUBLIC_TINY_MCE_API_KEY,
  },
  /* config options here */
};

export default nextConfig;
