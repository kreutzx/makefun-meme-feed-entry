// Entry point for the "Post the Meme, Win the Feed" make.fun entry.
//
// The whole job of this program is deliberately tiny: the entry payload is
// a single JSON document (POST.json) that lives next to this file and names
// the X post carrying the meme. The runner expects that document to appear,
// byte for byte, inside the output directory, so this script copies the raw
// bytes across without parsing, re-serialising, or otherwise touching them.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Directory this script was loaded from; POST.json sits right beside it.
const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "POST.json");

// Where the runner collects entry artefacts. Falls back to /output when the
// environment variable is not set, matching the make.fun convention.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const targetPath = join(outputDir, "POST.json");

// Read the payload as a Buffer so no encoding or newline translation can
// creep in between the repository copy and the delivered copy.
const payload: Buffer = readFileSync(sourcePath);

// The output directory may not exist yet on a fresh runner, so create it
// (recursively) before writing.
mkdirSync(outputDir, { recursive: true });
writeFileSync(targetPath, payload);

// Verify the delivery: read the file back and compare it byte for byte with
// the source payload. If anything was lost or altered on the way out, fail
// loudly here rather than letting a broken entry through.
const delivered: Buffer = readFileSync(targetPath);
if (!delivered.equals(payload)) {
  throw new Error(
    `POST.json verification failed: wrote ${payload.length} bytes but read back ${delivered.length} non-matching bytes`,
  );
}

console.log(`Delivered ${payload.length} bytes to ${targetPath} (verified identical)`);
