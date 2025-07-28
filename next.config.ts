import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
  images: {
    domains: [
      'cdn.forzasys.com', 
      'video-ntf.forzify.com', 
      'd22hh18o76pkhl.cloudfront.net', 
      "norkring-ntf-od.telenorcdn.net",
      "https://norkring-sef-od.telenorcdn.net",
      "video-shl.forzify.com",
      "video-shl.s3.eu-north-1.amazonaws.com",
      "www.hent.no",
      "g.acdn.no",
      "www.brynefk.no",
      "www.glimt.no",
    ],
  },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);