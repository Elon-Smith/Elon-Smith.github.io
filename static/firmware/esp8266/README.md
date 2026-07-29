# ESP8266 firmware assets

The firmware page publishes several ESP8266 packages. The current
whitelist-only Weather InkScreen A01 release lives in
`v15-main-2026-07-29/` and contains the application image built from
`Weather-InkScreen29` commit `62d9add87ae047bfaa1487076891303b2553e7c3`
and the LittleFS image built and verified from that same commit. Its manifest performs a
whole-chip erase before writing the application at `0x000000` and the
filesystem at `0x200000`.

The V15 original two-part firmware remains available in `original-v1.0/`:

```text
original-a01-015-03-a7.bin              offset 0x0
original-filesystem-015-03-a7.bin       offset 0x200000
```

`V14_Esp8266.bin` is retained as an unlisted archive and is not referenced by
the firmware page or a manifest.
