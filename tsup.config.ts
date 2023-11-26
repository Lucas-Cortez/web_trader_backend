import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  sourcemap: true,
  outDir: "dist",
  entry: ["src/server.ts"],
  format: ["esm"],
});
