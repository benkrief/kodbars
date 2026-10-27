import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const envFile = resolve(".env.local");
const args = [
  "--yes",
  "wrangler",
  "dev",
  "--config",
  resolve(".output/server/wrangler.json"),
  ...(existsSync(envFile) ? ["--env-file", envFile] : []),
  ...process.argv.slice(2),
];
// Wrangler résout les chemins .env depuis le dossier de sa configuration générée.
const child = spawn(process.platform === "win32" ? "npx.cmd" : "npx", args, { stdio: "inherit" });
child.on("error", () => {
  console.error("Impossible de lancer l’aperçu Cloudflare.");
  process.exitCode = 1;
});
child.on("exit", (code) => {
  process.exitCode = code ?? 1;
});
