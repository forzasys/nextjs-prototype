import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'cdn.forzasys.com', 
      'video-ntf.forzify.com', 
      'd22hh18o76pkhl.cloudfront.net', 
      "norkring-ntf-od.telenorcdn.net",
      "video-shl.forzify.com",
      "video-shl.s3.eu-north-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
