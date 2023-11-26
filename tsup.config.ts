import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  outDir: "dist",
  sourcemap: true,
  entry: ["src/server.ts"],
  format: ["esm", "cjs"],
});
