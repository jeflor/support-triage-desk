import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves this app from /support-triage-desk/
export default defineConfig({
  base: "/support-triage-desk/",
  plugins: [react()],
});
