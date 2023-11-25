import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  outDir: "dist",
  entry: ["src/server.ts"],
});
