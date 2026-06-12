# ESP32 firmware assets

Place the merged ESP32 firmware binary here:

```text
beining-esp32-firmware.bin
```

The manifest at `manifest.json` assumes a single merged binary flashed at offset `0x0`.
If your build outputs separate ESP32 files, either merge them with `esptool.py merge_bin`
or update `manifest.json` with the correct `parts` offsets.
