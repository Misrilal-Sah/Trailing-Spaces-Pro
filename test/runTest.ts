import * as path from 'path';
import * as fs from 'fs';
import { runTests } from '@vscode/test-electron';

async function main(): Promise<void> {
  try {
    const projectRoot = path.resolve(__dirname, '..', '..');
    const baseOutDir = path.join(projectRoot, 'out');
    let extensionDevelopmentPath = projectRoot;
    let extensionTestsPath = path.resolve(__dirname, 'suite', 'index');

    if (process.platform === 'win32') {
      const mirrorRoot = 'C:/trailing-spaces-pro-test-workspace';
      const mirrorNodeModules = path.join(mirrorRoot, 'node_modules');

      fs.rmSync(mirrorRoot, { recursive: true, force: true });
      fs.mkdirSync(mirrorRoot, { recursive: true });

      fs.copyFileSync(
        path.join(projectRoot, 'package.json'),
        path.join(mirrorRoot, 'package.json')
      );
      fs.cpSync(baseOutDir, path.join(mirrorRoot, 'out'), { recursive: true });
      fs.symlinkSync(path.join(projectRoot, 'node_modules'), mirrorNodeModules, 'junction');

      extensionDevelopmentPath = mirrorRoot;
      extensionTestsPath = path.join(mirrorRoot, 'out', 'test', 'suite', 'index');
    }

    const userDataDir = process.platform === 'win32'
      ? 'C:/trailing-spaces-pro-vscode-user-data'
      : path.join(projectRoot, '.vscode-test', 'user-data');
    const extensionsDir = process.platform === 'win32'
      ? 'C:/trailing-spaces-pro-vscode-extensions'
      : path.join(projectRoot, '.vscode-test', 'extensions');

    fs.mkdirSync(userDataDir, { recursive: true });
    fs.mkdirSync(extensionsDir, { recursive: true });

    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: [
        '--disable-extensions',
        '--disable-workspace-trust',
        '--user-data-dir',
        userDataDir,
        '--extensions-dir',
        extensionsDir
      ]
    });
  } catch (error) {
    console.error('Failed to run extension tests.');
    process.exit(1);
  }
}

void main();
