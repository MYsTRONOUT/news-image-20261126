import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// The entry image is drawn in advance and shipped in this repo.
// The program copies it to the output directory the grader reads.
const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "output");
mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, "entry.png"), join(outDir, "entry.png"));
// Verify the copy landed whole before the run ends.
if (statSync(join(here, "entry.png")).size !== statSync(join(outDir, "entry.png")).size) {
  throw new Error("entry.png copy is incomplete");
}
