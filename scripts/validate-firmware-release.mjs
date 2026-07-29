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
const releaseName = "【2.9寸A01】26-07-29 重构版";
const expectedLittleFsFiles = [
  "GCSBS.html.gz",
  "bootstrap.bundle.min.js.gz",
  "bootstrap.min.css.gz",
  "edit/ace.js.gz",
  "edit/index.htm.gz",
  "favicon.ico.gz",
  "jquery.slim.min.js.gz",
  "toast.css.gz",
  "toast.js.gz",
];

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

assert(manifest.name === releaseName, "unexpected manifest name");
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
assert(
  release.application.size <= release.flashLayout.applicationMaximumSize,
  "application exceeds the 4M2M application partition",
);
assert(
  release.filesystem.size === release.flashLayout.filesystemSize &&
    release.filesystem.offset + release.filesystem.size ===
      release.flashLayout.filesystemEnd,
  "LittleFS size or end address differs from the 4M2M layout",
);
assert(
  release.flashLayout.filesystemEnd === 0x3fa000 &&
    release.flashLayout.eepromOffset === 0x3fb000 &&
    release.flashLayout.rfCalibrationOffset === 0x3fc000 &&
    release.flashLayout.wifiConfigOffset === 0x3fd000,
  "A01 4M2M system-sector layout changed unexpectedly",
);
assert(
  release.application.imageHeader === "E9 02 02 4F" &&
    release.application.flashMode === "dio" &&
    release.application.flashFrequency === 80000000,
  "ESP8266 application image header or flash settings changed unexpectedly",
);

assert(
  release.filesystem.requiredFiles.length === expectedLittleFsFiles.length,
  "release.json LittleFS inventory length differs from the verified image",
);
for (const requiredFile of expectedLittleFsFiles) {
  assert(
    release.filesystem.requiredFiles.includes(requiredFile),
    `release.json is missing verified LittleFS file ${requiredFile}`,
  );
}
assert(
  release.filesystem.compatibilityOverlay.path === "edit/ace.js.gz" &&
    release.filesystem.compatibilityOverlay.sha256 ===
      "CDD6FCD9CC26EB8D021848A211185EA84A021CA1CF868FB1F103C5E29D0C0095",
  "the editor compatibility asset differs from the locally verified image",
);

for (const expectedText of [
  stableManifestUrl,
  releaseName,
  release.application.path,
  release.filesystem.path,
]) {
  assert(template.includes(expectedText), `firmware page is missing ${expectedText}`);
}

console.log(
  `PASS: ${manifest.name} ${manifest.version}; application and LittleFS sizes, hashes, 4M2M offsets, and page references match`,
);
