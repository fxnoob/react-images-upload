import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./index.js"],
  format: ["esm", "cjs"],
  clean: true,
  platform: "browser",
  loader: { ".js": "jsx" },
  outExtension({ format }) {
    return {
      js: `.${format === "cjs" ? "cjs" : "mjs"}`,
    };
  },
  esbuildOptions(options) {
    options.treeShaking = true;
  },
});
