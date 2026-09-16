import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile higher up the tree otherwise
  // makes Turbopack infer the wrong root.
  turbopack: {
    root: __dirname,
  },

  // Generates a static HTML/JS/CSS export into the ./out directory
  output: "export",

  // Required for static exports unless using a custom third-party image loader
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
