# (2.9寸A01)260730-Refactored

- Source branch: `main`
- Source commit: `e6d65b3a6c06c35630d94e8d90b0d16a1b477fde`
- PlatformIO environment: `a01_v15_4m2m`
- Target: ESP8266 / ESP-WROOM-02 / 4MB 4M2M / DIO / 80 MHz
- Application offset: `0x000000`
- Application maximum size: `1044464` bytes (`0xFEFF0`)
- Application size: `923456` bytes (`0xE1740`)
- Application SHA-256: `0C74E053DC43B9A9E7CC5E9F5FAFE13AA68ECC1D7717B1141B67B0ED5B2306C8`
- Filesystem offset: `0x200000`
- Filesystem size: `2072576` bytes (`0x1FA000`)
- Filesystem end: `0x3FA000` (exclusive)
- EEPROM offset: `0x3FB000`
- RF calibration offset: `0x3FC000`
- Wi-Fi configuration offset: `0x3FD000`
- Filesystem SHA-256: `E1AD78A05CC9B50105D9698B888B68177EA2ABBB4C1613C2BDBD75BECC441C2A`

The application artifact was produced from the source commit above and
revalidated with PlatformIO on 2026-07-30. The LittleFS image uses that
commit's `data/` directory, including `/edit/ace.js.gz` for the bundled editor.
The finished image was unpacked and all 18 files matched the source data.

The addresses above come from `eagle.flash.4m2m.ld`. `0x3FA000` is the end of
LittleFS, not the EEPROM start; EEPROM starts at `0x3FB000`.

The installer performs a whole-chip erase, then writes the application at
`0x000000` and the filesystem at `0x200000`.

The whole-chip erase clears all existing device contents, including Wi-Fi,
EEPROM settings, user books, images, filesystem data, and ESP8266 system
sectors. ESP Web Tools starts the new installation directly without offering
the partition-preserving erase choice.
