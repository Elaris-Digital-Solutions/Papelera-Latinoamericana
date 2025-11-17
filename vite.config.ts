import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// simple development-only plugin to avoid "Cannot find name 'componentTagger'" error
function componentTagger(): any {
  return {
    name: "component-tagger",
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
