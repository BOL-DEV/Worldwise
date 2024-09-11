import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    react(),
    eslint({
      fix: true,
      cache: false,
      failOnError: false,
      overrideConfigFile: ".eslintrc.cjs", // Explicitly specify your ESLint config file
    }),
  ],
});
