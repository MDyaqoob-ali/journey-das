# Curriculum System & Learning Philosophy

## 1. Authoritative Curriculum Architecture
The curriculum is strictly based on the 7-month C++ DSA and LeetCode interview preparation specification:
- **Duration:** 7 Months (28 Weeks, 196 Days).
- **Total Unique Core Problems:** 176 carefully sequenced problems.
- **Difficulty Breakdown:**
  - Easy: **35** (20%) — Fast implementation, STL mastery, base pattern recognition.
  - Medium: **118** (67%) — Primary interview benchmark, multi-step problem solving.
  - Hard: **23** (13%) — Advanced dynamic programming, hard graphs, monotonic queues, intervals.
- **Strict Cap:** At most 2 new problems per day during learning weeks. Total active problems per day (assignments + due reviews) is hard-capped at $\le 5$ to prevent cognitive exhaustion.

---

## 2. Weekly Progression Structure
Each 7-day cycle follows a disciplined educational structure:
- **Days 1–4 (Core Learning)**: Focus on a specific pattern/topic. Solve 2 problems per day.
- **Day 5 (Spaced Re-solves & Depth)**: Short review of problems from Day 1–4 or previous weeks.
- **Day 6 (Timed / Mixed Re-solves)**: 2–3 problems solved with a timer without looking at hints or solutions.
- **Day 7 (Checkpoint / Review / Rest)**: Concept review, error analysis, weekly retrospective, or designated rest day (streak protected).

---

## 3. Spaced Repetition Engine (Part 7)
Problems advance through revision stages:
- **Stage 0**: Just solved. Review scheduled for +2 days (or +7 days if solved with high confidence).
- **Stage 1**: +7 days.
- **Stage 2**: +14 days.
- **Stage 3**: +30 days.
- **Stage 4**: Mastered.

---

## 4. Failure Protocol (Part 8)
When a problem cannot be solved within the allotted time or fails submissions:
1. **Never jump directly to the complete code**: Look at a conceptual hint first.
2. **If editorial is read**: Mark state as `SOLVED_WITH_SOLUTION`.
3. **Mandatory 48-Hour Re-solve**: An automatic review is placed in the queue for 48 hours later. The problem must be recoded from scratch on a blank slate.
4. **Mistake Classification**: The user records the tactical failure reason in the Mistake Notebook (e.g., Integer Overflow, Boundary Edge Case, Missing State Dimension).

---

## 5. Interview Simulation Phase (Weeks 23–28)
- Real interview conditions: 45-minute strict timer.
- **Topic Masking**: Pattern and topic tags are completely hidden until submission.
- **Simulated OA Sets**: 2 Mediums or 1 Medium + 1 Hard in 70–90 minute continuous blocks.
