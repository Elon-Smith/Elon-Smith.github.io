# ESP8266 firmware assets

Place the merged ESP8266 firmware binary here:

```text
beining-esp8266-firmware.bin
```

The manifest at `manifest.json` assumes a single merged binary flashed at offset `0x0`.
If your build outputs separate ESP8266 files, update `manifest.json` with the correct `parts` offsets before publishing.
