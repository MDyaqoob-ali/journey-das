# LeetCode Page Integration & Submission Engine

## 1. Overview
The LeetCode integration operates non-intrusively directly inside `leetcode.com/problems/*`. It enables:
1. Continuous detection of current problem metadata (slug, title, number, curriculum alignment).
2. Live solve timer with start, pause, resume, and reset.
3. DOM-level and network-level interception of submission verdicts (Accepted, Wrong Answer, Time Limit Exceeded, Runtime Error).
4. Automatic C++ solution extraction directly from the Monaco code editor or submission detail modals.
5. In-page Floating HUD overlay with collapsible minimode and failure reflection modal.

---

## 2. Problem Recognition & Slug Normalization (`problem-adapter.ts`)
LeetCode uses dynamic client-side SPA routing (`next/router`). The adapter detects route transitions:
- URL pathname analysis extracts the canonical problem slug from `/problems/{slug}/`.
- Matches the extracted slug against the normalized curriculum dataset (`curriculum.json`).
- If matched, enriches the in-page tracker with the exact week, day, difficulty, pattern, purpose, and recognition triggers.
- If solving a non-curriculum question, the tracker identifies it gracefully as an external supplementary problem.

---

## 3. C++ Source Code Extraction (`solution-adapter.ts`)
To capture clean C++ solutions without manual copy-pasting:
- **Primary Source (Monaco Editor)**: Queries `window.monaco.editor.getModels()` or DOM `.monaco-editor` lines to retrieve the current active code buffer.
- **Secondary Source (Submission Detail View)**: Intercepts submission result modal code blocks.
- **Language Detection**: Verifies that the code language is C++ before committing. If Python, Java, or another language is detected, the user is notified with a prompt to confirm or switch languages.
- **Manual Fallback**: The floating HUD provides a manual code input / edit area in case LeetCode alters its editor DOM hierarchy.

---

## 4. Submission Verdict Detection (`submission-adapter.ts`)
- Utilizes `MutationObserver` on the LeetCode submission result container.
- Identifies verdicts:
  - `Accepted` -> Marks attempt as successful, captures runtime & memory stats, transitions timer.
  - `Wrong Answer` / `Time Limit Exceeded` / `Runtime Error` -> Triggers the **Failure Protocol** modal (Part 8), prompting the user to document what went wrong and automatically scheduling a 24-hour / 48-hour re-solve.
