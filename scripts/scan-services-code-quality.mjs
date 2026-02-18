#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import ts from 'typescript';

const ROOT_DIR = process.cwd();
const OUTPUT_DIR = path.join(ROOT_DIR, 'artifacts/services-quality');
const OUTPUT_JSON = path.join(OUTPUT_DIR, 'report.json');
const OUTPUT_MD = path.join(OUTPUT_DIR, 'report.md');

const MODE = getArgValue('--mode') ?? 'report';
if (!new Set(['report', 'block']).has(MODE)) {
  throw new Error(`Invalid mode: ${MODE}. Use --mode=report or --mode=block.`);
}

const FILE_PATTERNS = [
  'services/ahhachul.com/src/**/*.ts',
  'services/ahhachul.com/src/**/*.tsx',
  'services/ahhachul.com/src/**/*.js',
  'services/ahhachul.com/src/**/*.jsx',
  'services/one-app/src/**/*.ts',
  'services/one-app/src/**/*.tsx',
  'services/one-app/src/**/*.js',
  'services/one-app/src/**/*.jsx',
];

const EXCLUDED_SUFFIXES = ['.test.ts', '.test.tsx', '.spec.ts', '.spec.tsx', '.stories.ts', '.stories.tsx'];
const EXCLUDED_PATH_SEGMENTS = ['/__tests__/', '/__test__/', '/__mocks__/'];

const RULES = {
  'timing-magic-number-constant': {
    severity: 'medium',
    enforcement: 'scanner',
    defaultMode: 'report',
    phase: 'phase-c-block-candidate',
  },
  'no-hidden-ui-side-effect-in-service': {
    severity: 'high',
    enforcement: 'scanner',
    defaultMode: 'report',
    phase: 'phase-c-block-candidate',
  },
  'no-trivial-inline-handler-wrapper': {
    severity: 'low',
    enforcement: 'scanner',
    defaultMode: 'report',
    phase: 'phase-c-block-candidate',
  },
  'split-conditional-render-path': {
    severity: 'medium',
    enforcement: 'manual-review',
    defaultMode: 'report',
    phase: 'phase-d',
  },
  'complex-condition-must-be-named': {
    severity: 'medium',
    enforcement: 'scanner-signal',
    defaultMode: 'report',
    phase: 'phase-d',
  },
  'ternary-complexity-cap': {
    severity: 'medium',
    enforcement: 'eslint+scanner',
    defaultMode: 'block',
    phase: 'phase-c-block-candidate',
  },
  'hook-return-contract-standardization': {
    severity: 'medium',
    enforcement: 'manual-review',
    defaultMode: 'report',
    phase: 'phase-d',
  },
  'validation-result-union-standard': {
    severity: 'medium',
    enforcement: 'manual-review',
    defaultMode: 'report',
    phase: 'phase-d',
  },
  'interaction-component-extraction': {
    severity: 'medium',
    enforcement: 'manual-review',
    defaultMode: 'report',
    phase: 'phase-d',
  },
  'form-cohesion-policy': {
    severity: 'medium',
    enforcement: 'manual-review',
    defaultMode: 'report',
    phase: 'phase-d',
  },
  'state-scope-minimization': {
    severity: 'medium',
    enforcement: 'manual-review',
    defaultMode: 'report',
    phase: 'phase-d',
  },
  'composition-over-props-drilling': {
    severity: 'medium',
    enforcement: 'manual-review',
    defaultMode: 'report',
    phase: 'phase-d',
  },
};

const BLOCK_THRESHOLDS = {
  'timing-magic-number-constant': 0,
  'no-hidden-ui-side-effect-in-service': 0,
  'no-trivial-inline-handler-wrapper': 0,
  'ternary-complexity-cap': 0,
};

function getArgValue(flag) {
  const entry = process.argv.find(arg => arg.startsWith(`${flag}=`));
  return entry ? entry.slice(flag.length + 1) : null;
}

function listTrackedSourceFiles() {
  const output = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', ...FILE_PATTERNS], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
  });

  return Array.from(
    new Set(
      output
        .split('\n')
        .map(file => file.trim())
        .filter(Boolean),
    ),
  );
}

