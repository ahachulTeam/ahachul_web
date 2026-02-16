#!/usr/bin/env node

import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const DEFAULT_VITE_ROUTES = ['/', '/community', '/complaint', '/lostFound'];
const DEFAULT_NEXT_ROUTES = ['/', '/community', '/complaint', '/lost-found', '/login'];

function parseArgs(argv) {
  return argv.reduce((acc, current) => {
    if (!current.startsWith('--')) return acc;

    const [rawKey, ...rawValue] = current.slice(2).split('=');
    const key = rawKey.trim();
    const value = rawValue.join('=').trim();
    acc[key] = value || 'true';
    return acc;
  }, {});
}

function requiredArg(args, key) {
  const value = args[key];

  if (!value) {
    throw new Error(`Missing required argument: --${key}`);
  }

  return value;
}

function parseRoutes(value, fallback) {
  if (!value) {
    return fallback;
  }

  return value
    .split(',')
    .map(route => route.trim())
    .filter(Boolean);
}

function runCommand(cmd, args, options = {}) {
  try {
    const stdout = execFileSync(cmd, args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      ...options,
    });

    return {
      ok: true,
      stdout: stdout.trim(),
      stderr: '',
      exitCode: 0,
    };
  } catch (error) {
    return {
      ok: false,
      stdout: String(error.stdout ?? '').trim(),
      stderr: String(error.stderr ?? '').trim(),
      exitCode: Number(error.status ?? 1),
    };
  }
}

function runSmokeCheck({ product, baseUrl, routes }) {
  const result = spawnSync(
    'node',
    [
      'scripts/deploy-smoke-check.mjs',
      `--product=${product}`,
      `--base-url=${baseUrl}`,
      `--routes=${routes.join(',')}`,
    ],
    {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  );

  return {
    product,
    baseUrl,
    routes,
    ok: result.status === 0,
    exitCode: result.status ?? 1,
    output: `${result.stdout ?? ''}${result.stderr ?? ''}`.trim(),
  };
}

function readViteRollbackReadiness(bucketName) {
  const listResult = runCommand('aws', ['s3', 'ls', `s3://${bucketName}/releases/`, '--recursive']);

  if (!listResult.ok) {
    return {
      ok: false,
      reason: `failed to list release manifests: ${listResult.stderr || listResult.stdout}`,
    };
  }

  const manifests = listResult.stdout
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => line.split(/\s+/).at(-1))
    .filter(key => key && key.endsWith('manifest.json'));

  if (manifests.length < 2) {
    return {
      ok: false,
      reason: `rollback requires at least two release manifests, found ${manifests.length}`,
    };
  }

  const latest = manifests[manifests.length - 1];
  const previous = manifests[manifests.length - 2];

  return {
    ok: true,
    latest,
    previous,
    total: manifests.length,
  };
}

function parseTaskDefinitionRef(taskDefinitionArn) {
  const taskDefinitionSuffix = taskDefinitionArn.split('/').at(-1) ?? '';
  const [family, revisionText] = taskDefinitionSuffix.split(':');
  const revision = Number(revisionText);

  if (!family || !Number.isInteger(revision) || revision <= 0) {
    throw new Error(`Unexpected ECS task definition ARN format: ${taskDefinitionArn}`);
  }

  return { family, revision };
}

function readNextRollbackReadiness(clusterName, serviceName) {
  const serviceResult = runCommand('aws', [
    'ecs',
    'describe-services',
    '--cluster',
    clusterName,
    '--services',
    serviceName,
    '--query',
    'services[0].taskDefinition',
    '--output',
    'text',
  ]);

  if (!serviceResult.ok || !serviceResult.stdout || serviceResult.stdout === 'None') {
    return {
      ok: false,
      reason: `failed to resolve current ECS task definition: ${serviceResult.stderr || serviceResult.stdout}`,
    };
  }

  try {
    const { family, revision } = parseTaskDefinitionRef(serviceResult.stdout);

    if (revision <= 1) {
      return {
        ok: false,
        reason: `current revision is ${revision}; no previous revision available for rollback`,
      };
    }

    const previousRef = `${family}:${revision - 1}`;
    const previousResult = runCommand('aws', [
      'ecs',
      'describe-task-definition',
      '--task-definition',
      previousRef,
      '--query',
      'taskDefinition.taskDefinitionArn',
      '--output',
      'text',
    ]);

    if (!previousResult.ok) {
      return {
        ok: false,
        reason: `failed to resolve previous ECS task definition (${previousRef}): ${
          previousResult.stderr || previousResult.stdout
        }`,
      };
    }

    return {
      ok: true,
      current: serviceResult.stdout,
      previous: previousResult.stdout,
    };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : String(error),
    };
  }
}

