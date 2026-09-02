const REPO_NAME = "StackMIREA";
const basePath = `/${REPO_NAME}`;
const isProduction = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isProduction ? "export" : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: isProduction ? basePath : "",
  assetPrefix: isProduction ? basePath : undefined
};

export default nextConfig;
