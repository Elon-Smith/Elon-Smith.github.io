# (2.9寸A01)260809-ReaderProgress

- Source branch: `fix/reader-progress-persistence`
- Source commit: `93cc6ecb86dcd598b9a595fe1c85f2387ea6705a`
- PlatformIO environment: `a01_v15_4m2m`
- Target: ESP8266 / ESP-WROOM-02 / 4MB 4M2M / DIO / 80 MHz
- Application offset: `0x000000`
- Application maximum size: `1044464` bytes (`0xFEFF0`)
- Application size: `934624` bytes (`0xE42E0`)
- Application SHA-256: `9D22DB8FFBBB236FB6CF3AD47DDF742108B1EC42DA8BA4192C63A17388C31E85`
- Filesystem offset: `0x200000`
- Filesystem size: `2072576` bytes (`0x1FA000`)
- Filesystem end: `0x3FA000` (exclusive)
- EEPROM offset: `0x3FB000`
- RF calibration offset: `0x3FC000`
- Wi-Fi configuration offset: `0x3FD000`
- Filesystem SHA-256: `8977D8404D7F8D2180D111971792C9BAEA2554960D955910D4D37EB508F540B0`

This release contains the reader-progress persistence fix, bookmark/index
fallback handling, safer file-manager history behavior, corrected numeric-key
layout, and the related Wi-Fi display fixes from commit `93cc6ec`.

The normal application and acceptance configurations compiled successfully.
The LittleFS image passed the source-bundle contract check and contains 18
files. This publication did not flash a physical device; display, ghosting,
reading interaction, and power results remain separate hardware checks.

The installer writes the application at `0x000000` and LittleFS at `0x200000`.
Starting an installation erases the whole 4MB flash, including Wi-Fi,
settings, user books, images, filesystem data, and ESP8266 system sectors.
