import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    allowedHosts: ["8346aa5c8c70.ngrok-free.app"],
  },
});
