#!/usr/bin/env node

import { execFileSync, spawnSync } from 'node:child_process';
import process from 'node:process';

const DEFAULT_WORKFLOW_FILE = 'game-day-rehearsal-report.yml';
const DEFAULT_ARTIFACT_NAME = 'game-day-rehearsal-report';
const SUPPORTED_ENVIRONMENTS = ['staging', 'production'];

function parseArgs(argv) {
  return argv.reduce((acc, current) => {
    if (!current.startsWith('--')) {
      return acc;
    }

    const [rawKey, ...rawValue] = current.slice(2).split('=');
    const key = rawKey.trim();
    const value = rawValue.join('=').trim();
    acc[key] = value || 'true';
    return acc;
  }, {});
}

function parseBoolean(value, fallback = false) {
  if (value === undefined) {
    return fallback;
  }

  return value === 'true' || value === '1' || value === 'yes';
}

function listEnvironments(value) {
  if (!value || value === 'all') {
    return SUPPORTED_ENVIRONMENTS;
  }

  const environments = value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);

  for (const environment of environments) {
    if (!SUPPORTED_ENVIRONMENTS.includes(environment)) {
      throw new Error(
        `Unsupported environment "${environment}". Supported values: ${SUPPORTED_ENVIRONMENTS.join(', ')}, all`,
      );
    }
  }

  return environments;
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

function resolveRepo(repoArg) {
  if (repoArg) {
    return repoArg;
  }

  const repoResult = runCommand('gh', ['repo', 'view', '--json', 'nameWithOwner', '--jq', '.nameWithOwner']);

  if (!repoResult.ok || !repoResult.stdout) {
    throw new Error(`Unable to resolve repository from gh CLI: ${repoResult.stderr || repoResult.stdout}`);
  }

  return repoResult.stdout;
}

function ensureGhAuth(repo) {
  const authResult = runCommand('gh', ['auth', 'status']);

  if (!authResult.ok) {
    throw new Error(`gh authentication is required before dispatching workflow (${repo}).`);
  }
}

function dispatchWorkflow({ repo, workflowFile, environment }) {
  const startTime = new Date().toISOString();
  const dispatchResult = runCommand('gh', [
    'workflow',
    'run',
    workflowFile,
    '--repo',
    repo,
    '--field',
    `environment=${environment}`,
  ]);

  if (!dispatchResult.ok) {
    throw new Error(
      `Failed to dispatch workflow for environment=${environment}: ${
        dispatchResult.stderr || dispatchResult.stdout
      }`,
    );
  }

  return { startTime, dispatchOutput: dispatchResult.stdout };
}

function resolveRun({ repo, workflowFile, startedAt }) {
  const runListResult = runCommand('gh', [
    'run',
    'list',
    '--repo',
    repo,
    '--workflow',
    workflowFile,
    '--event',
    'workflow_dispatch',
    '--json',
    'databaseId,createdAt,url,status,conclusion',
    '--limit',
    '20',
  ]);

  if (!runListResult.ok) {
    throw new Error(`Unable to resolve workflow run: ${runListResult.stderr || runListResult.stdout}`);
  }

  const runs = JSON.parse(runListResult.stdout || '[]');
  const matchedRun = runs.find(run => run.createdAt >= startedAt) || runs[0];

  if (!matchedRun || !matchedRun.databaseId) {
    throw new Error('Workflow run could not be resolved after dispatch.');
  }

  return matchedRun;
}

function watchRun({ repo, runId }) {
  const watchResult = spawnSync('gh', ['run', 'watch', String(runId), '--repo', repo, '--exit-status'], {
    encoding: 'utf8',
    stdio: 'inherit',
  });

  return (watchResult.status ?? 1) === 0;
}

