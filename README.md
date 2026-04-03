<div align="center">

<img src="https://capsule-render.vercel.app/api?type=soft&color=0:0d0d0d,100:1a001a&height=180&section=header&text=Trailing%20Spaces%20Pro&fontSize=56&fontColor=FF007F&fontAlign=50&fontAlignY=52&desc=The%20prettiest%20way%20to%20keep%20your%20code%20clean&descAlign=50&descAlignY=73&descSize=18&descFontColor=cc6699" width="100%"/>

<br/>

<img src="https://res.cloudinary.com/ddrlxvnsh/image/upload/v1775216182/trailing_space_mscpsy.png" width="96" alt="Trailing Spaces Pro Icon" style="margin-top:-30px"/>

<h1>🧹 Trailing Spaces Pro</h1>

<p><strong>Trailing spaces are invisible — until now.</strong><br/>
Light them up with gorgeous neon highlights, clean them in one keystroke,<br/>
and never let invisible whitespace sneak into your commits again.</p>

<br/>

[![Version](https://img.shields.io/visual-studio-marketplace/v/Misrilal-Sah.trailing-spaces-pro?style=for-the-badge&color=111111&labelColor=FF007F&label=version)](https://marketplace.visualstudio.com/items?itemName=Misrilal-Sah.trailing-spaces-pro)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/Misrilal-Sah.trailing-spaces-pro?style=for-the-badge&color=111111&labelColor=FF007F&label=installs)](https://marketplace.visualstudio.com/items?itemName=Misrilal-Sah.trailing-spaces-pro)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/Misrilal-Sah.trailing-spaces-pro?style=for-the-badge&color=111111&labelColor=FF007F&label=rating)](https://marketplace.visualstudio.com/items?itemName=Misrilal-Sah.trailing-spaces-pro)
[![License: MIT](https://img.shields.io/badge/license-MIT-111111?style=for-the-badge&labelColor=FF007F)](LICENSE)
[![GitHub](https://img.shields.io/badge/github-source-111111?style=for-the-badge&labelColor=FF007F&logo=github)](https://github.com/Misrilal-Sah/Trailing-Spaces-Pro)

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=FF007F&height=3&section=header" width="100%"/>


<br/>

---

## ✨ Features at a Glance

<table>
<tr>
<td width="50%">

**🎨 8 Neon Color Presets**  
Choose from hot pink, red, orange, yellow, green, blue, purple, or subtle gray — or define your own custom RGBA.

**🧹 Precise Cleanup Controls**  
Delete all, selection only, or current line — whichever you need, with one command.

**⚡ Auto-Trim on Save**  
Enable once, forget forever. Trailing spaces vanish every time you hit Save.

**📊 Live Status Bar Counter**  
See the exact number of affected lines at a glance. Click to clean instantly.

</td>
<td width="50%">

**⏭️ Jump Navigation**  
Hop to the next or previous trailing space without scrolling.

**👁️ Toggle Highlighting**  
Turn it off temporarily without touching any settings.

**🚫 Language & Scheme Exclusions**  
Markdown excluded by default (trailing spaces = line breaks). Fully configurable.

**🏎️ Performance Optimized**  
300 ms debounce + configurable max-file-lines guard — zero overhead.

</td>
</tr>
</table>

---

## 🎨 Color Presets Gallery

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

## 📦 Installation

**From the VS Code Marketplace:**

1. Open VS Code
2. Go to **Extensions** (`Ctrl+Shift+X`)
3. Search for **Trailing Spaces Pro**
4. Click **Install**

**Quick open:**

Press `Ctrl+P` and run:
```
ext install Misrilal-Sah.trailing-spaces-pro
```

**From the CLI:**

```bash
code --install-extension Misrilal-Sah.trailing-spaces-pro
```

Once installed, open any file — trailing spaces are highlighted immediately. No configuration needed.


---

## 🚀 Usage

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

## ⚙️ Settings Reference

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

## 🏎️ Performance

Trailing Spaces Pro is engineered to stay out of your way:

- **Debouncing (300 ms):** Text-change events are coalesced. The highlighter only runs 300 ms after you stop typing — no per-keystroke overhead.
- **Max file size:** Set `maxFileLines` to skip very large generated or minified files.
- **Efficient regex:** A single `/[ \t]+$/` pass per line, no DOM operations.
- **Memory-safe:** All VS Code `Disposable` objects are tracked in `context.subscriptions` and cleaned up on deactivation.
- **No save loop:** The auto-trim-on-save uses a `WorkspaceEdit` with an `isTrimming` guard flag — saving the file after trimming never triggers a second trim.

---


## 📊 Comparison

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m 'Add my feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

Please ensure TypeScript compiles cleanly (`npm run compile`) before submitting.

---

## 🐛 Issues

Found a bug or have a feature request? [Open an issue](https://github.com/Misrilal-Sah/Trailing-Spaces-Pro/issues). Please include your VS Code version, OS, and a minimal reproduction file.

---

## 📜 Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full version history.

---

## 📄 License

MIT — see [LICENSE](LICENSE).

---

<img src="https://capsule-render.vercel.app/api?type=rect&color=FF007F&height=3&section=footer" width="100%"/>

<div align="center">

### 🧹 Trailing Spaces Pro

**If this extension makes your code cleaner and your diffs quieter:**

[![⭐ Star on GitHub](https://img.shields.io/badge/⭐%20Star%20on-GitHub-111111?style=for-the-badge&labelColor=FF007F&logo=github)](https://github.com/Misrilal-Sah/Trailing-Spaces-Pro)
[![📝 Rate on Marketplace](https://img.shields.io/badge/📝%20Rate%20on-Marketplace-111111?style=for-the-badge&labelColor=FF007F&logo=visualstudiocode)](https://marketplace.visualstudio.com/items?itemName=Misrilal-Sah.trailing-spaces-pro)
[![🐛 Report Issue](https://img.shields.io/badge/🐛%20Report-Issue-111111?style=for-the-badge&labelColor=FF007F)](https://github.com/Misrilal-Sah/Trailing-Spaces-Pro/issues)

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with%20%E2%9D%A4%EF%B8%8F%20for%20VS%20Code-007ACC?style=for-the-badge&labelColor=1e1e1e" alt="Made with love for VS Code" />
</p>

[![GitHub](https://img.shields.io/badge/GitHub-Misrilal--Sah-111111?style=flat-square&logo=github&labelColor=333)](https://github.com/Misrilal-Sah)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-misrilal--sah-111111?style=flat-square&logo=linkedin&labelColor=0077B5)](https://www.linkedin.com/in/misrilal-sah/)
[![Website](https://img.shields.io/badge/Web-misril.dev-111111?style=flat-square&logo=firefox&labelColor=FF007F)](https://misril.dev/)

<br/>

<sub>© 2026 Misrilal Sah · MIT License</sub>

</div>

<img src="https://capsule-render.vercel.app/api?type=soft&color=0:1a001a,100:0d0d0d&height=80&section=footer" width="100%"/>
