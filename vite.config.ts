import path from "path"
import { defineConfig } from "vite"
import { readdirSync } from "fs"
import react from "@vitejs/plugin-react"
import checker from "vite-plugin-checker"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      tsconfigPaths(),
      react(),
      checker({ overlay: false, typescript: true }),
    ],
    server: {
      port: 3000,
    },
    build: {
      outDir: "build",
    },
  }
})
