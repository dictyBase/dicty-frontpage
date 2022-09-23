import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import checker from "vite-plugin-checker"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), checker({ overlay: false, typescript: true })],
    resolve: {
      alias: {
        find: "common",
        replacement: path.resolve(__dirname, "./src/common"),
      },
    },
    server: {
      port: 3000,
    },
    build: {
      outDir: "build",
    },
  }
})
