# 🧹 Trailing Spaces Pro — Highlight & Clean

**The prettiest way to keep your code clean**

[![Version](https://img.shields.io/visual-studio-marketplace/v/my-publisher-name.trailing-spaces-pro?style=flat-square&color=111&labelColor=FF007F&label=version)](https://marketplace.visualstudio.com/items?itemName=my-publisher-name.trailing-spaces-pro)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/my-publisher-name.trailing-spaces-pro?style=flat-square&color=111&labelColor=FF007F&label=installs)](https://marketplace.visualstudio.com/items?itemName=my-publisher-name.trailing-spaces-pro)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/my-publisher-name.trailing-spaces-pro?style=flat-square&color=111&labelColor=FF007F&label=rating)](https://marketplace.visualstudio.com/items?itemName=my-publisher-name.trailing-spaces-pro)
[![License: MIT](https://img.shields.io/badge/license-MIT-FF007F?style=flat-square&color=111&labelColor=FF007F)](LICENSE)

> Trailing spaces are invisible — until now. Trailing Spaces Pro lights them up with gorgeous neon highlights, counts them in real time, lets you jump between them, and vaporizes them all with a single keystroke.

---

## Before / After

| Before | After |
|---|---|
| Invisible trailing spaces lurk on random lines, causing noisy diffs and lint warnings | Every trailing space glows in your chosen neon color. One keystroke cleans them all. |

> *(place `assets/before-after.png` here — a side-by-side screenshot showing highlighted code)*

---

## Features

| | Feature | Description |
|---|---|---|
| 🎨 | **8 neon color presets** | Choose from hot pink, red, orange, yellow, green, blue, purple, or subtle gray — or set your own custom RGBA |
| 🧹 | **One-click cleanup** | Delete all, selection only, or current line — whichever you need |
| ⚡ | **Auto-trim on save** | Never commit trailing spaces again — enable once, forget forever |
| 📊 | **Live status bar counter** | See exactly how many lines are affected at a glance |
| ⏭️ | **Jump navigation** | Hop to the next or previous trailing space without scrolling |
| 👁️ | **Toggle highlighting** | Turn it off temporarily without changing any settings |
| 🚫 | **Language exclusions** | Markdown files are excluded by default (trailing spaces = line breaks) |
| 🏎️ | **Performance optimized** | 300 ms debounce + configurable max-file-size limit |

---

## Color Presets Gallery

Switch presets instantly via `"trailingSpaces.colorPreset"` — the entire editor updates live.

| Preset | Emoji | Background | Border |
|---|---|---|---|
| `neon-pink` | 🩷 | `rgba(255, 0, 127, 0.3)` | `rgba(255, 0, 127, 0.8)` |
| `neon-red` | ❤️ | `rgba(255, 50, 50, 0.3)` | `rgba(255, 50, 50, 0.8)` |
| `neon-orange` | 🧡 | `rgba(255, 165, 0, 0.3)` | `rgba(255, 165, 0, 0.8)` |
| `neon-yellow` | 💛 | `rgba(255, 255, 0, 0.2)` | `rgba(255, 255, 0, 0.6)` |
| `neon-green` | 💚 | `rgba(0, 255, 100, 0.2)` | `rgba(0, 255, 100, 0.6)` |
| `neon-blue` | 💙 | `rgba(0, 150, 255, 0.3)` | `rgba(0, 150, 255, 0.8)` |
| `neon-purple` | 💜 | `rgba(180, 0, 255, 0.3)` | `rgba(180, 0, 255, 0.8)` |
| `subtle-gray` | 🩶 | `rgba(128, 128, 128, 0.2)` | `rgba(128, 128, 128, 0.5)` |
| `custom` | 🎨 | *(your own value)* | *(your own value)* |

---

## Commands

| Command | Description | Shortcut |
|---|---|---|
| 🧹 Delete All Trailing Spaces | Remove from every line in the file | `Ctrl+Shift+Alt+D` |
| 🧹 Delete Trailing Spaces in Selection | Remove from selected lines only | `Ctrl+Shift+Alt+S` |
| 🧹 Delete Trailing Spaces on Current Line | Remove from cursor line only | — |
| 👁️ Toggle Trailing Spaces Highlighting | On/off without changing settings | `Ctrl+Shift+Alt+H` |
| ⚡ Toggle Auto-Trim on Save | Enable/disable auto-trim globally | — |
| 🔍 Highlight All Trailing Spaces Now | Force refresh all decorations | — |
| ⏭️ Jump to Next Trailing Space | Move cursor to next affected line | `Ctrl+Shift+Alt+N` |
| ⏮️ Jump to Previous Trailing Space | Move cursor to previous affected line | `Ctrl+Shift+Alt+P` |

All commands are accessible from the **Command Palette** (`Ctrl+Shift+P`) and the **right-click context menu** (`🧹 Trailing Spaces` submenu).

---

## Screenshots

> **Screenshot 1:** Neon-pink trailing spaces highlighted in a TypeScript file  
> *(place `assets/screenshot-highlight.png` here)*

> **Screenshot 2:** Context menu submenu with all commands grouped  
> *(place `assets/screenshot-context-menu.png` here)*

> **Screenshot 3:** Status bar showing "⚠ 7 trailing spaces" with warning background  
> *(place `assets/screenshot-status-bar.png` here)*

> **Screenshot 4:** Settings UI showing the colorPreset dropdown  
> *(place `assets/screenshot-settings.png` here)*

---

## Demo

> *(place `assets/demo.gif` here — record with VS Code's screen recorder)*

---

## Installation

**From the VS Code Marketplace:**

1. Open VS Code
2. Press `Ctrl+P` and run: `ext install my-publisher-name.trailing-spaces-pro`

**From the CLI:**

```bash
code --install-extension my-publisher-name.trailing-spaces-pro
```

Once installed, open any file — trailing spaces are highlighted immediately. No configuration needed.

---

## Development Testing

Run everything from terminal (no F5 key required):

```bash
npm install
npm run test
```

This runs compile + VS Code extension integration tests in one command.

If your F5 key does not work on your PC, use one of these:

1. Open **Run and Debug** sidebar and click **Run Extension**.
2. Use Command Palette: **Debug: Select and Start Debugging** → **Run Extension**.
3. Run integration tests from terminal with `npm run test`.

---

## Usage

### Just open a file

Trailing Spaces Pro activates automatically on startup. Open any code file and any trailing spaces will glow in neon pink (the default).

### Cleaning trailing spaces

**Method 1 — Keyboard shortcut:**
```
Ctrl+Shift+Alt+D   (Windows / Linux)
Cmd+Shift+Alt+D    (macOS)
```

**Method 2 — Status bar click:**
Click the `⚠ N trailing spaces` item in the bottom-right status bar.

**Method 3 — Auto-trim on save:**
```json
"trailingSpaces.trimOnSave": true
```
Every time you save, trailing spaces are automatically removed. Never think about it again.

### Navigating between trailing spaces

Jump forward and back through every affected line:

```
Ctrl+Shift+Alt+N   →  Jump to Next
Ctrl+Shift+Alt+P   →  Jump to Previous
```

Both commands wrap around when they reach the end/beginning of the file.

### Customizing the highlight color

**Choose a preset:**
```json
"trailingSpaces.colorPreset": "neon-blue"
```

**Use a fully custom color:**
```json
"trailingSpaces.colorPreset": "custom",
"trailingSpaces.highlightColor": "rgba(0, 255, 200, 0.25)",
"trailingSpaces.borderColor": "rgba(0, 255, 200, 0.9)"
```

### Excluding Markdown

Markdown uses two trailing spaces to insert a `<br>` line break, so Markdown files are excluded by default. To re-enable highlighting in Markdown:

```json
"trailingSpaces.excludeLanguages": ["plaintext"]
```

---

## Settings Reference

Here is a complete `settings.json` example with every option:

```json
{
  // ── Appearance ──────────────────────────────────────────────────────────
  // Pick a preset: neon-pink | neon-red | neon-orange | neon-yellow
  //                neon-green | neon-blue | neon-purple | subtle-gray | custom
  "trailingSpaces.colorPreset": "neon-pink",

  // Only used when colorPreset is "custom"
  "trailingSpaces.highlightColor": "rgba(255, 0, 127, 0.3)",
  "trailingSpaces.borderColor": "rgba(255, 0, 127, 0.8)",

  // Border shape options
  "trailingSpaces.borderWidth": "1px",
  "trailingSpaces.borderStyle": "solid",      // solid | dashed | dotted | double | none
  "trailingSpaces.borderRadius": "2px",

  // ── Behavior ────────────────────────────────────────────────────────────
  "trailingSpaces.enabled": true,
  "trailingSpaces.trimOnSave": false,

  // Set to true to highlight the cursor line too (may flicker while typing)
  "trailingSpaces.highlightCurrentLine": false,

  // Set to true to highlight lines that contain ONLY spaces/tabs
  "trailingSpaces.includeEmptyLines": false,

  // Show/hide the status bar counter
  "trailingSpaces.showStatusBarCount": true,

  // ── Exclusions ──────────────────────────────────────────────────────────
  // Language IDs to skip (Markdown excluded by default — it uses trailing spaces for <br>)
  "trailingSpaces.excludeLanguages": ["markdown", "plaintext"],

  // URI schemes to skip (output panel, debug console)
  "trailingSpaces.excludeSchemes": ["output", "debug"],

  // Skip highlighting on files larger than this many lines (performance)
  "trailingSpaces.maxFileLines": 10000
}
```

### Setting Details

| Setting | Default | Description |
|---|---|---|
| `colorPreset` | `neon-pink` | Built-in color theme. Set to `custom` to use your own RGBA values. |
| `highlightColor` | `rgba(255,0,127,0.3)` | Background RGBA — only active when preset is `custom`. |
| `borderColor` | `rgba(255,0,127,0.8)` | Border RGBA — only active when preset is `custom`. |
| `borderWidth` | `1px` | CSS border-width string, e.g. `"2px"`. |
| `borderStyle` | `solid` | CSS border-style: `solid`, `dashed`, `dotted`, `double`, `none`. |
| `borderRadius` | `2px` | CSS border-radius for rounded highlight corners. |
| `enabled` | `true` | Master on/off switch for highlighting. |
| `trimOnSave` | `false` | Auto-remove trailing spaces every time a file is saved. |
| `highlightCurrentLine` | `false` | Highlight the line where the cursor is. Disable to prevent flickering while typing. |
| `includeEmptyLines` | `false` | Highlight lines that contain only whitespace. |
| `showStatusBarCount` | `true` | Show the trailing-space line count in the status bar. |
| `excludeLanguages` | `["markdown","plaintext"]` | Language IDs that are never highlighted. |
| `excludeSchemes` | `["output","debug"]` | URI schemes skipped — e.g., the Output panel. |
| `maxFileLines` | `10000` | Files with more lines than this are skipped entirely. |

---

## Performance

Trailing Spaces Pro is engineered to stay out of your way:

- **Debouncing (300 ms):** Text-change events are coalesced. The highlighter only runs 300 ms after you stop typing — no per-keystroke overhead.
- **Max file size:** Set `maxFileLines` to skip very large generated or minified files.
- **Efficient regex:** A single `/[ \t]+$/` pass per line, no DOM operations.
- **Memory-safe:** All VS Code `Disposable` objects are tracked in `context.subscriptions` and cleaned up on deactivation.
- **No save loop:** The auto-trim-on-save uses a `WorkspaceEdit` with an `isTrimming` guard flag — saving the file after trimming never triggers a second trim.

---

## FAQ

**Why are Markdown files excluded by default?**
Markdown uses two trailing spaces as a hard line-break (`<br>`). Highlighting and trimming them would corrupt valid Markdown formatting. Remove `"markdown"` from `excludeLanguages` if you want to highlight them anyway.

**Can I use a completely custom color?**
Yes. Set `"trailingSpaces.colorPreset": "custom"` and then set any RGBA value in `highlightColor` and `borderColor`. Changes apply live without reloading VS Code.

**Does it slow down VS Code on large files?**
No. Text-change events are debounced at 300 ms and the `maxFileLines` setting (default 10,000) skips highlighting for very large files entirely. You can also lower `maxFileLines` for stricter performance control.

**Can it automatically trim on save?**
Yes — set `"trailingSpaces.trimOnSave": true`. Use the `⚡ Toggle Auto-Trim on Save` command from the palette to flip the setting without opening Settings UI.

**Why doesn't it highlight the line I'm currently typing on?**
By default `highlightCurrentLine` is `false`. This prevents the highlight from flickering as you type and delete characters. Set it to `true` if you prefer highlighting the cursor line as well.

**Does it work with trailing tabs, not just spaces?**
Yes. The extension uses the regex `[ \t]+$` which matches both trailing spaces and trailing tab characters.

---

## Comparison

| Feature | Trailing Spaces Pro | Typical Ext A | Typical Ext B |
|---|---|---|---|
| 8 neon color presets | ✅ | ❌ | ⚠️ 1–2 colors |
| Custom RGBA colors | ✅ | ❌ | ⚠️ Limited |
| Auto-trim on save | ✅ | ⚠️ Some | ✅ |
| Real-time status bar | ✅ | ❌ | ❌ |
| Jump to next/previous | ✅ | ❌ | ❌ |
| Language exclusions | ✅ | ⚠️ Some | ✅ |
| Scheme exclusions | ✅ | ❌ | ❌ |
| Performance debouncing | ✅ | ❌ | ⚠️ Varies |
| Current-line toggle | ✅ | ❌ | ❌ |
| Overview ruler markers | ✅ | ❌ | ❌ |
| Zero dependencies | ✅ | ⚠️ Varies | ⚠️ Varies |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m 'Add my feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

Please ensure TypeScript compiles cleanly (`npm run compile`) before submitting.

---

## Issues

Found a bug or have a feature request? [Open an issue](https://github.com/username/trailing-spaces-pro/issues). Please include your VS Code version, OS, and a minimal reproduction file.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full version history.

---

## License

MIT — see [LICENSE](LICENSE).

---

## Support

If Trailing Spaces Pro makes your code cleaner and your diffs quieter:
- ⭐ Star the [GitHub repo](https://github.com/username/trailing-spaces-pro)
- 📝 Leave a review on the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=my-publisher-name.trailing-spaces-pro)
- 🐛 [Report issues](https://github.com/username/trailing-spaces-pro/issues) or contribute improvements

---

**Author:** Your Name · [GitHub](https://github.com/username) · [Marketplace](https://marketplace.visualstudio.com/publishers/my-publisher-name)
