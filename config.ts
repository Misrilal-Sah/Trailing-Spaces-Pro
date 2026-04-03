import * as vscode from 'vscode';

/**
 * The resolved configuration shape used throughout the extension.
 */
export interface ExtensionConfig {
  enabled: boolean;
  highlightColor: string;
  borderColor: string;
  borderWidth: string;
  borderStyle: string;
  borderRadius: string;
  colorPreset: string;
  trimOnSave: boolean;
  highlightCurrentLine: boolean;
  includeEmptyLines: boolean;
  showStatusBarCount: boolean;
  excludeLanguages: string[];
  excludeSchemes: string[];
  maxFileLines: number;
}

/**
 * Shared regex for detecting trailing whitespace (spaces and tabs).
 * Defined once here to prevent divergence between highlighter and cleaner.
 */
export const TRAILING_WS_REGEX = /[ \t]+$/;

/**
 * All built-in color presets.
 * Each entry provides a background (bg) and border (border) RGBA string.
 */
export const COLOR_PRESETS: Record<string, { bg: string; border: string }> = {
  'neon-pink':   { bg: 'rgba(255, 0, 127, 0.3)',   border: 'rgba(255, 0, 127, 0.8)' },
  'neon-red':    { bg: 'rgba(255, 50, 50, 0.3)',    border: 'rgba(255, 50, 50, 0.8)' },
  'neon-orange': { bg: 'rgba(255, 165, 0, 0.3)',    border: 'rgba(255, 165, 0, 0.8)' },
  'neon-yellow': { bg: 'rgba(255, 255, 0, 0.2)',    border: 'rgba(255, 255, 0, 0.6)' },
  'neon-green':  { bg: 'rgba(0, 255, 100, 0.2)',    border: 'rgba(0, 255, 100, 0.6)' },
  'neon-blue':   { bg: 'rgba(0, 150, 255, 0.3)',    border: 'rgba(0, 150, 255, 0.8)' },
  'neon-purple': { bg: 'rgba(180, 0, 255, 0.3)',    border: 'rgba(180, 0, 255, 0.8)' },
  'subtle-gray': { bg: 'rgba(128, 128, 128, 0.2)',  border: 'rgba(128, 128, 128, 0.5)' }
};

/**
 * Reads all Trailing Spaces Pro settings from VS Code configuration
 * and returns them as a strongly-typed object.
 *
 * When a built-in color preset (not "custom") is selected, the
 * highlightColor and borderColor fields are overridden with the preset values.
 */
export function getConfig(): ExtensionConfig {
  const cfg = vscode.workspace.getConfiguration('trailingSpaces');

  const colorPreset    = cfg.get<string>('colorPreset', 'neon-pink');
  const customBg       = cfg.get<string>('highlightColor', 'rgba(255, 0, 127, 0.3)');
  const customBorder   = cfg.get<string>('borderColor', 'rgba(255, 0, 127, 0.8)');

  // Resolve the actual colors to use — preset wins unless "custom" is selected
  const preset         = COLOR_PRESETS[colorPreset];
  const highlightColor = (colorPreset !== 'custom' && preset) ? preset.bg     : customBg;
  const borderColor    = (colorPreset !== 'custom' && preset) ? preset.border : customBorder;

  return {
    enabled:              cfg.get<boolean>('enabled', true),
    highlightColor,
    borderColor,
    borderWidth:          cfg.get<string>('borderWidth', '1px'),
    borderStyle:          cfg.get<string>('borderStyle', 'solid'),
    borderRadius:         cfg.get<string>('borderRadius', '2px'),
    colorPreset,
    trimOnSave:           cfg.get<boolean>('trimOnSave', false),
    highlightCurrentLine: cfg.get<boolean>('highlightCurrentLine', false),
    includeEmptyLines:    cfg.get<boolean>('includeEmptyLines', false),
    showStatusBarCount:   cfg.get<boolean>('showStatusBarCount', true),
    excludeLanguages:     cfg.get<string[]>('excludeLanguages', ['markdown', 'plaintext']),
    excludeSchemes:       cfg.get<string[]>('excludeSchemes', ['output', 'debug']),
    maxFileLines:         cfg.get<number>('maxFileLines', 10000)
  };
}

/**
 * Returns only the resolved { bg, border } color pair for the current config.
 * Convenience wrapper used when only colors are needed.
 */
export function getResolvedColors(): { bg: string; border: string } {
  const cfg    = vscode.workspace.getConfiguration('trailingSpaces');
  const preset = cfg.get<string>('colorPreset', 'neon-pink');

  if (preset !== 'custom' && COLOR_PRESETS[preset]) {
    return COLOR_PRESETS[preset];
  }

  return {
    bg:     cfg.get<string>('highlightColor', 'rgba(255, 0, 127, 0.3)'),
    border: cfg.get<string>('borderColor',    'rgba(255, 0, 127, 0.8)')
  };
}
