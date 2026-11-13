// Bundle the API server into one CommonJS file for Vercel.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { rm } from "node:fs/promises";
import { build } from "esbuild";

const artifactDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(artifactDir, "dist");
const outfile = path.resolve(distDir, "vercel.cjs");

await rm(distDir, { recursive: true, force: true });

await build({
  entryPoints: [path.resolve(artifactDir, "src/vercel.ts")],
  platform: "node",
  target: "node20",
  bundle: true,
  format: "cjs",
  outfile,
  logLevel: "info",
  external: ["pg-native"],
  define: { "process.env.NODE_ENV": '"production"' },
});
