import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "theindiacrafthouse.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  turbopack: {
    // Ensure the project root is this app, avoiding workspace root confusion
    root: __dirname,
  },
};

export default nextConfig;
