# ESP8266 firmware assets

The firmware page publishes several ESP8266 packages. The current
whitelist-only Weather InkScreen A01 release lives in
`v15-main-2026-07-29/` and contains the application image built from
`Weather-InkScreen29` commit `7e91f30050a72dd09f0b9c322d328249181e6cb1`
plus the compatible official A7 filesystem image. Its manifest performs a
whole-chip erase before writing the application at `0x000000` and the
filesystem at `0x200000`.

The existing full 4MB factory image remains available as:

```text
moshengren-digital-grocery-v1.0.1.bin
```

Use this as a single full 4MB factory image at flash offset `0x000000`.
The image already contains the app firmware, LittleFS data, and ESP8266 init data, so users do not need to flash separate parts.

Recommended flashing settings:

```text
Chip: ESP8266
Flash size: 4MB / 32Mbit
Flash mode: DIO
Flash frequency: 40MHz
Offset: 0x000000
```

For ESP Web Tools, `manifest.json` points to `moshengren-digital-grocery-v1.0.1.bin` with `offset: 0`.

The original two-part firmware used for comparison lives in `original-v1.0/`.
