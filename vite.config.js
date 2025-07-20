import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    allowedHosts: ["a85957feb9a7.ngrok-free.app"],
  },
});
