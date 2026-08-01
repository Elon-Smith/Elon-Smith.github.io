# (2.9寸A01)260801-ReaderUX

- Source branch: `main`
- Source base commit: `e6d65b3a6c06c35630d94e8d90b0d16a1b477fde`
- Working-tree diff object: `3ecd4b79fb0c307383519424d1151f0d50ac9d3f`
- PlatformIO environment: `a01_v15_4m2m`
- Target: ESP8266 / ESP-WROOM-02 / 4MB 4M2M / DIO / 80 MHz
- Application offset: `0x000000`
- Application maximum size: `1044464` bytes (`0xFEFF0`)
- Application size: `927888` bytes (`0xE2890`)
- Application SHA-256: `5CAE8F17A70F882212E8B117D7191C1D2081C3B3F76EB3B10326A20D51C6D1BE`
- Filesystem offset: `0x200000`
- Filesystem size: `2072576` bytes (`0x1FA000`)
- Filesystem end: `0x3FA000` (exclusive)
- EEPROM offset: `0x3FB000`
- RF calibration offset: `0x3FC000`
- Wi-Fi configuration offset: `0x3FD000`
- Filesystem SHA-256: `DCD4CA0C5A1C5F8FA8764B26AD029A58BAD37C37D2B9CFF53A556F34C350DEF1`

The application artifact was produced on 2026-08-01 from the public base
commit above plus the eight modified reader/EEPROM/file-manager files recorded
in `release.json`. The working-tree diff object identifies that exact source
delta; this is intentionally not described as a clean-commit build.

This ReaderUX release adds cached one-item directory navigation, low-overhead
interactive refreshes, storage-aware reading history, byte-offset continuity
after layout changes, and corrected automatic-page timing. Both the normal and
acceptance environments compiled successfully. No physical device was flashed,
so display ghosting, real response time, history migration on hardware, and
power consumption remain unverified.

The LittleFS image uses the same source `data/` directory, including
`/edit/ace.js.gz` for the bundled editor. The finished image was unpacked and
all 18 files matched the source data.

The addresses above come from `eagle.flash.4m2m.ld`. `0x3FA000` is the end of
LittleFS, not the EEPROM start; EEPROM starts at `0x3FB000`.

The installer performs a whole-chip erase, then writes the application at
`0x000000` and the filesystem at `0x200000`.

The whole-chip erase clears all existing device contents, including Wi-Fi,
EEPROM settings, user books, images, filesystem data, and ESP8266 system
sectors. ESP Web Tools starts the new installation directly without offering
the partition-preserving erase choice.
