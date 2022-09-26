import path from "path"
import { defineConfig } from "vite"
import { readdirSync } from "fs"
import react from "@vitejs/plugin-react"
import checker from "vite-plugin-checker"
import tsconfigPaths from "vite-tsconfig-paths"

const absolutePathAliases: { [key: string]: string } = {}
// Root resources folder
const srcPath = path.resolve("./src/")
// Ajust the regex here to include .vue, .js, .jsx, etc.. files from the resources/ folder
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map(
  (dirent) => dirent.name.replace(/(\.ts){1}(x?)/, ""),
)

srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = path.join(srcPath, directory)
})

console.log(absolutePathAliases)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      tsconfigPaths(),
      react(),
      checker({ overlay: false, typescript: true }),
    ],
    resolve: {
      alias: {
        ...absolutePathAliases,
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