function downloadArtifact({ repo, runId, environment, artifactName }) {
  const targetDir = `artifacts/game-day/${environment}/${runId}`;
  const downloadResult = runCommand('gh', [
    'run',
    'download',
    String(runId),
    '--repo',
    repo,
    '--name',
    artifactName,
    '--dir',
    targetDir,
  ]);

  if (!downloadResult.ok) {
    return {
      ok: false,
      targetDir,
      reason: downloadResult.stderr || downloadResult.stdout,
    };
  }

  return {
    ok: true,
    targetDir,
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  const repo = resolveRepo(args.repo);
  const workflowFile = args.workflow || DEFAULT_WORKFLOW_FILE;
  const artifactName = args.artifact || DEFAULT_ARTIFACT_NAME;
  const environments = listEnvironments(args.environment);
  const shouldWatch = parseBoolean(args.watch, true);
  const shouldDownloadArtifact = parseBoolean(args.download, true);
  const shouldDryRun = parseBoolean(args['dry-run'], false);

  ensureGhAuth(repo);

  if (shouldDryRun) {
    process.stdout.write('[game-day-dispatch] dry-run mode\n');
    process.stdout.write(`- repo=${repo}\n`);
    process.stdout.write(`- workflow=${workflowFile}\n`);
    process.stdout.write(`- environments=${environments.join(', ')}\n`);
    process.stdout.write(`- watch=${shouldWatch}\n`);
    process.stdout.write(`- download=${shouldDownloadArtifact}\n`);
    process.stdout.write(`- artifact=${artifactName}\n`);
    process.stdout.write(
      '[game-day-dispatch] no workflow dispatch executed. remove --dry-run=true to execute.\n',
    );
    return;
  }

  const summary = [];
  let hasFailure = false;

  for (const environment of environments) {
    process.stdout.write(`[game-day-dispatch] dispatching environment=${environment}\n`);

    try {
      const { startTime } = dispatchWorkflow({
        repo,
        workflowFile,
        environment,
      });

      const run = resolveRun({
        repo,
        workflowFile,
        startedAt: startTime,
      });

      process.stdout.write(`[game-day-dispatch] run resolved: id=${run.databaseId} url=${run.url}\n`);

      let passed = true;

      if (shouldWatch) {
        process.stdout.write(`[game-day-dispatch] watching run ${run.databaseId}...\n`);
        passed = watchRun({ repo, runId: run.databaseId });
      }

      let artifact = { ok: false, targetDir: '', reason: 'artifact download skipped' };

      if (shouldDownloadArtifact && shouldWatch && passed) {
        artifact = downloadArtifact({
          repo,
          runId: run.databaseId,
          environment,
          artifactName,
        });

        if (artifact.ok) {
          process.stdout.write(
            `[game-day-dispatch] artifact downloaded: environment=${environment} dir=${artifact.targetDir}\n`,
          );
        } else {
          process.stdout.write(
            `[game-day-dispatch] artifact download failed: environment=${environment} reason=${artifact.reason}\n`,
          );
          hasFailure = true;
        }
      }

      if (!passed) {
        hasFailure = true;
      }

      summary.push({
        environment,
        runId: run.databaseId,
        url: run.url,
        passed,
        artifact,
      });
    } catch (error) {
      hasFailure = true;
      summary.push({
        environment,
        runId: null,
        url: null,
        passed: false,
        artifact: {
          ok: false,
          targetDir: '',
          reason: error instanceof Error ? error.message : String(error),
        },
      });
    }
  }

  process.stdout.write('\n[game-day-dispatch] summary\n');

  for (const item of summary) {
    process.stdout.write(
      `- environment=${item.environment} passed=${item.passed ? 'YES' : 'NO'} runId=${
        item.runId ?? 'n/a'
      } url=${item.url ?? 'n/a'}\n`,
    );

    if (item.artifact.ok) {
      process.stdout.write(`  artifact=${item.artifact.targetDir}\n`);
    } else {
      process.stdout.write(`  artifact-status=${item.artifact.reason}\n`);
    }
  }

  if (hasFailure) {
    process.exitCode = 1;
  }
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`[game-day-dispatch] fatal ${message}\n`);
  process.exit(1);
}
