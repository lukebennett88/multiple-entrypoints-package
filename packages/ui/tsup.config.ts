import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  clean: !options.watch,
  dts: true,
  entry: ["src/index.ts", "src/*/index.ts"],
  external: ["react"],
  format: ["cjs", "esm"],

  /** Ideally these should all be true, just trying to get this working for now */
  minify: true,
  splitting: true,
  treeshake: true,
  ...options,
}));
