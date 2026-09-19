# System Architecture — DSA Progress Tracker Chrome Extension

## 1. Overview & Manifest V3 Design
The **DSA Progress Tracker** is built strictly under Chrome Extension Manifest V3 specifications. It is structured into four decoupled subsystems:
1. **Background Service Worker (`src/background/service-worker.ts`)**: Event-driven background coordinator handling runtime message routing, periodic alarms, Chrome notifications, badge status, and GitHub offline queue processing.
2. **LeetCode In-Page Tracker (`src/content/leetcode/`)**: Content script injecting an isolated, non-intrusive floating HUD overlay into `leetcode.com/problems/*`, observing submission verdicts via DOM MutationObservers and extracting C++ source code.
3. **Popup Interface (`src/popup/`)**: Quick-action extension popup for fast daily status checks, active timers, overdue review counters, and direct deep links to the full dashboard or LeetCode assignments.
4. **Full Dashboard (`src/dashboard/`)**: Tabbed React application opened in a dedicated full-window browser tab with 10 feature-complete modules: Today's Plan, 7-Month Overview, Interactive Curriculum Catalog, Spaced Repetition Queue, Interview Simulation & OA Mode, Error Log & Mistake Notebook, C++ STL Catalog, GitHub Portfolio Sync, Interview Readiness Checklist, and Extension Settings.

```
+-------------------------------------------------------------------------+
|                        Chrome Browser Session                           |
|                                                                         |
|  +------------------------+             +----------------------------+  |
|  |   leetcode.com/problems|             |    Full Dashboard Tab      |  |
|  |  +-------------------+ |             | +------------------------+ |  |
|  |  | In-Page HUD Overlay| |             | | Today / Overview /     | |  |
|  |  | Monaco Extractor  | |             | | Curriculum / Revision /| |  |
|  |  | MutationObserver  | |             | | Interview / Analytics /| |  |
|  |  +---------+---------+ |             | | Mistakes / STL / Github| |  |
|  +------------|-----------+             | +------------+-----------+ |  |
|               | Runtime Messages                       | Storage &   |  |
|               v                                        v Messaging   |  |
|  +-----------------------------------------------------------------+ |  |
|  |              Background Service Worker (Event-Driven)           | |  |
|  |  - Message Router         - Badge & Alarms Coordinator          | |  |
|  |  - GitHub Sync Queue Worker - Offline Retry with Exponential Backoff |
|  +------------------+----------------------------------------------+ |  |
|                     |                                                |  |
|                     v                                                |  |
|  +-------------------------------------+  +------------------------+ |  |
|  |      IndexedDB Persistence          |  |  chrome.storage.local  | |  |
|  |  - problems    - attempts           |  |  - user preferences   | |  |
|  |  - reviews     - githubQueue        |  |  - study schedule     | |  |
|  |  - interviews  - errorLogs          |  |  - github oauth token | |  |
|  |  - stlProgress - sessions           |  +------------------------+ |  |
|  +-------------------------------------+                             |  |
+-------------------------------------------------------------------------+
```

---

## 2. Storage & State Architecture
Dual-tier persistence guarantees sub-millisecond synchronous reads for UI state and indexed relational storage for lifetime study analytics:
- **`chrome.storage.local`**:
  - Houses user settings, GitHub authentication tokens, current day pointers, and timer preferences.
  - Automatic synchronization across background worker, popup, and dashboard tabs via `chrome.storage.onChanged`.
- **IndexedDB (`dsa_tracker_db` - Version 1)**:
  - 8 normalized object stores:
    1. `problems`: Lifetime progress state (`UNVISITED`, `IN_PROGRESS`, `SOLVED_INDEPENDENTLY`, `SOLVED_WITH_HINT`, `SOLVED_WITH_SOLUTION`, `FAILED`, `MASTERED`).
    2. `attempts`: Every individual submission with solve time, confidence (1-5), memory, runtime, and C++ code snapshot.
    3. `reviews`: Adaptive spaced repetition queue items with scheduled target dates, intervals (days), and review reasons.
    4. `githubQueue`: Offline-resilient transaction log for pending GitHub repository commits.
    5. `interviewSessions`: Mock interview and OA session records with score breakdown and time limits.
    6. `errorLogs`: Catalog of tactical errors (e.g. integer overflow, off-by-one, boundary cases) linked to problem IDs.
    7. `stlProgress`: C++ STL concept mastery tracker across 27 containers and algorithms.
    8. `sessions`: Daily study duration timestamps.

---

## 3. Communication Contracts (`src/types/messages.ts`)
Cross-boundary communication uses strictly typed messages:
- `SUBMISSION_DETECTED`: Dispatched from content script to service worker upon LeetCode verdict confirmation.
- `GET_TODAY_WORKLOAD`: Queried by popup and content script for immediate assignment recommendations.
- `TIMER_TICK` / `TIMER_ACTION`: Synchronizes floating HUD timer with background alarms.
- `TRIGGER_GITHUB_SYNC`: Forces service worker queue processing.
- `OPEN_DASHBOARD`: Programmatically opens or focuses the dashboard tab.