function isIgnoredFile(filePath) {
  if (EXCLUDED_SUFFIXES.some(suffix => filePath.endsWith(suffix))) {
    return true;
  }

  if (EXCLUDED_PATH_SEGMENTS.some(segment => filePath.includes(segment))) {
    return true;
  }

  return false;
}

function countLogicalOperators(node) {
  if (!node) {
    return 0;
  }

  if (!ts.isBinaryExpression(node)) {
    return 0;
  }

  if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
    return 1 + countLogicalOperators(node.left) + countLogicalOperators(node.right);
  }

  if (node.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
    return 1 + countLogicalOperators(node.left) + countLogicalOperators(node.right);
  }

  return countLogicalOperators(node.left) + countLogicalOperators(node.right);
}

function containsConditionalExpression(node) {
  let found = false;

  function visit(currentNode) {
    if (found) {
      return;
    }

    if (ts.isConditionalExpression(currentNode)) {
      found = true;
      return;
    }

    ts.forEachChild(currentNode, visit);
  }

  visit(node);
  return found;
}

function isTimingLiteralArgument(ruleName, node) {
  if (!ts.isCallExpression(node)) {
    return null;
  }

  if (!ts.isIdentifier(node.expression)) {
    return null;
  }

  const calleeName = node.expression.text;

  if ((calleeName === 'setTimeout' || calleeName === 'setInterval') && node.arguments.length >= 2) {
    const argumentNode = node.arguments[1];
    if (ts.isNumericLiteral(argumentNode)) {
      return { calleeName, argumentNode };
    }
  }

  if ((calleeName === 'debounceTime' || calleeName === 'delay' || calleeName === 'throttleTime') && node.arguments.length >= 1) {
    const argumentNode = node.arguments[0];
    if (ts.isNumericLiteral(argumentNode)) {
      return { calleeName, argumentNode };
    }
  }

  if (calleeName === 'throttle' && node.arguments.length >= 2) {
    const argumentNode = node.arguments[1];
    if (ts.isNumericLiteral(argumentNode)) {
      return { calleeName, argumentNode };
    }
  }

  return null;
}

function isWindowAlertCall(node) {
  if (!ts.isCallExpression(node)) {
    return false;
  }

  const expression = node.expression;
  if (!ts.isPropertyAccessExpression(expression)) {
    return false;
  }

  return ts.isIdentifier(expression.expression) && expression.expression.text === 'window' && expression.name.text === 'alert';
}

function isWindowLocationCall(node) {
  if (!ts.isCallExpression(node)) {
    return false;
  }

  const expression = node.expression;
  if (!ts.isPropertyAccessExpression(expression)) {
    return false;
  }

  if (!['assign', 'replace'].includes(expression.name.text)) {
    return false;
  }

  if (!ts.isPropertyAccessExpression(expression.expression)) {
    return false;
  }

  const locationExpr = expression.expression;

  if (ts.isIdentifier(locationExpr.expression) && locationExpr.expression.text === 'window' && locationExpr.name.text === 'location') {
    return true;
  }

  return ts.isIdentifier(locationExpr.expression) && locationExpr.expression.text === 'location';
}

function isWindowLocationHrefAssignment(node) {
  if (!ts.isBinaryExpression(node) || node.operatorToken.kind !== ts.SyntaxKind.EqualsToken) {
    return false;
  }

  const leftNode = node.left;
  if (!ts.isPropertyAccessExpression(leftNode) || leftNode.name.text !== 'href') {
    return false;
  }

  if (!ts.isPropertyAccessExpression(leftNode.expression) || leftNode.expression.name.text !== 'location') {
    return false;
  }

  const locationRoot = leftNode.expression.expression;
  return ts.isIdentifier(locationRoot) && (locationRoot.text === 'window' || locationRoot.text === 'location');
}

function extractLineSnippet(sourceText, lineNumber) {
  const lines = sourceText.split('\n');
  const raw = lines[lineNumber - 1] ?? '';
  const normalized = raw.trim();
  if (normalized.length <= 180) {
    return normalized;
  }

  return `${normalized.slice(0, 177)}...`;
}

