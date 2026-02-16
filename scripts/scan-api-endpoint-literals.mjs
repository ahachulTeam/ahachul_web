#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import ts from 'typescript';

const ROOT_DIR = process.cwd();
const FILE_PATTERNS = [
  'services/**/src/**/*.ts',
  'services/**/src/**/*.tsx',
  'packages/**/src/**/*.ts',
  'packages/**/src/**/*.tsx',
];

const EXCLUDED_FILES = new Set([
  'packages/http/src/api-contract.ts',
  'services/one-app/src/lib/internal-api-contract.ts',
]);

const EXCLUDED_SUFFIXES = ['.test.ts', '.test.tsx', '.spec.ts', '.spec.tsx', '.stories.ts', '.stories.tsx'];
const EXCLUDED_PATH_SEGMENTS = ['/__tests__/', '/__mocks__/'];

const NETWORK_IDENTIFIERS = new Set(['fetch', 'fetchClient', 'request']);
const NETWORK_OBJECTS = new Set(['axios', 'axiosInstance']);
const NETWORK_METHODS = new Set(['get', 'post', 'put', 'patch', 'delete']);

const API_LITERAL_FRAGMENT =
  /\/(?:api\/auth\/token\/refresh|auth(?:\/|$)|members(?:\/|$)|community(?:-hot-posts|-posts|\/|$)|complaint(?:-posts|\/|$)|lost(?:-posts|\/|$)|subway(?:-lines|\/|$)|trains(?:\/|$)|common(?:\/|$)|signout(?:\/|$))/;

function listTrackedSourceFiles() {
  const output = execFileSync('git', ['ls-files', ...FILE_PATTERNS], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
  });

  return output
    .split('\n')
    .map(file => file.trim())
    .filter(Boolean);
}

function isIgnoredFile(filePath) {
  if (EXCLUDED_FILES.has(filePath)) {
    return true;
  }

  if (EXCLUDED_SUFFIXES.some(suffix => filePath.endsWith(suffix))) {
    return true;
  }

  if (EXCLUDED_PATH_SEGMENTS.some(segment => filePath.includes(segment))) {
    return true;
  }

  return false;
}

function isNetworkCallExpression(node) {
  const { expression } = node;

  if (ts.isIdentifier(expression)) {
    return NETWORK_IDENTIFIERS.has(expression.text);
  }

  if (ts.isPropertyAccessExpression(expression) && ts.isIdentifier(expression.expression)) {
    return NETWORK_OBJECTS.has(expression.expression.text) && NETWORK_METHODS.has(expression.name.text);
  }

  return false;
}

function hasEndpointLiteral(value) {
  if (!value) {
    return false;
  }

  return API_LITERAL_FRAGMENT.test(value);
}

function inspectCallArgument(filePath, sourceFile, argNode, violations) {
  if (ts.isStringLiteral(argNode) || ts.isNoSubstitutionTemplateLiteral(argNode)) {
    const literal = argNode.text;

    if (hasEndpointLiteral(literal)) {
      const { line, character } = sourceFile.getLineAndCharacterOfPosition(argNode.getStart(sourceFile));
      violations.push({
        filePath,
        line: line + 1,
        column: character + 1,
        literal,
      });
    }

    return;
  }

  if (!ts.isTemplateExpression(argNode)) {
    return;
  }

  const chunks = [argNode.head.text, ...argNode.templateSpans.map(span => span.literal.text)];

  if (chunks.some(chunk => hasEndpointLiteral(chunk))) {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(argNode.getStart(sourceFile));
    violations.push({
      filePath,
      line: line + 1,
      column: character + 1,
      literal: chunks.join('${...}'),
    });
  }
}

function scanFile(filePath, violations) {
  const absolutePath = path.join(ROOT_DIR, filePath);
  const sourceText = fs.readFileSync(absolutePath, 'utf8');
  const scriptKind = filePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, scriptKind);

  function visit(node) {
    if (ts.isCallExpression(node) && isNetworkCallExpression(node) && node.arguments.length > 0) {
      inspectCallArgument(filePath, sourceFile, node.arguments[0], violations);
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

function main() {
  const files = listTrackedSourceFiles().filter(filePath => !isIgnoredFile(filePath));
  const violations = [];

  for (const filePath of files) {
    scanFile(filePath, violations);
  }

  if (violations.length === 0) {
    process.stdout.write('scan-api-endpoint-literals: no literal endpoint violations found.\n');
    return;
  }

  process.stderr.write(
    'scan-api-endpoint-literals: detected API endpoint literals in network calls. Use shared contracts (API_PATHS / INTERNAL_API_PATHS).\n',
  );

  for (const violation of violations) {
    process.stderr.write(
      `- ${violation.filePath}:${violation.line}:${violation.column} -> "${violation.literal}"\n`,
    );
  }

  process.exitCode = 1;
}

main();
