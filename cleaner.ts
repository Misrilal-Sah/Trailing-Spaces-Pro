import * as vscode from 'vscode';
import { getConfig, TRAILING_WS_REGEX } from './config';


// ---------------------------------------------------------------------------
// Helper — build the trailing-whitespace range for a single line, or null
// ---------------------------------------------------------------------------

function trailingRange(
  document: vscode.TextDocument,    
  lineIndex: number   
): vscode.Range | null {    
  const line  = document.lineAt(lineIndex);
  const match = TRAILING_WS_REGEX.exec(line.text);
  if (!match) { return null; }

  const startCol = line.text.length - match[0].length;
  return new vscode.Range(lineIndex, startCol, lineIndex, line.text.length);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Removes trailing whitespace from every line in the active document.
 *
 * @returns The number of lines that were cleaned.
 */
export async function deleteAllTrailingSpaces(
  editor: vscode.TextEditor
): Promise<number> {
  const config = getConfig();
  if (config.excludeLanguages.includes(editor.document.languageId)) {
    vscode.window.showWarningMessage(
      'Trailing Spaces Pro: This language is excluded — update \'trailingSpaces.excludeLanguages\' to enable cleaning.'
    );
    return 0;
  }

  let count = 0;

  const success = await editor.edit(editBuilder => {
    const { document } = editor;
    for (let i = 0; i < document.lineCount; i++) {
      const range = trailingRange(document, i);
      if (range) {
        editBuilder.delete(range);
        count++;
      }
    }
  });

  if (success && count > 0) {
    vscode.window.showInformationMessage(
      `Trailing Spaces Pro: Cleaned ${count} line${count > 1 ? 's' : ''}.`
    );
  } else if (success && count === 0) {
    vscode.window.showInformationMessage('Trailing Spaces Pro: No trailing spaces found.');
  }

  return count;
}

/**
 * Removes trailing whitespace from lines that fall within the current selection(s).
 * Handles multi-cursor / multi-selection scenarios.
 *
 * @returns The total number of lines cleaned across all selections.
 */
export async function deleteTrailingSpacesInSelection(
  editor: vscode.TextEditor
): Promise<number> {
  const config = getConfig();
  if (config.excludeLanguages.includes(editor.document.languageId)) {
    vscode.window.showWarningMessage(
      'Trailing Spaces Pro: This language is excluded — update \'trailingSpaces.excludeLanguages\' to enable cleaning.'
    );
    return 0;
  }

  let count = 0;

  const success = await editor.edit(editBuilder => {
    const { document, selections } = editor;

    for (const selection of selections) {
      const startLine = selection.start.line;
      const endLine   = selection.end.line;

      for (let i = startLine; i <= endLine; i++) {
        const range = trailingRange(document, i);
        if (range) {
          editBuilder.delete(range);
          count++;
        }
      }
    }
  });

  if (success && count > 0) {
    vscode.window.showInformationMessage(
      `Trailing Spaces Pro: Cleaned ${count} line${count > 1 ? 's' : ''} in selection.`
    );
  } else if (success && count === 0) {
    vscode.window.showInformationMessage(
      'Trailing Spaces Pro: No trailing spaces in selection.'
    );
  }

  return count;
}

/**
 * Removes trailing whitespace from only the line where the primary cursor sits.
 *
 * @returns 1 if a line was cleaned, 0 otherwise.
 */
export async function deleteTrailingSpacesOnCurrentLine(
  editor: vscode.TextEditor
): Promise<number> {
  const config = getConfig();
  if (config.excludeLanguages.includes(editor.document.languageId)) {
    vscode.window.showWarningMessage(
      'Trailing Spaces Pro: This language is excluded — update \'trailingSpaces.excludeLanguages\' to enable cleaning.'
    );
    return 0;
  }

  const lineIndex = editor.selection.active.line;
  let count       = 0;

  const success = await editor.edit(editBuilder => {
    const range = trailingRange(editor.document, lineIndex);
    if (range) {
      editBuilder.delete(range);
      count = 1;
    }
  });

  if (success && count === 1) {
    vscode.window.showInformationMessage('Trailing Spaces Pro: Current line cleaned.');
  } else if (success && count === 0) {
    vscode.window.showInformationMessage(
      'Trailing Spaces Pro: No trailing spaces on this line.'
    );
  }

  return count;
}

/**
 * Builds TextEdit entries that remove trailing whitespace from the document.
 * Intended for onWillSaveTextDocument.waitUntil() so trimming happens
 * before the file is persisted.
 */
export function getTrimOnSaveEdits(document: vscode.TextDocument): vscode.TextEdit[] {
  const config = getConfig();

  if (config.excludeLanguages.includes(document.languageId)) {
    return [];
  }

  const edits: vscode.TextEdit[] = [];

  for (let i = 0; i < document.lineCount; i++) {
    const line  = document.lineAt(i);
    const match = TRAILING_WS_REGEX.exec(line.text);

    if (match) {
      const startCol = line.text.length - match[0].length;
      edits.push(
        vscode.TextEdit.delete(new vscode.Range(i, startCol, i, line.text.length))
      );
    }
  }

  return edits;
}
