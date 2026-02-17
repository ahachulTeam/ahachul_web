# Team Visibility Guide

## Purpose

This file explains how to watch the multi-role refactor workflow in real time.

## Live Dashboard

- One-shot status: `pnpm team:status`
- Live auto-refresh status: `pnpm team:watch`

The dashboard reads `/Users/createahb21/Documents/Programming/repositories/@Ahhachul/ahachul_web/docs/TEAM_STATUS.json` and prints:

- current sprint focus
- role-by-role assignment
- handoff chain
- validator queue and latest gate

## Source of Truth

- team runtime status: `/Users/createahb21/Documents/Programming/repositories/@Ahhachul/ahachul_web/docs/TEAM_STATUS.json`
- append-only handoff history: `/Users/createahb21/Documents/Programming/repositories/@Ahhachul/ahachul_web/docs/HANDOFF_LOG.ndjson`
- sprint board and task history: `/Users/createahb21/Documents/Programming/repositories/@Ahhachul/ahachul_web/docs/SPRINT_BOARD.md`
- narrative logs: `/Users/createahb21/Documents/Programming/repositories/@Ahhachul/ahachul_web/docs/WORKLOG.md`

## Update Contract

Any time task ownership or state changes:

1. update `TEAM_STATUS.json`
2. append one line to `HANDOFF_LOG.ndjson`
3. update `WORKLOG.md` if milestone-level
