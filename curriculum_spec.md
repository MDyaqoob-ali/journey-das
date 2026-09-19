# 7-Month C++ DSA + LeetCode Interview Curriculum

> **Design target:** 28 weeks / 196 calendar study days, maximum 5 LeetCode problems on any day, 176 unique core problems, deliberate re-solves, timed assessments, and mock interviews.

## Important verification note

I live-checked representative canonical LeetCode pages while constructing this plan (including #1 Two Sum, #20 Valid Parentheses, #102 Binary Tree Level Order Traversal, #167 Two Sum II, #207 Course Schedule, and #322 Coin Change). The remaining links are canonical LeetCode problem URLs generated from the exact problem titles and IDs in the curated catalog. LeetCode can change titles, slugs, or difficulty labels, so the catalog should be treated as a versioned snapshot rather than a permanent guarantee.

## Part 1 — Overall strategy

The program deliberately avoids the 'solve 1,000 questions' trap. The core loop is **learn → solve → explain → re-solve → mix → time-pressure**. Weeks 1–22 build the toolbox; weeks 23–28 progressively remove topic labels and make the task resemble an interview.

### The standard problem-solving protocol

1. Restate the problem and clarify assumptions.
2. Extract constraints and estimate the largest acceptable complexity.
3. Build one or two concrete examples, including an edge case.
4. Describe the brute-force approach first.
5. Identify the bottleneck.
6. Ask which invariant/data structure removes that bottleneck.
7. State the optimized algorithm before coding.
8. Explain why the invariant remains true / why the algorithm is correct.
9. State time and auxiliary-space complexity.
10. Implement in C++.
11. Test normal, boundary, duplicate, empty/minimum, and adversarial cases.
12. After solving, write a one-sentence recognition trigger and one likely interviewer follow-up.

### Difficulty progression

- **Weeks 1–4:** Easy-heavy, then Medium.
- **Weeks 5–12:** Mostly Medium; selected Hards appear when the pattern has been established.
- **Weeks 13–22:** Mostly Medium with selected Hard ceiling problems.
- **Weeks 23–28:** Topic-hidden Mediums, timed sets, selected Hards, follow-ups, and mocks.

### Daily workload

- New-learning days: **2 new problems**, normally 75–120 minutes total.
- Review/timed days: **2–3 re-solves**, normally 60–100 minutes.
- One day each week is deliberately lighter: conceptual recall, error-log review, and recovery.
- Never chase the 5-problem ceiling. Five is a hard cap, not a quota.

## Part 2 — Topic dependency map

| Stage | Learn first | Then | Why |
|---|---|---|---|
| Foundation | C++ STL, arrays, strings, hashing | prefix sums, two pointers, windows | Gives you the basic vocabulary for most interview problems |
| Core patterns | two pointers, sliding window, stack, intervals | monotonic structures, binary search, greedy | Teaches systematic search-space reduction |
| Linear structures | linked lists, queues, deques | complex pointer/monotonic problems | Builds implementation discipline |
| Recursion | recursion, tree traversal | backtracking, tree DP | Makes recursive state transitions natural |
| Search | binary search | binary-search-on-answer | Generalizes ordered search to optimization |
| DP | 1D DP | knapsack/grid/string/interval DP | State design is easier when recurrence basics are automatic |
| Trees | DFS/BFS/BST | LCA, path sums, tree DP, serialization | Builds recursive + level-order reasoning |
| Graphs | DFS/BFS | topo sort, DSU, shortest paths, MST | Each later algorithm reuses graph modeling and traversal |
| Advanced | heaps, tries, graph algorithms, advanced DP | mixed interview problems | Raises the ceiling without overloading the foundation |

### Topic classification

| Topic | Priority | Reason |
|---|---|---|
| Arrays / strings / hashing | **Essential** | Core interview vocabulary and building blocks |
| Two pointers / sliding window / prefix sums | **Essential** | High-value linear-time pattern family |
| Sorting / binary search | **Essential** | Search-space reduction and ordering invariants |
| Linked lists / stacks / queues / deques | **Essential** | Pointer and state-management fundamentals |
| Intervals / greedy | **Essential** | Common optimization and scheduling patterns |
| Trees / BST / heap | **Essential** | Standard non-linear structures |
| Graph BFS/DFS / topo sort | **Essential** | Reachability, dependencies, shortest unweighted paths |
| DSU / shortest paths / MST | **Important** | Strong coverage for graph-heavy interviews |
| 1D / 2D / knapsack / subsequence / string / grid DP | **Essential** | DP is a major interview pattern family |
| Backtracking | **Important** | Constraint search and recursion fluency |
| Trie | **Important** | Useful for prefix/string-search variants |
| Monotonic stack/queue | **Important** | Reusable but more specialized optimization pattern |
| Advanced interval DP / state-machine DP | **Advanced / optional** | Raises ceiling; not every internship interview needs it |
| Segment tree / Fenwick tree | **Advanced / optional** | Valuable for competitive programming and specialized roles; not required for the core SWE path |
| KMP / Z / suffix structures | **Advanced / optional** | Useful for string-heavy roles, usually unnecessary for general SWE interviews |
| Max flow / min-cut | **Advanced / optional** | High specialization; do not sacrifice core interview mastery for it |

## C++ / STL curriculum

| When | C++ skill | Why it matters |
|---|---|---|
| Weeks 1–2 | `vector`, `string`, `array`, `pair`, `tuple`, references, range-for | Daily containers and clean function interfaces |
| Weeks 1–4 | `unordered_map`, `unordered_set`, `map`, `set` | Hash lookup vs ordered lookup and frequency counting |
| Weeks 3–6 | `sort`, lambdas, custom comparators, `reverse` | Sorting + two-pointer/interval/greedy patterns |
| Weeks 4–6 | `stack`, `queue`, `deque` | LIFO/FIFO/window state |
| Weeks 8–10 | `lower_bound`, `upper_bound`, `binary_search` | Binary-search boundaries and ordered containers |
| Weeks 9–12 | `accumulate`, `min/max`, numeric limits, overflow awareness | Prefix sums and safe arithmetic |
| Weeks 13–18 | recursion, lambdas, custom structs/classes | Backtracking and trees |
| Weeks 17–20 | `priority_queue`, custom heap comparator | Top-k, scheduling, shortest-path primitives |
| Weeks 18–20 | custom `Trie`, DSU class, graph adjacency lists | Interview-grade data-structure implementation |
| Weeks 23–28 | write without IDE conveniences; fast templates | Interview/OA speed and debugging |

## Part 3 — 7-month roadmap

### Week 1 — C++ STL + Hashing
- **Concepts:** STL containers, frequency maps, lookup, prefix/suffix thinking
- **Difficulty:** Easy → Medium

### Week 2 — Arrays + Greedy
- **Concepts:** Kadane, in-place operations, buy/sell reasoning, array invariants
- **Difficulty:** Easy → Medium

### Week 3 — Two Pointers
- **Concepts:** Sorted two-pointer reasoning, pair/triple search, boundary invariants
- **Difficulty:** Easy → Medium → Hard

### Week 4 — Sliding Window + Prefix Sums
- **Concepts:** Fixed/variable windows, prefix algebra, subarray counting
- **Difficulty:** Medium → Hard

### Week 5 — Intervals + Stack
- **Concepts:** Sort-and-scan intervals; LIFO state and minimum-stack design
- **Difficulty:** Easy → Medium

### Week 6 — Monotonic Stack + Deque
- **Concepts:** Nearest greater/smaller, histogram, max-window maintenance
- **Difficulty:** Medium → Hard

### Week 7 — Linked Lists I
- **Concepts:** Fast/slow pointers, reversal, merging, deletion
- **Difficulty:** Easy → Medium

### Week 8 — Linked Lists II + Binary Search
- **Concepts:** Complex pointer transformations and search invariants
- **Difficulty:** Medium → Hard

### Week 9 — Binary Search
- **Concepts:** Rotated arrays, answer-space search, advanced boundaries
- **Difficulty:** Medium → Hard

### Week 10 — Matrix + DP Foundations
- **Concepts:** Matrix traversal/in-place state; first 1D DP recurrences
- **Difficulty:** Easy → Medium

### Week 11 — 1D + Knapsack DP
- **Concepts:** State compression, selection/partition, coin-change variants
- **Difficulty:** Medium

### Week 12 — Grid + String DP
- **Concepts:** 2D state tables, subsequences, edit operations, palindrome DP
- **Difficulty:** Medium → Hard

### Week 13 — Backtracking Foundations
- **Concepts:** Decision trees, pruning, subsets/permutations
- **Difficulty:** Medium → Hard

### Week 14 — Backtracking Advanced + Trees Intro
- **Concepts:** Constraint search followed by recursive tree fundamentals
- **Difficulty:** Medium → Hard

### Week 15 — Trees I
- **Concepts:** DFS/BFS, depth, diameter, reconstruction, BST invariants
- **Difficulty:** Easy → Medium

### Week 16 — Trees II
- **Concepts:** LCA, path sums, serialization, tree DP
- **Difficulty:** Medium → Hard

### Week 17 — Traversal + Heaps
- **Concepts:** Iterative traversal, order statistics, priority queues
- **Difficulty:** Easy → Hard

### Week 18 — Trie + Graph Foundations
- **Concepts:** Prefix structures and graph traversal/modeling
- **Difficulty:** Medium → Hard

### Week 19 — Graph BFS/DFS + Topological Sort
- **Concepts:** Connected components, shortest unweighted paths, dependencies
- **Difficulty:** Medium → Hard

### Week 20 — DSU + Shortest Paths + MST
- **Concepts:** Connectivity, Dijkstra, constrained paths, minimum spanning trees
- **Difficulty:** Medium → Hard

### Week 21 — Advanced DP
- **Concepts:** Interval DP, state-machine DP, tree/grid DP, memoized search
- **Difficulty:** Medium → Hard

### Week 22 — Greedy + Monotonic Greedy
- **Concepts:** Jumping, scheduling, reconstruction, greedy proof practice
- **Difficulty:** Medium

### Week 23 — Mixed Interview Recognition I
- **Concepts:** No topic labels; random mixed re-solves
- **Difficulty:** Timed Medium-heavy

### Week 24 — Mixed Interview Recognition II
- **Concepts:** No topic labels; weak-area repair + mocks
- **Difficulty:** Timed Medium-heavy

### Week 25 — OA Simulation Phase
- **Concepts:** Full timed sets; speed, debugging, edge cases
- **Difficulty:** Interview conditions

### Week 26 — Mock Interview Phase I
- **Concepts:** 45–60 minute verbal coding interviews
- **Difficulty:** Interview conditions

### Week 27 — Mock Interview Phase II
- **Concepts:** Harder variants, follow-ups, selected Hards
- **Difficulty:** Interview conditions

### Week 28 — Final Readiness + Taper
- **Concepts:** Blind recognition, failed-problem recovery, final assessment
- **Difficulty:** Interview conditions

## Part 4 — Detailed weekly roadmap

### Week 1: C++ STL + Hashing
**Goal:** STL containers, frequency maps, lookup, prefix/suffix thinking.

**New core problems:** #1 Two Sum, #217 Contains Duplicate, #242 Valid Anagram, #49 Group Anagrams, #347 Top K Frequent Elements, #238 Product of Array Except Self, #36 Valid Sudoku, #128 Longest Consecutive Sequence.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 2: Arrays + Greedy
**Goal:** Kadane, in-place operations, buy/sell reasoning, array invariants.

**New core problems:** #53 Maximum Subarray, #152 Maximum Product Subarray, #121 Best Time to Buy and Sell Stock, #122 Best Time to Buy and Sell Stock II, #189 Rotate Array, #283 Move Zeroes, #88 Merge Sorted Array, #27 Remove Element.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 3: Two Pointers
**Goal:** Sorted two-pointer reasoning, pair/triple search, boundary invariants.

**New core problems:** #26 Remove Duplicates from Sorted Array, #125 Valid Palindrome, #167 Two Sum II - Input Array Is Sorted, #15 3Sum, #11 Container With Most Water, #42 Trapping Rain Water, #3 Longest Substring Without Repeating Characters, #424 Longest Repeating Character Replacement.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 4: Sliding Window + Prefix Sums
**Goal:** Fixed/variable windows, prefix algebra, subarray counting.

**New core problems:** #567 Permutation in String, #438 Find All Anagrams in a String, #76 Minimum Window Substring, #209 Minimum Size Subarray Sum, #560 Subarray Sum Equals K, #974 Subarray Sums Divisible by K, #525 Contiguous Array, #724 Find Pivot Index.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 5: Intervals + Stack
**Goal:** Sort-and-scan intervals; LIFO state and minimum-stack design.

**New core problems:** #303 Range Sum Query - Immutable, #56 Merge Intervals, #57 Insert Interval, #435 Non-overlapping Intervals, #452 Minimum Number of Arrows to Burst Balloons, #986 Interval List Intersections, #20 Valid Parentheses, #155 Min Stack.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 6: Monotonic Stack + Deque
**Goal:** Nearest greater/smaller, histogram, max-window maintenance.

**New core problems:** #150 Evaluate Reverse Polish Notation, #739 Daily Temperatures, #496 Next Greater Element I, #503 Next Greater Element II, #84 Largest Rectangle in Histogram, #239 Sliding Window Maximum, #71 Simplify Path, #394 Decode String.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 7: Linked Lists I
**Goal:** Fast/slow pointers, reversal, merging, deletion.

**New core problems:** #225 Implement Stack using Queues, #232 Implement Queue using Stacks, #141 Linked List Cycle, #142 Linked List Cycle II, #206 Reverse Linked List, #21 Merge Two Sorted Lists, #19 Remove Nth Node From End of List, #143 Reorder List.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 8: Linked Lists II + Binary Search
**Goal:** Complex pointer transformations and search invariants.

**New core problems:** #138 Copy List with Random Pointer, #2 Add Two Numbers, #24 Swap Nodes in Pairs, #25 Reverse Nodes in k-Group, #876 Middle of the Linked List, #160 Intersection of Two Linked Lists, #704 Binary Search, #35 Search Insert Position.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 9: Binary Search
**Goal:** Rotated arrays, answer-space search, advanced boundaries.

**New core problems:** #34 Find First and Last Position of Element in Sorted Array, #33 Search in Rotated Sorted Array, #153 Find Minimum in Rotated Sorted Array, #875 Koko Eating Bananas, #1011 Capacity To Ship Packages Within D Days, #410 Split Array Largest Sum, #4 Median of Two Sorted Arrays, #69 Sqrt(x).
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 10: Matrix + DP Foundations
**Goal:** Matrix traversal/in-place state; first 1D DP recurrences.

**New core problems:** #162 Find Peak Element, #48 Rotate Image, #54 Spiral Matrix, #73 Set Matrix Zeroes, #74 Search a 2D Matrix, #289 Game of Life, #70 Climbing Stairs, #198 House Robber.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 11: 1D + Knapsack DP
**Goal:** State compression, selection/partition, coin-change variants.

**New core problems:** #213 House Robber II, #322 Coin Change, #139 Word Break, #300 Longest Increasing Subsequence, #416 Partition Equal Subset Sum, #494 Target Sum, #518 Coin Change II, #62 Unique Paths.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 12: Grid + String DP
**Goal:** 2D state tables, subsequences, edit operations, palindrome DP.

**New core problems:** #63 Unique Paths II, #64 Minimum Path Sum, #1143 Longest Common Subsequence, #72 Edit Distance, #97 Interleaving String, #516 Longest Palindromic Subsequence, #5 Longest Palindromic Substring, #647 Palindromic Substrings.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 13: Backtracking Foundations
**Goal:** Decision trees, pruning, subsets/permutations.

**New core problems:** #377 Combination Sum IV, #10 Regular Expression Matching, #115 Distinct Subsequences, #131 Palindrome Partitioning, #78 Subsets, #90 Subsets II, #46 Permutations, #47 Permutations II.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 14: Backtracking Advanced + Trees Intro
**Goal:** Constraint search followed by recursive tree fundamentals.

**New core problems:** #39 Combination Sum, #40 Combination Sum II, #17 Letter Combinations of a Phone Number, #22 Generate Parentheses, #79 Word Search, #51 N-Queens, #37 Sudoku Solver, #100 Same Tree.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 15: Trees I
**Goal:** DFS/BFS, depth, diameter, reconstruction, BST invariants.

**New core problems:** #226 Invert Binary Tree, #104 Maximum Depth of Binary Tree, #543 Diameter of Binary Tree, #110 Balanced Binary Tree, #102 Binary Tree Level Order Traversal, #199 Binary Tree Right Side View, #105 Construct Binary Tree from Preorder and Inorder Traversal, #98 Validate Binary Search Tree.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 16: Trees II
**Goal:** LCA, path sums, serialization, tree DP.

**New core problems:** #230 Kth Smallest Element in a BST, #235 Lowest Common Ancestor of a Binary Search Tree, #236 Lowest Common Ancestor of a Binary Tree, #124 Binary Tree Maximum Path Sum, #297 Serialize and Deserialize Binary Tree, #572 Subtree of Another Tree, #437 Path Sum III, #662 Maximum Width of Binary Tree.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 17: Traversal + Heaps
**Goal:** Iterative traversal, order statistics, priority queues.

**New core problems:** #144 Binary Tree Preorder Traversal, #94 Binary Tree Inorder Traversal, #145 Binary Tree Postorder Traversal, #215 Kth Largest Element in an Array, #703 Kth Largest Element in a Stream, #1046 Last Stone Weight, #973 K Closest Points to Origin, #621 Task Scheduler.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 18: Trie + Graph Foundations
**Goal:** Prefix structures and graph traversal/modeling.

**New core problems:** #295 Find Median from Data Stream, #208 Implement Trie (Prefix Tree), #211 Design Add and Search Words Data Structure, #212 Word Search II, #200 Number of Islands, #695 Max Area of Island, #133 Clone Graph, #417 Pacific Atlantic Water Flow.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 19: Graph BFS/DFS + Topological Sort
**Goal:** Connected components, shortest unweighted paths, dependencies.

**New core problems:** #994 Rotting Oranges, #542 01 Matrix, #130 Surrounded Regions, #127 Word Ladder, #210 Course Schedule II, #207 Course Schedule, #684 Redundant Connection, #547 Number of Provinces.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 20: DSU + Shortest Paths + MST
**Goal:** Connectivity, Dijkstra, constrained paths, minimum spanning trees.

**New core problems:** #721 Accounts Merge, #743 Network Delay Time, #787 Cheapest Flights Within K Stops, #1584 Min Cost to Connect All Points, #332 Reconstruct Itinerary, #785 Is Graph Bipartite?, #399 Evaluate Division, #91 Decode Ways.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 21: Advanced DP
**Goal:** Interval DP, state-machine DP, tree/grid DP, memoized search.

**New core problems:** #312 Burst Balloons, #337 House Robber III, #309 Best Time to Buy and Sell Stock with Cooldown, #188 Best Time to Buy and Sell Stock IV, #123 Best Time to Buy and Sell Stock III, #279 Perfect Squares, #140 Word Break II, #329 Longest Increasing Path in a Matrix.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 22: Greedy + Monotonic Greedy
**Goal:** Jumping, scheduling, reconstruction, greedy proof practice.

**New core problems:** #134 Gas Station, #55 Jump Game, #45 Jump Game II, #763 Partition Labels, #406 Queue Reconstruction by Height, #846 Hand of Straights, #316 Remove Duplicate Letters, #678 Valid Parenthesis String.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 23: Mixed Interview Recognition I
**Goal:** No topic labels; random mixed re-solves.

**New core problems:** none; this phase is intentionally dominated by re-solving, random recognition, timed sets, and mocks.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 24: Mixed Interview Recognition II
**Goal:** No topic labels; weak-area repair + mocks.

**New core problems:** none; this phase is intentionally dominated by re-solving, random recognition, timed sets, and mocks.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 25: OA Simulation Phase
**Goal:** Full timed sets; speed, debugging, edge cases.

**New core problems:** none; this phase is intentionally dominated by re-solving, random recognition, timed sets, and mocks.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 26: Mock Interview Phase I
**Goal:** 45–60 minute verbal coding interviews.

**New core problems:** none; this phase is intentionally dominated by re-solving, random recognition, timed sets, and mocks.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 27: Mock Interview Phase II
**Goal:** Harder variants, follow-ups, selected Hards.

**New core problems:** none; this phase is intentionally dominated by re-solving, random recognition, timed sets, and mocks.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

### Week 28: Final Readiness + Taper
**Goal:** Blind recognition, failed-problem recovery, final assessment.

**New core problems:** none; this phase is intentionally dominated by re-solving, random recognition, timed sets, and mocks.
**Weekly checkpoint:**
- Concepts/patterns: explain the week’s patterns from memory without notes.
- Problems completed: record independently solved / hint / editorial / failed / too slow.
- Revisit: choose the 2 problems with the lowest confidence score.
- Mistakes: record one implementation bug and one reasoning mistake.
- Timed assessment: 1 mixed set; stop looking at topic labels.
- Conceptual self-test: explain the recognition trigger, invariant, complexity, and one variation for 3 patterns.
- Ready-to-advance rule: ≥80% of core problems solved independently within the week’s target time **and** you can explain them without reading notes.
- If not ready: carry 2 weak problems into the next week and reduce new work by one problem/day until the backlog is cleared.

## Part 5 — Detailed daily LeetCode schedule

### Daily rules
- **Days 1–4:** two new problems.
- **Day 5:** two spaced re-solves (normally 1-week and 3-week intervals).
- **Day 6:** two timed/mixed re-solves, with topic labels hidden from Week 23 onward.
- **Day 7:** no required new problems; do the weekly checkpoint, error-log review, and a 20–30 minute conceptual self-test.
- If you finish early, do not add random problems. Re-implement one solved problem from a blank file or derive a variant.

### Weeks 1–22: learning phase

#### Week 1
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Two Sum | #1 | Easy | Hashing | Learn | [LeetCode](https://leetcode.com/problems/two-sum/)  |
| 1 | Contains Duplicate | #217 | Easy | Hashing | Learn | [LeetCode](https://leetcode.com/problems/contains-duplicate/)  |
| 2 | Valid Anagram | #242 | Easy | Hashing | Learn | [LeetCode](https://leetcode.com/problems/valid-anagram/)  |
| 2 | Group Anagrams | #49 | Medium | Hashing | Learn | [LeetCode](https://leetcode.com/problems/group-anagrams/)  |
| 3 | Top K Frequent Elements | #347 | Medium | Hashing/Heap | Learn | [LeetCode](https://leetcode.com/problems/top-k-frequent-elements/)  |
| 3 | Product of Array Except Self | #238 | Medium | Prefix/Product | Learn | [LeetCode](https://leetcode.com/problems/product-of-array-except-self/)  |
| 4 | Valid Sudoku | #36 | Medium | Matrix/Hashing | Learn | [LeetCode](https://leetcode.com/problems/valid-sudoku/)  |
| 4 | Longest Consecutive Sequence | #128 | Medium | Hashing | Learn | [LeetCode](https://leetcode.com/problems/longest-consecutive-sequence/)  |
| 5 | Two Sum | #1 | Easy | Hashing | Review | [LeetCode](https://leetcode.com/problems/two-sum/) |
| 5 | Contains Duplicate | #217 | Easy | Hashing | Review | [LeetCode](https://leetcode.com/problems/contains-duplicate/) |
| 6 | Top K Frequent Elements | #347 | Medium | Hashing/Heap | Timed / Mixed | [LeetCode](https://leetcode.com/problems/top-k-frequent-elements/) |
| 6 | Product of Array Except Self | #238 | Medium | Prefix/Product | Timed / Mixed | [LeetCode](https://leetcode.com/problems/product-of-array-except-self/) |
| 7 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 2
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Maximum Subarray | #53 | Medium | Kadane/DP | Learn | [LeetCode](https://leetcode.com/problems/maximum-subarray/)  |
| 1 | Maximum Product Subarray | #152 | Medium | DP | Learn | [LeetCode](https://leetcode.com/problems/maximum-product-subarray/)  |
| 2 | Best Time to Buy and Sell Stock | #121 | Easy | Greedy | Learn | [LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)  |
| 2 | Best Time to Buy and Sell Stock II | #122 | Medium | Greedy | Learn | [LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)  |
| 3 | Rotate Array | #189 | Medium | Array | Learn | [LeetCode](https://leetcode.com/problems/rotate-array/)  |
| 3 | Move Zeroes | #283 | Easy | Two Pointers | Learn | [LeetCode](https://leetcode.com/problems/move-zeroes/)  |
| 4 | Merge Sorted Array | #88 | Easy | Two Pointers | Learn | [LeetCode](https://leetcode.com/problems/merge-sorted-array/)  |
| 4 | Remove Element | #27 | Easy | Two Pointers | Learn | [LeetCode](https://leetcode.com/problems/remove-element/)  |
| 12 | Two Sum | #1 | Easy | Hashing | Review | [LeetCode](https://leetcode.com/problems/two-sum/) |
| 13 | Rotate Array | #189 | Medium | Array | Timed / Mixed | [LeetCode](https://leetcode.com/problems/rotate-array/) |
| 13 | Move Zeroes | #283 | Easy | Two Pointers | Timed / Mixed | [LeetCode](https://leetcode.com/problems/move-zeroes/) |
| 14 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 3
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Remove Duplicates from Sorted Array | #26 | Easy | Two Pointers | Learn | [LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)  |
| 1 | Valid Palindrome | #125 | Easy | Two Pointers | Learn | [LeetCode](https://leetcode.com/problems/valid-palindrome/)  |
| 2 | Two Sum II - Input Array Is Sorted | #167 | Medium | Two Pointers | Learn | [LeetCode](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)  |
| 2 | 3Sum | #15 | Medium | Two Pointers | Learn | [LeetCode](https://leetcode.com/problems/3sum/)  |
| 3 | Container With Most Water | #11 | Medium | Two Pointers | Learn | [LeetCode](https://leetcode.com/problems/container-with-most-water/)  |
| 3 | Trapping Rain Water | #42 | Hard | Two Pointers | Learn | [LeetCode](https://leetcode.com/problems/trapping-rain-water/)  |
| 4 | Longest Substring Without Repeating Characters | #3 | Medium | Sliding Window | Learn | [LeetCode](https://leetcode.com/problems/longest-substring-without-repeating-characters/)  |
| 4 | Longest Repeating Character Replacement | #424 | Medium | Sliding Window | Learn | [LeetCode](https://leetcode.com/problems/longest-repeating-character-replacement/)  |
| 19 | Maximum Subarray | #53 | Medium | Kadane/DP | Review | [LeetCode](https://leetcode.com/problems/maximum-subarray/) |
| 20 | Valid Anagram | #242 | Easy | Hashing | Timed / Mixed | [LeetCode](https://leetcode.com/problems/valid-anagram/) |
| 21 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 4
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Permutation in String | #567 | Medium | Sliding Window | Learn | [LeetCode](https://leetcode.com/problems/permutation-in-string/)  |
| 1 | Find All Anagrams in a String | #438 | Medium | Sliding Window | Learn | [LeetCode](https://leetcode.com/problems/find-all-anagrams-in-a-string/)  |
| 2 | Minimum Window Substring | #76 | Hard | Sliding Window | Learn | [LeetCode](https://leetcode.com/problems/minimum-window-substring/)  |
| 2 | Minimum Size Subarray Sum | #209 | Medium | Sliding Window | Learn | [LeetCode](https://leetcode.com/problems/minimum-size-subarray-sum/)  |
| 3 | Subarray Sum Equals K | #560 | Medium | Prefix Sum/Hashing | Learn | [LeetCode](https://leetcode.com/problems/subarray-sum-equals-k/)  |
| 3 | Subarray Sums Divisible by K | #974 | Medium | Prefix Sum | Learn | [LeetCode](https://leetcode.com/problems/subarray-sums-divisible-by-k/)  |
| 4 | Contiguous Array | #525 | Medium | Prefix Sum | Learn | [LeetCode](https://leetcode.com/problems/contiguous-array/)  |
| 4 | Find Pivot Index | #724 | Easy | Prefix Sum | Learn | [LeetCode](https://leetcode.com/problems/find-pivot-index/)  |
| 26 | Remove Duplicates from Sorted Array | #26 | Easy | Two Pointers | Review | [LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) |
| 26 | Top K Frequent Elements | #347 | Medium | Hashing/Heap | Review | [LeetCode](https://leetcode.com/problems/top-k-frequent-elements/) |
| 27 | Best Time to Buy and Sell Stock | #121 | Easy | Greedy | Timed / Mixed | [LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) |
| 28 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 5
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Range Sum Query - Immutable | #303 | Easy | Prefix Sum | Learn | [LeetCode](https://leetcode.com/problems/range-sum-query-immutable/)  |
| 1 | Merge Intervals | #56 | Medium | Intervals/Sorting | Learn | [LeetCode](https://leetcode.com/problems/merge-intervals/)  |
| 2 | Insert Interval | #57 | Medium | Intervals | Learn | [LeetCode](https://leetcode.com/problems/insert-interval/)  |
| 2 | Non-overlapping Intervals | #435 | Medium | Greedy/Intervals | Learn | [LeetCode](https://leetcode.com/problems/non-overlapping-intervals/)  |
| 3 | Minimum Number of Arrows to Burst Balloons | #452 | Medium | Greedy/Intervals | Learn | [LeetCode](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/)  |
| 3 | Interval List Intersections | #986 | Medium | Two Pointers/Intervals | Learn | [LeetCode](https://leetcode.com/problems/interval-list-intersections/)  |
| 4 | Valid Parentheses | #20 | Easy | Stack | Learn | [LeetCode](https://leetcode.com/problems/valid-parentheses/)  |
| 4 | Min Stack | #155 | Medium | Stack | Learn | [LeetCode](https://leetcode.com/problems/min-stack/)  |
| 33 | Permutation in String | #567 | Medium | Sliding Window | Review | [LeetCode](https://leetcode.com/problems/permutation-in-string/) |
| 33 | Rotate Array | #189 | Medium | Array | Review | [LeetCode](https://leetcode.com/problems/rotate-array/) |
| 34 | Two Sum II - Input Array Is Sorted | #167 | Medium | Two Pointers | Timed / Mixed | [LeetCode](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) |
| 35 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 6
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Evaluate Reverse Polish Notation | #150 | Medium | Stack | Learn | [LeetCode](https://leetcode.com/problems/evaluate-reverse-polish-notation/)  |
| 1 | Daily Temperatures | #739 | Medium | Monotonic Stack | Learn | [LeetCode](https://leetcode.com/problems/daily-temperatures/)  |
| 2 | Next Greater Element I | #496 | Easy | Monotonic Stack | Learn | [LeetCode](https://leetcode.com/problems/next-greater-element-i/)  |
| 2 | Next Greater Element II | #503 | Medium | Monotonic Stack | Learn | [LeetCode](https://leetcode.com/problems/next-greater-element-ii/)  |
| 3 | Largest Rectangle in Histogram | #84 | Hard | Monotonic Stack | Learn | [LeetCode](https://leetcode.com/problems/largest-rectangle-in-histogram/)  |
| 3 | Sliding Window Maximum | #239 | Hard | Deque/Monotonic Queue | Learn | [LeetCode](https://leetcode.com/problems/sliding-window-maximum/)  |
| 4 | Simplify Path | #71 | Medium | Stack | Learn | [LeetCode](https://leetcode.com/problems/simplify-path/)  |
| 4 | Decode String | #394 | Medium | Stack | Learn | [LeetCode](https://leetcode.com/problems/decode-string/)  |
| 40 | Range Sum Query - Immutable | #303 | Easy | Prefix Sum | Review | [LeetCode](https://leetcode.com/problems/range-sum-query-immutable/) |
| 40 | Container With Most Water | #11 | Medium | Two Pointers | Review | [LeetCode](https://leetcode.com/problems/container-with-most-water/) |
| 41 | Minimum Window Substring | #76 | Hard | Sliding Window | Timed / Mixed | [LeetCode](https://leetcode.com/problems/minimum-window-substring/) |
| 41 | Valid Sudoku | #36 | Medium | Matrix/Hashing | Timed / Mixed | [LeetCode](https://leetcode.com/problems/valid-sudoku/) |
| 42 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 7
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Implement Stack using Queues | #225 | Easy | Queue/Stack | Learn | [LeetCode](https://leetcode.com/problems/implement-stack-using-queues/)  |
| 1 | Implement Queue using Stacks | #232 | Easy | Queue/Stack | Learn | [LeetCode](https://leetcode.com/problems/implement-queue-using-stacks/)  |
| 2 | Linked List Cycle | #141 | Easy | Linked List | Learn | [LeetCode](https://leetcode.com/problems/linked-list-cycle/)  |
| 2 | Linked List Cycle II | #142 | Medium | Linked List | Learn | [LeetCode](https://leetcode.com/problems/linked-list-cycle-ii/)  |
| 3 | Reverse Linked List | #206 | Easy | Linked List | Learn | [LeetCode](https://leetcode.com/problems/reverse-linked-list/)  |
| 3 | Merge Two Sorted Lists | #21 | Easy | Linked List | Learn | [LeetCode](https://leetcode.com/problems/merge-two-sorted-lists/)  |
| 4 | Remove Nth Node From End of List | #19 | Medium | Linked List | Learn | [LeetCode](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)  |
| 4 | Reorder List | #143 | Medium | Linked List | Learn | [LeetCode](https://leetcode.com/problems/reorder-list/)  |
| 47 | Evaluate Reverse Polish Notation | #150 | Medium | Stack | Review | [LeetCode](https://leetcode.com/problems/evaluate-reverse-polish-notation/) |
| 47 | Subarray Sum Equals K | #560 | Medium | Prefix Sum/Hashing | Review | [LeetCode](https://leetcode.com/problems/subarray-sum-equals-k/) |
| 48 | Insert Interval | #57 | Medium | Intervals | Timed / Mixed | [LeetCode](https://leetcode.com/problems/insert-interval/) |
| 48 | Merge Sorted Array | #88 | Easy | Two Pointers | Timed / Mixed | [LeetCode](https://leetcode.com/problems/merge-sorted-array/) |
| 49 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 8
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Copy List with Random Pointer | #138 | Medium | Linked List | Learn | [LeetCode](https://leetcode.com/problems/copy-list-with-random-pointer/)  |
| 1 | Add Two Numbers | #2 | Medium | Linked List | Learn | [LeetCode](https://leetcode.com/problems/add-two-numbers/)  |
| 2 | Swap Nodes in Pairs | #24 | Medium | Linked List | Learn | [LeetCode](https://leetcode.com/problems/swap-nodes-in-pairs/)  |
| 2 | Reverse Nodes in k-Group | #25 | Hard | Linked List | Learn | [LeetCode](https://leetcode.com/problems/reverse-nodes-in-k-group/)  |
| 3 | Middle of the Linked List | #876 | Easy | Linked List | Learn | [LeetCode](https://leetcode.com/problems/middle-of-the-linked-list/)  |
| 3 | Intersection of Two Linked Lists | #160 | Easy | Linked List | Learn | [LeetCode](https://leetcode.com/problems/intersection-of-two-linked-lists/)  |
| 4 | Binary Search | #704 | Easy | Binary Search | Learn | [LeetCode](https://leetcode.com/problems/binary-search/)  |
| 4 | Search Insert Position | #35 | Easy | Binary Search | Learn | [LeetCode](https://leetcode.com/problems/search-insert-position/)  |
| 54 | Implement Stack using Queues | #225 | Easy | Queue/Stack | Review | [LeetCode](https://leetcode.com/problems/implement-stack-using-queues/) |
| 54 | Minimum Number of Arrows to Burst Balloons | #452 | Medium | Greedy/Intervals | Review | [LeetCode](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/) |
| 55 | Next Greater Element I | #496 | Easy | Monotonic Stack | Timed / Mixed | [LeetCode](https://leetcode.com/problems/next-greater-element-i/) |
| 55 | Longest Substring Without Repeating Characters | #3 | Medium | Sliding Window | Timed / Mixed | [LeetCode](https://leetcode.com/problems/longest-substring-without-repeating-characters/) |
| 56 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 9
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Find First and Last Position of Element in Sorted Array | #34 | Medium | Binary Search | Learn | [LeetCode](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)  |
| 1 | Search in Rotated Sorted Array | #33 | Medium | Binary Search | Learn | [LeetCode](https://leetcode.com/problems/search-in-rotated-sorted-array/)  |
| 2 | Find Minimum in Rotated Sorted Array | #153 | Medium | Binary Search | Learn | [LeetCode](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)  |
| 2 | Koko Eating Bananas | #875 | Medium | Binary Search on Answer | Learn | [LeetCode](https://leetcode.com/problems/koko-eating-bananas/)  |
| 3 | Capacity To Ship Packages Within D Days | #1011 | Medium | Binary Search on Answer | Learn | [LeetCode](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)  |
| 3 | Split Array Largest Sum | #410 | Hard | Binary Search/DP | Learn | [LeetCode](https://leetcode.com/problems/split-array-largest-sum/)  |
| 4 | Median of Two Sorted Arrays | #4 | Hard | Binary Search | Learn | [LeetCode](https://leetcode.com/problems/median-of-two-sorted-arrays/)  |
| 4 | Sqrt(x) | #69 | Easy | Binary Search | Learn | [LeetCode](https://leetcode.com/problems/sqrt-x/)  |
| 61 | Copy List with Random Pointer | #138 | Medium | Linked List | Review | [LeetCode](https://leetcode.com/problems/copy-list-with-random-pointer/) |
| 61 | Largest Rectangle in Histogram | #84 | Hard | Monotonic Stack | Review | [LeetCode](https://leetcode.com/problems/largest-rectangle-in-histogram/) |
| 62 | Linked List Cycle | #141 | Easy | Linked List | Timed / Mixed | [LeetCode](https://leetcode.com/problems/linked-list-cycle/) |
| 62 | Contiguous Array | #525 | Medium | Prefix Sum | Timed / Mixed | [LeetCode](https://leetcode.com/problems/contiguous-array/) |
| 63 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 10
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Find Peak Element | #162 | Medium | Binary Search | Learn | [LeetCode](https://leetcode.com/problems/find-peak-element/)  |
| 1 | Rotate Image | #48 | Medium | Matrix | Learn | [LeetCode](https://leetcode.com/problems/rotate-image/)  |
| 2 | Spiral Matrix | #54 | Medium | Matrix | Learn | [LeetCode](https://leetcode.com/problems/spiral-matrix/)  |
| 2 | Set Matrix Zeroes | #73 | Medium | Matrix | Learn | [LeetCode](https://leetcode.com/problems/set-matrix-zeroes/)  |
| 3 | Search a 2D Matrix | #74 | Medium | Matrix/Binary Search | Learn | [LeetCode](https://leetcode.com/problems/search-a-2d-matrix/)  |
| 3 | Game of Life | #289 | Medium | Matrix | Learn | [LeetCode](https://leetcode.com/problems/game-of-life/)  |
| 4 | Climbing Stairs | #70 | Easy | 1D DP | Learn | [LeetCode](https://leetcode.com/problems/climbing-stairs/)  |
| 4 | House Robber | #198 | Medium | 1D DP | Learn | [LeetCode](https://leetcode.com/problems/house-robber/)  |
| 68 | Find First and Last Position of Element in Sorted Array | #34 | Medium | Binary Search | Review | [LeetCode](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) |
| 68 | Reverse Linked List | #206 | Easy | Linked List | Review | [LeetCode](https://leetcode.com/problems/reverse-linked-list/) |
| 69 | Swap Nodes in Pairs | #24 | Medium | Linked List | Timed / Mixed | [LeetCode](https://leetcode.com/problems/swap-nodes-in-pairs/) |
| 69 | Valid Parentheses | #20 | Easy | Stack | Timed / Mixed | [LeetCode](https://leetcode.com/problems/valid-parentheses/) |
| 70 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 11
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | House Robber II | #213 | Medium | 1D DP | Learn | [LeetCode](https://leetcode.com/problems/house-robber-ii/)  |
| 1 | Coin Change | #322 | Medium | 1D DP | Learn | [LeetCode](https://leetcode.com/problems/coin-change/)  |
| 2 | Word Break | #139 | Medium | 1D DP | Learn | [LeetCode](https://leetcode.com/problems/word-break/)  |
| 2 | Longest Increasing Subsequence | #300 | Medium | DP/Binary Search | Learn | [LeetCode](https://leetcode.com/problems/longest-increasing-subsequence/)  |
| 3 | Partition Equal Subset Sum | #416 | Medium | Knapsack DP | Learn | [LeetCode](https://leetcode.com/problems/partition-equal-subset-sum/)  |
| 3 | Target Sum | #494 | Medium | Knapsack DP | Learn | [LeetCode](https://leetcode.com/problems/target-sum/)  |
| 4 | Coin Change II | #518 | Medium | Knapsack DP | Learn | [LeetCode](https://leetcode.com/problems/coin-change-ii/)  |
| 4 | Unique Paths | #62 | Medium | Grid DP | Learn | [LeetCode](https://leetcode.com/problems/unique-paths/)  |
| 75 | Find Peak Element | #162 | Medium | Binary Search | Review | [LeetCode](https://leetcode.com/problems/find-peak-element/) |
| 75 | Middle of the Linked List | #876 | Easy | Linked List | Review | [LeetCode](https://leetcode.com/problems/middle-of-the-linked-list/) |
| 76 | Find Minimum in Rotated Sorted Array | #153 | Medium | Binary Search | Timed / Mixed | [LeetCode](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) |
| 76 | Simplify Path | #71 | Medium | Stack | Timed / Mixed | [LeetCode](https://leetcode.com/problems/simplify-path/) |
| 77 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 12
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Unique Paths II | #63 | Medium | Grid DP | Learn | [LeetCode](https://leetcode.com/problems/unique-paths-ii/)  |
| 1 | Minimum Path Sum | #64 | Medium | Grid DP | Learn | [LeetCode](https://leetcode.com/problems/minimum-path-sum/)  |
| 2 | Longest Common Subsequence | #1143 | Medium | 2D DP | Learn | [LeetCode](https://leetcode.com/problems/longest-common-subsequence/)  |
| 2 | Edit Distance | #72 | Hard | String DP | Learn | [LeetCode](https://leetcode.com/problems/edit-distance/)  |
| 3 | Interleaving String | #97 | Medium | String DP | Learn | [LeetCode](https://leetcode.com/problems/interleaving-string/)  |
| 3 | Longest Palindromic Subsequence | #516 | Medium | String DP | Learn | [LeetCode](https://leetcode.com/problems/longest-palindromic-subsequence/)  |
| 4 | Longest Palindromic Substring | #5 | Medium | String DP | Learn | [LeetCode](https://leetcode.com/problems/longest-palindromic-substring/)  |
| 4 | Palindromic Substrings | #647 | Medium | String DP | Learn | [LeetCode](https://leetcode.com/problems/palindromic-substrings/)  |
| 82 | House Robber II | #213 | Medium | 1D DP | Review | [LeetCode](https://leetcode.com/problems/house-robber-ii/) |
| 82 | Capacity To Ship Packages Within D Days | #1011 | Medium | Binary Search on Answer | Review | [LeetCode](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/) |
| 83 | Spiral Matrix | #54 | Medium | Matrix | Timed / Mixed | [LeetCode](https://leetcode.com/problems/spiral-matrix/) |
| 83 | Remove Nth Node From End of List | #19 | Medium | Linked List | Timed / Mixed | [LeetCode](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) |
| 84 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 13
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Combination Sum IV | #377 | Medium | DP | Learn | [LeetCode](https://leetcode.com/problems/combination-sum-iv/)  |
| 1 | Regular Expression Matching | #10 | Hard | DP | Learn | [LeetCode](https://leetcode.com/problems/regular-expression-matching/)  |
| 2 | Distinct Subsequences | #115 | Hard | String DP | Learn | [LeetCode](https://leetcode.com/problems/distinct-subsequences/)  |
| 2 | Palindrome Partitioning | #131 | Medium | Backtracking | Learn | [LeetCode](https://leetcode.com/problems/palindrome-partitioning/)  |
| 3 | Subsets | #78 | Medium | Backtracking | Learn | [LeetCode](https://leetcode.com/problems/subsets/)  |
| 3 | Subsets II | #90 | Medium | Backtracking | Learn | [LeetCode](https://leetcode.com/problems/subsets-ii/)  |
| 4 | Permutations | #46 | Medium | Backtracking | Learn | [LeetCode](https://leetcode.com/problems/permutations/)  |
| 4 | Permutations II | #47 | Medium | Backtracking | Learn | [LeetCode](https://leetcode.com/problems/permutations-ii/)  |
| 89 | Unique Paths II | #63 | Medium | Grid DP | Review | [LeetCode](https://leetcode.com/problems/unique-paths-ii/) |
| 89 | Search a 2D Matrix | #74 | Medium | Matrix/Binary Search | Review | [LeetCode](https://leetcode.com/problems/search-a-2d-matrix/) |
| 90 | Word Break | #139 | Medium | 1D DP | Timed / Mixed | [LeetCode](https://leetcode.com/problems/word-break/) |
| 90 | Binary Search | #704 | Easy | Binary Search | Timed / Mixed | [LeetCode](https://leetcode.com/problems/binary-search/) |
| 91 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 14
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Combination Sum | #39 | Medium | Backtracking | Learn | [LeetCode](https://leetcode.com/problems/combination-sum/)  |
| 1 | Combination Sum II | #40 | Medium | Backtracking | Learn | [LeetCode](https://leetcode.com/problems/combination-sum-ii/)  |
| 2 | Letter Combinations of a Phone Number | #17 | Medium | Backtracking | Learn | [LeetCode](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)  |
| 2 | Generate Parentheses | #22 | Medium | Backtracking | Learn | [LeetCode](https://leetcode.com/problems/generate-parentheses/)  |
| 3 | Word Search | #79 | Medium | Backtracking | Learn | [LeetCode](https://leetcode.com/problems/word-search/)  |
| 3 | N-Queens | #51 | Hard | Backtracking | Learn | [LeetCode](https://leetcode.com/problems/n-queens/)  |
| 4 | Sudoku Solver | #37 | Hard | Backtracking | Learn | [LeetCode](https://leetcode.com/problems/sudoku-solver/)  |
| 4 | Same Tree | #100 | Easy | Tree DFS | Learn | [LeetCode](https://leetcode.com/problems/same-tree/)  |
| 96 | Combination Sum IV | #377 | Medium | DP | Review | [LeetCode](https://leetcode.com/problems/combination-sum-iv/) |
| 96 | Partition Equal Subset Sum | #416 | Medium | Knapsack DP | Review | [LeetCode](https://leetcode.com/problems/partition-equal-subset-sum/) |
| 97 | Longest Common Subsequence | #1143 | Medium | 2D DP | Timed / Mixed | [LeetCode](https://leetcode.com/problems/longest-common-subsequence/) |
| 97 | Median of Two Sorted Arrays | #4 | Hard | Binary Search | Timed / Mixed | [LeetCode](https://leetcode.com/problems/median-of-two-sorted-arrays/) |
| 98 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 15
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Invert Binary Tree | #226 | Easy | Tree DFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/invert-binary-tree/)  |
| 1 | Maximum Depth of Binary Tree | #104 | Easy | Tree DFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/maximum-depth-of-binary-tree/)  |
| 2 | Diameter of Binary Tree | #543 | Easy | Tree DFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/diameter-of-binary-tree/)  |
| 2 | Balanced Binary Tree | #110 | Easy | Tree DFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/balanced-binary-tree/)  |
| 3 | Binary Tree Level Order Traversal | #102 | Medium | Tree BFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/binary-tree-level-order-traversal/)  |
| 3 | Binary Tree Right Side View | #199 | Medium | Tree BFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/binary-tree-right-side-view/)  |
| 4 | Construct Binary Tree from Preorder and Inorder Traversal | #105 | Medium | Tree Recursion | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)  |
| 4 | Validate Binary Search Tree | #98 | Medium | BST | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/validate-binary-search-tree/)  |
| 103 | Combination Sum | #39 | Medium | Backtracking | Review | [LeetCode](https://leetcode.com/problems/combination-sum/) |
| 103 | Interleaving String | #97 | Medium | String DP | Review | [LeetCode](https://leetcode.com/problems/interleaving-string/) |
| 104 | Distinct Subsequences | #115 | Hard | String DP | Timed / Mixed | [LeetCode](https://leetcode.com/problems/distinct-subsequences/) |
| 104 | Climbing Stairs | #70 | Easy | 1D DP | Timed / Mixed | [LeetCode](https://leetcode.com/problems/climbing-stairs/) |
| 105 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 16
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Kth Smallest Element in a BST | #230 | Medium | BST | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)  |
| 1 | Lowest Common Ancestor of a Binary Search Tree | #235 | Medium | BST | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)  |
| 2 | Lowest Common Ancestor of a Binary Tree | #236 | Medium | Tree DFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)  |
| 2 | Binary Tree Maximum Path Sum | #124 | Hard | Tree DP | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/binary-tree-maximum-path-sum/)  |
| 3 | Serialize and Deserialize Binary Tree | #297 | Hard | Tree Design | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)  |
| 3 | Subtree of Another Tree | #572 | Easy | Tree DFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/subtree-of-another-tree/)  |
| 4 | Path Sum III | #437 | Medium | Tree Prefix Sum | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/path-sum-iii/)  |
| 4 | Maximum Width of Binary Tree | #662 | Medium | Tree BFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/maximum-width-of-binary-tree/)  |
| 110 | Invert Binary Tree | #226 | Easy | Tree DFS | Review | [LeetCode](https://leetcode.com/problems/invert-binary-tree/) |
| 110 | Subsets | #78 | Medium | Backtracking | Review | [LeetCode](https://leetcode.com/problems/subsets/) |
| 111 | Letter Combinations of a Phone Number | #17 | Medium | Backtracking | Timed / Mixed | [LeetCode](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) |
| 111 | Coin Change II | #518 | Medium | Knapsack DP | Timed / Mixed | [LeetCode](https://leetcode.com/problems/coin-change-ii/) |
| 112 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 17
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Binary Tree Preorder Traversal | #144 | Easy | Tree Traversal | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/binary-tree-preorder-traversal/)  |
| 1 | Binary Tree Inorder Traversal | #94 | Easy | Tree Traversal | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/binary-tree-inorder-traversal/)  |
| 2 | Binary Tree Postorder Traversal | #145 | Easy | Tree Traversal | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/binary-tree-postorder-traversal/)  |
| 2 | Kth Largest Element in an Array | #215 | Medium | Heap/Quickselect | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/kth-largest-element-in-an-array/)  |
| 3 | Kth Largest Element in a Stream | #703 | Easy | Heap | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/kth-largest-element-in-a-stream/)  |
| 3 | Last Stone Weight | #1046 | Easy | Heap | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/last-stone-weight/)  |
| 4 | K Closest Points to Origin | #973 | Medium | Heap | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/k-closest-points-to-origin/)  |
| 4 | Task Scheduler | #621 | Medium | Greedy/Heap | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/task-scheduler/)  |
| 117 | Kth Smallest Element in a BST | #230 | Medium | BST | Review | [LeetCode](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) |
| 117 | Word Search | #79 | Medium | Backtracking | Review | [LeetCode](https://leetcode.com/problems/word-search/) |
| 118 | Diameter of Binary Tree | #543 | Easy | Tree DFS | Timed / Mixed | [LeetCode](https://leetcode.com/problems/diameter-of-binary-tree/) |
| 118 | Longest Palindromic Substring | #5 | Medium | String DP | Timed / Mixed | [LeetCode](https://leetcode.com/problems/longest-palindromic-substring/) |
| 119 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 18
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Find Median from Data Stream | #295 | Hard | Two Heaps | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/find-median-from-data-stream/)  |
| 1 | Implement Trie (Prefix Tree) | #208 | Medium | Trie | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/implement-trie-prefix-tree/)  |
| 2 | Design Add and Search Words Data Structure | #211 | Medium | Trie/DFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/design-add-and-search-words-data-structure/)  |
| 2 | Word Search II | #212 | Hard | Trie/Backtracking | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/word-search-ii/)  |
| 3 | Number of Islands | #200 | Medium | Graph DFS/BFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/number-of-islands/)  |
| 3 | Max Area of Island | #695 | Medium | Graph DFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/max-area-of-island/)  |
| 4 | Clone Graph | #133 | Medium | Graph BFS/DFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/clone-graph/)  |
| 4 | Pacific Atlantic Water Flow | #417 | Medium | Graph DFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/pacific-atlantic-water-flow/)  |
| 124 | Binary Tree Preorder Traversal | #144 | Easy | Tree Traversal | Review | [LeetCode](https://leetcode.com/problems/binary-tree-preorder-traversal/) |
| 124 | Binary Tree Level Order Traversal | #102 | Medium | Tree BFS | Review | [LeetCode](https://leetcode.com/problems/binary-tree-level-order-traversal/) |
| 125 | Lowest Common Ancestor of a Binary Tree | #236 | Medium | Tree DFS | Timed / Mixed | [LeetCode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) |
| 125 | Permutations | #46 | Medium | Backtracking | Timed / Mixed | [LeetCode](https://leetcode.com/problems/permutations/) |
| 126 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 19
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Rotting Oranges | #994 | Medium | Graph BFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/rotting-oranges/)  |
| 1 | 01 Matrix | #542 | Medium | Graph BFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/01-matrix/)  |
| 2 | Surrounded Regions | #130 | Medium | Graph DFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/surrounded-regions/)  |
| 2 | Word Ladder | #127 | Hard | Graph BFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/word-ladder/)  |
| 3 | Course Schedule II | #210 | Medium | Topological Sort | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/course-schedule-ii/)  |
| 3 | Course Schedule | #207 | Medium | Topological Sort | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/course-schedule/)  |
| 4 | Redundant Connection | #684 | Medium | DSU | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/redundant-connection/)  |
| 4 | Number of Provinces | #547 | Medium | DSU | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/number-of-provinces/)  |
| 131 | Find Median from Data Stream | #295 | Hard | Two Heaps | Review | [LeetCode](https://leetcode.com/problems/find-median-from-data-stream/) |
| 131 | Serialize and Deserialize Binary Tree | #297 | Hard | Tree Design | Review | [LeetCode](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) |
| 132 | Binary Tree Postorder Traversal | #145 | Easy | Tree Traversal | Timed / Mixed | [LeetCode](https://leetcode.com/problems/binary-tree-postorder-traversal/) |
| 132 | Sudoku Solver | #37 | Hard | Backtracking | Timed / Mixed | [LeetCode](https://leetcode.com/problems/sudoku-solver/) |
| 133 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 20
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Accounts Merge | #721 | Medium | DSU | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/accounts-merge/)  |
| 1 | Network Delay Time | #743 | Medium | Dijkstra | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/network-delay-time/)  |
| 2 | Cheapest Flights Within K Stops | #787 | Medium | Shortest Path/DP | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/cheapest-flights-within-k-stops/)  |
| 2 | Min Cost to Connect All Points | #1584 | Medium | MST | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/min-cost-to-connect-all-points/)  |
| 3 | Reconstruct Itinerary | #332 | Hard | Eulerian Path/Graph | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/reconstruct-itinerary/)  |
| 3 | Is Graph Bipartite? | #785 | Medium | Graph Coloring | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/is-graph-bipartite/)  |
| 4 | Evaluate Division | #399 | Medium | Graph DFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/evaluate-division/)  |
| 4 | Decode Ways | #91 | Medium | DP | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/decode-ways/)  |
| 138 | Rotting Oranges | #994 | Medium | Graph BFS | Review | [LeetCode](https://leetcode.com/problems/rotting-oranges/) |
| 138 | Kth Largest Element in a Stream | #703 | Easy | Heap | Review | [LeetCode](https://leetcode.com/problems/kth-largest-element-in-a-stream/) |
| 139 | Design Add and Search Words Data Structure | #211 | Medium | Trie/DFS | Timed / Mixed | [LeetCode](https://leetcode.com/problems/design-add-and-search-words-data-structure/) |
| 139 | Construct Binary Tree from Preorder and Inorder Traversal | #105 | Medium | Tree Recursion | Timed / Mixed | [LeetCode](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) |
| 140 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 21
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Burst Balloons | #312 | Hard | Interval DP | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/burst-balloons/)  |
| 1 | House Robber III | #337 | Medium | Tree DP | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/house-robber-iii/)  |
| 2 | Best Time to Buy and Sell Stock with Cooldown | #309 | Medium | DP | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)  |
| 2 | Best Time to Buy and Sell Stock IV | #188 | Hard | DP | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/)  |
| 3 | Best Time to Buy and Sell Stock III | #123 | Hard | DP | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)  |
| 3 | Perfect Squares | #279 | Medium | DP/BFS | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/perfect-squares/)  |
| 4 | Word Break II | #140 | Hard | DP/Backtracking | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/word-break-ii/)  |
| 4 | Longest Increasing Path in a Matrix | #329 | Hard | DFS/DP | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/)  |
| 145 | Accounts Merge | #721 | Medium | DSU | Review | [LeetCode](https://leetcode.com/problems/accounts-merge/) |
| 145 | Number of Islands | #200 | Medium | Graph DFS/BFS | Review | [LeetCode](https://leetcode.com/problems/number-of-islands/) |
| 146 | Surrounded Regions | #130 | Medium | Graph DFS | Timed / Mixed | [LeetCode](https://leetcode.com/problems/surrounded-regions/) |
| 146 | Path Sum III | #437 | Medium | Tree Prefix Sum | Timed / Mixed | [LeetCode](https://leetcode.com/problems/path-sum-iii/) |
| 147 | — | — | — | Weekly checkpoint | Review / Rest | — |

#### Week 22
| Day | Problem | LC # | Difficulty | Pattern | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 1 | Gas Station | #134 | Medium | Greedy | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/gas-station/)  |
| 1 | Jump Game | #55 | Medium | Greedy | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/jump-game/)  |
| 2 | Jump Game II | #45 | Medium | Greedy | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/jump-game-ii/)  |
| 2 | Partition Labels | #763 | Medium | Greedy | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/partition-labels/)  |
| 3 | Queue Reconstruction by Height | #406 | Medium | Greedy/Sorting | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/queue-reconstruction-by-height/)  |
| 3 | Hand of Straights | #846 | Medium | Greedy/Hashing | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/hand-of-straights/)  |
| 4 | Remove Duplicate Letters | #316 | Medium | Monotonic Stack/Greedy | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/remove-duplicate-letters/)  |
| 4 | Valid Parenthesis String | #678 | Medium | Greedy | Learn / Reinforce | [LeetCode](https://leetcode.com/problems/valid-parenthesis-string/)  |
| 152 | Burst Balloons | #312 | Hard | Interval DP | Review | [LeetCode](https://leetcode.com/problems/burst-balloons/) |
| 152 | Course Schedule II | #210 | Medium | Topological Sort | Review | [LeetCode](https://leetcode.com/problems/course-schedule-ii/) |
| 153 | Cheapest Flights Within K Stops | #787 | Medium | Shortest Path/DP | Timed / Mixed | [LeetCode](https://leetcode.com/problems/cheapest-flights-within-k-stops/) |
| 153 | K Closest Points to Origin | #973 | Medium | Heap | Timed / Mixed | [LeetCode](https://leetcode.com/problems/k-closest-points-to-origin/) |
| 154 | — | — | — | Weekly checkpoint | Review / Rest | — |

### Weeks 23–28: interview phase

These weeks intentionally stop teaching the pattern in the daily schedule. The problem card still contains the pattern for later review, but the daily task should be presented to yourself only as a problem title/link.

#### Week 23 — Mixed Interview Recognition I
| Day | Problem | LC # | Difficulty | Pattern visibility | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 155 | Split Array Largest Sum | #410 | Hard | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/split-array-largest-sum/) |
| 155 | Coin Change II | #518 | Medium | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/coin-change-ii/) |
| 156 | Coin Change II | #518 | Medium | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/coin-change-ii/) |
| 156 | Permutations II | #47 | Medium | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/permutations-ii/) |
| 157 | Permutations II | #47 | Medium | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/permutations-ii/) |
| 157 | Kth Smallest Element in a BST | #230 | Medium | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) |
| 158 | Kth Smallest Element in a BST | #230 | Medium | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) |
| 158 | Implement Trie (Prefix Tree) | #208 | Medium | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/implement-trie-prefix-tree/) |
| 159 | Split Array Largest Sum | #410 | Hard | **Hidden** | OA-style | [LeetCode](https://leetcode.com/problems/split-array-largest-sum/) |
| 159 | Coin Change II | #518 | Medium | **Hidden** | OA-style | [LeetCode](https://leetcode.com/problems/coin-change-ii/) |
| 160 | Coin Change II | #518 | Medium | **Hidden** | Mock interview | [LeetCode](https://leetcode.com/problems/coin-change-ii/) |
| 160 | Permutations II | #47 | Medium | **Hidden** | Mock interview | [LeetCode](https://leetcode.com/problems/permutations-ii/) |
| 161 | — | — | — | — | Weekly checkpoint / recovery | — |

#### Week 24 — Mixed Interview Recognition II
| Day | Problem | LC # | Difficulty | Pattern visibility | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 162 | Find Peak Element | #162 | Medium | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/find-peak-element/) |
| 162 | Minimum Path Sum | #64 | Medium | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/minimum-path-sum/) |
| 163 | Minimum Path Sum | #64 | Medium | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/minimum-path-sum/) |
| 163 | Letter Combinations of a Phone Number | #17 | Medium | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) |
| 164 | Letter Combinations of a Phone Number | #17 | Medium | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) |
| 164 | Binary Tree Maximum Path Sum | #124 | Hard | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/binary-tree-maximum-path-sum/) |
| 165 | Binary Tree Maximum Path Sum | #124 | Hard | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/binary-tree-maximum-path-sum/) |
| 165 | Number of Islands | #200 | Medium | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/number-of-islands/) |
| 166 | Find Peak Element | #162 | Medium | **Hidden** | OA-style | [LeetCode](https://leetcode.com/problems/find-peak-element/) |
| 166 | Minimum Path Sum | #64 | Medium | **Hidden** | OA-style | [LeetCode](https://leetcode.com/problems/minimum-path-sum/) |
| 167 | Minimum Path Sum | #64 | Medium | **Hidden** | Mock interview | [LeetCode](https://leetcode.com/problems/minimum-path-sum/) |
| 167 | Letter Combinations of a Phone Number | #17 | Medium | **Hidden** | Mock interview | [LeetCode](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) |
| 168 | — | — | — | — | Weekly checkpoint / recovery | — |

#### Week 25 — OA Simulation Phase
| Day | Problem | LC # | Difficulty | Pattern visibility | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 169 | Set Matrix Zeroes | #73 | Medium | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/set-matrix-zeroes/) |
| 169 | Interleaving String | #97 | Medium | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/interleaving-string/) |
| 170 | Interleaving String | #97 | Medium | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/interleaving-string/) |
| 170 | N-Queens | #51 | Hard | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/n-queens/) |
| 171 | N-Queens | #51 | Hard | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/n-queens/) |
| 171 | Path Sum III | #437 | Medium | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/path-sum-iii/) |
| 172 | Path Sum III | #437 | Medium | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/path-sum-iii/) |
| 172 | Pacific Atlantic Water Flow | #417 | Medium | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/pacific-atlantic-water-flow/) |
| 173 | Set Matrix Zeroes | #73 | Medium | **Hidden** | OA-style | [LeetCode](https://leetcode.com/problems/set-matrix-zeroes/) |
| 173 | Interleaving String | #97 | Medium | **Hidden** | OA-style | [LeetCode](https://leetcode.com/problems/interleaving-string/) |
| 174 | Interleaving String | #97 | Medium | **Hidden** | Mock interview | [LeetCode](https://leetcode.com/problems/interleaving-string/) |
| 174 | N-Queens | #51 | Hard | **Hidden** | Mock interview | [LeetCode](https://leetcode.com/problems/n-queens/) |
| 175 | — | — | — | — | Weekly checkpoint / recovery | — |

#### Week 26 — Mock Interview Phase I
| Day | Problem | LC # | Difficulty | Pattern visibility | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 176 | Climbing Stairs | #70 | Easy | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/climbing-stairs/) |
| 176 | Palindromic Substrings | #647 | Medium | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/palindromic-substrings/) |
| 177 | Palindromic Substrings | #647 | Medium | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/palindromic-substrings/) |
| 177 | Invert Binary Tree | #226 | Easy | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/invert-binary-tree/) |
| 178 | Invert Binary Tree | #226 | Easy | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/invert-binary-tree/) |
| 178 | Binary Tree Inorder Traversal | #94 | Easy | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/binary-tree-inorder-traversal/) |
| 179 | Binary Tree Inorder Traversal | #94 | Easy | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/binary-tree-inorder-traversal/) |
| 179 | Surrounded Regions | #130 | Medium | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/surrounded-regions/) |
| 180 | Climbing Stairs | #70 | Easy | **Hidden** | OA-style | [LeetCode](https://leetcode.com/problems/climbing-stairs/) |
| 180 | Palindromic Substrings | #647 | Medium | **Hidden** | OA-style | [LeetCode](https://leetcode.com/problems/palindromic-substrings/) |
| 181 | Palindromic Substrings | #647 | Medium | **Hidden** | Mock interview | [LeetCode](https://leetcode.com/problems/palindromic-substrings/) |
| 181 | Invert Binary Tree | #226 | Easy | **Hidden** | Mock interview | [LeetCode](https://leetcode.com/problems/invert-binary-tree/) |
| 182 | — | — | — | — | Weekly checkpoint / recovery | — |

#### Week 27 — Mock Interview Phase II
| Day | Problem | LC # | Difficulty | Pattern visibility | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 183 | Coin Change | #322 | Medium | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/coin-change/) |
| 183 | Distinct Subsequences | #115 | Hard | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/distinct-subsequences/) |
| 184 | Distinct Subsequences | #115 | Hard | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/distinct-subsequences/) |
| 184 | Balanced Binary Tree | #110 | Easy | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/balanced-binary-tree/) |
| 185 | Balanced Binary Tree | #110 | Easy | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/balanced-binary-tree/) |
| 185 | Kth Largest Element in a Stream | #703 | Easy | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/kth-largest-element-in-a-stream/) |
| 186 | Kth Largest Element in a Stream | #703 | Easy | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/kth-largest-element-in-a-stream/) |
| 186 | Course Schedule | #207 | Medium | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/course-schedule/) |
| 187 | Coin Change | #322 | Medium | **Hidden** | OA-style | [LeetCode](https://leetcode.com/problems/coin-change/) |
| 187 | Distinct Subsequences | #115 | Hard | **Hidden** | OA-style | [LeetCode](https://leetcode.com/problems/distinct-subsequences/) |
| 188 | Distinct Subsequences | #115 | Hard | **Hidden** | Mock interview | [LeetCode](https://leetcode.com/problems/distinct-subsequences/) |
| 188 | Balanced Binary Tree | #110 | Easy | **Hidden** | Mock interview | [LeetCode](https://leetcode.com/problems/balanced-binary-tree/) |
| 189 | — | — | — | — | Weekly checkpoint / recovery | — |

#### Week 28 — Final Readiness + Taper
| Day | Problem | LC # | Difficulty | Pattern visibility | Type | Direct link |
|---:|---|---:|---|---|---|---|
| 190 | Partition Equal Subset Sum | #416 | Medium | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/partition-equal-subset-sum/) |
| 190 | Subsets II | #90 | Medium | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/subsets-ii/) |
| 191 | Subsets II | #90 | Medium | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/subsets-ii/) |
| 191 | Construct Binary Tree from Preorder and Inorder Traversal | #105 | Medium | **Hidden** | Blind recognition | [LeetCode](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) |
| 192 | Construct Binary Tree from Preorder and Inorder Traversal | #105 | Medium | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) |
| 192 | Task Scheduler | #621 | Medium | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/task-scheduler/) |
| 193 | Task Scheduler | #621 | Medium | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/task-scheduler/) |
| 193 | Accounts Merge | #721 | Medium | **Hidden** | Timed | [LeetCode](https://leetcode.com/problems/accounts-merge/) |
| 194 | Partition Equal Subset Sum | #416 | Medium | **Hidden** | OA-style | [LeetCode](https://leetcode.com/problems/partition-equal-subset-sum/) |
| 194 | Subsets II | #90 | Medium | **Hidden** | OA-style | [LeetCode](https://leetcode.com/problems/subsets-ii/) |
| 195 | Subsets II | #90 | Medium | **Hidden** | Mock interview | [LeetCode](https://leetcode.com/problems/subsets-ii/) |
| 195 | Construct Binary Tree from Preorder and Inorder Traversal | #105 | Medium | **Hidden** | Mock interview | [LeetCode](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) |
| 196 | — | — | — | — | Weekly checkpoint / recovery | — |

## Part 6 — Problem cards: exact title, number, difficulty, pattern, purpose, and direct link

The daily schedule references these cards. Each core problem has a single canonical card so the curriculum does not become an unreadable wall of duplicated metadata.

| # | Problem | Difficulty | Pattern | Purpose | Direct link |
|---:|---|---|---|---|---|
| 1 | Two Sum | Easy | Hashing | Build fast lookup/frequency reasoning and learn when extra O(n) space buys an O(n) solution. | [Open](https://leetcode.com/problems/two-sum/) |
| 217 | Contains Duplicate | Easy | Hashing | Build fast lookup/frequency reasoning and learn when extra O(n) space buys an O(n) solution. | [Open](https://leetcode.com/problems/contains-duplicate/) |
| 242 | Valid Anagram | Easy | Hashing | Build fast lookup/frequency reasoning and learn when extra O(n) space buys an O(n) solution. | [Open](https://leetcode.com/problems/valid-anagram/) |
| 49 | Group Anagrams | Medium | Hashing | Build fast lookup/frequency reasoning and learn when extra O(n) space buys an O(n) solution. | [Open](https://leetcode.com/problems/group-anagrams/) |
| 347 | Top K Frequent Elements | Medium | Hashing/Heap | Combine frequency counting with a top-k data-structure choice. | [Open](https://leetcode.com/problems/top-k-frequent-elements/) |
| 238 | Product of Array Except Self | Medium | Prefix/Product | Recognize prefix/suffix accumulation when division or nested loops are undesirable. | [Open](https://leetcode.com/problems/product-of-array-except-self/) |
| 36 | Valid Sudoku | Medium | Matrix/Hashing | Practice state validation across a 2D structure using constant/linear auxiliary state. | [Open](https://leetcode.com/problems/valid-sudoku/) |
| 128 | Longest Consecutive Sequence | Medium | Hashing | Build fast lookup/frequency reasoning and learn when extra O(n) space buys an O(n) solution. | [Open](https://leetcode.com/problems/longest-consecutive-sequence/) |
| 53 | Maximum Subarray | Medium | Kadane/DP | Learn the running-state invariant behind maximum-subarray optimization. | [Open](https://leetcode.com/problems/maximum-subarray/) |
| 152 | Maximum Product Subarray | Medium | DP | Train state definition and transition thinking without relying on brute-force recursion. | [Open](https://leetcode.com/problems/maximum-product-subarray/) |
| 121 | Best Time to Buy and Sell Stock | Easy | Greedy | Learn to identify a local decision that can be justified globally. | [Open](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) |
| 122 | Best Time to Buy and Sell Stock II | Medium | Greedy | Learn to identify a local decision that can be justified globally. | [Open](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/) |
| 189 | Rotate Array | Medium | Array | Practice in-place array transformation and careful index management. | [Open](https://leetcode.com/problems/rotate-array/) |
| 283 | Move Zeroes | Easy | Two Pointers | Learn how sorted/order or boundary structure lets two indices eliminate search space. | [Open](https://leetcode.com/problems/move-zeroes/) |
| 88 | Merge Sorted Array | Easy | Two Pointers | Learn how sorted/order or boundary structure lets two indices eliminate search space. | [Open](https://leetcode.com/problems/merge-sorted-array/) |
| 27 | Remove Element | Easy | Two Pointers | Learn how sorted/order or boundary structure lets two indices eliminate search space. | [Open](https://leetcode.com/problems/remove-element/) |
| 26 | Remove Duplicates from Sorted Array | Easy | Two Pointers | Learn how sorted/order or boundary structure lets two indices eliminate search space. | [Open](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) |
| 125 | Valid Palindrome | Easy | Two Pointers | Learn how sorted/order or boundary structure lets two indices eliminate search space. | [Open](https://leetcode.com/problems/valid-palindrome/) |
| 167 | Two Sum II - Input Array Is Sorted | Medium | Two Pointers | Learn how sorted/order or boundary structure lets two indices eliminate search space. | [Open](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) |
| 15 | 3Sum | Medium | Two Pointers | Learn how sorted/order or boundary structure lets two indices eliminate search space. | [Open](https://leetcode.com/problems/3sum/) |
| 11 | Container With Most Water | Medium | Two Pointers | Learn how sorted/order or boundary structure lets two indices eliminate search space. | [Open](https://leetcode.com/problems/container-with-most-water/) |
| 42 | Trapping Rain Water | Hard | Two Pointers | Learn how sorted/order or boundary structure lets two indices eliminate search space. | [Open](https://leetcode.com/problems/trapping-rain-water/) |
| 3 | Longest Substring Without Repeating Characters | Medium | Sliding Window | Recognize contiguous-range problems where a moving window maintains a validity condition. | [Open](https://leetcode.com/problems/longest-substring-without-repeating-characters/) |
| 424 | Longest Repeating Character Replacement | Medium | Sliding Window | Recognize contiguous-range problems where a moving window maintains a validity condition. | [Open](https://leetcode.com/problems/longest-repeating-character-replacement/) |
| 567 | Permutation in String | Medium | Sliding Window | Recognize contiguous-range problems where a moving window maintains a validity condition. | [Open](https://leetcode.com/problems/permutation-in-string/) |
| 438 | Find All Anagrams in a String | Medium | Sliding Window | Recognize contiguous-range problems where a moving window maintains a validity condition. | [Open](https://leetcode.com/problems/find-all-anagrams-in-a-string/) |
| 76 | Minimum Window Substring | Hard | Sliding Window | Recognize contiguous-range problems where a moving window maintains a validity condition. | [Open](https://leetcode.com/problems/minimum-window-substring/) |
| 209 | Minimum Size Subarray Sum | Medium | Sliding Window | Recognize contiguous-range problems where a moving window maintains a validity condition. | [Open](https://leetcode.com/problems/minimum-size-subarray-sum/) |
| 560 | Subarray Sum Equals K | Medium | Prefix Sum/Hashing | Combine prefix-state algebra with a hash map to count subarrays in linear time. | [Open](https://leetcode.com/problems/subarray-sum-equals-k/) |
| 974 | Subarray Sums Divisible by K | Medium | Prefix Sum | Build range-sum/prefix-state intuition and use it to avoid repeated work. | [Open](https://leetcode.com/problems/subarray-sums-divisible-by-k/) |
| 525 | Contiguous Array | Medium | Prefix Sum | Build range-sum/prefix-state intuition and use it to avoid repeated work. | [Open](https://leetcode.com/problems/contiguous-array/) |
| 724 | Find Pivot Index | Easy | Prefix Sum | Build range-sum/prefix-state intuition and use it to avoid repeated work. | [Open](https://leetcode.com/problems/find-pivot-index/) |
| 303 | Range Sum Query - Immutable | Easy | Prefix Sum | Build range-sum/prefix-state intuition and use it to avoid repeated work. | [Open](https://leetcode.com/problems/range-sum-query-immutable/) |
| 56 | Merge Intervals | Medium | Intervals/Sorting | Learn the canonical sort-then-scan framework for interval problems. | [Open](https://leetcode.com/problems/merge-intervals/) |
| 57 | Insert Interval | Medium | Intervals | Practice inserting and merging ranges while preserving ordering and invariants. | [Open](https://leetcode.com/problems/insert-interval/) |
| 435 | Non-overlapping Intervals | Medium | Greedy/Intervals | Connect interval sorting to greedy choices and prove why an endpoint choice is safe. | [Open](https://leetcode.com/problems/non-overlapping-intervals/) |
| 452 | Minimum Number of Arrows to Burst Balloons | Medium | Greedy/Intervals | Connect interval sorting to greedy choices and prove why an endpoint choice is safe. | [Open](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/) |
| 986 | Interval List Intersections | Medium | Two Pointers/Intervals | Advance two interval streams without backtracking. | [Open](https://leetcode.com/problems/interval-list-intersections/) |
| 20 | Valid Parentheses | Easy | Stack | Learn LIFO state modeling and stack invariants for nested or reverse-order information. | [Open](https://leetcode.com/problems/valid-parentheses/) |
| 155 | Min Stack | Medium | Stack | Learn LIFO state modeling and stack invariants for nested or reverse-order information. | [Open](https://leetcode.com/problems/min-stack/) |
| 150 | Evaluate Reverse Polish Notation | Medium | Stack | Learn LIFO state modeling and stack invariants for nested or reverse-order information. | [Open](https://leetcode.com/problems/evaluate-reverse-polish-notation/) |
| 739 | Daily Temperatures | Medium | Monotonic Stack | Learn how a monotonic invariant answers nearest-greater/smaller queries in linear time. | [Open](https://leetcode.com/problems/daily-temperatures/) |
| 496 | Next Greater Element I | Easy | Monotonic Stack | Learn how a monotonic invariant answers nearest-greater/smaller queries in linear time. | [Open](https://leetcode.com/problems/next-greater-element-i/) |
| 503 | Next Greater Element II | Medium | Monotonic Stack | Learn how a monotonic invariant answers nearest-greater/smaller queries in linear time. | [Open](https://leetcode.com/problems/next-greater-element-ii/) |
| 84 | Largest Rectangle in Histogram | Hard | Monotonic Stack | Learn how a monotonic invariant answers nearest-greater/smaller queries in linear time. | [Open](https://leetcode.com/problems/largest-rectangle-in-histogram/) |
| 239 | Sliding Window Maximum | Hard | Deque/Monotonic Queue | Maintain only candidates that can still become the window optimum. | [Open](https://leetcode.com/problems/sliding-window-maximum/) |
| 71 | Simplify Path | Medium | Stack | Learn LIFO state modeling and stack invariants for nested or reverse-order information. | [Open](https://leetcode.com/problems/simplify-path/) |
| 394 | Decode String | Medium | Stack | Learn LIFO state modeling and stack invariants for nested or reverse-order information. | [Open](https://leetcode.com/problems/decode-string/) |
| 225 | Implement Stack using Queues | Easy | Queue/Stack | Understand how one data structure can simulate another while preserving required order. | [Open](https://leetcode.com/problems/implement-stack-using-queues/) |
| 232 | Implement Queue using Stacks | Easy | Queue/Stack | Understand how one data structure can simulate another while preserving required order. | [Open](https://leetcode.com/problems/implement-queue-using-stacks/) |
| 141 | Linked List Cycle | Easy | Linked List | Master pointer manipulation, fast/slow pointers, and structural invariants. | [Open](https://leetcode.com/problems/linked-list-cycle/) |
| 142 | Linked List Cycle II | Medium | Linked List | Master pointer manipulation, fast/slow pointers, and structural invariants. | [Open](https://leetcode.com/problems/linked-list-cycle-ii/) |
| 206 | Reverse Linked List | Easy | Linked List | Master pointer manipulation, fast/slow pointers, and structural invariants. | [Open](https://leetcode.com/problems/reverse-linked-list/) |
| 21 | Merge Two Sorted Lists | Easy | Linked List | Master pointer manipulation, fast/slow pointers, and structural invariants. | [Open](https://leetcode.com/problems/merge-two-sorted-lists/) |
| 19 | Remove Nth Node From End of List | Medium | Linked List | Master pointer manipulation, fast/slow pointers, and structural invariants. | [Open](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) |
| 143 | Reorder List | Medium | Linked List | Master pointer manipulation, fast/slow pointers, and structural invariants. | [Open](https://leetcode.com/problems/reorder-list/) |
| 138 | Copy List with Random Pointer | Medium | Linked List | Master pointer manipulation, fast/slow pointers, and structural invariants. | [Open](https://leetcode.com/problems/copy-list-with-random-pointer/) |
| 2 | Add Two Numbers | Medium | Linked List | Master pointer manipulation, fast/slow pointers, and structural invariants. | [Open](https://leetcode.com/problems/add-two-numbers/) |
| 24 | Swap Nodes in Pairs | Medium | Linked List | Master pointer manipulation, fast/slow pointers, and structural invariants. | [Open](https://leetcode.com/problems/swap-nodes-in-pairs/) |
| 25 | Reverse Nodes in k-Group | Hard | Linked List | Master pointer manipulation, fast/slow pointers, and structural invariants. | [Open](https://leetcode.com/problems/reverse-nodes-in-k-group/) |
| 876 | Middle of the Linked List | Easy | Linked List | Master pointer manipulation, fast/slow pointers, and structural invariants. | [Open](https://leetcode.com/problems/middle-of-the-linked-list/) |
| 160 | Intersection of Two Linked Lists | Easy | Linked List | Master pointer manipulation, fast/slow pointers, and structural invariants. | [Open](https://leetcode.com/problems/intersection-of-two-linked-lists/) |
| 704 | Binary Search | Easy | Binary Search | Turn an ordered search space into logarithmic search with a precise invariant. | [Open](https://leetcode.com/problems/binary-search/) |
| 35 | Search Insert Position | Easy | Binary Search | Turn an ordered search space into logarithmic search with a precise invariant. | [Open](https://leetcode.com/problems/search-insert-position/) |
| 34 | Find First and Last Position of Element in Sorted Array | Medium | Binary Search | Turn an ordered search space into logarithmic search with a precise invariant. | [Open](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) |
| 33 | Search in Rotated Sorted Array | Medium | Binary Search | Turn an ordered search space into logarithmic search with a precise invariant. | [Open](https://leetcode.com/problems/search-in-rotated-sorted-array/) |
| 153 | Find Minimum in Rotated Sorted Array | Medium | Binary Search | Turn an ordered search space into logarithmic search with a precise invariant. | [Open](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) |
| 875 | Koko Eating Bananas | Medium | Binary Search on Answer | Binary-search a feasible answer when feasibility is monotonic. | [Open](https://leetcode.com/problems/koko-eating-bananas/) |
| 1011 | Capacity To Ship Packages Within D Days | Medium | Binary Search on Answer | Binary-search a feasible answer when feasibility is monotonic. | [Open](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/) |
| 410 | Split Array Largest Sum | Hard | Binary Search/DP | Study the boundary between pure search and optimization/state-space reasoning. | [Open](https://leetcode.com/problems/split-array-largest-sum/) |
| 4 | Median of Two Sorted Arrays | Hard | Binary Search | Turn an ordered search space into logarithmic search with a precise invariant. | [Open](https://leetcode.com/problems/median-of-two-sorted-arrays/) |
| 69 | Sqrt(x) | Easy | Binary Search | Turn an ordered search space into logarithmic search with a precise invariant. | [Open](https://leetcode.com/problems/sqrt-x/) |
| 162 | Find Peak Element | Medium | Binary Search | Turn an ordered search space into logarithmic search with a precise invariant. | [Open](https://leetcode.com/problems/find-peak-element/) |
| 48 | Rotate Image | Medium | Matrix | Practice systematic row/column/index reasoning and in-place transformations. | [Open](https://leetcode.com/problems/rotate-image/) |
| 54 | Spiral Matrix | Medium | Matrix | Practice systematic row/column/index reasoning and in-place transformations. | [Open](https://leetcode.com/problems/spiral-matrix/) |
| 73 | Set Matrix Zeroes | Medium | Matrix | Practice systematic row/column/index reasoning and in-place transformations. | [Open](https://leetcode.com/problems/set-matrix-zeroes/) |
| 74 | Search a 2D Matrix | Medium | Matrix/Binary Search | Flatten or reason about a matrix as an ordered search space. | [Open](https://leetcode.com/problems/search-a-2d-matrix/) |
| 289 | Game of Life | Medium | Matrix | Practice systematic row/column/index reasoning and in-place transformations. | [Open](https://leetcode.com/problems/game-of-life/) |
| 70 | Climbing Stairs | Easy | 1D DP | Learn one-dimensional state compression and recurrence design. | [Open](https://leetcode.com/problems/climbing-stairs/) |
| 198 | House Robber | Medium | 1D DP | Learn one-dimensional state compression and recurrence design. | [Open](https://leetcode.com/problems/house-robber/) |
| 213 | House Robber II | Medium | 1D DP | Learn one-dimensional state compression and recurrence design. | [Open](https://leetcode.com/problems/house-robber-ii/) |
| 322 | Coin Change | Medium | 1D DP | Learn one-dimensional state compression and recurrence design. | [Open](https://leetcode.com/problems/coin-change/) |
| 139 | Word Break | Medium | 1D DP | Learn one-dimensional state compression and recurrence design. | [Open](https://leetcode.com/problems/word-break/) |
| 300 | Longest Increasing Subsequence | Medium | DP/Binary Search | Connect DP state progression with a logarithmic optimization technique. | [Open](https://leetcode.com/problems/longest-increasing-subsequence/) |
| 416 | Partition Equal Subset Sum | Medium | Knapsack DP | Recognize subset/selection problems as capacity/state transitions. | [Open](https://leetcode.com/problems/partition-equal-subset-sum/) |
| 494 | Target Sum | Medium | Knapsack DP | Recognize subset/selection problems as capacity/state transitions. | [Open](https://leetcode.com/problems/target-sum/) |
| 518 | Coin Change II | Medium | Knapsack DP | Recognize subset/selection problems as capacity/state transitions. | [Open](https://leetcode.com/problems/coin-change-ii/) |
| 62 | Unique Paths | Medium | Grid DP | Build path-state transitions over a 2D DAG. | [Open](https://leetcode.com/problems/unique-paths/) |
| 63 | Unique Paths II | Medium | Grid DP | Build path-state transitions over a 2D DAG. | [Open](https://leetcode.com/problems/unique-paths-ii/) |
| 64 | Minimum Path Sum | Medium | Grid DP | Build path-state transitions over a 2D DAG. | [Open](https://leetcode.com/problems/minimum-path-sum/) |
| 1143 | Longest Common Subsequence | Medium | 2D DP | Learn how two independent dimensions become a table of subproblem states. | [Open](https://leetcode.com/problems/longest-common-subsequence/) |
| 72 | Edit Distance | Hard | String DP | Define prefix/subsequence/string states and reason about transitions. | [Open](https://leetcode.com/problems/edit-distance/) |
| 97 | Interleaving String | Medium | String DP | Define prefix/subsequence/string states and reason about transitions. | [Open](https://leetcode.com/problems/interleaving-string/) |
| 516 | Longest Palindromic Subsequence | Medium | String DP | Define prefix/subsequence/string states and reason about transitions. | [Open](https://leetcode.com/problems/longest-palindromic-subsequence/) |
| 5 | Longest Palindromic Substring | Medium | String DP | Define prefix/subsequence/string states and reason about transitions. | [Open](https://leetcode.com/problems/longest-palindromic-substring/) |
| 647 | Palindromic Substrings | Medium | String DP | Define prefix/subsequence/string states and reason about transitions. | [Open](https://leetcode.com/problems/palindromic-substrings/) |
| 377 | Combination Sum IV | Medium | DP | Train state definition and transition thinking without relying on brute-force recursion. | [Open](https://leetcode.com/problems/combination-sum-iv/) |
| 10 | Regular Expression Matching | Hard | DP | Train state definition and transition thinking without relying on brute-force recursion. | [Open](https://leetcode.com/problems/regular-expression-matching/) |
| 115 | Distinct Subsequences | Hard | String DP | Define prefix/subsequence/string states and reason about transitions. | [Open](https://leetcode.com/problems/distinct-subsequences/) |
| 131 | Palindrome Partitioning | Medium | Backtracking | Master choose → recurse → undo, pruning, and search-tree reasoning. | [Open](https://leetcode.com/problems/palindrome-partitioning/) |
| 78 | Subsets | Medium | Backtracking | Master choose → recurse → undo, pruning, and search-tree reasoning. | [Open](https://leetcode.com/problems/subsets/) |
| 90 | Subsets II | Medium | Backtracking | Master choose → recurse → undo, pruning, and search-tree reasoning. | [Open](https://leetcode.com/problems/subsets-ii/) |
| 46 | Permutations | Medium | Backtracking | Master choose → recurse → undo, pruning, and search-tree reasoning. | [Open](https://leetcode.com/problems/permutations/) |
| 47 | Permutations II | Medium | Backtracking | Master choose → recurse → undo, pruning, and search-tree reasoning. | [Open](https://leetcode.com/problems/permutations-ii/) |
| 39 | Combination Sum | Medium | Backtracking | Master choose → recurse → undo, pruning, and search-tree reasoning. | [Open](https://leetcode.com/problems/combination-sum/) |
| 40 | Combination Sum II | Medium | Backtracking | Master choose → recurse → undo, pruning, and search-tree reasoning. | [Open](https://leetcode.com/problems/combination-sum-ii/) |
| 17 | Letter Combinations of a Phone Number | Medium | Backtracking | Master choose → recurse → undo, pruning, and search-tree reasoning. | [Open](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) |
| 22 | Generate Parentheses | Medium | Backtracking | Master choose → recurse → undo, pruning, and search-tree reasoning. | [Open](https://leetcode.com/problems/generate-parentheses/) |
| 79 | Word Search | Medium | Backtracking | Master choose → recurse → undo, pruning, and search-tree reasoning. | [Open](https://leetcode.com/problems/word-search/) |
| 51 | N-Queens | Hard | Backtracking | Master choose → recurse → undo, pruning, and search-tree reasoning. | [Open](https://leetcode.com/problems/n-queens/) |
| 37 | Sudoku Solver | Hard | Backtracking | Master choose → recurse → undo, pruning, and search-tree reasoning. | [Open](https://leetcode.com/problems/sudoku-solver/) |
| 100 | Same Tree | Easy | Tree DFS | Build recursive tree invariants and postorder-style aggregation. | [Open](https://leetcode.com/problems/same-tree/) |
| 226 | Invert Binary Tree | Easy | Tree DFS | Build recursive tree invariants and postorder-style aggregation. | [Open](https://leetcode.com/problems/invert-binary-tree/) |
| 104 | Maximum Depth of Binary Tree | Easy | Tree DFS | Build recursive tree invariants and postorder-style aggregation. | [Open](https://leetcode.com/problems/maximum-depth-of-binary-tree/) |
| 543 | Diameter of Binary Tree | Easy | Tree DFS | Build recursive tree invariants and postorder-style aggregation. | [Open](https://leetcode.com/problems/diameter-of-binary-tree/) |
| 110 | Balanced Binary Tree | Easy | Tree DFS | Build recursive tree invariants and postorder-style aggregation. | [Open](https://leetcode.com/problems/balanced-binary-tree/) |
| 102 | Binary Tree Level Order Traversal | Medium | Tree BFS | Use queues and level boundaries to reason about tree depth and layers. | [Open](https://leetcode.com/problems/binary-tree-level-order-traversal/) |
| 199 | Binary Tree Right Side View | Medium | Tree BFS | Use queues and level boundaries to reason about tree depth and layers. | [Open](https://leetcode.com/problems/binary-tree-right-side-view/) |
| 105 | Construct Binary Tree from Preorder and Inorder Traversal | Medium | Tree Recursion | Reconstruct structure from traversal information and recursive subproblems. | [Open](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) |
| 98 | Validate Binary Search Tree | Medium | BST | Exploit ordering invariants to simplify search, rank, and ancestor queries. | [Open](https://leetcode.com/problems/validate-binary-search-tree/) |
| 230 | Kth Smallest Element in a BST | Medium | BST | Exploit ordering invariants to simplify search, rank, and ancestor queries. | [Open](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) |
| 235 | Lowest Common Ancestor of a Binary Search Tree | Medium | BST | Exploit ordering invariants to simplify search, rank, and ancestor queries. | [Open](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) |
| 236 | Lowest Common Ancestor of a Binary Tree | Medium | Tree DFS | Build recursive tree invariants and postorder-style aggregation. | [Open](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) |
| 124 | Binary Tree Maximum Path Sum | Hard | Tree DP | Combine child subproblem results with a parent-level optimization. | [Open](https://leetcode.com/problems/binary-tree-maximum-path-sum/) |
| 297 | Serialize and Deserialize Binary Tree | Hard | Tree Design | Translate a recursive structure into a robust serialization/deserialization protocol. | [Open](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) |
| 572 | Subtree of Another Tree | Easy | Tree DFS | Build recursive tree invariants and postorder-style aggregation. | [Open](https://leetcode.com/problems/subtree-of-another-tree/) |
| 437 | Path Sum III | Medium | Tree Prefix Sum | Apply prefix-state hashing to root-to-node path conditions. | [Open](https://leetcode.com/problems/path-sum-iii/) |
| 662 | Maximum Width of Binary Tree | Medium | Tree BFS | Use queues and level boundaries to reason about tree depth and layers. | [Open](https://leetcode.com/problems/maximum-width-of-binary-tree/) |
| 144 | Binary Tree Preorder Traversal | Easy | Tree Traversal | Know all standard traversals and be able to implement them recursively or iteratively. | [Open](https://leetcode.com/problems/binary-tree-preorder-traversal/) |
| 94 | Binary Tree Inorder Traversal | Easy | Tree Traversal | Know all standard traversals and be able to implement them recursively or iteratively. | [Open](https://leetcode.com/problems/binary-tree-inorder-traversal/) |
| 145 | Binary Tree Postorder Traversal | Easy | Tree Traversal | Know all standard traversals and be able to implement them recursively or iteratively. | [Open](https://leetcode.com/problems/binary-tree-postorder-traversal/) |
| 215 | Kth Largest Element in an Array | Medium | Heap/Quickselect | Choose between heap and selection strategies for order statistics. | [Open](https://leetcode.com/problems/kth-largest-element-in-an-array/) |
| 703 | Kth Largest Element in a Stream | Easy | Heap | Use priority queues when the next best candidate must be extracted repeatedly. | [Open](https://leetcode.com/problems/kth-largest-element-in-a-stream/) |
| 1046 | Last Stone Weight | Easy | Heap | Use priority queues when the next best candidate must be extracted repeatedly. | [Open](https://leetcode.com/problems/last-stone-weight/) |
| 973 | K Closest Points to Origin | Medium | Heap | Use priority queues when the next best candidate must be extracted repeatedly. | [Open](https://leetcode.com/problems/k-closest-points-to-origin/) |
| 621 | Task Scheduler | Medium | Greedy/Heap | Combine scheduling/priority decisions with efficient candidate retrieval. | [Open](https://leetcode.com/problems/task-scheduler/) |
| 295 | Find Median from Data Stream | Hard | Two Heaps | Maintain lower and upper halves dynamically to answer median queries. | [Open](https://leetcode.com/problems/find-median-from-data-stream/) |
| 208 | Implement Trie (Prefix Tree) | Medium | Trie | Use prefix trees when string-prefix operations need better structure than hashing alone. | [Open](https://leetcode.com/problems/implement-trie-prefix-tree/) |
| 211 | Design Add and Search Words Data Structure | Medium | Trie/DFS | Combine prefix structure with DFS to support wildcard/prefix search. | [Open](https://leetcode.com/problems/design-add-and-search-words-data-structure/) |
| 212 | Word Search II | Hard | Trie/Backtracking | Use a trie to prune a large combinatorial search over strings. | [Open](https://leetcode.com/problems/word-search-ii/) |
| 200 | Number of Islands | Medium | Graph DFS/BFS | Learn graph modeling plus connected-component exploration. | [Open](https://leetcode.com/problems/number-of-islands/) |
| 695 | Max Area of Island | Medium | Graph DFS | Master visited-state management and reverse/dual-source exploration. | [Open](https://leetcode.com/problems/max-area-of-island/) |
| 133 | Clone Graph | Medium | Graph BFS/DFS | Choose traversal based on whether you need levels, reachability, or components. | [Open](https://leetcode.com/problems/clone-graph/) |
| 417 | Pacific Atlantic Water Flow | Medium | Graph DFS | Master visited-state management and reverse/dual-source exploration. | [Open](https://leetcode.com/problems/pacific-atlantic-water-flow/) |
| 994 | Rotting Oranges | Medium | Graph BFS | Use level-order exploration for shortest unweighted paths and propagation. | [Open](https://leetcode.com/problems/rotting-oranges/) |
| 542 | 01 Matrix | Medium | Graph BFS | Use level-order exploration for shortest unweighted paths and propagation. | [Open](https://leetcode.com/problems/01-matrix/) |
| 130 | Surrounded Regions | Medium | Graph DFS | Master visited-state management and reverse/dual-source exploration. | [Open](https://leetcode.com/problems/surrounded-regions/) |
| 127 | Word Ladder | Hard | Graph BFS | Use level-order exploration for shortest unweighted paths and propagation. | [Open](https://leetcode.com/problems/word-ladder/) |
| 210 | Course Schedule II | Medium | Topological Sort | Recognize dependency DAGs and cycle detection via indegrees or DFS states. | [Open](https://leetcode.com/problems/course-schedule-ii/) |
| 207 | Course Schedule | Medium | Topological Sort | Recognize dependency DAGs and cycle detection via indegrees or DFS states. | [Open](https://leetcode.com/problems/course-schedule/) |
| 684 | Redundant Connection | Medium | DSU | Use disjoint-set union for dynamic connectivity and cycle detection. | [Open](https://leetcode.com/problems/redundant-connection/) |
| 547 | Number of Provinces | Medium | DSU | Use disjoint-set union for dynamic connectivity and cycle detection. | [Open](https://leetcode.com/problems/number-of-provinces/) |
| 721 | Accounts Merge | Medium | DSU | Use disjoint-set union for dynamic connectivity and cycle detection. | [Open](https://leetcode.com/problems/accounts-merge/) |
| 743 | Network Delay Time | Medium | Dijkstra | Use greedy shortest-path expansion when edge weights are non-negative. | [Open](https://leetcode.com/problems/network-delay-time/) |
| 787 | Cheapest Flights Within K Stops | Medium | Shortest Path/DP | Understand constrained shortest paths where a simple Dijkstra model is insufficient. | [Open](https://leetcode.com/problems/cheapest-flights-within-k-stops/) |
| 1584 | Min Cost to Connect All Points | Medium | MST | Build minimum-cost connectivity with Kruskal/Prim and understand cut-based reasoning. | [Open](https://leetcode.com/problems/min-cost-to-connect-all-points/) |
| 332 | Reconstruct Itinerary | Hard | Eulerian Path/Graph | Recognize degree/use-count constraints and construct paths without wasting edges. | [Open](https://leetcode.com/problems/reconstruct-itinerary/) |
| 785 | Is Graph Bipartite? | Medium | Graph Coloring | Use BFS/DFS two-coloring to detect odd cycles and bipartiteness. | [Open](https://leetcode.com/problems/is-graph-bipartite/) |
| 399 | Evaluate Division | Medium | Graph DFS | Master visited-state management and reverse/dual-source exploration. | [Open](https://leetcode.com/problems/evaluate-division/) |
| 91 | Decode Ways | Medium | DP | Train state definition and transition thinking without relying on brute-force recursion. | [Open](https://leetcode.com/problems/decode-ways/) |
| 312 | Burst Balloons | Hard | Interval DP | Learn endpoint-based state definitions and split-point optimization. | [Open](https://leetcode.com/problems/burst-balloons/) |
| 337 | House Robber III | Medium | Tree DP | Combine child subproblem results with a parent-level optimization. | [Open](https://leetcode.com/problems/house-robber-iii/) |
| 309 | Best Time to Buy and Sell Stock with Cooldown | Medium | DP | Train state definition and transition thinking without relying on brute-force recursion. | [Open](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/) |
| 188 | Best Time to Buy and Sell Stock IV | Hard | DP | Train state definition and transition thinking without relying on brute-force recursion. | [Open](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/) |
| 123 | Best Time to Buy and Sell Stock III | Hard | DP | Train state definition and transition thinking without relying on brute-force recursion. | [Open](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/) |
| 279 | Perfect Squares | Medium | DP/BFS | Compare dynamic programming and shortest-path formulations for state graphs. | [Open](https://leetcode.com/problems/perfect-squares/) |
| 140 | Word Break II | Hard | DP/Backtracking | Combine memoization with generation when the output space is exponential. | [Open](https://leetcode.com/problems/word-break-ii/) |
| 329 | Longest Increasing Path in a Matrix | Hard | DFS/DP | Memoize repeated graph/grid states to turn exponential DFS into polynomial DP. | [Open](https://leetcode.com/problems/longest-increasing-path-in-a-matrix/) |
| 134 | Gas Station | Medium | Greedy | Learn to identify a local decision that can be justified globally. | [Open](https://leetcode.com/problems/gas-station/) |
| 55 | Jump Game | Medium | Greedy | Learn to identify a local decision that can be justified globally. | [Open](https://leetcode.com/problems/jump-game/) |
| 45 | Jump Game II | Medium | Greedy | Learn to identify a local decision that can be justified globally. | [Open](https://leetcode.com/problems/jump-game-ii/) |
| 763 | Partition Labels | Medium | Greedy | Learn to identify a local decision that can be justified globally. | [Open](https://leetcode.com/problems/partition-labels/) |
| 406 | Queue Reconstruction by Height | Medium | Greedy/Sorting | Use sorted order to make a locally optimal reconstruction possible. | [Open](https://leetcode.com/problems/queue-reconstruction-by-height/) |
| 846 | Hand of Straights | Medium | Greedy/Hashing | Use frequency/order information to validate whether a greedy construction is feasible. | [Open](https://leetcode.com/problems/hand-of-straights/) |
| 316 | Remove Duplicate Letters | Medium | Monotonic Stack/Greedy | Combine stack invariants with lexicographic/greedy objectives. | [Open](https://leetcode.com/problems/remove-duplicate-letters/) |
| 678 | Valid Parenthesis String | Medium | Greedy | Learn to identify a local decision that can be justified globally. | [Open](https://leetcode.com/problems/valid-parenthesis-string/) |

## Part 7 — Revision system

Use a spaced-repetition queue instead of rereading editorials.

### Required intervals
1. **Same day:** after solving, close the editor/editorial and explain the invariant in 60 seconds.
2. **Short review:** 24–72 hours later, mentally reconstruct the approach.
3. **1-week review:** re-solve without notes.
4. **2–3-week review:** re-solve with no pattern label.
5. **1-month review:** timed re-solve.
6. **Final interview review:** solve or explain the problem from a blank page.

### Tracking states
| Code | Meaning | Action |
|---|---|---|
| A | Solved independently | Move to spaced review |
| H | Needed a hint | Re-solve within 48 hours |
| S | Needed solution/editorial | Reimplement immediately, re-solve in 2–3 days |
| F | Failed | Put into high-priority queue; do not count as mastered |
| T | Correct but too slow | Repeat timed |
| P | Forgot pattern | Re-solve with pattern hidden |
| E | Can explain | Keep in monthly rotation |
| C | Can code from scratch | Eligible for low-frequency maintenance |

### Mastery rule
A problem is **mastered** only when you can (a) identify the likely pattern without prompting, (b) explain the invariant, (c) code it from a blank file, (d) state complexity, and (e) modify it for a small follow-up.

## Part 8 — Failure / recovery system

### The 45-minute protocol for Mediums
1. **0–5 min:** restate + constraints + examples.
2. **5–15 min:** brute force + bottleneck.
3. **15–25 min:** attempt pattern discovery and write pseudocode.
4. **25 min:** take exactly one targeted hint.
5. **25–35 min:** second attempt.
6. **35–45 min:** if still blocked, read only enough of the explanation to identify the missing idea.
7. Close the explanation and implement from memory.
8. Re-solve 24–72 hours later.

### For Hards
Allow 45–60 minutes before an editorial. The objective is learning the missing reasoning, not proving that you can suffer indefinitely.

### Never do this
- Do not read an editorial after 5 minutes just because the answer is not obvious.
- Do not copy code and mark the problem solved.
- Do not repeat the same problem immediately until it feels familiar; that creates recognition illusion.

## Part 9 — Interview simulation system

### Weeks 23–24
- Topic labels hidden.
- 35–45 minutes per Medium.
- One verbal explanation recorded aloud.
- One follow-up variant after each successful problem.

### Week 25: OA simulation
- Two coding problems in a fixed time box.
- No solution browsing.
- Track: solved, partially solved, failed, bugs, time per problem.
- Practice moving on when stuck; return later.

Amazon's current student/new-grad SDE materials describe an OA for full-time SDE roles with a coding assessment and workstyles component, and the company explicitly recommends practicing coding/problem-solving and being comfortable coding outside an IDE. The exact process varies by role and country, so use the employer's current role-specific instructions when an actual application arrives. citeturn1search7turn1search5

### Weeks 26–27: mock interviews
Run 2–3 mocks/week:
- 5 minutes: clarify problem.
- 5–10 minutes: brute force and constraints.
- 15–25 minutes: derive optimized solution.
- 15–20 minutes: code.
- 5 minutes: tests + complexity.
- 5 minutes: interviewer follow-up.

Score yourself descriptively, not as a political-style or hiring-style ranking: correctness, reasoning clarity, implementation quality, complexity, edge cases, and communication.

### Week 28
- Two full mock interviews.
- Two timed mixed sets.
- Two failure-recovery sessions.
- Final readiness audit.

## Part 10 — Monthly assessments

### Month 1 — Weeks 1–4
- **Skills:** Arrays, strings, hashing, two pointers, windows, prefix sums
- **Expected performance:** Recognize basic linear patterns; Easy in ~15–20 min; common Medium in ~25–35 min.
- **Assessment:** Two mixed Mediums + 20-minute concept recall.
- **If below target:** keep the weakest two patterns in the next week's review queue and reduce new learning until they are stable.

### Month 2 — Weeks 5–8
- **Skills:** Intervals, stacks, linked lists, binary search
- **Expected performance:** Implement pointer/stack/search invariants without templates.
- **Assessment:** Two Mediums in 70 minutes; one linked-list and one search problem.
- **If below target:** keep the weakest two patterns in the next week's review queue and reduce new learning until they are stable.

### Month 3 — Weeks 9–12
- **Skills:** Binary search, matrix, 1D/2D/string DP
- **Expected performance:** Define DP states and binary-search boundaries independently.
- **Assessment:** Three mixed problems in 100 minutes; one must be DP.
- **If below target:** keep the weakest two patterns in the next week's review queue and reduce new learning until they are stable.

### Month 4 — Weeks 13–16
- **Skills:** Backtracking + trees/BST
- **Expected performance:** Write recursion cleanly and distinguish DFS/BFS/BST invariants.
- **Assessment:** Two Mediums + one selected Hard in 120 minutes.
- **If below target:** keep the weakest two patterns in the next week's review queue and reduce new learning until they are stable.

### Month 5 — Weeks 17–20
- **Skills:** Heaps, tries, graphs, topo, DSU, shortest paths, MST
- **Expected performance:** Model a graph correctly and choose traversal/algorithm from constraints.
- **Assessment:** Three mixed Mediums in 100 minutes.
- **If below target:** keep the weakest two patterns in the next week's review queue and reduce new learning until they are stable.

### Month 6 — Weeks 21–24
- **Skills:** Advanced DP + mixed recognition
- **Expected performance:** Solve without being told the topic; recover from failed first approaches.
- **Assessment:** Two Mediums in 75 minutes + one Hard/Hard-variant in 45 minutes.
- **If below target:** keep the weakest two patterns in the next week's review queue and reduce new learning until they are stable.

### Month 7 — Weeks 25–28
- **Skills:** Interview simulation
- **Expected performance:** Communicate, code, test, optimize, and handle follow-ups under pressure.
- **Assessment:** Full mock + timed OA set + final weak-area audit.
- **If below target:** keep the weakest two patterns in the next week's review queue and reduce new learning until they are stable.

## Part 11 — Weekly checkpoint template

Copy this after every week:

```text
Week:
Independent solves:
Hint solves:
Editorial/solution solves:
Failed:
Too slow:
Patterns I can recognize instantly:
Patterns I still confuse:
Best new insight:
Most common bug:
Two problems to revisit:
Timed-set result:
Can I explain 3 solutions without notes? Y/N
Ready to advance? Y/N
```

## Part 12 — Final 7-month readiness checklist

### DSA knowledge
- [ ] Arrays/strings/hash maps/sets
- [ ] Prefix sums, two pointers, sliding windows
- [ ] Sorting and binary search
- [ ] Linked lists, stacks, queues, deques
- [ ] Intervals and greedy
- [ ] Trees, BSTs, heaps
- [ ] Tries
- [ ] Graph DFS/BFS, topo sort, DSU
- [ ] Shortest paths and MST
- [ ] 1D/2D/knapsack/subsequence/string/grid/interval DP
- [ ] Backtracking
- [ ] Bit manipulation and basic math

### Pattern recognition
- [ ] I can infer likely patterns from constraints rather than from topic labels.
- [ ] I can distinguish two pointers vs sliding window vs prefix sum.
- [ ] I can recognize monotonic-stack and binary-search-on-answer situations.
- [ ] I can identify when BFS, DFS, Dijkstra, DSU, or topological sorting is appropriate.
- [ ] I can define a DP state before writing transitions.

### C++ implementation
- [ ] I can use STL containers without searching syntax.
- [ ] I can write custom comparators/lambdas.
- [ ] I can use `lower_bound`/`upper_bound` correctly.
- [ ] I can implement DFS/BFS/heap/DSU/trie from memory.
- [ ] I can code without an IDE's autocomplete when necessary.

### Complexity
- [ ] I can state time and auxiliary space before/after coding.
- [ ] I can identify the dominant loop/data structure.
- [ ] I understand amortized behavior for common STL structures.

### Interview communication
- [ ] I clarify ambiguous requirements.
- [ ] I verbalize brute force before optimization.
- [ ] I explain the invariant while coding.
- [ ] I test edge cases aloud.
- [ ] I can accept a follow-up and modify the solution rather than restarting from scratch.

### Weakness diagnosis
- [ ] My error log distinguishes knowledge gaps from implementation bugs.
- [ ] I have a top-10 weak-problem list.
- [ ] I can re-solve those problems without notes.
- [ ] I have completed at least 6 full mock interviews.

## Part 13 — Quantitative summary

- **Unique core LeetCode problems:** 176
- **Core learning weeks:** 22
- **Interview/revision weeks:** 6
- **Maximum problems on any scheduled day:** 2 in the core schedule; never above the requested cap of 5.
- **Weekly checkpoints:** 28
- **Monthly assessments:** 7
- **Dedicated mock/interview weeks:** 4 (Weeks 25–28, with interview work beginning in Weeks 23–24)

### Difficulty distribution of the 176 core problems
- **Easy: 35**
- **Medium: 118**
- **Hard: 23**

## Part 14 — What this curriculum intentionally does NOT promise

Completing this plan does not guarantee an internship or job. It is designed to maximize DSA/interview preparation. Actual hiring also depends on fundamentals beyond DSA, resume/project quality, communication, behavioral preparation, role requirements, recruiting timing, and interview-specific expectations.

## Part 15 — Recommended daily routine

| Block | Typical time | What to do |
|---|---:|---|
| Concept | 20–30 min | Learn/review one pattern and its invariant |
| Problem 1 | 25–45 min | Independent attempt → C++ implementation |
| Problem 2 | 25–45 min | Independent attempt → C++ implementation |
| Review | 15–25 min | Re-solve/recall an older problem |
| Notes | 5–10 min | Record trigger, invariant, complexity, mistake |

Target **~2–3 hours/day on learning days**, ~1–2 hours on review/timed days, and keep one lighter day weekly. If college/work makes that unsustainable, reduce new problems rather than reducing review quality.

## Appendix — Interview recognition triggers

| Pattern | Typical clues | First question to ask yourself |
|---|---|---|
| Hashing | Need fast membership/count/complement lookup | Can I trade O(n) space for O(n) time? |
| Two pointers | Sorted array, pair/triple, inward boundaries | What becomes impossible when a pointer moves? |
| Sliding window | Contiguous substring/subarray + constraint | What condition makes the current window valid? |
| Prefix sum | Repeated range sums / subarray totals | Can I represent the current prefix state compactly? |
| Monotonic stack | Nearest greater/smaller / histogram | What candidates can never become the answer again? |
| Binary search | Ordered domain or monotonic feasibility | What is my invariant at `lo`, `mid`, `hi`? |
| Greedy | Optimization with local choices | Can I prove the local choice is safe? |
| BFS | Unweighted shortest path / layers | Does each edge represent one equal-cost step? |
| DFS | Reachability/components/recursive structure | What does the recursive call guarantee? |
| Topological sort | Prerequisites/dependencies | Is this a DAG and what does indegree mean? |
| DSU | Connectivity under merges | Do I only need component membership? |
| Dijkstra | Non-negative weighted shortest path | What is the cheapest unsettled state? |
| MST | Connect all nodes at minimum total cost | Can I select safe edges by cut/connectivity reasoning? |
| DP | Repeated subproblems + optimal/counting decision | What is the smallest complete state? |
| Backtracking | Generate all valid choices under constraints | What are my choices, base case, and undo step? |
| Trie | Prefix/string dictionary operations | Would a prefix tree prune the search? |