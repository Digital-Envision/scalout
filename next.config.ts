import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray lockfile higher up the tree otherwise
  // makes Turbopack infer the wrong root.
  turbopack: {
    root: __dirname,
  },
  // Emit a self-contained server bundle for the DigitalOcean / Docker
  // production target. Vercel ignores this and uses its own output.
  output: "standalone",
};

export default nextConfig;