function serviceNameFromPath(filePath) {
  const normalizedPath = filePath.replaceAll('\\', '/');

  if (
    normalizedPath.startsWith('services/ahhachul.com/') ||
    normalizedPath.includes('/services/ahhachul.com/')
  ) {
    return 'ahhachul.com';
  }

  if (
    normalizedPath.startsWith('services/one-app/') ||
    normalizedPath.includes('/services/one-app/')
  ) {
    return 'one-app';
  }

  return 'unknown';
}

function createViolation(ruleId, filePath, sourceFile, sourceText, node, message) {
  const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));

  return {
    ruleId,
    severity: RULES[ruleId].severity,
    filePath,
    line: line + 1,
    message,
    snippet: extractLineSnippet(sourceText, line + 1),
  };
}

function scanFile(filePath, violations) {
  const absolutePath = path.join(ROOT_DIR, filePath);
  if (!fs.existsSync(absolutePath)) {
    return;
  }

  const sourceText = fs.readFileSync(absolutePath, 'utf8');
  const scriptKind = filePath.endsWith('.tsx')
    ? ts.ScriptKind.TSX
    : filePath.endsWith('.jsx')
      ? ts.ScriptKind.JSX
      : filePath.endsWith('.js')
        ? ts.ScriptKind.JS
        : ts.ScriptKind.TS;

  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, scriptKind);
  const isServiceLayerFile = filePath.includes('/src/services/');

  function report(ruleId, node, message) {
    violations.push(createViolation(ruleId, filePath, sourceFile, sourceText, node, message));
  }

  function visit(node) {
    const timingMatch = isTimingLiteralArgument('timing-magic-number-constant', node);
    if (timingMatch) {
      report(
        'timing-magic-number-constant',
        timingMatch.argumentNode,
        `Avoid direct numeric literal in ${timingMatch.calleeName}. Extract a named *_MS constant.`,
      );
    }

    if (isServiceLayerFile && (isWindowAlertCall(node) || isWindowLocationCall(node))) {
      report(
        'no-hidden-ui-side-effect-in-service',
        node,
        'Do not trigger UI side effects in service-layer modules. Move alert/navigation handling to UI orchestration.',
      );
    }

    if (isServiceLayerFile && isWindowLocationHrefAssignment(node)) {
      report(
        'no-hidden-ui-side-effect-in-service',
        node,
        'Do not assign location.href in service-layer modules. Return intent and navigate in UI layer.',
      );
    }

    if (ts.isConditionalExpression(node)) {
      const hasNested = containsConditionalExpression(node.whenTrue) || containsConditionalExpression(node.whenFalse);
      if (hasNested) {
        report('ternary-complexity-cap', node, 'Nested ternary is prohibited. Replace with explicit if/else or helper branches.');
      } else if (countLogicalOperators(node.condition) >= 2) {
        report(
          'ternary-complexity-cap',
          node,
          'Complex ternary condition detected. Split condition into named booleans or explicit branch blocks.',
        );
      }
    }

    if (
      ts.isIfStatement(node) &&
      !ts.isIdentifier(node.expression) &&
      countLogicalOperators(node.expression) >= 2
    ) {
      report(
        'complex-condition-must-be-named',
        node.expression,
        'Complex condition should be assigned to a named boolean (`is*`, `has*`, `can*`, `should*`).',
      );
    }

    if (
      ts.isJsxAttribute(node) &&
      /^on[A-Z]/.test(node.name.text) &&
      node.initializer &&
      ts.isJsxExpression(node.initializer) &&
      node.initializer.expression &&
      ts.isArrowFunction(node.initializer.expression)
    ) {
      const handlerNode = node.initializer.expression;

      if (handlerNode.parameters.length === 0) {
        if (
          ts.isCallExpression(handlerNode.body) &&
          (ts.isIdentifier(handlerNode.body.expression) || ts.isPropertyAccessExpression(handlerNode.body.expression)) &&
          handlerNode.body.arguments.length === 0
        ) {
          report(
            'no-trivial-inline-handler-wrapper',
            handlerNode,
            'Trivial inline wrapper (`() => fn()`) detected. Pass function reference directly.',
          );
        }

        if (ts.isBlock(handlerNode.body) && handlerNode.body.statements.length === 1) {
          const [statementNode] = handlerNode.body.statements;
          if (
            ts.isExpressionStatement(statementNode) &&
            ts.isCallExpression(statementNode.expression) &&
            (ts.isIdentifier(statementNode.expression.expression) ||
              ts.isPropertyAccessExpression(statementNode.expression.expression)) &&
            statementNode.expression.arguments.length === 0
          ) {
            report(
              'no-trivial-inline-handler-wrapper',
              handlerNode,
              'Trivial inline wrapper (`() => fn()`) detected. Pass function reference directly.',
            );
          }
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

function buildSummary(violations) {
  const byRule = Object.fromEntries(Object.keys(RULES).map(ruleId => [ruleId, 0]));
  const byService = {
    'ahhachul.com': 0,
    'one-app': 0,
  };

  for (const violation of violations) {
    byRule[violation.ruleId] += 1;

    const serviceName = serviceNameFromPath(violation.filePath);
    if (byService[serviceName] !== undefined) {
      byService[serviceName] += 1;
    }
  }

  return {
    total: violations.length,
    byRule,
    byService,
  };
}

function buildMarkdownReport(summary, violations) {
  const ruleLines = Object.entries(summary.byRule)
    .map(([ruleId, count]) => {
      const rule = RULES[ruleId];
      return `| ${ruleId} | ${count} | ${rule.severity} | ${rule.enforcement} | ${rule.defaultMode} |`;
    })
    .join('\n');

  const serviceLines = Object.entries(summary.byService)
    .map(([serviceName, count]) => `| ${serviceName} | ${count} |`)
    .join('\n');

  const topViolations = violations
    .slice(0, 120)
    .map(
      violation =>
        `- [${violation.ruleId}] ${violation.filePath}:${violation.line} - ${violation.message}`,
    )
    .join('\n');

  return [
    '# Services Code Quality Report',
    '',
    `- GeneratedAt: ${new Date().toISOString()}`,
    `- Mode: ${MODE}`,
    `- Scope: services/ahhachul.com/src + services/one-app/src`,
    `- Total Violations: ${summary.total}`,
    '',
    '## Rule Summary',
    '',
    '| Rule | Count | Severity | Enforcement | Default Mode |',
    '| --- | ---: | --- | --- | --- |',
    ruleLines,
    '',
    '## Service Summary',
    '',
    '| Service | Count |',
    '| --- | ---: |',
    serviceLines,
    '',
    '## Violations (Top 120)',
    '',
    topViolations || '- none',
    '',
  ].join('\n');
}

function writeArtifacts(report) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(report, null, 2));
  fs.writeFileSync(OUTPUT_MD, buildMarkdownReport(report.summary, report.violations));
}

function validateBlockThreshold(summary) {
  const exceeded = Object.entries(BLOCK_THRESHOLDS).filter(([ruleId, threshold]) => {
    return summary.byRule[ruleId] > threshold;
  });

  if (exceeded.length === 0) {
    return { passed: true, exceeded: [] };
  }

  return {
    passed: false,
    exceeded,
  };
}

function main() {
  const files = listTrackedSourceFiles().filter(filePath => !isIgnoredFile(filePath));
  const violations = [];

  for (const filePath of files) {
    scanFile(filePath, violations);
  }

  const summary = buildSummary(violations);
  const report = {
    generatedAt: new Date().toISOString(),
    mode: MODE,
    scope: ['services/ahhachul.com/src', 'services/one-app/src'],
    summary,
    violations,
  };

  writeArtifacts(report);

  process.stdout.write(`scan-services-code-quality: report written to ${OUTPUT_JSON} and ${OUTPUT_MD}\n`);
  process.stdout.write(`scan-services-code-quality: total violations ${summary.total}\n`);

  if (MODE === 'report') {
    return;
  }

  const blockResult = validateBlockThreshold(summary);
  if (blockResult.passed) {
    process.stdout.write('scan-services-code-quality: block mode passed.\n');
    return;
  }

  process.stderr.write('scan-services-code-quality: block mode failed. Threshold exceeded:\n');
  for (const [ruleId, threshold] of blockResult.exceeded) {
    process.stderr.write(`- ${ruleId}: ${summary.byRule[ruleId]} (threshold ${threshold})\n`);
  }

  process.exitCode = 1;
}

main();
