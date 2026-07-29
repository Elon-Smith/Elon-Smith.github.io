# 【2.9寸A01】26-07-29 重构版

- Source branch: `main`
- Source commit: `74da6c09b8cefbb25b1128e91130174a3fa16160`
- PlatformIO environment: `a01_v15_4m2m`
- Target: ESP8266 / ESP-WROOM-02 / 4MB 4M2M / DIO / 80 MHz
- Application offset: `0x000000`
- Application maximum size: `1044464` bytes (`0xFEFF0`)
- Application size: `917488` bytes (`0xDFFF0`)
- Application SHA-256: `265F2256EA4C6B9598B68E73AC3F9456BB9FC81806063BD2EA145F93142ACE0F`
- Filesystem offset: `0x200000`
- Filesystem size: `2072576` bytes (`0x1FA000`)
- Filesystem end: `0x3FA000` (exclusive)
- EEPROM offset: `0x3FB000`
- RF calibration offset: `0x3FC000`
- Wi-Fi configuration offset: `0x3FD000`
- Filesystem SHA-256: `A63999C664B7BB11C96B7CC845AEBE484C5B329251F469623A261024887DA6A2`

The application was built cleanly from the source commit above. The LittleFS
image uses that commit's `data/` directory and retains the production
`/edit/ace.js.gz` compatibility asset because the bundled editor references it.
The finished image was unpacked and checked for the Wi-Fi configuration page,
editor, and every referenced static asset.

The addresses above come from `eagle.flash.4m2m.ld`. `0x3FA000` is the end of
LittleFS, not the EEPROM start; EEPROM starts at `0x3FB000`.

The installer performs a whole-chip erase, then writes the application at
`0x000000` and the filesystem at `0x200000`.

The whole-chip erase clears all existing device contents, including Wi-Fi,
EEPROM settings, user books, images, filesystem data, and ESP8266 system
sectors. ESP Web Tools starts the new installation directly without offering
the partition-preserving erase choice.
