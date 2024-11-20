import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: '/cloth/',
  server: {
    port: 3000,
    open: true,
  },
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "docs"),
    rollupOptions: {
      // https://vitejs.dev/guide/build.html#multi-page-app
      input: {
        main: resolve(__dirname, "src/shadows/index.html"),
        // "3d-assets": resolve(__dirname, "src/shadows/index.html"),
      },
    },
  },
});
