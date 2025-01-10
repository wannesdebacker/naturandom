import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/naturandom.ts"),
      name: "naturandom",
      fileName: (format) => `naturandom.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [],
      output: {
        exports: "named",
        globals: {},
      },
    },
    sourcemap: true,
    minify: "esbuild",
    target: "es2020",
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: "dist",
      exclude: ["src/**/*.test.ts"],
      copyDtsFiles: false,
      include: ["src/naturandom.ts"],
    }),
  ],
  esbuild: {
    keepNames: true,
    drop: ["console"],
  },
});
