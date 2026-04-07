# Kivana Releases

This repository is used only to host release artifacts for the Kivana desktop app (Tauri).

## What gets uploaded per version

Create a GitHub Release (example tag: `v0.1.3`) and upload:

**macOS**
- `Kivana_0.1.3_aarch64.dmg` (installer)
- `Kivana.app.tar.gz` (updater bundle)
- `Kivana.app.tar.gz.sig` (signature for updater bundle)

**Windows (x64)**
- `Kivana_0.1.3_x64_en-US.msi` (or the generated `.msi` name)
- `*.msi.sig` (signature for the MSI)

**Updater index**
- `latest.json`

The app checks:
`https://github.com/Litas-dev/Kivana/releases/latest/download/latest.json`

## latest.json format (Tauri updater)
`latest.json` must include a signed URL + signature for each platform you want to update.

Example:
```json
{
  "version": "0.1.3",
  "pub_date": "2026-04-07T00:00:00Z",
  "notes": "",
  "platforms": {
    "darwin-aarch64": { "url": "...", "signature": "..." },
    "windows-x86_64": { "url": "...", "signature": "..." }
  }
}
```

