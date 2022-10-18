/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react"
import { defineConfig, mergeConfig } from "vite"
import { defineConfig as defineVitestConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [tsconfigPaths(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    mainFields: ["module"],
  },
})

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
    deps: {
      inline: ["compute-scroll-into-view"],
    },
  },
})

export default mergeConfig(viteConfig, vitestConfig)
