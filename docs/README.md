# fs-keeper

A simple Node.js CLI to automatically organize any directory by file extension.

## Installation

### Global installation

```bash
npm install -g fs-keeper
```

### Local installation (development)

```bash
git clone https://github.com/Gabriel-Angelo712/fs-keeper.git
cd fs-keeper
npm link
```

## Usage

### Organize a directory

```bash
fs-keeper ./<directory_name>
```

### Simulation mode

Preview the result without making changes:

```bash
fs-keeper ./<directory_name> --simulation
```

### Restore mode

Revert the last organization operation:

```bash
fs-keeper ./<directory_name> --restore
```

### Custom extensions

Organize only files with the specified extensions:

```bash
fs-keeper ./<directory_name> --extensions=[<ext1>,<ext2>,<ext3>]
```

### Combined usage

Simulation with custom extensions:

```bash
fs-keeper ./<directory_name> --simulation --extensions=[<ext1>,<ext2>]
```

## Examples

```bash
# Organize the Downloads folder
fs-keeper ./Downloads

# Preview what would be organized
fs-keeper ./Downloads --simulation

# Restore the previous organization
fs-keeper ./Downloads --restore

# Organize only JavaScript and TypeScript files
fs-keeper ./Projects --extensions=[js,ts]

# Preview organizing only image files
fs-keeper ./Photos --simulation --extensions=[jpg,png,gif]
```

## Default Supported Extensions

| Category   | Extensions                                                                               |
| ---------- | ---------------------------------------------------------------------------------------- |
| Images     | jpg, jpeg, png, webp, gif, svg, ico                                                      |
| Code       | js, ts, jsx, tsx, py, java, c, cpp, cs, rb, go, rs, php, html, css, json, xml, yaml, yml |
| Videos     | mp4, mov, avi, webm, mkv, m4v                                                            |
| Audio      | mp3, wav, flac, aac, ogg, wma, m4a                                                       |
| Text       | txt, md, pdf, doc, docx, xls, xlsx, ppt, pptx, rtf, odt, ods, odp                        |
| Data       | csv, tsv, sql, db, sqlite, log, xml, json                                                |
| Compressed | zip, rar, 7z, tar, gz, bz2, xz                                                           |
| Executable | exe, msi, apk, dmg, deb, rpm, sh, bat, cmd                                               |

If the `--extensions` flag is not provided, `fs-keeper` uses all default extensions above.

## Modes

### Default Mode

Organizes files based on the default extensions or the ones you provide. Files are moved into category folders inside the target directory.

### Simulation Mode (`--simulation`)

Shows exactly what would be organized without making any changes. Useful for previewing before applying.

### Restore Mode (`--restore`)

Reverts the last organization operation, moving files back to their original locations.

`--simulation` and `--restore` can be used together to preview a restore operation.

## Custom Extensions Format

When using `--extensions`, the format must follow these rules:

- Use square brackets: `[ ]`
- Separate extensions with commas: `,`
- Spaces are optional and accepted

Valid formats:

```bash
--extensions=[js,ts,py]
--extensions=[js, ts, py]
--extensions=[js,ts,py,C]
```

Invalid formats:

```bash
--extensions=js,ts,py   # missing brackets
--extensions=[js ts py]  # missing commas
--extensions=[js, ts, ]  # trailing comma
--extensions=[]          # empty array
```

If the format is invalid, `fs-keeper` ignores the flag and uses the default extensions.

## Requirements

- Node.js 18 or higher

## Notes

- `fs-keeper` has no external dependencies.
- `npm install` is not required.
- Use `npm link` only for global command setup during development.
- All operations are performed inside the target directory.
- Existing files are not overwritten. If a file with the same name already exists in the destination folder, a warning is shown.

## License

MIT © 2026 Gabriel Ângelo
