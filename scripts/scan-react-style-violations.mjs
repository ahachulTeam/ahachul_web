#!/usr/bin/env node

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

const TARGET_DIRS = ['services', 'packages'];
const TARGET_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx']);
const IGNORED_DIRS = new Set([
  'node_modules',
  'dist',
  'build',
  'out',
  '.next',
  'coverage',
  '.nx',
  '.turbo',
  '.git',
]);
const DISABLE_TOKEN = 'react-style-scan-disable derived-state-mirror';

function walkDirectory(directoryPath, files) {
  const entries = readdirSync(directoryPath, { withFileTypes: true });

  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) {
      continue;
    }

    const nextPath = join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      walkDirectory(nextPath, files);
      continue;
    }

    if (TARGET_EXTENSIONS.has(extname(entry.name))) {
      files.push(nextPath);
    }
  }
}

function collectTargetFiles() {
  const files = [];

  for (const directory of TARGET_DIRS) {
    let directoryStat;
    try {
      directoryStat = statSync(directory);
    } catch {
      continue;
    }

    if (!directoryStat.isDirectory()) {
      continue;
    }

    walkDirectory(directory, files);
  }

  return files;
}

function toLineNumber(text, index) {
  return text.slice(0, index).split('\n').length;
}

function collectUseStateSetters(text) {
  const setters = new Set();
  const useStatePattern =
    /const\s*\[\s*[A-Za-z_$][\w$]*\s*,\s*(set[A-Z][A-Za-z0-9_$]*)\s*\]\s*=\s*useState\b/g;

  for (const match of text.matchAll(useStatePattern)) {
    if (match[1]) {
      setters.add(match[1]);
    }
  }

  return setters;
}

function scanFile(filePath, violations) {
  const text = readFileSync(filePath, 'utf8');

  if (text.includes(DISABLE_TOKEN)) {
    return;
  }

  const stateSetters = collectUseStateSetters(text);
  if (stateSetters.size === 0) {
    return;
  }

  const mirrorEffectPattern =
    /useEffect\s*\(\s*\(\s*\)\s*=>\s*\{?\s*(set[A-Z][A-Za-z0-9_$]*)\(\s*([A-Za-z_$][\w$.]*)\s*\)\s*;?\s*\}?\s*,\s*\[([^\]]*)\]\s*\)/g;

  for (const match of text.matchAll(mirrorEffectPattern)) {
    const setterName = match[1];
    const mirroredSource = match[2];
    const dependencies = (match[3] || '')
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);

    if (!stateSetters.has(setterName)) {
      continue;
    }

    if (dependencies.length === 1 && dependencies[0] === mirroredSource) {
      violations.push({
        filePath,
        line: toLineNumber(text, match.index || 0),
        setterName,
        mirroredSource,
      });
    }
  }
}

function main() {
  const targetFiles = collectTargetFiles();
  const violations = [];

  for (const filePath of targetFiles) {
    scanFile(filePath, violations);
  }

  if (violations.length === 0) {
    process.stdout.write('scan-react-style-violations: no derived-state mirror useEffect violations found.\n');
    return;
  }

  process.stdout.write(
    'scan-react-style-violations: detected derived-state mirror useEffect patterns. Prefer direct derivation or controlled sync boundary.\n',
  );

  for (const violation of violations) {
    process.stdout.write(
      `- ${violation.filePath}:${violation.line} (${violation.setterName} <- ${violation.mirroredSource})\n`,
    );
  }

  process.exitCode = 1;
}

main();
