import { defineConfig } from 'vite';      // Import Vite's defineConfig function
import path from 'path';                  // Import the path module from Node.js
import react from '@vitejs/plugin-react'; // Import the Vite React plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],                    // Use the React plugin
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Create an alias for the src directory
    },
  },
});
