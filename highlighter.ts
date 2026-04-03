import * as vscode from 'vscode';
import { getConfig, ExtensionConfig, TRAILING_WS_REGEX } from './config';

/**
 * The active decoration type used to highlight trailing spaces.
 * Disposed and recreated whenever the color settings change.
 */
let decorationType: vscode.TextEditorDecorationType | undefined;

/**
 * Runtime toggle for highlighting — flipped by the toggleHighlighting() command.
 * Separate from the `enabled` setting so it doesn't persist across sessions.
 */
let isHighlightingEnabled = true;

// ---------------------------------------------------------------------------
// Decoration type management
// ---------------------------------------------------------------------------

/**
 * Creates (or recreates) the TextEditorDecorationType from the current config.
 * Any previously existing decoration type is disposed first to prevent leaks.
 */
export function createDecorationType(config: ExtensionConfig): void {
  // Always clean up the old type before creating a new one
  if (decorationType) {
    decorationType.dispose();
    decorationType = undefined;
  }

  decorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: config.highlightColor,
    border: `${config.borderWidth} ${config.borderStyle} ${config.borderColor}`,
    borderRadius: config.borderRadius,
    textDecoration: 'none',
    // Render a marker in the overview ruler (minimap scrollbar)
    overviewRulerColor: config.borderColor,
    overviewRulerLane: vscode.OverviewRulerLane.Right
  });
}

/**
 * Returns the current decoration type (may be undefined before first init).
 */
export function getDecorationType(): vscode.TextEditorDecorationType | undefined {
  return decorationType;
}

/**
 * Disposes the decoration type and clears the reference.
 * Called during extension deactivation.
 */
export function disposeDecorationType(): void {
  if (decorationType) {
    decorationType.dispose();
    decorationType = undefined;
  }
}

// ---------------------------------------------------------------------------
// Highlighting
// ---------------------------------------------------------------------------

/**
 * Applies trailing-space decorations to the given editor.
 *
 * Respects all exclusion rules:
 *   - global enabled toggle
 *   - runtime isHighlightingEnabled toggle
 *   - excludeLanguages list
 *   - excludeSchemes list
 *   - maxFileLines performance limit
 *   - highlightCurrentLine setting
 *   - includeEmptyLines setting
 *
 * @returns The number of lines that received a decoration (0 if none / skipped).
 */
export function highlightTrailingSpaces(editor: vscode.TextEditor): number {
  if (!decorationType) { return 0; }

  // Runtime toggle overrides everything
  if (!isHighlightingEnabled) {
    editor.setDecorations(decorationType, []);
    return 0;
  }

  const config = getConfig();

  if (!config.enabled) {
    editor.setDecorations(decorationType, []);
    return 0;
  }

  const { document } = editor;

  // ── Exclusion checks ──────────────────────────────────────────────────────

  if (config.excludeLanguages.includes(document.languageId)) {
    editor.setDecorations(decorationType, []);
    return 0;
  }

  if (config.excludeSchemes.includes(document.uri.scheme)) {
    editor.setDecorations(decorationType, []);
    return 0;
  }

  if (document.lineCount > config.maxFileLines) {
    editor.setDecorations(decorationType, []);
    return 0;
  }

  // ── Build decoration ranges ───────────────────────────────────────────────

  // The line number of the primary cursor (used to skip current line)
  const cursorLine = editor.selection.active.line;

  const ranges: vscode.Range[] = [];

  for (let i = 0; i < document.lineCount; i++) {
    const line = document.lineAt(i);
    const text = line.text;

    // Skip cursor line unless the setting explicitly enables it
    if (!config.highlightCurrentLine && i === cursorLine) {
      continue;
    }

    // Skip empty (whitespace-only) lines unless setting says to include them
    if (!config.includeEmptyLines && text.trim().length === 0) {
      continue;
    }

    const match = TRAILING_WS_REGEX.exec(text);
    if (match) {
      const startCol = text.length - match[0].length;
      ranges.push(new vscode.Range(i, startCol, i, text.length));
    }
  }

  editor.setDecorations(decorationType, ranges);
  return ranges.length;
}

/**
 * Clears all trailing-space decorations from the given editor.
 */
export function clearDecorations(editor: vscode.TextEditor): void {
  if (decorationType) {
    editor.setDecorations(decorationType, []);
  }
}

// ---------------------------------------------------------------------------
// Toggle
// ---------------------------------------------------------------------------

/**
 * Flips the runtime highlighting toggle.
 * If disabled, clears decorations from all visible editors.
 * If enabled, immediately re-highlights all visible editors.
 */
export function toggleHighlighting(): void {
  isHighlightingEnabled = !isHighlightingEnabled;

  if (!isHighlightingEnabled) {
    // Clear decorations from every visible editor
    vscode.window.visibleTextEditors.forEach(editor => clearDecorations(editor));
    vscode.window.showInformationMessage('Trailing Spaces Pro: Highlighting OFF');
  } else {
    // Re-highlight all visible editors
    vscode.window.visibleTextEditors.forEach(editor => highlightTrailingSpaces(editor));
    vscode.window.showInformationMessage('Trailing Spaces Pro: Highlighting ON');
  }
}

/**
 * Returns true if runtime highlighting is currently enabled.
 */
export function isHighlightEnabled(): boolean {
  return isHighlightingEnabled;
}

// ---------------------------------------------------------------------------
// Utility: find lines with trailing spaces
// ---------------------------------------------------------------------------

/**
 * Returns an array of line numbers (0-indexed) that contain trailing whitespace.
 * Optionally scoped to a range of lines.
 *
 * @param document  - The document to search
 * @param startLine - First line index (inclusive). Defaults to 0.
 * @param endLine   - Last line index (exclusive). Defaults to document.lineCount.
 */
export function getTrailingSpaceLines(
  document: vscode.TextDocument,
  startLine = 0,
  endLine   = document.lineCount
): number[] {
  // Respect the same enabled/exclusion rules as highlighting
  if (!isHighlightingEnabled) { return []; }

  const config = getConfig();
  if (!config.enabled) { return []; }
  if (config.excludeLanguages.includes(document.languageId)) { return []; }
  if (config.excludeSchemes.includes(document.uri.scheme)) { return []; }

  const lines: number[] = [];

  const clampedStart = Math.max(0, startLine);
  const clampedEnd   = Math.min(document.lineCount, endLine);

  for (let i = clampedStart; i < clampedEnd; i++) {
    const text = document.lineAt(i).text;

    if (!config.includeEmptyLines && text.trim().length === 0) {
      continue;
    }

    if (TRAILING_WS_REGEX.test(text)) {
      lines.push(i);
    }
  }

  return lines;
}
