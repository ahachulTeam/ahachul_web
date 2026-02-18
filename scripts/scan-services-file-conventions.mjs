#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const OUTPUT_DIR = path.join(ROOT_DIR, 'artifacts/services-file-conventions');
const OUTPUT_JSON = path.join(OUTPUT_DIR, 'report.json');
const OUTPUT_MD = path.join(OUTPUT_DIR, 'report.md');

const MODE = getArgValue('--mode') ?? 'report';
if (!new Set(['report', 'block']).has(MODE)) {
  throw new Error(`Invalid mode: ${MODE}. Use --mode=report or --mode=block.`);
}

const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx']);
const IGNORE_DIRS = new Set(['node_modules', '.next', 'dist', 'coverage', 'artifacts']);

const ONE_APP_ROOT = path.join(ROOT_DIR, 'services/one-app/src');
const ONE_APP_COMPONENT_ROOT = path.join(ONE_APP_ROOT, 'components');
const AHHCHUL_ROOT = path.join(ROOT_DIR, 'services/ahhachul.com/src');
const AHHCHUL_COMPONENT_ROOT = path.join(AHHCHUL_ROOT, 'components');

const RULE_META = {
  'one-app-no-legacy-singular-root-folders': { severity: 'high' },
  'one-app-no-legacy-private-component-folder': { severity: 'high' },
  'one-app-no-legacy-singular-import-paths': { severity: 'medium' },
  'one-app-component-file-pascal-case': { severity: 'medium' },
  'ahhachul-no-legacy-libs-folder': { severity: 'high' },
  'ahhachul-no-legacy-libs-import-paths': { severity: 'high' },
  'ahhachul-component-module-file-pascal-case': { severity: 'medium' },
  'ahhachul-no-legacy-misnamed-component-files': { severity: 'medium' },
};

const LEGACY_ONE_APP_ROOT_DIRS = ['asset', 'component', 'constant', 'context', 'hook', 'store', 'util', '__test__'];

