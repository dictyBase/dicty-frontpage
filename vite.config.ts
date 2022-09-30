import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import checker from "vite-plugin-checker"
import tsconfigPaths from "vite-tsconfig-paths"
import path from "path"
import { readdirSync } from "fs"

const absolutePathAliases: { [key: string]: string } = {}

const srcPath = path.resolve("./src")
// Don't forget to adjust the regex here so it can include .vue, .js, .jsx, etc... files from the src/ folder.
// In my case, I'm writing React + TypeScript so the regex find files with .ts?(x) extensions only.
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map(
  (dirent) => dirent.name.replace(/(\.ts){1}(x?)/, ""),
)

srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = path.join(srcPath, directory)
})

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    tsconfigPaths(),
    react(),
    checker({ overlay: false, typescript: true }),
  ],
  resolve: {
    alias: { ...absolutePathAliases },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: "build",
  },
}))
