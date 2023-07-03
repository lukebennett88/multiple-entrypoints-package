import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts", "src/*/index.ts"],
  external: ["react"],
  format: ["cjs", "esm"],
  dts: true,
  clean: !options.watch,
  minify: !options.watch,
  splitting: !options.watch,
  treeshake: !options.watch,
  outExtension({ format }) {
    return {
      js: `${format === "esm" ? ".esm" : ""}.js`,
    };
  },
  ...options,
}));