const ONE_APP_LEGACY_IMPORT_PATTERNS = [
  { label: '@/asset', regex: /@\/asset(?=\/|["'])/g },
  { label: '@/component', regex: /@\/component(?=\/|["'])/g },
  { label: '@/constant', regex: /@\/constant(?=\/|["'])/g },
  { label: '@/context', regex: /@\/context(?=\/|["'])/g },
  { label: '@/hook', regex: /@\/hook(?=\/|["'])/g },
  { label: '@/store', regex: /@\/store(?=\/|["'])/g },
  { label: '@/util', regex: /@\/util(?=\/|["'])/g },
  { label: '@/app/(auth)/login/_component', regex: /@\/app\/\(auth\)\/login\/_component(?=\/|["'])/g },
];

const AHHCHUL_LEGACY_IMPORT_PATTERNS = [{ label: '@/libs', regex: /@\/libs(?=\/|["'])/g }];

const LEGACY_VITE_FILE_PATTERNS = new Set([
  'newBtn.component.tsx',
  'imageZoomViewer.component.tsx',
  'imageZoomViewer.styled.tsx',
  'NaItem.type.ts',
]);

function getArgValue(flag) {
  const entry = process.argv.find(arg => arg.startsWith(`${flag}=`));
  return entry ? entry.slice(flag.length + 1) : null;
}

function toPosix(relativePath) {
  return relativePath.replaceAll('\\\\', '/');
}

function toRepoRelative(filePath) {
  return toPosix(path.relative(ROOT_DIR, filePath));
}

function walkFiles(rootDir, collector = []) {
  for (const dirent of fs.readdirSync(rootDir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(dirent.name)) {
      continue;
    }

    const fullPath = path.join(rootDir, dirent.name);

    if (dirent.isDirectory()) {
      walkFiles(fullPath, collector);
      continue;
    }

    if (SOURCE_EXTENSIONS.has(path.extname(dirent.name))) {
      collector.push(fullPath);
    }
  }

  return collector;
}

function createViolation({ ruleId, service, filePath, message, line = null, snippet = undefined }) {
  return {
    ruleId,
    severity: RULE_META[ruleId]?.severity ?? 'medium',
    service,
    filePath,
    line,
    message,
    ...(snippet ? { snippet } : {}),
  };
}

function findPatternLineMatches(sourceText, patternConfig) {
  const matches = [];
  const lines = sourceText.split(/\r?\n/);

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const lineText = lines[lineIndex];
    patternConfig.regex.lastIndex = 0;

    if (patternConfig.regex.test(lineText)) {
      matches.push({
        line: lineIndex + 1,
        snippet: lineText.trim(),
      });
    }
  }

  return matches;
}

function isPascalCaseWithOptionalVariants(name) {
  return /^[A-Z][A-Za-z0-9]*(\.[a-z][a-z0-9-]*)*$/.test(name);
}

function isOneAppComponentFile(filePath) {
  const repoPath = toRepoRelative(filePath);
  if (!repoPath.startsWith('services/one-app/src/')) {
    return false;
  }

  if (path.extname(filePath) !== '.tsx') {
    return false;
  }

  return repoPath.includes('/components/') || repoPath.includes('/_components/');
}

function shouldSkipOneAppComponentFileNameCheck(fileName) {
  if (fileName === 'index.tsx') {
    return true;
  }

  return fileName.endsWith('.test.tsx') || fileName.endsWith('.spec.tsx') || fileName.endsWith('.stories.tsx');
}

function scanOneApp(violations) {
  for (const legacyDirName of LEGACY_ONE_APP_ROOT_DIRS) {
    const legacyDirPath = path.join(ONE_APP_ROOT, legacyDirName);
    if (fs.existsSync(legacyDirPath)) {
      violations.push(
        createViolation({
          ruleId: 'one-app-no-legacy-singular-root-folders',
          service: 'one-app',
          filePath: toRepoRelative(legacyDirPath),
          message: `Legacy one-app root directory exists: ${legacyDirName}`,
        }),
      );
    }
  }

  const legacyPrivateComponentDir = path.join(ONE_APP_ROOT, 'app/(auth)/login/_component');
  if (fs.existsSync(legacyPrivateComponentDir)) {
    violations.push(
      createViolation({
        ruleId: 'one-app-no-legacy-private-component-folder',
        service: 'one-app',
        filePath: toRepoRelative(legacyPrivateComponentDir),
        message: 'Legacy route-private component folder `_component` exists. Use `_components`.',
      }),
    );
  }

  const files = walkFiles(ONE_APP_ROOT);

  for (const filePath of files) {
    const sourceText = fs.readFileSync(filePath, 'utf8');

    for (const patternConfig of ONE_APP_LEGACY_IMPORT_PATTERNS) {
      for (const match of findPatternLineMatches(sourceText, patternConfig)) {
        violations.push(
          createViolation({
            ruleId: 'one-app-no-legacy-singular-import-paths',
            service: 'one-app',
            filePath: toRepoRelative(filePath),
            line: match.line,
            snippet: match.snippet,
            message: `Legacy one-app import alias found: ${patternConfig.label}`,
          }),
        );
      }
    }

    if (!isOneAppComponentFile(filePath)) {
      continue;
    }

    const fileName = path.basename(filePath);
    if (shouldSkipOneAppComponentFileNameCheck(fileName)) {
      continue;
    }

    const baseName = fileName.replace(/\.tsx$/, '');
    if (!isPascalCaseWithOptionalVariants(baseName)) {
      violations.push(
        createViolation({
          ruleId: 'one-app-component-file-pascal-case',
          service: 'one-app',
          filePath: toRepoRelative(filePath),
          message: `Component filename should be PascalCase: ${fileName}`,
        }),
      );
    }
  }
}

function isAhhchulComponentModuleFile(fileName) {
  return (
    fileName.endsWith('.component.tsx') ||
    fileName.endsWith('.styled.tsx') ||
    fileName.endsWith('.hook.ts') ||
    fileName.endsWith('.constant.ts') ||
    fileName.endsWith('.constant.tsx') ||
    fileName.endsWith('.type.ts')
  );
}

function getAhhchulModuleBaseName(fileName) {
  return fileName
    .replace(/\.component\.tsx$/, '')
    .replace(/\.styled\.tsx$/, '')
    .replace(/\.hook\.ts$/, '')
    .replace(/\.constant\.tsx?$/, '')
    .replace(/\.type\.ts$/, '');
}

function scanAhhchul(violations) {
  const legacyLibsDir = path.join(AHHCHUL_ROOT, 'libs');
  if (fs.existsSync(legacyLibsDir)) {
    violations.push(
      createViolation({
        ruleId: 'ahhachul-no-legacy-libs-folder',
        service: 'ahhachul.com',
        filePath: toRepoRelative(legacyLibsDir),
        message: 'Legacy `src/libs` directory exists. Use `src/lib`.',
      }),
    );
  }

  const files = walkFiles(AHHCHUL_ROOT);

  for (const filePath of files) {
    const sourceText = fs.readFileSync(filePath, 'utf8');

    for (const patternConfig of AHHCHUL_LEGACY_IMPORT_PATTERNS) {
      for (const match of findPatternLineMatches(sourceText, patternConfig)) {
        violations.push(
          createViolation({
            ruleId: 'ahhachul-no-legacy-libs-import-paths',
            service: 'ahhachul.com',
            filePath: toRepoRelative(filePath),
            line: match.line,
            snippet: match.snippet,
            message: `Legacy ahhachul import alias found: ${patternConfig.label}`,
          }),
        );
      }
    }
  }

  const componentFiles = walkFiles(AHHCHUL_COMPONENT_ROOT);
  for (const filePath of componentFiles) {
    const fileName = path.basename(filePath);

    if (LEGACY_VITE_FILE_PATTERNS.has(fileName)) {
      violations.push(
        createViolation({
          ruleId: 'ahhachul-no-legacy-misnamed-component-files',
          service: 'ahhachul.com',
          filePath: toRepoRelative(filePath),
          message: `Legacy misnamed component module exists: ${fileName}`,
        }),
      );
    }

    if (!isAhhchulComponentModuleFile(fileName)) {
      continue;
    }

    const baseName = getAhhchulModuleBaseName(fileName);
    if (!isPascalCaseWithOptionalVariants(baseName)) {
      violations.push(
        createViolation({
          ruleId: 'ahhachul-component-module-file-pascal-case',
          service: 'ahhachul.com',
          filePath: toRepoRelative(filePath),
          message: `Component module file should start with PascalCase: ${fileName}`,
        }),
      );
    }
  }
}

function scan() {
  const violations = [];
  scanOneApp(violations);
  scanAhhchul(violations);
  return violations;
}

function buildSummary(violations) {
  const byRule = {};
  const byService = {};

  for (const violation of violations) {
    byRule[violation.ruleId] = (byRule[violation.ruleId] ?? 0) + 1;
    byService[violation.service] = (byService[violation.service] ?? 0) + 1;
  }

  return {
    total: violations.length,
    byRule,
    byService,
  };
}

function buildMarkdownTableRows(countMap) {
  return Object.entries(countMap)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count]) => `| ${name} | ${count} |`)
    .join('\n');
}

function buildMarkdownReport(report) {
  const summaryByServiceRows = buildMarkdownTableRows(report.summary.byService);
  const summaryByRuleRows = buildMarkdownTableRows(report.summary.byRule);

  const violationLines = report.violations
    .map(violation => {
      const lineSuffix = typeof violation.line === 'number' ? `:${violation.line}` : '';
      const snippetSuffix = violation.snippet ? `\n  - snippet: \`${violation.snippet}\`` : '';
      return `- [${violation.ruleId}] (${violation.severity}) ${violation.filePath}${lineSuffix}: ${violation.message}${snippetSuffix}`;
    })
    .join('\n');

  return [
    '# Services File Convention Report',
    '',
    `- GeneratedAt: ${report.generatedAt}`,
    `- Mode: ${MODE}`,
    `- Total Violations: ${report.summary.total}`,
    '',
    '## Summary By Service',
    '',
    '| Service | Count |',
    '| --- | ---: |',
    summaryByServiceRows || '| none | 0 |',
    '',
    '## Summary By Rule',
    '',
    '| Rule | Count |',
    '| --- | ---: |',
    summaryByRuleRows || '| none | 0 |',
    '',
    '## Violations',
    '',
    violationLines || '- none',
    '',
  ].join('\n');
}

function writeArtifacts(report) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(report, null, 2));
  fs.writeFileSync(OUTPUT_MD, buildMarkdownReport(report));
}

function main() {
  const violations = scan();
  const summary = buildSummary(violations);

  const report = {
    generatedAt: new Date().toISOString(),
    mode: MODE,
    summary,
    violations,
  };

  writeArtifacts(report);

  process.stdout.write(`scan-services-file-conventions: report written to ${OUTPUT_JSON} and ${OUTPUT_MD}\n`);
  process.stdout.write(`scan-services-file-conventions: total violations ${summary.total}\n`);

  if (MODE === 'block' && summary.total > 0) {
    process.stderr.write('scan-services-file-conventions: block mode failed.\n');
    process.exitCode = 1;
  }
}

main();
