import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(() => ({
  plugins: [react(), componentTagger()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      "b13d2e5503ed.ngrok-free.app", // 👈 your ngrok host
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.match(/react|react-dom|react-router-dom/)) return "react-vendor";
            if (id.includes("@radix-ui")) return "vendor-radix";
            if (id.includes("lucide-react")) return "vendor-icons";
            if (id.includes("cmdk")) return "vendor-cmdk";
            if (id.includes("recharts")) return "vendor-charts";
            return "vendor";
          }
        },
      },
    },
  },
}));
