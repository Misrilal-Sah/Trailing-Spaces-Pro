# Changelog

All notable changes to **Trailing Spaces Pro** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2025-04-15

### Added

#### Core Highlighting
- Real-time trailing space and tab highlighting using VS Code decoration API
- Overview ruler markers — trailing spaces are visible in the minimap scrollbar
- Current-line exclusion toggle to prevent flickering while the user types
- Whitespace-only line inclusion toggle (`includeEmptyLines` setting)

#### Color Presets (8 built-in + custom)
- `neon-pink`   — Hot pink `rgba(255, 0, 127)` — the signature default preset
- `neon-red`    — Bright red `rgba(255, 50, 50)`
- `neon-orange` — Warm orange `rgba(255, 165, 0)`
- `neon-yellow` — Bright yellow `rgba(255, 255, 0)`
- `neon-green`  — Lime green `rgba(0, 255, 100)`
- `neon-blue`   — Electric blue `rgba(0, 150, 255)`
- `neon-purple` — Vivid purple `rgba(180, 0, 255)`
- `subtle-gray` — Understated gray `rgba(128, 128, 128)` for minimal themes
- `custom` mode — use your own `highlightColor` and `borderColor` RGBA values
- Configurable border: `borderWidth`, `borderStyle` (solid/dashed/dotted/double), `borderRadius`

#### Delete Commands (3)
- `🧹 Delete All Trailing Spaces` — cleans every line in the document
- `🧹 Delete Trailing Spaces in Selection` — cleans only selected lines (multi-cursor aware)
- `🧹 Delete Trailing Spaces on Current Line` — cleans only the cursor line

#### Auto-Trim on Save
- `trimOnSave` setting with infinite-loop prevention (`isTrimming` guard flag)
- Respects `excludeLanguages` list — Markdown never auto-trimmed
- Toggle command: `⚡ Toggle Auto-Trim on Save`

#### Status Bar
- Real-time line count: "$(alert) N trailing spaces" with warning background
- "$(check) No trailing spaces" when the document is clean
- Clicking the status bar runs Delete All for instant cleanup
- Controlled by `showStatusBarCount` setting

#### Navigation
- `⏭️ Jump to Next Trailing Space` — moves cursor forward with wraparound
- `⏮️ Jump to Previous Trailing Space` — moves cursor backward with wraparound

#### Exclusions & Performance
- `excludeLanguages` list (default: `["markdown", "plaintext"]`) — Markdown uses trailing spaces for `<br>`
- `excludeSchemes` list (default: `["output", "debug"]`) — skips output/debug panels
- `maxFileLines` setting (default: 10000) — skips highlighting on very large files
- 300 ms debounce on text-change events to prevent lag while typing

#### Settings (14 total)
- `trailingSpaces.enabled`, `colorPreset`, `highlightColor`, `borderColor`
- `borderWidth`, `borderStyle`, `borderRadius`
- `trimOnSave`, `highlightCurrentLine`, `includeEmptyLines`, `showStatusBarCount`
- `excludeLanguages`, `excludeSchemes`, `maxFileLines`

#### Keyboard Shortcuts (5)
- `Ctrl+Shift+Alt+D` / `Cmd+Shift+Alt+D` — Delete All
- `Ctrl+Shift+Alt+S` / `Cmd+Shift+Alt+S` — Delete in Selection
- `Ctrl+Shift+Alt+H` / `Cmd+Shift+Alt+H` — Toggle Highlighting
- `Ctrl+Shift+Alt+N` / `Cmd+Shift+Alt+N` — Jump to Next
- `Ctrl+Shift+Alt+P` / `Cmd+Shift+Alt+P` — Jump to Previous

#### UX & Architecture
- Context menu submenu `🧹 Trailing Spaces` in `editor/context` (group `1_modification@1`)
- Clean modular architecture: `config.ts`, `highlighter.ts`, `cleaner.ts`, `statusBar.ts`
- Full memory safety: all disposables pushed to `context.subscriptions`
- Zero external npm dependencies

---

[1.0.0]: https://github.com/username/trailing-spaces-pro/releases/tag/v1.0.0
