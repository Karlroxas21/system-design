import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

// The shop reads tokens.json and dist/graphite.css from the design system two folders up.
const systemRoot = fileURLToPath(new URL("../..", import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: { fs: { allow: [systemRoot] } },
});
