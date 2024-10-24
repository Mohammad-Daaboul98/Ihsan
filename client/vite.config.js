import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { qrcode } from "vite-plugin-qrcode";
// import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5100/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    // https: {
    //   key: fs.readFileSync('certs/key.pem'),
    //   cert: fs.readFileSync('certs/cert.pem'),
    // },
  },
});
