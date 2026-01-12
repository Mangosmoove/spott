/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',       // leave empty unless you use a custom port
        pathname: '/**', // allow all paths
      },
    ],
  },
};

export default nextConfig;
