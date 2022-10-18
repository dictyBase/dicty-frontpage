/// <reference types="vite/client" />
/// <reference types="vitest" />

import react from "@vitejs/plugin-react"
import { defineConfig, mergeConfig } from "vite"
import { defineConfig as vineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"

const vineConfiguration = vineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
    deps: {
      inline: ["compute-scroll-into-view"],
    },
  },
})

const vitCongfiguration = defineConfig({
  plugins: [tsconfigPaths(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    mainFields: ["module"],
  },
})

export default mergeConfig(vitCongfiguration, vineConfiguration)
