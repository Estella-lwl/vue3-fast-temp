import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    port: 9528,
    hmr: {
      overlay: false
    },
    proxy: {
      "/api": {
        target: "",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    },
    host: "0.0.0.0" // ✨✨使项目可通过IP访问
  },
  build: {
    target: "es2020"
  },
  optimizedeps: {
    esbuildoptions: {
      target: "es2020"
    }
  }
});
