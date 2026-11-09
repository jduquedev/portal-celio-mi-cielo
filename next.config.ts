import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Solo en desarrollo: permite abrir la página desde el celular en la misma red
  // Wi-Fi (http://<IP del computador>:3000). Si cambia la IP, actualízala aquí.
  allowedDevOrigins: ["192.168.1.9"],
  images: {
    remotePatterns: [
      new URL("https://celiomicieloreposteria.com/wp-content/uploads/**"),
    ],
  },
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
