#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const watch = process.argv.includes('--watch');
const fileArg = process.argv.find(arg => arg.startsWith('--file='));
const relativeFilePath = fileArg ? fileArg.replace('--file=', '') : 'docs/refactor/TEAM_STATUS.json';
const statusFilePath = path.resolve(process.cwd(), relativeFilePath);

function pad(value, width) {
  const text = String(value ?? '-');
  if (text.length >= width) return `${text.slice(0, width - 1)}…`;
  return text.padEnd(width, ' ');
}

function toLines(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return String(value)
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);
}

function renderTableRows(rows) {
  const header =
    `${pad('ROLE', 22)} ${pad('TASK', 10)} ${pad('STATE', 14)} ` +
    `${pad('OWNER', 20)} ${pad('LAST UPDATE', 20)} NEXT`;

  const separator = '-'.repeat(header.length);
  const body = rows
    .map(row => {
      return (
        `${pad(row.role, 22)} ${pad(row.taskId, 10)} ${pad(row.state, 14)} ` +
        `${pad(row.owner, 20)} ${pad(row.updatedAt, 20)} ${row.nextAction ?? '-'}`
      );
    })
    .join('\n');

  return `${header}\n${separator}\n${body}`;
}

function renderHandoffs(handoffs) {
  if (!handoffs || handoffs.length === 0) {
    return 'No handoffs.';
  }

  return handoffs
    .map(
      handoff =>
        `- [${handoff.at}] ${handoff.from} -> ${handoff.to} | ${handoff.taskId} | ${handoff.state} | ${handoff.note}`,
    )
    .join('\n');
}

function renderValidator(validator) {
  const queue = Array.isArray(validator?.queue) && validator.queue.length > 0
    ? validator.queue.join(', ')
    : 'empty';

  const recent = validator?.lastGate
    ? `${validator.lastGate.taskId}=${validator.lastGate.result} (${validator.lastGate.at})`
    : 'none';

  return `Queue: ${queue}\nLast Gate: ${recent}`;
}

function readStatus() {
  if (!fs.existsSync(statusFilePath)) {
    throw new Error(`Status file does not exist: ${statusFilePath}`);
  }

  const raw = fs.readFileSync(statusFilePath, 'utf8');
  return JSON.parse(raw);
}

function renderDashboard(status) {
  const lines = [];

  lines.push('=== AHHACHUL REFACTOR TEAM DASHBOARD ===');
  lines.push(`UpdatedAt: ${status.updatedAt}`);
  lines.push(`Branch: ${status.branch}`);
  lines.push(`Sprint Focus: ${status.sprintFocus}`);
  lines.push('');
  lines.push('Active Assignments');
  lines.push(renderTableRows(status.agents ?? []));
  lines.push('');
  lines.push('Current Lead Directive');
  lines.push(...toLines(status.leadDirective).map(line => `- ${line}`));
  lines.push('');
  lines.push('Handoffs');
  lines.push(renderHandoffs(status.handoffs ?? []));
  lines.push('');
  lines.push('Validator');
  lines.push(renderValidator(status.validator));

  return lines.join('\n');
}

function show() {
  try {
    const status = readStatus();
    if (watch) {
      process.stdout.write('\x1Bc');
    }
    process.stdout.write(`${renderDashboard(status)}\n`);
  } catch (error) {
    process.stderr.write(`dashboard error: ${error.message}\n`);
  }
}

show();

if (watch) {
  setInterval(show, 2000);
}
