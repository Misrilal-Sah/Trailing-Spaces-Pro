import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Trailing Spaces Pro Integration', () => {
  test('registers expected commands', async () => {
    const extension = vscode.extensions.getExtension('MisrilalSah.trailing-spaces-pro');
    assert.ok(extension, 'Extension should be discoverable by id.');

    await extension?.activate();

    const commands = await vscode.commands.getCommands(true);
    assert.ok(commands.includes('trailing-spaces-pro.deleteAll'));
    assert.ok(commands.includes('trailing-spaces-pro.deleteInSelection'));
    assert.ok(commands.includes('trailing-spaces-pro.deleteOnCurrentLine'));
    assert.ok(commands.includes('trailing-spaces-pro.toggleHighlight'));
  });

  test('deleteAll command removes trailing spaces', async () => {
    const document = await vscode.workspace.openTextDocument({
      language: 'typescript',
      content: 'first line   \nsecond line\nthird line\t\t\n'
    });

    const editor = await vscode.window.showTextDocument(document);
    await vscode.commands.executeCommand('trailing-spaces-pro.deleteAll');

    const lines = [
      editor.document.lineAt(0).text,
      editor.document.lineAt(1).text,
      editor.document.lineAt(2).text
    ];

    assert.strictEqual(lines[0], 'first line');
    assert.strictEqual(lines[1], 'second line');
    assert.strictEqual(lines[2], 'third line');
  });
});
