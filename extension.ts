import * as vscode from 'vscode';
import { getConfig } from './config';
import {
  createDecorationType,
  disposeDecorationType,
  highlightTrailingSpaces,
  clearDecorations,
  toggleHighlighting,
  getTrailingSpaceLines
} from './highlighter';
import {
  deleteAllTrailingSpaces,
  deleteTrailingSpacesInSelection,
  deleteTrailingSpacesOnCurrentLine,
  getTrimOnSaveEdits
} from './cleaner';
import {
  createStatusBar,
  updateStatusBar,
  hideStatusBar,
  disposeStatusBar
} from './statusBar';

// ---------------------------------------------------------------------------
// Module-level state
// ---------------------------------------------------------------------------

/** Debounce timer for text-change events */
let debounceTimer: NodeJS.Timeout | undefined;

/**
 * Per-document guard to prevent the on-save trimmer from triggering itself.
 * Uses a Set of URI strings so "Save All" on multiple docs works correctly.
 */
const trimmingDocs = new Set<string>();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Highlights trailing spaces in `editor` and updates the status bar.
 * Both steps are always performed together.
 */
function highlightAndUpdateBar(editor: vscode.TextEditor): void {
  const config = getConfig();
  const count  = highlightTrailingSpaces(editor);

  if (config.showStatusBarCount) {
    updateStatusBar(count);
  } else {
    hideStatusBar();
  }
}

/**
 * Debounced version of highlightAndUpdateBar.
 * Prevents excessive re-highlighting while the user is typing fast.
 *
 * @param editor - The editor to update
 * @param delay  - Milliseconds to wait before executing (default: 300)
 */
function debounceHighlight(editor: vscode.TextEditor, delay = 300): void {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(() => {
    highlightAndUpdateBar(editor);
    debounceTimer = undefined;
  }, delay);
}

/**
 * Moves the cursor to a given line number, centering the viewport if possible.
 */
function moveCursorToLine(editor: vscode.TextEditor, lineIndex: number): void {
  const position = new vscode.Position(lineIndex, 0);
  editor.selection = new vscode.Selection(position, position);
  editor.revealRange(
    new vscode.Range(position, position),
    vscode.TextEditorRevealType.InCenterIfOutsideViewport
  );
}

// ---------------------------------------------------------------------------
// Activation
// ---------------------------------------------------------------------------

