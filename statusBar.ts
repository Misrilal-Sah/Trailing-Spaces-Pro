import * as vscode from 'vscode';

/**
 * The persistent status bar item managed by this module.
 * Created once in createStatusBar() and disposed in disposeStatusBar().
 */
let statusBarItem: vscode.StatusBarItem | undefined;

/**
 * Creates the status bar item and stores it in the module-level reference.
 * Must be called once during extension activation.
 *
 * Clicking the status bar item triggers "Delete All Trailing Spaces" for
 * a fast, one-click cleanup workflow.
 *
 * @returns The newly created StatusBarItem (also retained internally).
 */
export function createStatusBar(): vscode.StatusBarItem {
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );

  statusBarItem.command = 'trailing-spaces-pro.deleteAll';
  statusBarItem.tooltip = 'Lines with trailing spaces — click to clean all';
  return statusBarItem;
}

/**
 * Updates the status bar text and visual state based on the current count.
 *
 * - count === 0 : green check, no warning background
 * - count  >  0 : alert icon, warning background, count shown
 *
 * The item is shown automatically if it was hidden.
 *
 * @param count - Number of lines that contain trailing spaces.
 */
export function updateStatusBar(count: number): void {
  if (!statusBarItem) { return; }

  if (count === 0) {
    statusBarItem.text            = '$(check) No trailing spaces';
    statusBarItem.backgroundColor = undefined;
    statusBarItem.tooltip         = 'No trailing spaces — great work!';
  } else {
    const plural                  = count > 1 ? 's' : '';
    statusBarItem.text            = `$(alert) ${count} trailing space${plural}`;
    statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    statusBarItem.tooltip         = `${count} line${plural} with trailing spaces — click to clean all`;
  }

  statusBarItem.show();
}

/**
 * Hides the status bar item without disposing it.
 * Used when the showStatusBarCount setting is disabled.
 */
export function hideStatusBar(): void {
  statusBarItem?.hide();
}

/**
 * Permanently disposes the status bar item.
 * Called during extension deactivation to release resources.
 */
export function disposeStatusBar(): void {
  statusBarItem?.dispose();
  statusBarItem = undefined;
}
