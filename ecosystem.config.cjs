module.exports = {
  apps: [
    {
      name: "scalout",
      // Directs PM2 to run Next.js via Bun
      script: "node_modules/next/dist/bin/next",
      args: "start",
      interpreter: "bun",
      env: {
        NODE_ENV: "production",
        PORT: 3002,
      },
    },
  ],
};
