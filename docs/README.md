# fs-keeper

**A simple, zero-dependency Node.js CLI to automatically organize any directory by file extension.**

Tired of messy Downloads folders? `fs-keeper` moves files into clean category folders (`Images`, `Code`, `Videos`, `Documents`…) with a single command.  
It also supports **dry-run simulation** and **one-click restore** of the last organization.

---

## Features

- Organize files by extension into category folders
- Simulation mode (`--simulation`) — preview without changing anything
- Restore mode (`--restore`) — undo the last organization
- Custom extension filter (`--extensions=[js,ts,py]`)
- Zero external dependencies (pure Node.js)
- Safe by design: never overwrites existing files
- Works on Windows, macOS and Linux

---

## Installation

### Global (recommended)

```bash
npm install -g fs-keeper

### Local / development

```bash
git clone https://github.com/Gabriel-Angelo712/fs-keeper.git
cd fs-keeper
npm link
```

> Requires **Node.js 18 or higher**.

---

## Quick Start

```bash
# Organize your Downloads folder
fs-keeper ./Downloads

# Preview what would happen (no changes)
fs-keeper ./Downloads --simulation

# Undo the last organization
fs-keeper ./Downloads --restore
```

---

## Usage

```bash
fs-keeper <directory> [options]
```

### Options

| Flag                        | Description                                      |
|----------------------------|--------------------------------------------------|
| `--simulation`             | Preview the result without moving any files      |
| `--restore`                | Revert the last organization operation           |
| `--extensions=[ext1,ext2]` | Organize only the specified extensions           |

You can combine flags:

```bash
fs-keeper ./Photos --simulation --extensions=[jpg,png,gif]
```

---

## Examples

```bash
# Organize everything in Downloads
fs-keeper ./Downloads

# Preview only
fs-keeper ./Downloads --simulation

# Restore previous state
fs-keeper ./Downloads --restore

# Organize only code files
fs-keeper ./Projects --extensions=[js,ts,py,go]

# Preview organizing only images
fs-keeper ./Photos --simulation --extensions=[jpg,png,webp,gif]
```

---

## Default Categories & Extensions

| Category     | Extensions                                                                 |
|--------------|----------------------------------------------------------------------------|
| Images       | jpg, jpeg, png, gif, bmp, svg, webp, ico                                   |
| Documents    | pdf, doc, docx, xls, xlsx, ppt, pptx, txt, rtf, odt, ods, odp              |
| Code         | js, ts, jsx, tsx, py, java, c, cpp, cs, rb, go, rs, php, html, css, scss, json, xml, yaml, yml, toml |
| Videos       | mp4, avi, mov, wmv, flv, mkv, webm, m4v                                    |
| Audio        | mp3, wav, flac, aac, ogg, wma, m4a                                         |
| Compressed   | zip, rar, 7z, tar, gz, bz2, xz, iso                                        |
| Executables  | exe, msi, apk, dmg, deb, rpm, sh, bat, cmd, ini                             |
| Data         | csv, tsv, sql, db, sqlite, mdb, parquet                                    |
| Fonts        | ttf, otf, woff, woff2, eot                                                 |
| Design       | ai, eps, psd, xd, sketch, fig                                              |

If you don’t pass `--extensions`, all of the above are used.

---

## Modes Explained

### Default Mode
Moves matching files into category folders **inside** the target directory.

### Simulation Mode (`--simulation`)
Shows exactly what would be moved **without touching any file**.  
Perfect for checking the result before applying.

### Restore Mode (`--restore`)
Reverts the last organization, moving files back to their original locations.  
You can also combine it with `--simulation` to preview a restore.

---

## Custom Extensions Format

The `--extensions` flag must use this format:

```bash
--extensions=[js,ts,py]
--extensions=[js, ts, py]     # spaces are allowed
```

Invalid formats are ignored and the default extensions are used instead.

---

## Safety Notes

- Files are **never overwritten**. If a file with the same name already exists in the destination, a warning is shown and the file is skipped.
- All operations stay inside the target directory.
- A snapshot of the previous state is kept so `--restore` can bring everything back.
- No external dependencies — only Node.js built-in modules.

---

## Requirements

- Node.js ≥ 18

---

## License

MIT © 2026 Gabriel Ângelo

---
