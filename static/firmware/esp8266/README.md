# ESP8266 firmware assets

Published firmware for the Weather Ink Screen ESP8266 / A01 build:

```text
beining-esp8266-firmware.bin
```

Current public version: `v1.0.1`.

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

For ESP Web Tools, `manifest.json` points to `beining-esp8266-firmware.bin` with `offset: 0`.