function asPassFail(value) {
  return value ? 'PASS' : 'FAIL';
}

function renderReport({
  generatedAt,
  environment,
  viteSmoke,
  nextSmoke,
  viteRollback,
  nextRollback,
}) {
  const lines = [];

  lines.push('# Deployment Game-Day Report');
  lines.push('');
  lines.push(`- Generated At (UTC): ${generatedAt}`);
  lines.push(`- Environment: ${environment}`);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push('| Check | Result |');
  lines.push('| --- | --- |');
  lines.push(`| Vite smoke check | ${asPassFail(viteSmoke.ok)} |`);
  lines.push(`| Next smoke check | ${asPassFail(nextSmoke.ok)} |`);
  lines.push(`| Vite rollback readiness | ${asPassFail(viteRollback.ok)} |`);
  lines.push(`| Next rollback readiness | ${asPassFail(nextRollback.ok)} |`);
  lines.push('');
  lines.push('## Smoke Check Details');
  lines.push('');
  lines.push(`### Vite (${viteSmoke.baseUrl})`);
  lines.push(`- Routes: ${viteSmoke.routes.join(', ')}`);
  lines.push(`- Result: ${asPassFail(viteSmoke.ok)} (exit=${viteSmoke.exitCode})`);
  lines.push('```text');
  lines.push(viteSmoke.output || '(no output)');
  lines.push('```');
  lines.push('');
  lines.push(`### Next (${nextSmoke.baseUrl})`);
  lines.push(`- Routes: ${nextSmoke.routes.join(', ')}`);
  lines.push(`- Result: ${asPassFail(nextSmoke.ok)} (exit=${nextSmoke.exitCode})`);
  lines.push('```text');
  lines.push(nextSmoke.output || '(no output)');
  lines.push('```');
  lines.push('');
  lines.push('## Rollback Readiness');
  lines.push('');
  lines.push('### Vite');

  if (viteRollback.ok) {
    lines.push(`- Latest manifest: ${viteRollback.latest}`);
    lines.push(`- Previous manifest: ${viteRollback.previous}`);
    lines.push(`- Total manifests found: ${viteRollback.total}`);
  } else {
    lines.push(`- Failure: ${viteRollback.reason}`);
  }

  lines.push('');
  lines.push('### Next');

  if (nextRollback.ok) {
    lines.push(`- Current task definition: ${nextRollback.current}`);
    lines.push(`- Previous task definition: ${nextRollback.previous}`);
  } else {
    lines.push(`- Failure: ${nextRollback.reason}`);
  }

  lines.push('');
  lines.push('## Gate');
  lines.push('');

  const gatePass = viteSmoke.ok && nextSmoke.ok && viteRollback.ok && nextRollback.ok;
  lines.push(`- Overall Result: ${asPassFail(gatePass)}`);

  return {
    content: `${lines.join('\n')}\n`,
    gatePass,
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  const environment = args.environment ?? 'production';
  const outputFile = args.output ?? 'artifacts/game-day-report.md';
  const viteBaseUrl = requiredArg(args, 'vite-base-url');
  const nextBaseUrl = requiredArg(args, 'next-base-url');
  const s3Bucket = requiredArg(args, 's3-bucket');
  const ecsCluster = requiredArg(args, 'ecs-cluster');
  const ecsService = requiredArg(args, 'ecs-service');

  const viteRoutes = parseRoutes(args['vite-routes'], DEFAULT_VITE_ROUTES);
  const nextRoutes = parseRoutes(args['next-routes'], DEFAULT_NEXT_ROUTES);

  const viteSmoke = runSmokeCheck({
    product: 'vite',
    baseUrl: viteBaseUrl,
    routes: viteRoutes,
  });
  const nextSmoke = runSmokeCheck({
    product: 'next',
    baseUrl: nextBaseUrl,
    routes: nextRoutes,
  });

  const viteRollback = readViteRollbackReadiness(s3Bucket);
  const nextRollback = readNextRollbackReadiness(ecsCluster, ecsService);

  const generatedAt = new Date().toISOString();
  const { content, gatePass } = renderReport({
    generatedAt,
    environment,
    viteSmoke,
    nextSmoke,
    viteRollback,
    nextRollback,
  });

  const outputPath = path.resolve(process.cwd(), outputFile);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content, 'utf8');

  process.stdout.write(content);

  if (!gatePass) {
    process.exitCode = 1;
  }
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`[game-day] fatal ${message}\n`);
  process.exit(1);
}
