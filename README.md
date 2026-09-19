# Journey Das — Chrome Extension (Manifest V3)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)](https://reactjs.org/)
[![Manifest V3](https://img.shields.io/badge/Chrome_Extension-Manifest_V3-success?logo=googlechrome)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Tests](https://img.shields.io/badge/Tests-21_Passed-brightgreen?logo=vitest)](https://vitest.dev/)

> **A personal 7-month C++ DSA + LeetCode interview preparation dashboard with automated in-page submission detection, C++ solution extraction, and GitHub portfolio synchronization.**

---

## 🌟 Key Features

- **Authoritative 7-Month Curriculum Dataset**:
  - Exactly **176 unique core problems** across 28 weeks (196 days) with canonical difficulty distribution: **35 Easy (20%)**, **118 Medium (67%)**, and **23 Hard (13%)**.
  - Structured daily schedule with $\le 5$ active problems/day cap.
  - Streak preservation on designated rest days.
- **Adaptive Spaced Repetition & Failure Protocol (Part 7 & Part 8)**:
  - Automated scheduling of 24h/48h re-solves for problems needing hints or editorials.
  - Multi-stage interval progression (Stage 0 -> Stage 4 Mastered).
- **In-Page LeetCode Floating HUD (`leetcode.com/problems/*`)**:
  - Non-intrusive collapsible floating HUD with live timer and status badges.
  - MutationObserver for immediate verdict detection (`Accepted`, `Wrong Answer`, `TLE`, `Runtime Error`).
  - Monaco editor & submission DOM C++ solution extractor.
- **GitHub Portfolio Sync**:
  - Automatic and manual commit options to personal GitHub repositories.
  - Zero-backend PKCE OAuth flow + Personal Access Token (PAT) fallback.
  - Clean directory structure (`leetcode/0001-two-sum/solution.cpp` + `README.md` with runtime benchmarks, learning invariants, recognition triggers, and interview follow-ups).
  - Offline sync queue with exponential backoff and idempotent SHA updates.
- **Full-Tab Dashboard**:
  - **Today's Plan**: "What should I do now?" engine, daily progress bar, and overdue review list.
  - **7-Month Overview**: Heatmap calendar, monthly milestones, and pattern mastery meters.
  - **Curriculum Catalog**: Filterable table of all 176 problems with difficulty, pattern, week, and LeetCode deep-links.
  - **Revision Queue**: Stage-by-stage review items with due dates and quick-action solve links.
  - **Interview Simulation & OA Mode**: 45-minute strict timer, hidden topic/pattern tags, and 70–90 min OA sets.
  - **Mistake Notebook**: Catalog tactical errors (integer overflow, off-by-one, boundary checks).
  - **C++ STL Catalog**: 27 containers and algorithms with complexity and interview tips.
  - **Interview Readiness Checklist**: 28-item self-assessment across DSA knowledge, pattern recognition, and C++ implementation.
  - **Settings & Data Backup**: Full JSON export/import with automatic secret sanitization.

---

## 🚀 Installation Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ (tested on Node v24)
- Google Chrome or any Chromium-based browser (Edge, Brave)

### 1. Build the Extension
```bash
# Clone or navigate to the project directory
cd d:/projects/extention

# Install dependencies
npm install

# Run all unit tests
npm test

# Build production bundle
npm run build
```
The compiled, production-ready extension will be output to the `dist/` directory.

### 2. Load into Chrome
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Toggle **Developer mode** in the top-right corner.
3. Click **Load unpacked** in the top-left corner.
4. Select the `dist` folder (`d:\projects\extention\dist`).
5. The **Journey Das** icon will appear in your Chrome toolbar!

---

## 💻 Developer Commands

| Command | Description |
|---|---|
| `npm run dev` | Starts Vite dev server |
| `npm run build` | Compiles TypeScript & bundles extension into `dist/` |
| `npm test` | Runs 21 Vitest unit tests |
| `npm run typecheck`| Runs TypeScript strict typecheck (`tsc --noEmit`) |

---

## 📚 Technical Documentation

- [Architecture Design](file:///d:/projects/extention/docs/architecture.md)
- [Curriculum Validation Report](file:///d:/projects/extention/docs/curriculum-validation.md)
- [Curriculum System & Philosophy](file:///d:/projects/extention/docs/curriculum-system.md)
- [GitHub Sync Architecture](file:///d:/projects/extention/docs/github-sync.md)
- [LeetCode Integration Details](file:///d:/projects/extention/docs/leetcode-integration.md)
- [Redundancy & Repetition Audit](file:///d:/projects/extention/docs/redundancy-audit.md)
