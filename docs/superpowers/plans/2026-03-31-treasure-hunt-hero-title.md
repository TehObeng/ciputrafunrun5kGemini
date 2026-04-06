# Treasure Hunt Hero Title Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hero title line with `Treasure Hunt Fun Run 5K` without changing the surrounding hero layout.

**Architecture:** Update the existing hero heading in `src/App.tsx` and adjust the hero regression test in `src/App.test.tsx` to assert the new title while preserving current logo and organizer structure.

**Tech Stack:** React, Vitest, Testing Library, Vite

---

### Task 1: Update hero title

**Files:**
- Modify: `src/App.test.tsx`
- Modify: `src/App.tsx`

- [ ] Step 1: Write a failing test asserting the hero section contains `Treasure Hunt Fun Run 5K` and no longer contains the old `Fun Run 2026` title line.
- [ ] Step 2: Run `npm test` and verify the new assertion fails for the expected reason.
- [ ] Step 3: Replace the hero title line in `src/App.tsx` with `Treasure Hunt Fun Run 5K` only.
- [ ] Step 4: Run `npm test`, `npm run lint`, and `npm run build` and verify they pass.
