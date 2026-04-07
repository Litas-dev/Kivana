# Kivana

Kivana is a lightweight personal finance desktop app for macOS and Windows.

- Track bills, income, accounts, transactions, goals, and debts
- Import bank CSV files into your transaction ledger
- Local-first: your data stays on your device
- In-app updates: the app can download and install new versions

## Download

Download the latest installer from the Releases page:

- https://github.com/Litas-dev/Kivana/releases/latest

Assets you typically want:

- macOS: `*.dmg`
- Windows: `*.msi`

## Updates

Kivana checks for updates using the Tauri updater.

- In the app, open **Settings → Updates → Check for updates**
- If a newer version exists, you’ll see an **Update available** message and can click **Download & install**

Behind the scenes, the app reads this update index:

- https://github.com/Litas-dev/Kivana/releases/latest/download/latest.json

## Source code

This repository is only for hosting release artifacts used by the updater.

Source code lives here:

- https://github.com/Litas-dev/Mac

---

<details>
<summary>For maintainers (how releases are structured)</summary>

### What gets uploaded per version

Create a GitHub Release (example tag: `v0.1.3`) and upload:

**macOS**

- `Kivana_0.1.3_aarch64.dmg` (installer)
- `Kivana.app.tar.gz` (updater bundle)
- `Kivana.app.tar.gz.sig` (signature for updater bundle)

**Windows (x64)**

- `Kivana_0.1.3_x64_en-US.msi` (installer)
- `*.msi.sig` (signature for the MSI)

**Updater index**

- `latest.json`

### latest.json format (Tauri updater)

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

</details>
