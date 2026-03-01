const REPO_NAME = "Practice-Make-Perfect";
const basePath = `/${REPO_NAME}`;
const isProduction = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: isProduction ? basePath : "",
  assetPrefix: isProduction ? `${basePath}/` : undefined
};

export default nextConfig;
