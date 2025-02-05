import type { NextConfig } from "next";
//import { config } from "dotenv";

//config();

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  images: {
    
    remotePatterns: [
      {
        protocol: 'https',
        
        hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).hostname,
      },
   
    ]
  }
};

export default nextConfig;
