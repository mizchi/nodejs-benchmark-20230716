import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    lib: {
      entry: "src/index.tsx",
      fileName: 'main',
      formats: ["cjs"],
    },
    rollupOptions: {
      external: [
        "node:http",
        "node:net",
        "node:crypto",
        "node:stream",
        "node:stream/promises",
      ],
    }
  }
})