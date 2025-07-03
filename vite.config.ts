import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Listens on all available network interfaces
    port: 8080,
  },
  plugins: [
    react(),
    // No componentTagger needed here as confirmed
  ],
  resolve: {
    alias: {
      // Sets up an alias for '@' to point to the 'src' directory
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: 'esbuild', // Uses esbuild for minification, which is very fast
    sourcemap: false,  // Disables source map generation for smaller build size in production
  },
}));