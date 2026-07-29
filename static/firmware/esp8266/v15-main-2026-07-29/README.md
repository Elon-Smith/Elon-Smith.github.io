# Weather InkScreen A01 V15 main release

- Source branch: `main`
- Source commit: `7e91f30050a72dd09f0b9c322d328249181e6cb1`
- PlatformIO environment: `a01_v15_4m2m`
- Target: ESP8266 / ESP-WROOM-02 / 4MB 4M2M / DIO
- Application offset: `0x000000`
- Application size: `917488` bytes (`0xDFFF0`)
- Application SHA-256: `265F2256EA4C6B9598B68E73AC3F9456BB9FC81806063BD2EA145F93142ACE0F`
- Filesystem offset: `0x200000`
- Filesystem size: `2072576` bytes (`0x1FA000`)
- Filesystem SHA-256: `9264CE1F93CEAFFACCCF0F5F4ADFDDF4F9F71550B2926179BF24397E3225E2D8`

This package contains the application built from the latest `main` commit and
the compatible official A7 filesystem image. The installer performs a
whole-chip erase, then writes the application at `0x000000` and the filesystem
at `0x200000`.

The whole-chip erase clears all existing device contents, including Wi-Fi,
EEPROM settings, user books, images, filesystem data, and ESP8266 system
sectors. ESP Web Tools starts the new installation directly without offering
the partition-preserving erase choice.
