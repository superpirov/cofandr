import type { NextConfig } from "next";

const basePath = process.env.NEXT_BASE_PATH || undefined;
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  ...(basePath ? { basePath } : {}),
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        // GitHub Pages serves files only: drop API/sitemap/robots routes.
        pageExtensions: ["tsx", "mdx"],
        images: { unoptimized: true },
      }
    : {
        images: { formats: ["image/avif", "image/webp"] },
      }),
};

export default nextConfig;
