import { defineConfig } from "astro/config"

export default defineConfig({
  vite: {
    resolve: {
      extensions: ['.astro', '.js', '.ts', '.jsx', '.tsx', '.json']
    }
  }
})
