import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const releaseDirectory = path.join(
  root,
  "static",
  "firmware",
  "esp8266",
  "v15-main-2026-07-29",
);
const manifestPath = path.join(releaseDirectory, "manifest.json");
const releasePath = path.join(releaseDirectory, "release.json");
const templatePath = path.join(root, "layouts", "_default", "firmware.html");
const stableManifestUrl =
  "/firmware/esp8266/v15-main-2026-07-29/manifest.json";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function sha256(filePath) {
  const data = await readFile(filePath);
  return createHash("sha256").update(data).digest("hex").toUpperCase();
}

async function verifyArtifact(label, metadata, part) {
  assert(part.path === metadata.path, `${label} path differs from release.json`);
  assert(part.offset === metadata.offset, `${label} offset differs from release.json`);

  const artifactPath = path.join(releaseDirectory, metadata.path);
  const artifactStat = await stat(artifactPath);
  assert(artifactStat.size === metadata.size, `${label} size differs from release.json`);
  assert(
    (await sha256(artifactPath)) === metadata.sha256,
    `${label} SHA-256 differs from release.json`,
  );
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const release = JSON.parse(await readFile(releasePath, "utf8"));
const template = await readFile(templatePath, "utf8");

assert(manifest.name === "Weather InkScreen A01 V15", "unexpected manifest name");
assert(
  manifest.version.endsWith(release.source.commit.slice(0, 7)),
  "manifest version does not identify the source commit",
);
assert(
  manifest.new_install_prompt_erase === false,
  "the installer erase mode changed unexpectedly",
);
assert(manifest.builds.length === 1, "manifest must contain exactly one build");
assert(
  manifest.builds[0].chipFamily === "ESP8266",
  "manifest chip family must be ESP8266",
);

const parts = manifest.builds[0].parts;
assert(parts.length === 2, "manifest must contain application and filesystem parts");
await verifyArtifact("application", release.application, parts[0]);
await verifyArtifact("filesystem", release.filesystem, parts[1]);

assert(
  release.application.offset === 0 && release.filesystem.offset === 0x200000,
  "A01 flash offsets must remain 0x000000 and 0x200000",
);

for (const requiredFile of [
  "GCSBS.html.gz",
  "bootstrap.min.css.gz",
  "iziToast.min.css.gz",
  "jquery.min.js.gz",
  "bootstrap.bundle.min.js.gz",
  "iziToast.min.js.gz",
  "favicon.ico.gz",
  "edit/index.htm.gz",
  "edit/ace.js.gz",
]) {
  assert(
    release.filesystem.requiredFiles.includes(requiredFile),
    `release.json is missing verified LittleFS file ${requiredFile}`,
  );
}

for (const expectedText of [
  stableManifestUrl,
  release.application.path,
  release.filesystem.path,
]) {
  assert(template.includes(expectedText), `firmware page is missing ${expectedText}`);
}

console.log(
  `PASS: ${manifest.version}; application and LittleFS sizes, hashes, offsets, and page references match`,
);
