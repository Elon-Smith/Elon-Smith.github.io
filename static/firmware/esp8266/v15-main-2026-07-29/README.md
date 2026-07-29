# Weather InkScreen A01 V15 main release

- Source branch: `main`
- Source commit: `62d9add87ae047bfaa1487076891303b2553e7c3`
- PlatformIO environment: `a01_v15_4m2m`
- Target: ESP8266 / ESP-WROOM-02 / 4MB 4M2M / DIO
- Application offset: `0x000000`
- Application size: `919200` bytes (`0xE06A0`)
- Application SHA-256: `57F43A0449DFEBE16D8FFDC1D2F36FBE0CD5129A8BCE90F82687D7EA4A70D727`
- Filesystem offset: `0x200000`
- Filesystem size: `2072576` bytes (`0x1FA000`)
- Filesystem SHA-256: `31AB2E12589C1D3D9CE460D29FACC810966F4046498ED95353BCB94522C26FED`

This package contains the application and LittleFS images built from the same
source commit. The filesystem image was unpacked and checked for the Wi-Fi
configuration page, editor, and all referenced static assets. The installer performs a
whole-chip erase, then writes the application at `0x000000` and the filesystem
at `0x200000`.

The whole-chip erase clears all existing device contents, including Wi-Fi,
EEPROM settings, user books, images, filesystem data, and ESP8266 system
sectors. ESP Web Tools starts the new installation directly without offering
the partition-preserving erase choice.
