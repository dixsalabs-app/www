import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/services/web-applications",
        destination: "/services/web-apps",
        permanent: true,
      },
      {
        source: "/services/websites-and-apps",
        destination: "/services/websites",
        permanent: true,
      },
      {
        source: "/services/digital-marketing",
        destination: "/services/content",
        permanent: true,
      },
      {
        source: "/services/youtube",
        destination: "/services/content",
        permanent: true,
      },
      {
        source: "/services/search",
        destination: "/services/seo",
        permanent: true,
      },
    ]
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