export function activate(context: vscode.ExtensionContext): void {
  console.log('[Trailing Spaces Pro] Extension activated.');

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  const config = getConfig();
  createDecorationType(config);
  createStatusBar();
  updateStatusBar(0); // Show immediately even when no editor is open yet

  // Highlight all already-open editors on startup
  vscode.window.visibleTextEditors.forEach(editor => highlightAndUpdateBar(editor));

  // ── Commands ──────────────────────────────────────────────────────────────

  // 1. Delete ALL trailing spaces in the current document
  context.subscriptions.push(
    vscode.commands.registerCommand('trailing-spaces-pro.deleteAll', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('Trailing Spaces Pro: No active editor.');
        return;
      }
      await deleteAllTrailingSpaces(editor);
      highlightAndUpdateBar(editor);
    })
  );

  // 2. Delete trailing spaces only within the current selection(s)
  context.subscriptions.push(
    vscode.commands.registerCommand('trailing-spaces-pro.deleteInSelection', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('Trailing Spaces Pro: No active editor.');
        return;
      }
      if (editor.selection.isEmpty && editor.selections.length === 1) {
        vscode.window.showWarningMessage(
          'Trailing Spaces Pro: No text selected. Use "Delete All" to clean the whole file.'
        );
        return;
      }
      await deleteTrailingSpacesInSelection(editor);
      highlightAndUpdateBar(editor);
    })
  );

  // 3. Delete trailing spaces only on the current cursor line
  context.subscriptions.push(
    vscode.commands.registerCommand('trailing-spaces-pro.deleteOnCurrentLine', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('Trailing Spaces Pro: No active editor.');
        return;
      }
      await deleteTrailingSpacesOnCurrentLine(editor);
      highlightAndUpdateBar(editor);
    })
  );

  // 4. Toggle highlighting on/off (runtime, does not change settings)
  context.subscriptions.push(
    vscode.commands.registerCommand('trailing-spaces-pro.toggleHighlight', () => {
      toggleHighlighting();
      // Status bar update happens implicitly via the re-highlight in toggleHighlighting
      const editor = vscode.window.activeTextEditor;
      if (editor) { highlightAndUpdateBar(editor); }
    })
  );

  // 5. Toggle the trimOnSave setting globally
  context.subscriptions.push(
    vscode.commands.registerCommand('trailing-spaces-pro.toggleAutoTrim', async () => {
      const currentValue = getConfig().trimOnSave;
      await vscode.workspace
        .getConfiguration('trailingSpaces')
        .update('trimOnSave', !currentValue, vscode.ConfigurationTarget.Global);

      const newState = !currentValue ? 'ON' : 'OFF';
      vscode.window.showInformationMessage(
        `Trailing Spaces Pro: Auto-trim on save is now ${newState}.`
      );
    })
  );

  // 6. Force a full re-highlight of the active editor
  context.subscriptions.push(
    vscode.commands.registerCommand('trailing-spaces-pro.highlightAll', () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('Trailing Spaces Pro: No active editor.');
        return;
      }
      highlightAndUpdateBar(editor);
    })
  );

  // 7. Jump to the NEXT line with trailing spaces
  context.subscriptions.push(
    vscode.commands.registerCommand('trailing-spaces-pro.jumpToNext', () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) { return; }

      const lines      = getTrailingSpaceLines(editor.document);
      if (lines.length === 0) {
        vscode.window.showInformationMessage('Trailing Spaces Pro: No trailing spaces found.');
        return;
      }

      const cursorLine = editor.selection.active.line;
      // Find first line strictly after the cursor; wrap around if needed
      const next = lines.find(l => l > cursorLine) ?? lines[0];
      moveCursorToLine(editor, next);
    })
  );

  // 8. Jump to the PREVIOUS line with trailing spaces
  context.subscriptions.push(
    vscode.commands.registerCommand('trailing-spaces-pro.jumpToPrevious', () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) { return; }

      const lines = getTrailingSpaceLines(editor.document);
      if (lines.length === 0) {
        vscode.window.showInformationMessage('Trailing Spaces Pro: No trailing spaces found.');
        return;
      }

      const cursorLine = editor.selection.active.line;
      // Find last line strictly before the cursor; wrap to end if none
      const prev =
        [...lines].reverse().find(l => l < cursorLine) ??
        lines[lines.length - 1];
      moveCursorToLine(editor, prev);
    })
  );

  // ── Event Listeners ───────────────────────────────────────────────────────

  // Re-highlight whenever the user switches to a different editor tab
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(editor => {
      if (editor) {
        highlightAndUpdateBar(editor);
      } else {
        // No active editor — clear the status bar
        updateStatusBar(0);
      }
    })
  );

  // Re-highlight (debounced) whenever the document content changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(event => {
      const activeEditor = vscode.window.activeTextEditor;
      if (activeEditor && event.document === activeEditor.document) {
        debounceHighlight(activeEditor, 300);
      }
    })
  );

  // Auto-trim before save so saved files are clean immediately
  context.subscriptions.push(
    vscode.workspace.onWillSaveTextDocument(event => {
      const docKey = event.document.uri.toString();
      if (trimmingDocs.has(docKey)) { return; }

      const cfg = getConfig();
      if (!cfg.trimOnSave) { return; }
      if (cfg.excludeLanguages.includes(event.document.languageId)) { return; }

      trimmingDocs.add(docKey);
      const editsPromise = Promise.resolve(getTrimOnSaveEdits(event.document));

      event.waitUntil(
        editsPromise.finally(() => {
          trimmingDocs.delete(docKey);
        })
      );
    })
  );

  // Re-highlight after save to ensure status bar and ranges are up to date
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument(document => {
      const editor = vscode.window.visibleTextEditors.find(
        e => e.document === document
      );
      if (editor) {
        highlightAndUpdateBar(editor);
      }
    })
  );

  // React to settings changes — recreate decoration type and re-highlight
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(event => {
      if (!event.affectsConfiguration('trailingSpaces')) { return; }

      const newConfig = getConfig();
      createDecorationType(newConfig); // Dispose old + create new

      vscode.window.visibleTextEditors.forEach(editor => {
        highlightAndUpdateBar(editor);
      });
    })
  );

  // When cursor moves to a new line, re-highlight so the current-line
  // exclusion logic stays accurate (only meaningful when highlightCurrentLine = false)
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection(event => {
      const cfg = getConfig();
      if (!cfg.highlightCurrentLine) {
        // Only re-highlight — skip debounce here for instant feel
        highlightTrailingSpaces(event.textEditor);
      }
    })
  );

  // When a new editor becomes visible (e.g. split pane), highlight it
  context.subscriptions.push(
    vscode.window.onDidChangeVisibleTextEditors(editors => {
      editors.forEach(editor => highlightAndUpdateBar(editor));
    })
  );
}

// ---------------------------------------------------------------------------
// Deactivation
// ---------------------------------------------------------------------------

export function deactivate(): void {
  // Clear any pending debounce timer
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = undefined;
  }

  // Clean up all visible editor decorations before disposing the type
  vscode.window.visibleTextEditors.forEach(editor => {
    clearDecorations(editor);
  });

  disposeDecorationType();
  disposeStatusBar();

  console.log('[Trailing Spaces Pro] Extension deactivated.');
}
