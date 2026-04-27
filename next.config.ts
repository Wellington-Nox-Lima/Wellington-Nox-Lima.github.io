import type { NextConfig } from "next";

const repoName = process.env.GITHUB_PAGES_REPO ?? "";
const isUserSite = repoName.endsWith(".github.io");
const basePath =
  process.env.GITHUB_PAGES === "true" && repoName && !isUserSite ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
