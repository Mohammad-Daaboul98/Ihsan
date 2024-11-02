import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { qrcode } from "vite-plugin-qrcode";
// import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  define: {
    "process.env": {},
  },

  server: {
    host: true,

    proxy: {
      "/api": {
        target: "http://localhost:5100/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    // cors: {
    //   origin: true, // Allow all origins
    //   methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowed methods
    //   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    //   credentials: true, // Allow credentials
    // },
    // https: {
    //   key: fs.readFileSync('certs/key.pem'),
    //   cert: fs.readFileSync('certs/cert.pem'),
    // },
  },
});
