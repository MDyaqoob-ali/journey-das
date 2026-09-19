# GitHub Integration & Portfolio Sync Architecture

## 1. Overview
The **GitHub Integration** turns daily problem solving into a version-controlled, professional engineering portfolio. Every accepted LeetCode solution can be automatically or manually committed to the user's personal GitHub repository with formatted C++ code, runtime & memory benchmarks, problem statement links, core patterns, and interview recognition notes.

---

## 2. Zero-Backend Authentication Flow
To eliminate privacy risks and third-party servers, authentication is handled directly inside the client:
1. **GitHub OAuth with PKCE (Recommended)**:
   - Uses `chrome.identity.launchWebAuthFlow`.
   - Client requests OAuth authorization directly with GitHub.
2. **Personal Access Token (PAT) Fallback**:
   - For users who prefer zero-configuration setup, a GitHub Personal Access Token (classic with `repo` scope or fine-grained with `Contents: Read & Write` permissions) can be directly entered into the dashboard.
   - Tokens are validated immediately via `GET https://api.github.com/user` and stored encrypted/locally in `chrome.storage.local`.
   - Tokens are automatically excluded and sanitized whenever user exports their data backup.

---

## 3. Directory Structure & Commit Format
Files are committed using GitHub REST API v3 with clean repository organization:
```
{baseDir}/
  ├── 0001-two-sum/
  │     ├── solution.cpp
  │     └── README.md
  ├── 0042-trapping-rain-water/
  │     ├── solution.cpp
  │     └── README.md
  └── 0322-coin-change/
        ├── solution.cpp
        └── README.md
```

### Problem Markdown (`README.md`) Format
Each generated README includes:
- Problem number, title, and direct LeetCode URL.
- Difficulty badge and algorithmic pattern classification.
- Runtime and memory percentiles.
- Authoritative curriculum notes:
  - **Learning Purpose & Invariants**: Invariant properties and core insights.
  - **Recognition Triggers**: Environmental triggers that signal when to apply this technique in interviews.
  - **Common Pitfalls & Mistakes**: Canonical mistakes to avoid.
  - **Interview Variations**: Common interviewer follow-up questions.

---

## 4. Concurrency Locking & Offline Resilience
- **Idempotent File Updates**: Before committing, the client queries `GET /repos/{owner}/{repo}/contents/{path}` to retrieve the current file's Git Blob SHA. If updating an existing solution, the SHA is provided, eliminating `409 Conflict` errors.
- **Offline Sync Queue**: If network requests fail or the browser goes offline, commits are queued in IndexedDB (`githubQueue` store).
- **Exponential Backoff**: The background worker periodically inspects pending jobs and retries with backoff delays up to a maximum attempt threshold before marking as failed.
