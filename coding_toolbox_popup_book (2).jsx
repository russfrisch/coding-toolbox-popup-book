import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Boxes,
  Brain,
  CircleDot,
  Combine,
  Database,
  GitBranch,
  Grip,
  Hash,
  Layers,
  List,
  Network,
  Search,
  Sigma,
  Split,
  SquareStack,
  Trees,
  Waypoints,
  Workflow,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const structureData = [
  {
    id: "array",
    type: "structure",
    name: "Array / List",
    icon: List,
    color: "bg-blue-50 border-blue-200 text-blue-700",
    mentalModel: "A straight shelf of labeled bins.",
    useWhen: ["Ordered items", "Index access", "Scans"],
    python: `nums = [3, 7, 2]\nnums.append(9)\nvalue = nums[1]\n# [3, 7, 2, 9]`,
    demo: "array",
    realSystems: "Arrays back API response lists, log buffers, UI collections, metrics, and in-memory batches where order and index access matter.",
  },
  {
    id: "dynamic-array",
    type: "structure",
    name: "Dynamic Array",
    icon: Grip,
    color: "bg-cyan-50 border-cyan-200 text-cyan-700",
    mentalModel: "An array that grows when it runs out of room.",
    useWhen: ["Append-heavy workloads", "Indexed access", "Resizable sequences"],
    python: `nums = []\nfor x in [1, 2, 3, 4]:\n    nums.append(x)\n# Python lists are dynamic arrays`,
    demo: "dynamic-array",
    realSystems: "Dynamic arrays power Python lists, JS arrays, UI collections, batched records, and most everyday sequence storage.",
  },
  {
    id: "string",
    type: "structure",
    name: "String",
    icon: Hash,
    color: "bg-sky-50 border-sky-200 text-sky-700",
    mentalModel: "An array of characters with grammar problems.",
    useWhen: ["Parsing text", "Matching", "Scanning"],
    python: `text = "hello"\nchars = list(text)\nfirst = text[0]`,
    demo: "string",
    realSystems: "Strings drive parsing and validation: request paths, search input, tokens, file names, commands, and lightweight protocols.",
  },
  {
    id: "hashmap",
    type: "structure",
    name: "Hash Map",
    icon: Database,
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    mentalModel: "A magic filing cabinet: key to value.",
    useWhen: ["Fast lookup", "Counting", "Grouping"],
    python: `counts = {}\nfor ch in "banana":\n    counts[ch] = counts.get(ch, 0) + 1`,
    demo: "hashmap",
    realSystems: "Hash maps power caches, config lookups, session state, ID indexes, counters, and joins between related data.",
  },
  {
    id: "set",
    type: "structure",
    name: "Set",
    icon: CircleDot,
    color: "bg-violet-50 border-violet-200 text-violet-700",
    mentalModel: "A guest list. You are either in or out.",
    useWhen: ["Uniqueness", "Membership", "Visited tracking"],
    python: `seen = set()\nseen.add("a")\nseen.add("a")`,
    demo: "set",
    realSystems: "Sets shine in deduplication, permission checks, feature flags, and visited tracking.",
  },
  {
    id: "stack",
    type: "structure",
    name: "Stack",
    icon: Layers,
    color: "bg-orange-50 border-orange-200 text-orange-700",
    mentalModel: "A stack of plates: last in, first out.",
    useWhen: ["Undo", "Nesting", "Recent-first"],
    python: `stack = []\nstack.append("A")\nstack.append("B")\nitem = stack.pop()`,
    demo: "stack",
    realSystems: "Stacks show up in undo history, parser state, nested UI flows, and depth-first traversal.",
  },
  {
    id: "queue",
    type: "structure",
    name: "Queue",
    icon: Workflow,
    color: "bg-teal-50 border-teal-200 text-teal-700",
    mentalModel: "A checkout line: first in, first out.",
    useWhen: ["Arrival order", "BFS", "Work queue"],
    python: `from collections import deque\nq = deque(["A"])\nq.append("B")\nitem = q.popleft()`,
    demo: "queue",
    realSystems: "Queues power job runners, buffering, message processing, and background work.",
  },
  {
    id: "deque",
    type: "structure",
    name: "Deque",
    icon: Split,
    color: "bg-amber-50 border-amber-200 text-amber-700",
    mentalModel: "A hallway with doors on both ends.",
    useWhen: ["Sliding windows", "Flexible buffering", "Double-ended work"],
    python: `from collections import deque\nd = deque([2, 3])\nd.appendleft(1)\nd.append(4)`,
    demo: "deque",
    realSystems: "Deques help with stream buffers, rolling windows, and both-end push/pop workloads.",
  },
  {
    id: "linkedlist",
    type: "structure",
    name: "Linked List",
    icon: Waypoints,
    color: "bg-indigo-50 border-indigo-200 text-indigo-700",
    mentalModel: "A chain where each node points to the next clue.",
    useWhen: ["Pointer operations", "Cheap inserts", "Node manipulation"],
    python: `class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next`,
    demo: "linkedlist",
    realSystems: "Linked lists still show up inside LRU caches, allocator internals, and low-level structures.",
  },
  {
    id: "grid-matrix",
    type: "structure",
    name: "Grid / Matrix",
    icon: Boxes,
    color: "bg-lime-50 border-lime-200 text-lime-700",
    mentalModel: "A chessboard of cells addressed by row and column.",
    useWhen: ["2D data", "Neighbors matter", "Maps and boards"],
    python: `grid = [[1,2,3],[4,5,6],[7,8,9]]\nvalue = grid[1][2]`,
    demo: "grid-matrix",
    realSystems: "Grids show up in game boards, images, heat maps, spreadsheets, and 2D pathfinding.",
  },
  {
    id: "tree",
    type: "structure",
    name: "Tree",
    icon: Trees,
    color: "bg-green-50 border-green-200 text-green-700",
    mentalModel: "Folders inside folders.",
    useWhen: ["Hierarchy", "Recursion", "Parent/child data"],
    python: `tree = {"A": ["B", "C"], "B": ["D", "E"]}`,
    demo: "tree",
    realSystems: "Trees model file systems, DOMs, menus, ASTs, and org charts.",
  },
  {
    id: "heap",
    type: "structure",
    name: "Heap / Priority Queue",
    icon: Grip,
    color: "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700",
    mentalModel: "An ER desk: most urgent item comes out next.",
    useWhen: ["Top K", "Min/max next", "Priority scheduling"],
    python: `import heapq\nheap = [5, 2, 8]\nheapq.heapify(heap)\nsmallest = heapq.heappop(heap)`,
    demo: "heap",
    realSystems: "Heaps help schedulers, ranking pipelines, retry systems, and top-K features.",
  },
  {
    id: "graph",
    type: "structure",
    name: "Graph",
    icon: Network,
    color: "bg-rose-50 border-rose-200 text-rose-700",
    mentalModel: "A subway map of connected things.",
    useWhen: ["Paths", "Dependencies", "Relationships"],
    python: `graph = {"A": ["B", "C"], "B": ["D"], "C": ["D"]}`,
    demo: "graph",
    realSystems: "Graphs model dependencies, workflows, routing, social links, and service relationships.",
  },
  {
    id: "trie",
    type: "structure",
    name: "Trie",
    icon: GitBranch,
    color: "bg-sky-50 border-sky-200 text-sky-700",
    mentalModel: "A word tree that reuses shared beginnings.",
    useWhen: ["Autocomplete", "Prefix search", "Dictionary matching"],
    python: `trie = {}\nfor word in ["cat", "car"]:\n    node = trie\n    for ch in word:\n        node = node.setdefault(ch, {})`,
    demo: "trie",
    realSystems: "Tries are useful for autocomplete, prefix search, command suggestion, and router matching.",
  },
  {
    id: "unionfind",
    type: "structure",
    name: "Union-Find",
    icon: Combine,
    color: "bg-yellow-50 border-yellow-200 text-yellow-700",
    mentalModel: "Friend groups that keep merging.",
    useWhen: ["Connected components", "Clustering", "Connectivity"],
    python: `parent = {x: x for x in [1,2,3,4]}\ndef find(x):\n    if parent[x] != x:\n        parent[x] = find(parent[x])\n    return parent[x]`,
    demo: "unionfind",
    realSystems: "Union-Find helps with clustering, account merging, and fast connectivity checks.",
  },
];

const patternData = [
  {
    id: "two-pointers",
    type: "pattern",
    name: "Two Pointers",
    icon: Split,
    color: "bg-blue-50 border-blue-200 text-blue-700",
    mentalModel: "Two fingers moving through the same sequence.",
    useWhen: ["Sorted arrays", "Pairs", "Palindromes"],
    python: `def is_pal(s):\n    l, r = 0, len(s) - 1\n    while l < r:\n        if s[l] != s[r]:\n            return False\n        l += 1; r -= 1\n    return True`,
    demo: "two-pointers",
    realSystems: "Two pointers show up in validation, pair finding, palindrome checks, and in-place cleanup.",
  },
  {
    id: "sliding-window",
    type: "pattern",
    name: "Sliding Window",
    icon: SquareStack,
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    mentalModel: "A moving frame over a contiguous chunk.",
    useWhen: ["Longest/shortest range", "Subarrays", "Substrings"],
    python: `nums = [2,1,3,4,2]\nk = 3\nwindow_sum = sum(nums[:k])`,
    demo: "sliding-window",
    realSystems: "Sliding windows are core to recent analytics, rolling averages, stream processing, and rate limiting.",
  },
  {
    id: "binary-search",
    type: "pattern",
    name: "Binary Search",
    icon: Search,
    color: "bg-violet-50 border-violet-200 text-violet-700",
    mentalModel: "Keep cutting the search space in half.",
    useWhen: ["Sorted input", "Monotonic answers", "Thresholds"],
    python: `def binary_search(nums, target):\n    lo, hi = 0, len(nums) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2`,
    demo: "binary-search",
    realSystems: "Binary search is great for sorted indexes, thresholds, and answer-space problems.",
  },
  {
    id: "dfs",
    type: "pattern",
    name: "DFS / Recursion",
    icon: Workflow,
    color: "bg-orange-50 border-orange-200 text-orange-700",
    mentalModel: "Go deep, then back up.",
    useWhen: ["Trees", "Graphs", "Nested structures"],
    python: `def dfs(node):\n    print(node)\n    for child in graph[node]:\n        dfs(child)`,
    demo: "dfs",
    realSystems: "DFS is useful for walking hierarchies, recursive processing, and dependency exploration.",
  },
  {
    id: "bfs",
    type: "pattern",
    name: "BFS",
    icon: Boxes,
    color: "bg-cyan-50 border-cyan-200 text-cyan-700",
    mentalModel: "Ripples moving level by level.",
    useWhen: ["Shortest path", "Level order", "Unweighted graphs"],
    python: `from collections import deque\nq = deque([start])\nvisited = {start}\nwhile q:\n    node = q.popleft()`,
    demo: "bfs",
    realSystems: "BFS is the go-to for level-order processing and shortest paths in unweighted graphs.",
  },
  {
    id: "backtracking",
    type: "pattern",
    name: "Backtracking",
    icon: GitBranch,
    color: "bg-rose-50 border-rose-200 text-rose-700",
    mentalModel: "Choose, explore, undo, repeat.",
    useWhen: ["Combinations", "Permutations", "Constraints"],
    python: `path = []\ndef bt(nums):\n    if done(path): return\n    for x in nums:\n        path.append(x)\n        bt(nums)\n        path.pop()`,
    demo: "backtracking",
    realSystems: "Backtracking fits search spaces with constraints, schedules, and combinatorial generation.",
  },
  {
    id: "dp",
    type: "pattern",
    name: "Dynamic Programming",
    icon: Brain,
    color: "bg-indigo-50 border-indigo-200 text-indigo-700",
    mentalModel: "Stop re-solving the same subproblem.",
    useWhen: ["Overlapping subproblems", "Optimization", "Counting ways"],
    python: `dp = [0] * (n + 1)\ndp[0] = 1\nfor i in range(1, n + 1):\n    dp[i] = dp[i-1] + dp[i-2]`,
    demo: "dp",
    realSystems: "DP appears in optimization, diffing, sequence analysis, and counting paths.",
  },
  {
    id: "topological-sort",
    type: "pattern",
    name: "Topological Sort",
    icon: Workflow,
    color: "bg-teal-50 border-teal-200 text-teal-700",
    mentalModel: "Do tasks only after their prerequisites are done.",
    useWhen: ["Dependencies", "DAG ordering", "Build pipelines"],
    python: `from collections import deque\nindegree = {"A": 0, "B": 1, "C": 1}\nq = deque([node for node, deg in indegree.items() if deg == 0])`,
    demo: "topological-sort",
    realSystems: "Topological sort is perfect for build graphs, dependency resolution, and migration ordering.",
  },
  {
    id: "greedy",
    type: "pattern",
    name: "Greedy",
    icon: Zap,
    color: "bg-green-50 border-green-200 text-green-700",
    mentalModel: "Take the best local move and keep going.",
    useWhen: ["Intervals", "Simple optimal choices", "Selection"],
    python: `intervals.sort(key=lambda x: x[1])\ncount = 0\nend = float("-inf")`,
    demo: "greedy",
    realSystems: "Greedy strategies are common in scheduling, interval selection, and simple assignment problems.",
  },
  {
    id: "prefix-sum",
    type: "pattern",
    name: "Prefix Sum",
    icon: Sigma,
    color: "bg-purple-50 border-purple-200 text-purple-700",
    mentalModel: "A running total you can query fast later.",
    useWhen: ["Range sums", "Repeated queries", "Cumulative totals"],
    python: `prefix = [0]\nfor x in nums:\n    prefix.append(prefix[-1] + x)\nrange_sum = prefix[r+1] - prefix[l]`,
    demo: "prefix-sum",
    realSystems: "Prefix sums help dashboards, cumulative metrics, and fast repeated range queries.",
  },
  {
    id: "monotonic",
    type: "pattern",
    name: "Monotonic Stack / Queue",
    icon: SquareStack,
    color: "bg-amber-50 border-amber-200 text-amber-700",
    mentalModel: "Keep only the candidates that still matter.",
    useWhen: ["Nearest greater/smaller", "Window max", "Candidate pruning"],
    python: `stack = []\nfor x in nums:\n    while stack and stack[-1] < x:\n        stack.pop()\n    stack.append(x)`,
    demo: "monotonic",
    realSystems: "Monotonic structures are perfect for rolling maximums and nearest greater/smaller lookups.",
  },
];

const extraPythonExamples = {
  array: [
    { label: "Append + index", code: `nums = [3, 7, 2]\nnums.append(9)\nvalue = nums[1]` },
    { label: "Scan", code: `for i, value in enumerate([3, 7, 2, 9]):\n    print(i, value)` },
    { label: "Slice", code: `nums = [3, 7, 2, 9]\nmiddle = nums[1:3]` },
  ],
  "dynamic-array": [
    { label: "Growth", code: `nums = []\nfor x in [1, 2, 3, 4]:\n    nums.append(x)` },
    { label: "Amortized append", code: `nums = []\nfor i in range(1000):\n    nums.append(i)` },
    { label: "Insert cost", code: `nums = [1, 2, 3, 4]\nnums.insert(0, 99)` },
  ],
  string: [
    { label: "Characters", code: `text = "hello"\nchars = list(text)` },
    { label: "Frequency", code: `counts = {}\nfor ch in "banana":\n    counts[ch] = counts.get(ch, 0) + 1` },
    { label: "Substring", code: `text = "algorithm"\npart = text[2:6]` },
  ],
  hashmap: [
    { label: "Counting", code: `counts = {}\nfor ch in "banana":\n    counts[ch] = counts.get(ch, 0) + 1` },
    { label: "Lookup", code: `user_by_id = {42: "Russ", 7: "Ada"}\nname = user_by_id[42]` },
    { label: "Grouping", code: `groups = {}\nfor word in ["at", "to", "tea"]:\n    groups.setdefault(len(word), []).append(word)` },
  ],
  set: [
    { label: "Unique", code: `seen = set()\nseen.add("a")\nseen.add("a")` },
    { label: "Membership", code: `allowed = {"read", "write"}\nif "read" in allowed:\n    print("ok")` },
    { label: "Visited", code: `visited = set()\nfor node in ["A", "B", "A"]:\n    if node in visited: continue\n    visited.add(node)` },
  ],
  stack: [
    { label: "Push + pop", code: `stack = []\nstack.append("A")\nstack.append("B")\nitem = stack.pop()` },
    { label: "Parentheses", code: `stack = []\nfor ch in "(()())":\n    if ch == "(": stack.append(ch)\n    else: stack.pop()` },
    { label: "DFS style", code: `stack = [start]\nwhile stack:\n    node = stack.pop()` },
  ],
  queue: [
    { label: "Enqueue", code: `from collections import deque\nq = deque(["A"])\nq.append("B")\nitem = q.popleft()` },
    { label: "Level order", code: `from collections import deque\nq = deque([root])\nwhile q:\n    node = q.popleft()` },
    { label: "Jobs", code: `from collections import deque\njobs = deque(["email", "retry", "sync"])\nnext_job = jobs.popleft()` },
  ],
  deque: [
    { label: "Both ends", code: `from collections import deque\nd = deque([2, 3])\nd.appendleft(1)\nd.append(4)` },
    { label: "Window helper", code: `from collections import deque\nwindow = deque()\nwindow.append(5)\nwindow.popleft()` },
    { label: "Buffer", code: `from collections import deque\nbuf = deque(maxlen=3)\nfor x in [1,2,3,4]:\n    buf.append(x)` },
  ],
  linkedlist: [
    { label: "Node", code: `class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next` },
    { label: "Build chain", code: `head = Node(1, Node(2, Node(3)))\nprint(head.next.val)` },
    { label: "Traverse", code: `cur = head\nwhile cur:\n    print(cur.val)\n    cur = cur.next` },
  ],
  "grid-matrix": [
    { label: "Index", code: `grid = [[1,2,3],[4,5,6],[7,8,9]]\nvalue = grid[1][2]` },
    { label: "Neighbors", code: `dirs = [(1,0), (-1,0), (0,1), (0,-1)]\nfor dr, dc in dirs:\n    nr, nc = row + dr, col + dc` },
    { label: "Scan cells", code: `for r in range(len(grid)):\n    for c in range(len(grid[0])):\n        print(r, c, grid[r][c])` },
  ],
  tree: [
    { label: "Adjacency", code: `tree = {"A": ["B", "C"], "B": ["D", "E"]}` },
    { label: "DFS", code: `def dfs(node):\n    print(node)\n    for child in tree.get(node, []):\n        dfs(child)` },
    { label: "Recursive node", code: `class TNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right` },
  ],
  heap: [
    { label: "Min heap", code: `import heapq\nheap = [5, 2, 8]\nheapq.heapify(heap)\nsmallest = heapq.heappop(heap)` },
    { label: "Push", code: `import heapq\nheap = []\nheapq.heappush(heap, 4)` },
    { label: "Top K", code: `import heapq\nnums = [9, 1, 7, 3]\nprint(heapq.nsmallest(2, nums))` },
  ],
  graph: [
    { label: "Adjacency", code: `graph = {"A": ["B", "C"], "B": ["D"], "C": ["D"]}` },
    { label: "DFS", code: `def dfs(node, seen):\n    if node in seen: return\n    seen.add(node)` },
    { label: "BFS", code: `from collections import deque\nq = deque(["A"])\nseen = {"A"}` },
  ],
  trie: [
    { label: "Insert", code: `trie = {}\nfor word in ["cat", "car"]:\n    node = trie\n    for ch in word:\n        node = node.setdefault(ch, {})` },
    { label: "Prefix walk", code: `node = trie\nfor ch in "ca":\n    node = node.get(ch, {})` },
    { label: "Search idea", code: `def has_prefix(trie, prefix):\n    node = trie\n    for ch in prefix:\n        if ch not in node: return False\n        node = node[ch]\n    return True` },
  ],
  unionfind: [
    { label: "Find", code: `parent = {x: x for x in [1,2,3,4]}\ndef find(x):\n    if parent[x] != x:\n        parent[x] = find(parent[x])\n    return parent[x]` },
    { label: "Union", code: `def union(a, b):\n    ra, rb = find(a), find(b)\n    if ra != rb:\n        parent[rb] = ra` },
    { label: "Connectivity", code: `union(1, 2)\nprint(find(1) == find(2))` },
  ],
  "two-pointers": [
    { label: "Palindrome", code: `def is_pal(s):\n    l, r = 0, len(s) - 1\n    while l < r:\n        if s[l] != s[r]: return False\n        l += 1; r -= 1\n    return True` },
    { label: "Pair sum", code: `nums = [1,2,4,7,11]\nl, r = 0, len(nums)-1\nwhile l < r:\n    total = nums[l] + nums[r]` },
    { label: "In-place cleanup", code: `nums = [1,1,2,2,3]\nwrite = 1\nfor read in range(1, len(nums)):\n    if nums[read] != nums[read-1]:\n        nums[write] = nums[read]\n        write += 1` },
  ],
  "sliding-window": [
    { label: "Fixed size", code: `nums = [2,1,3,4,2]\nk = 3\nwindow_sum = sum(nums[:k])` },
    { label: "Slide", code: `for i in range(k, len(nums)):\n    window_sum += nums[i] - nums[i-k]` },
    { label: "Variable size", code: `left = 0\nfor right in range(len(nums)):\n    while bad_window():\n        left += 1` },
  ],
  "binary-search": [
    { label: "Classic", code: `def binary_search(nums, target):\n    lo, hi = 0, len(nums) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2` },
    { label: "Leftmost insert", code: `import bisect\nidx = bisect.bisect_left([1,3,5,7], 4)` },
    { label: "Answer space", code: `lo, hi = 1, 100\nwhile lo < hi:\n    mid = (lo + hi) // 2` },
  ],
  dfs: [
    { label: "Recursive DFS", code: `def dfs(node):\n    print(node)\n    for child in graph[node]:\n        dfs(child)` },
    { label: "Visited set", code: `def dfs(node, seen):\n    if node in seen: return\n    seen.add(node)` },
    { label: "Stack DFS", code: `stack = [start]\nwhile stack:\n    node = stack.pop()` },
  ],
  bfs: [
    { label: "Queue BFS", code: `from collections import deque\nq = deque([start])\nvisited = {start}` },
    { label: "Neighbors", code: `for nxt in graph[node]:\n    if nxt not in visited:\n        visited.add(nxt)` },
    { label: "Levels", code: `for _ in range(len(q)):\n    node = q.popleft()` },
  ],
  backtracking: [
    { label: "Template", code: `path = []\ndef bt(nums):\n    if done(path): return\n    for x in nums:\n        path.append(x)\n        bt(nums)\n        path.pop()` },
    { label: "Subsets", code: `def subsets(i):\n    if i == len(nums):\n        ans.append(path[:])` },
    { label: "Permutations", code: `for x in nums:\n    if x in used: continue` },
  ],
  dp: [
    { label: "Tabulation", code: `dp = [0] * (n + 1)\ndp[0] = 1` },
    { label: "Memoization", code: `memo = {}\ndef solve(i):\n    if i in memo: return memo[i]` },
    { label: "2D DP", code: `dp = [[0] * cols for _ in range(rows)]` },
  ],
  "topological-sort": [
    { label: "Indegree", code: `from collections import deque\nindegree = {"A": 0, "B": 1, "C": 1}` },
    { label: "Process", code: `order = []\nwhile q:\n    node = q.popleft()` },
    { label: "Unlock next", code: `for nxt in graph[node]:\n    indegree[nxt] -= 1` },
  ],
  greedy: [
    { label: "Sort by finish", code: `intervals.sort(key=lambda x: x[1])\nend = float("-inf")` },
    { label: "Pick compatible", code: `for start, finish in intervals:\n    if start >= end:\n        end = finish` },
    { label: "Coins style", code: `coins = [1, 5, 10]\nremaining = 18` },
  ],
  "prefix-sum": [
    { label: "Build", code: `prefix = [0]\nfor x in nums:\n    prefix.append(prefix[-1] + x)` },
    { label: "Range query", code: `range_sum = prefix[r+1] - prefix[l]` },
    { label: "Running totals", code: `running = 0\nfor x in nums:\n    running += x` },
  ],
  monotonic: [
    { label: "Monotonic stack", code: `stack = []\nfor x in nums:\n    while stack and stack[-1] < x:\n        stack.pop()\n    stack.append(x)` },
    { label: "Next greater", code: `for i, x in enumerate(nums):\n    while stack and nums[stack[-1]] < x:\n        j = stack.pop()` },
    { label: "Window max idea", code: `from collections import deque\ndq = deque()` },
  ],
};

const bigOData = {
  array: {
    summary: "Great random access, expensive middle edits.",
    cases: {
      best: ["Index access: O(1)", "Append to available room: O(1)"],
      average: ["Append: O(1) amortized", "Scan/search: O(n)", "Middle insert/delete: O(n)"],
      worst: ["Resize append spike: O(n)", "Front insert/delete: O(n)"],
      space: ["Stores n items: O(n)", "Slicing often costs extra O(k)"],
    },
  },
  "dynamic-array": {
    summary: "Cheap appends most of the time, occasional resize spikes.",
    cases: {
      best: ["Index access: O(1)", "Append without resize: O(1)"],
      average: ["Append: O(1) amortized", "Scan/search: O(n)"],
      worst: ["Resize append: O(n)", "Front insert/delete: O(n)"],
      space: ["Elements: O(n)", "Extra capacity buffer is common"],
    },
  },
  string: {
    summary: "Sequential text processing usually dominates.",
    cases: {
      best: ["Index access: O(1)"],
      average: ["Scan: O(n)", "Substring/slice: often O(k)"],
      worst: ["Full search/scan: O(n)", "Repeated concat loops can snowball"],
      space: ["String storage: O(n)", "Derived strings often cost O(k)"],
    },
  },
  hashmap: {
    summary: "The default answer when you need fast lookup by key.",
    cases: {
      best: ["Lookup/insert/delete: O(1)"],
      average: ["Lookup/update/delete: O(1) average", "Iterate all entries: O(n)"],
      worst: ["Bad collision behavior: O(n)", "Resize/rehash event: O(n)"],
      space: ["Key/value storage: O(n)", "Hash overhead on top"],
    },
  },
  set: {
    summary: "Like a hash map focused on membership only.",
    cases: {
      best: ["Membership/add/remove: O(1)"],
      average: ["Membership/add/remove: O(1) average", "Iteration: O(n)"],
      worst: ["Bad collision behavior: O(n)"],
      space: ["Store n unique items: O(n)"],
    },
  },
  stack: {
    summary: "Excellent when the top item is all you care about.",
    cases: {
      best: ["Push/pop/peek: O(1)"],
      average: ["Push/pop/peek: O(1)", "Search: O(n)"],
      worst: ["Find buried item: O(n)"],
      space: ["n items: O(n)"],
    },
  },
  queue: {
    summary: "Best for arrival-order work processing.",
    cases: {
      best: ["Enqueue/dequeue/peek: O(1)"],
      average: ["Enqueue/dequeue: O(1)", "Search: O(n)"],
      worst: ["Find arbitrary item: O(n)"],
      space: ["n items: O(n)"],
    },
  },
  deque: {
    summary: "Fast at both ends, not meant for random middle access.",
    cases: {
      best: ["End pushes/pops: O(1)"],
      average: ["End operations: O(1)", "Search/middle walk: O(n)"],
      worst: ["Middle access/search: O(n)"],
      space: ["n items: O(n)"],
    },
  },
  linkedlist: {
    summary: "Pointer surgery is the win; random access is the tax.",
    cases: {
      best: ["Insert/delete near known node: O(1)"],
      average: ["Search/access by index: O(n)"],
      worst: ["Tail search or indexed access: O(n)"],
      space: ["n nodes: O(n)", "Extra pointer storage per node"],
    },
  },
  "grid-matrix": {
    summary: "Think nested loops and neighbor checks.",
    cases: {
      best: ["Cell access by row/col: O(1)"],
      average: ["Full scan: O(rows * cols)", "DFS/BFS over cells: O(rows * cols)"],
      worst: ["Visit every cell: O(rows * cols)"],
      space: ["Grid storage: O(rows * cols)"],
    },
  },
  tree: {
    summary: "Cost depends a lot on tree shape.",
    cases: {
      best: ["Balanced BST search: O(log n)"],
      average: ["Traversal: O(n)", "Balanced search/insert/delete: O(log n)"],
      worst: ["Skewed tree operations: O(n)"],
      space: ["Node storage: O(n)", "Recursive stack: O(height)"],
    },
  },
  heap: {
    summary: "Perfect when you repeatedly need the min or max item.",
    cases: {
      best: ["Peek min/max: O(1)", "Heapify: O(n)"],
      average: ["Push/pop: O(log n)"],
      worst: ["Push/pop path: O(log n)", "Search arbitrary item: O(n)"],
      space: ["n items: O(n)"],
    },
  },
  graph: {
    summary: "Usually measured in vertices and edges.",
    cases: {
      best: ["One adjacency step: about O(1)"],
      average: ["Traversal: O(V + E)", "Neighbor iteration: O(deg(v))"],
      worst: ["Dense matrix storage: O(V^2)", "Full traversal: O(V + E)"],
      space: ["Adjacency list: O(V + E)", "Adjacency matrix: O(V^2)"],
    },
  },
  trie: {
    summary: "Performance depends on word length, not just number of words.",
    cases: {
      best: ["One character edge step: O(1)"],
      average: ["Insert/search prefix of length m: O(m)"],
      worst: ["Long path walk: O(m)", "Enumerating many matches can add cost"],
      space: ["Can be large due to many nodes/branches"],
    },
  },
  unionfind: {
    summary: "Feels almost constant in practice for connectivity checks.",
    cases: {
      best: ["Find after compression: near O(1)"],
      average: ["Find/union amortized: near O(1)", "Formal bound: O(α(n))"],
      worst: ["Without optimizations trees degrade badly"],
      space: ["Parent/rank maps or arrays: O(n)"],
    },
  },
  "two-pointers": {
    summary: "Often turns nested scans into one linear pass.",
    cases: {
      best: ["Quick hit can stop early"],
      average: ["Typical pass: O(n)", "Space: O(1)"],
      worst: ["Both pointers traverse full sequence: O(n)"],
      space: ["Usually O(1) auxiliary space"],
    },
  },
  "sliding-window": {
    summary: "Usually linear because each element enters and leaves once.",
    cases: {
      best: ["Small fixed bookkeeping can feel O(1) per move"],
      average: ["Typical runtime: O(n)", "Bookkeeping space: O(1) to O(k)"],
      worst: ["Pointers still usually total O(n)"],
      space: ["Often O(1) to O(k)"],
    },
  },
  "binary-search": {
    summary: "The classic logarithmic-time power move.",
    cases: {
      best: ["Mid hits immediately: O(1)"],
      average: ["Runtime: O(log n)", "Iterative space: O(1)"],
      worst: ["Full halving path: O(log n)"],
      space: ["Iterative O(1), recursive O(log n)"],
    },
  },
  dfs: {
    summary: "Traversal cost scales with what you actually visit.",
    cases: {
      best: ["Early target hit can stop fast"],
      average: ["Tree traversal: O(n)", "Graph traversal: O(V + E)"],
      worst: ["Visit whole structure: O(n) or O(V + E)"],
      space: ["Recursive stack: O(height) or O(V)"],
    },
  },
  bfs: {
    summary: "The standard shortest-path tool for unweighted graphs.",
    cases: {
      best: ["Target found in first levels: early exit possible"],
      average: ["Graph BFS: O(V + E)", "Tree BFS: O(n)"],
      worst: ["Visit whole frontier and structure: O(V + E)"],
      space: ["Queue can grow to a full frontier"],
    },
  },
  backtracking: {
    summary: "This is where combinatorial explosion lives.",
    cases: {
      best: ["Strong pruning can cut branches early"],
      average: ["Highly problem-dependent"],
      worst: ["Often exponential: O(2^n), O(n!), etc."],
      space: ["Recursion depth + current path/state"],
    },
  },
  dp: {
    summary: "Trade memory for avoiding repeated work.",
    cases: {
      best: ["Each state solved once when framed well"],
      average: ["Runtime: states × transitions", "1D DP often O(n)", "2D DP often O(rows * cols)"],
      worst: ["Large state spaces can still be expensive"],
      space: ["Table size often dominates", "Can sometimes compress space"],
    },
  },
  "topological-sort": {
    summary: "Linear in the size of the dependency graph.",
    cases: {
      best: ["Small DAG processes quickly"],
      average: ["Kahn or DFS topo sort: O(V + E)"],
      worst: ["Must inspect all vertices and edges: O(V + E)"],
      space: ["Queue/stack + indegree/visited storage: O(V)"],
    },
  },
  greedy: {
    summary: "Often dominated by sorting, then one clean pass.",
    cases: {
      best: ["If data is already friendly, scan is cheap"],
      average: ["Common pattern: sort O(n log n) + scan O(n)"],
      worst: ["Sorting often dominates: O(n log n)"],
      space: ["Varies by implementation"],
    },
  },
  "prefix-sum": {
    summary: "Pay upfront once, answer range queries fast later.",
    cases: {
      best: ["Single stored query after build: O(1)"],
      average: ["Build prefix array: O(n)", "Each range query: O(1)"],
      worst: ["Frequent rebuilds after mutation can hurt"],
      space: ["Extra prefix array: O(n)"],
    },
  },
  monotonic: {
    summary: "Looks tricky, but each item is usually pushed and popped at most once.",
    cases: {
      best: ["Smooth stream can require very little popping"],
      average: ["Typical runtime: O(n)", "Space: O(n)"],
      worst: ["Lots of popping still totals O(n) overall"],
      space: ["Stack/deque of candidates: O(n)"],
    },
  },
};

const invariantData = {
  array: "Index positions stay stable until you insert or delete before them.",
  "dynamic-array": "Values stay in contiguous slots even if the backing storage occasionally grows.",
  string: "Character order matters; every operation is really about positions in a sequence.",
  hashmap: "Each key maps to exactly one current value.",
  set: "An item is either present or absent. Never duplicated.",
  stack: "The top is always the most recent unresolved item.",
  queue: "The front is always the oldest unprocessed item.",
  deque: "Both ends stay cheap to modify; the middle is not the point.",
  linkedlist: "Each node only knows how to reach the next node.",
  "grid-matrix": "Every cell is addressed by row and column, and neighbors come from directional offsets.",
  tree: "Every child has one parent path back toward the root.",
  heap: "Parent priority always dominates child priority.",
  graph: "Nodes are defined by their connections, not by a single linear order.",
  trie: "Shared prefixes reuse the same path.",
  unionfind: "Each item belongs to exactly one representative parent chain.",
  "two-pointers": "Pointers only move inward or forward; they do not restart work.",
  "sliding-window": "The window always represents one contiguous live range.",
  "binary-search": "If the answer exists, it must still be inside the current bounds.",
  dfs: "Go as deep as possible before backing up.",
  bfs: "The queue frontier holds the next whole layer to explore.",
  backtracking: "Choose, explore, then undo so the next branch starts clean.",
  dp: "Each state stores the answer to a smaller subproblem exactly once.",
  "topological-sort": "Only nodes with satisfied prerequisites are eligible next.",
  greedy: "Each accepted local choice must preserve a globally valid path.",
  "prefix-sum": "Each prefix cell stores the total up to that point.",
  monotonic: "The stack or deque must stay monotonic after every push or pop.",
};

const smellData = {
  array: ["ordered list", "index lookup", "contiguous range"],
  "dynamic-array": ["append-heavy list", "resizable sequence", "random index access"],
  string: ["parse text", "substring", "character scan"],
  hashmap: ["fast lookup by key", "count frequencies", "group by something"],
  set: ["seen before?", "uniqueness", "visited tracking"],
  stack: ["undo", "nested structure", "most recent first"],
  queue: ["arrival order", "breadth-first", "work items waiting"],
  deque: ["both ends", "window helper", "rolling buffer"],
  linkedlist: ["pointer rewiring", "cheap insert near node", "node chain"],
  "grid-matrix": ["2D board", "neighbors", "row and column"],
  tree: ["hierarchy", "parent child", "recursive shape"],
  heap: ["top K", "next smallest", "priority"],
  graph: ["paths", "dependencies", "connected network"],
  trie: ["autocomplete", "prefix search", "shared word starts"],
  unionfind: ["are these connected?", "merge groups", "connected components"],
  "two-pointers": ["sorted pair", "palindrome", "in-place cleanup"],
  "sliding-window": ["longest substring", "shortest valid range", "contiguous window"],
  "binary-search": ["sorted input", "threshold", "smallest valid answer"],
  dfs: ["go deep", "recursive traversal", "explore all descendants"],
  bfs: ["shortest path", "level order", "fewest steps"],
  backtracking: ["all combinations", "constraints", "try and undo"],
  dp: ["same subproblem repeats", "best answer from smaller answers", "count ways"],
  "topological-sort": ["prerequisites", "dependency order", "build pipeline"],
  greedy: ["pick best next", "interval scheduling", "simple local rule"],
  "prefix-sum": ["many range sums", "running totals", "same array queried repeatedly"],
  monotonic: ["nearest greater", "window max", "keep only useful candidates"],
};

const compareData = {
  array: { better: "Array / List", insteadOf: "Linked List", why: "fast index access and simple scans matter more than cheap pointer edits." },
  "dynamic-array": { better: "Dynamic Array", insteadOf: "Linked List", why: "most modern app code wants append plus O(1) index access." },
  string: { better: "String", insteadOf: "Array / List", why: "the data is text and string operations are the native fit." },
  hashmap: { better: "Hash Map", insteadOf: "Array / List", why: "a linear scan becomes unnecessary when you can jump straight to a key." },
  set: { better: "Set", insteadOf: "Hash Map", why: "you only care whether something exists, not what it maps to." },
  stack: { better: "Stack", insteadOf: "Queue", why: "recency matters more than arrival order." },
  queue: { better: "Queue", insteadOf: "Stack", why: "first-in work must be processed first." },
  deque: { better: "Deque", insteadOf: "Queue", why: "both ends need to stay cheap." },
  linkedlist: { better: "Linked List", insteadOf: "Array / List", why: "pointer rewiring is the point, not random indexing." },
  "grid-matrix": { better: "Grid / Matrix", insteadOf: "Graph", why: "the world is naturally row/column based and neighbors come from directions." },
  tree: { better: "Tree", insteadOf: "Graph", why: "the data belongs in a clean parent-child hierarchy." },
  heap: { better: "Heap", insteadOf: "Sorted Array", why: "you repeatedly need the next min or max without fully resorting every time." },
  graph: { better: "Graph", insteadOf: "Tree", why: "nodes may have multiple relationships or cycles." },
  trie: { better: "Trie", insteadOf: "Hash Map", why: "prefix matching matters more than exact whole-word lookup." },
  unionfind: { better: "Union-Find", insteadOf: "Repeated Graph Traversal", why: "you keep merging groups and asking if two items are connected." },
  "two-pointers": { better: "Two Pointers", insteadOf: "Nested Loops", why: "careful pointer motion can replace an O(n²) brute-force scan." },
  "sliding-window": { better: "Sliding Window", insteadOf: "Repeated Subarray Rescans", why: "the range is contiguous and state can update as the window moves." },
  "binary-search": { better: "Binary Search", insteadOf: "Linear Search", why: "the data or answer space has a monotonic order you can exploit." },
  dfs: { better: "DFS", insteadOf: "BFS", why: "depth and recursive structure matter more than shortest-path layering." },
  bfs: { better: "BFS", insteadOf: "DFS", why: "the first time you reach something should also be the shortest path." },
  backtracking: { better: "Backtracking", insteadOf: "Greedy", why: "you truly must explore alternatives because one local choice is not enough." },
  dp: { better: "Dynamic Programming", insteadOf: "Backtracking", why: "the same subproblems keep repeating and can be cached." },
  "topological-sort": { better: "Topological Sort", insteadOf: "Plain BFS/DFS", why: "the real goal is dependency order, not just traversal." },
  greedy: { better: "Greedy", insteadOf: "Dynamic Programming", why: "a simple local rule is provably safe or clearly good enough." },
  "prefix-sum": { better: "Prefix Sum", insteadOf: "Repeated Range Scans", why: "the array is stable and many range queries hit the same data." },
  monotonic: { better: "Monotonic Stack / Queue", insteadOf: "Plain Stack / Queue", why: "weaker candidates should be discarded immediately." },
};

const beforeAfterData = {
  array: { before: "Repeated inserts near the front shift many elements.", after: "Use arrays when the payoff is simple indexing and scans.", complexity: "Indexing stays O(1), but front or middle edits cost O(n)." },
  "dynamic-array": { before: "Assume every append is expensive.", after: "Most appends are cheap; only occasional resize events spike.", complexity: "Append becomes O(1) amortized instead of feeling like O(n) every time." },
  string: { before: "Treat text like opaque blobs.", after: "Think in character positions, slices, and scans.", complexity: "Most text passes are O(n), while targeted indexing is O(1)." },
  hashmap: { before: "Scan the whole list to find matching keys.", after: "Jump directly by key.", complexity: "Lookup often drops from O(n) to O(1) average." },
  set: { before: "Scan to ask 'have I seen this before?'.", after: "Check membership directly.", complexity: "Membership often drops from O(n) to O(1) average." },
  stack: { before: "Track unresolved recent work in scattered variables.", after: "Push unresolved items and pop them when resolved.", complexity: "Core operations stay O(1)." },
  queue: { before: "Rescan for the next item to process in order.", after: "Keep a live FIFO frontier.", complexity: "Enqueue and dequeue stay O(1)." },
  deque: { before: "Use the wrong structure for both-end edits.", after: "Keep both ends cheap.", complexity: "Both-end operations stay O(1)." },
  linkedlist: { before: "Shift a whole array just to splice one item.", after: "Rewire pointers locally.", complexity: "Known-node insert or delete can be O(1)." },
  "grid-matrix": { before: "Treat a board like an unstructured blob.", after: "Use row/col indexing and direction vectors.", complexity: "Neighbor checks become O(1); full scans stay O(rows × cols)." },
  tree: { before: "Flatten hierarchy and lose structure.", after: "Traverse by parent-child shape.", complexity: "Traversal is O(n), balanced search can be O(log n)." },
  heap: { before: "Re-sort everything whenever you need the next min or max.", after: "Keep only priority order.", complexity: "Repeated next-item retrieval becomes O(log n) per push or pop." },
  graph: { before: "Pretend relationships are linear.", after: "Traverse by edges and visited state.", complexity: "Whole traversal becomes O(V + E)." },
  trie: { before: "Compare a prefix against every whole word.", after: "Walk shared prefix paths once.", complexity: "Prefix lookup becomes O(m) in prefix length." },
  unionfind: { before: "Rerun traversal again and again to ask if two items connect.", after: "Track group representatives incrementally.", complexity: "Connectivity checks become near O(1) amortized." },
  "two-pointers": { before: "Nested loops try every pair.", after: "Move pointers with purpose.", complexity: "Many sorted pair problems drop from O(n²) to O(n)." },
  "sliding-window": { before: "Recompute every window from scratch.", after: "Update the live range as it moves.", complexity: "Repeated window work often drops to O(n)." },
  "binary-search": { before: "Scan one value at a time.", after: "Discard half the search space each step.", complexity: "Search drops from O(n) to O(log n)." },
  dfs: { before: "Wander without structure.", after: "Commit to one branch, then back up.", complexity: "Traversal becomes a clean O(n) or O(V + E)." },
  bfs: { before: "Use DFS and hope shortest path falls out naturally.", after: "Explore layer by layer.", complexity: "Shortest path in unweighted graphs becomes a standard O(V + E) pass." },
  backtracking: { before: "Guess blindly without state cleanup.", after: "Choose, recurse, undo.", complexity: "Still exponential in worst case, but much more controlled and prunable." },
  dp: { before: "Recompute the same subproblem over and over.", after: "Store answers once and reuse them.", complexity: "Exponential recursion can often collapse to polynomial time." },
  "topological-sort": { before: "Run tasks in arbitrary order and hit dependency failures.", after: "Only process nodes whose prerequisites are satisfied.", complexity: "A valid order emerges in O(V + E)." },
  greedy: { before: "Overbuild with exhaustive search.", after: "Take the next provably safe local move.", complexity: "Many greedy solutions become sort O(n log n) + scan O(n)." },
  "prefix-sum": { before: "Add the same range again and again.", after: "Precompute cumulative totals once.", complexity: "Range query drops from O(n) each to O(1) after O(n) preprocessing." },
  monotonic: { before: "Keep many candidates that are already useless.", after: "Discard weaker candidates immediately.", complexity: "Nearest-greater and window-max style work becomes O(n)." },
};

const guidedStepsData = {
  array: ["Start with a line of boxes.", "Each box has an index.", "Read or update by index instantly.", "Notice inserts near the front shift later boxes.", "Use arrays when ordered scanning and indexing are the real job."],
  hashmap: ["Pick a key you care about.", "Jump straight to its value.", "Notice there is no left-to-right scan.", "Change or count values by key.", "Reach for this when lookup is the bottleneck."],
  heap: ["Drop values into the priority structure.", "Notice the smallest or largest is always on top.", "Push one more item and watch priority restore.", "Pop the top and keep the next best ready.", "Use this for top-K or next-priority work."],
  graph: ["Think nodes plus edges, not a line.", "Pick a start node.", "Track visited nodes so you do not loop forever.", "Traverse by relationships.", "Use graphs when the data is really about connections."],
  "binary-search": ["Start with low and high bounds.", "Check the middle.", "Throw away the half that cannot contain the answer.", "Repeat until bounds collapse.", "The win comes from discarding huge chunks of work."],
  dfs: ["Choose a starting node.", "Go to one child and keep going deep.", "Only back up when a branch is exhausted.", "Track visited state for cyclic graphs.", "Use this when deep structure matters more than shortest path."],
  bfs: ["Put the start node in a queue.", "Process the whole current frontier.", "Enqueue newly discovered neighbors.", "Notice all distance-1 nodes come before distance-2 nodes.", "Use this when shortest path or layering matters."],
  backtracking: ["Make one choice.", "Recurse deeper with that choice in place.", "Hit a dead end or finish a solution.", "Undo the choice cleanly.", "Repeat for the next branch."],
  dp: ["Define what one state means.", "Ask what smaller states it depends on.", "Compute each state once.", "Reuse stored answers instead of recomputing.", "The magic is in the state definition, not the syntax."],
  "topological-sort": ["Count how many prerequisites each node still has.", "Start with the nodes that need nothing.", "Take one and mark it done.", "Reduce the indegree of dependents.", "When a dependent reaches zero, it becomes eligible."],
  monotonic: ["Read the next value.", "Ask whether weaker candidates can still matter.", "Pop the ones that cannot.", "Push the current value.", "The structure stays monotonic the whole time."],
};

const usageRank = {
  array: 1,
  hashmap: 2,
  string: 3,
  set: 4,
  queue: 5,
  tree: 6,
  graph: 7,
  "dynamic-array": 8,
  heap: 9,
  stack: 10,
  "binary-search": 11,
  "sliding-window": 12,
  dfs: 13,
  bfs: 14,
  dp: 15,
  "two-pointers": 16,
  deque: 17,
  "prefix-sum": 18,
  greedy: 19,
  "grid-matrix": 20,
  linkedlist: 21,
  trie: 22,
  "topological-sort": 23,
  monotonic: 24,
  backtracking: 25,
  unionfind: 26,
};

const allItems = [...structureData, ...patternData].map((item) => ({
  ...item,
  pythonExamples: extraPythonExamples[item.id] || [{ label: "Sketch", code: item.python }],
  bigO: bigOData[item.id],
  invariant: invariantData[item.id],
  smells: smellData[item.id] || [],
  compare: compareData[item.id],
  beforeAfter: beforeAfterData[item.id],
  guidedSteps: guidedStepsData[item.id] || [
    "Read the mental model first.",
    "Notice what state the structure or pattern keeps.",
    "Interact with the demo and watch what changes.",
    "Match the Python sketch to the visual state.",
    "Use the smell cues to recognize it in the wild.",
  ],
  usageRank: usageRank[item.id] ?? 999,
}));

function SectionPill({ children }) {
  return <div className="rounded-full border bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">{children}</div>;
}

function SmallBadgeList({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Badge key={item} variant="secondary" className="rounded-full bg-slate-100 text-slate-700">
          {item}
        </Badge>
      ))}
    </div>
  );
}

function Box({ children, className = "" }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}>{children}</div>;
}

function PythonBlock({ code }) {
  return (
    <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-4 text-xs leading-6 text-green-300 shadow-inner">
      <code>{code}</code>
    </pre>
  );
}

function getDefaultSketchIndex(activeBigO = "typical", total = 1) {
  const focusToIndex = {
    fast: 0,
    typical: Math.min(1, total - 1),
    expensive: Math.min(2, total - 1),
    memory: 0,
  };
  return focusToIndex[activeBigO] ?? 0;
}

function MiniBlock({ children, tone = "slate", active = false }) {
  const toneMap = {
    slate: active ? "border-slate-500 bg-slate-100 text-slate-900" : "border-slate-200 bg-white text-slate-700",
    blue: active ? "border-blue-500 bg-blue-100 text-blue-900" : "border-blue-200 bg-blue-50 text-blue-700",
    emerald: active ? "border-emerald-500 bg-emerald-100 text-emerald-900" : "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: active ? "border-amber-500 bg-amber-100 text-amber-900" : "border-amber-200 bg-amber-50 text-amber-700",
    violet: active ? "border-violet-500 bg-violet-100 text-violet-900" : "border-violet-200 bg-violet-50 text-violet-700",
    rose: active ? "border-rose-500 bg-rose-100 text-rose-900" : "border-rose-200 bg-rose-50 text-rose-700",
    cyan: active ? "border-cyan-500 bg-cyan-100 text-cyan-900" : "border-cyan-200 bg-cyan-50 text-cyan-700",
    indigo: active ? "border-indigo-500 bg-indigo-100 text-indigo-900" : "border-indigo-200 bg-indigo-50 text-indigo-700",
    green: active ? "border-green-500 bg-green-100 text-green-900" : "border-green-200 bg-green-50 text-green-700",
    fuchsia: active ? "border-fuchsia-500 bg-fuchsia-100 text-fuchsia-900" : "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700",
    yellow: active ? "border-yellow-500 bg-yellow-100 text-yellow-900" : "border-yellow-200 bg-yellow-50 text-yellow-700",
  };
  return (
    <motion.div layout className={`grid min-h-10 min-w-10 place-items-center rounded-xl border-2 px-3 py-2 text-sm font-semibold shadow-sm ${toneMap[tone] || toneMap.slate}`}>
      {children}
    </motion.div>
  );
}

function FlowLane({ label, children }) {
  return (
    <div className="space-y-2">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

function FlowHint({ children }) {
  return <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs leading-5 text-slate-600">{children}</div>;
}

function FlowVisualizer({ item, sketchIndex = 0 }) {
  const k = `${item.id}:${sketchIndex}`;

  const visual = (() => {
    switch (item.id) {
      case "array": {
        const variants = [
          { label: "append + index", blocks: [3, 7, 2, 9], active: 1, hint: "Array values stay in order, and index lookup jumps straight to one slot." },
          { label: "scan", blocks: [3, 7, 2, 9], active: 2, hint: "A scan touches items one after another from left to right." },
          { label: "slice", blocks: [3, 7, 2, 9], activeRange: [1, 2], hint: "Slicing copies a contiguous chunk out of the array." },
        ][sketchIndex] || { label: "array", blocks: [3, 7, 2], active: 0, hint: "Arrays are ordered boxes with indexes." };
        return (
          <div className="space-y-3">
            <FlowLane label={variants.label}>
              {variants.blocks.map((n, i) => <MiniBlock key={i} tone="blue" active={variants.active === i || variants.activeRange?.includes(i)}>{n}</MiniBlock>)}
            </FlowLane>
            <FlowHint>{variants.hint}</FlowHint>
          </div>
        );
      }
      case "dynamic-array": {
        const length = sketchIndex === 0 ? 4 : sketchIndex === 1 ? 6 : 5;
        const capacity = length <= 4 ? 4 : 8;
        return (
          <div className="space-y-3">
            <FlowLane label="used slots vs capacity">
              {Array.from({ length: capacity }).map((_, i) => <MiniBlock key={i} tone="cyan" active={i < length}>{i < length ? i + 1 : "·"}</MiniBlock>)}
            </FlowLane>
            <FlowHint>Dynamic arrays usually append cheaply. Occasionally they grow to a bigger backing store and copy the values over.</FlowHint>
          </div>
        );
      }
      case "string": {
        const text = sketchIndex === 2 ? "algorithm" : sketchIndex === 1 ? "banana" : "hello";
        const activeRange = sketchIndex === 2 ? [2, 3, 4, 5] : [];
        return (
          <div className="space-y-3">
            <FlowLane label="characters in order">
              {text.split("").map((ch, i) => <MiniBlock key={i} tone="cyan" active={sketchIndex === 0 ? i === 0 : activeRange.includes(i)}>{ch}</MiniBlock>)}
            </FlowLane>
            <FlowHint>{sketchIndex === 1 ? "String work often means counting or matching characters as you scan." : sketchIndex === 2 ? "Substring work usually means taking a contiguous run of characters." : "Strings behave like indexed character sequences."}</FlowHint>
          </div>
        );
      }
      case "hashmap": {
        const entries = sketchIndex === 1 ? [[42, "Russ"], [7, "Ada"]] : sketchIndex === 2 ? [[2, "at,to"], [3, "tea"]] : [["b", 1], ["a", 3], ["n", 2]];
        return (
          <div className="space-y-3">
            <FlowLane label="key → value jumps">
              {entries.map(([a, b]) => <div key={`${a}-${b}`} className="flex items-center gap-2"><MiniBlock tone="emerald">{a}</MiniBlock><span className="text-slate-400">→</span><MiniBlock tone="emerald" active>{b}</MiniBlock></div>)}
            </FlowLane>
            <FlowHint>{sketchIndex === 2 ? "Grouping means many inputs funnel into buckets by a shared key." : "The value lives behind a key, so you skip the full scan."}</FlowHint>
          </div>
        );
      }
      case "set": {
        const source = ["A", "B", "A", "C"];
        const unique = ["A", "B", "C"];
        return (
          <div className="space-y-3">
            <FlowLane label="source values">{source.map((v, i) => <MiniBlock key={i} tone="violet" active={i === 2}>{v}</MiniBlock>)}</FlowLane>
            <FlowLane label="what remains">{unique.map((v) => <MiniBlock key={v} tone="violet" active>{v}</MiniBlock>)}</FlowLane>
            <FlowHint>Sets collapse duplicates and answer one main question quickly: is this already here?</FlowHint>
          </div>
        );
      }
      case "stack": {
        const items = sketchIndex === 1 ? ["(", "(", "("] : ["A", "B", "C"];
        return (
          <div className="space-y-3">
            <FlowLane label="last in, first out">
              <div className="flex flex-col-reverse gap-2">{items.map((v, i) => <MiniBlock key={i} tone="amber" active={i === items.length - 1}>{v}</MiniBlock>)}</div>
            </FlowLane>
            <FlowHint>The top item is the next unresolved thing to come back out.</FlowHint>
          </div>
        );
      }
      case "queue": {
        const items = sketchIndex === 2 ? ["email", "retry", "sync"] : ["A", "B", "C"];
        return (
          <div className="space-y-3">
            <FlowLane label="first in, first out">
              <span className="text-xs text-slate-500">IN</span>
              {items.map((v, i) => <MiniBlock key={i} tone="emerald" active={i === 0}>{v}</MiniBlock>)}
              <span className="text-xs text-slate-500">OUT</span>
            </FlowLane>
            <FlowHint>The front item waited the longest, so it leaves first.</FlowHint>
          </div>
        );
      }
      case "deque": {
        const items = [1, 2, 3, 4];
        return (
          <div className="space-y-3">
            <FlowLane label="both ends stay cheap">
              <MiniBlock tone="amber" active>left</MiniBlock>
              {items.map((v) => <MiniBlock key={v} tone="amber">{v}</MiniBlock>)}
              <MiniBlock tone="amber" active>right</MiniBlock>
            </FlowLane>
            <FlowHint>Use a deque when pushes and pops can happen on either end.</FlowHint>
          </div>
        );
      }
      case "linkedlist": {
        const items = [1, 2, 3, 4];
        return (
          <div className="space-y-3">
            <FlowLane label="node points to next node">
              {items.map((v, i) => <React.Fragment key={i}><MiniBlock tone="indigo" active={i === 1}>{v}</MiniBlock>{i < items.length - 1 && <span className="text-slate-400">→</span>}</React.Fragment>)}
            </FlowLane>
            <FlowHint>Linked lists shine when changing pointers is cheaper than shifting many array elements.</FlowHint>
          </div>
        );
      }
      case "grid-matrix": {
        const cells = [[1,2,3],[4,5,6],[7,8,9]];
        return (
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">row + column address</div>
            <div className="inline-grid gap-2" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
              {cells.flatMap((r, ri) => r.map((v, ci) => <MiniBlock key={`${ri}-${ci}`} tone="green" active={ri === 1 && ci === 1}>{v}</MiniBlock>))}
            </div>
            <FlowHint>One cell is selected by its row and column, and neighbors come from directional moves.</FlowHint>
          </div>
        );
      }
      case "tree": {
        return (
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">parent → children</div>
            <div className="flex flex-col items-center gap-2">
              <MiniBlock tone="green" active>A</MiniBlock>
              <div className="flex gap-6"><MiniBlock tone="green">B</MiniBlock><MiniBlock tone="green">C</MiniBlock></div>
              <div className="flex gap-4"><MiniBlock tone="green">D</MiniBlock><MiniBlock tone="green">E</MiniBlock><MiniBlock tone="green">F</MiniBlock></div>
            </div>
            <FlowHint>Trees are for clean hierarchy. Each node belongs under one parent path.</FlowHint>
          </div>
        );
      }
      case "heap": {
        const items = [1, 2, 8, 5, 6];
        return (
          <div className="space-y-3">
            <FlowLane label="best priority stays on top">{items.map((v, i) => <MiniBlock key={i} tone="fuchsia" active={i === 0}>{v}</MiniBlock>)}</FlowLane>
            <FlowHint>The whole structure is not fully sorted. It only guarantees that the top priority is easy to grab next.</FlowHint>
          </div>
        );
      }
      case "graph": {
        const nodes = ["A", "B", "C", "D", "E", "F"];
        return (
          <div className="space-y-3">
            <FlowLane label="connected nodes">
              {nodes.map((n, i) => <MiniBlock key={n} tone="rose" active={i < 3}>{n}</MiniBlock>)}
            </FlowLane>
            <FlowHint>Graphs are about relationships and paths, so traversal depends on edges and visited state.</FlowHint>
          </div>
        );
      }
      case "trie": {
        return (
          <div className="space-y-3">
            <FlowLane label="shared prefix path">
              <MiniBlock tone="cyan" active>c</MiniBlock><span className="text-slate-400">→</span><MiniBlock tone="cyan" active>a</MiniBlock><span className="text-slate-400">→</span><MiniBlock tone="cyan">t</MiniBlock><MiniBlock tone="cyan">r</MiniBlock>
            </FlowLane>
            <FlowHint>Words with the same beginning reuse the same path, which is why tries feel natural for prefixes.</FlowHint>
          </div>
        );
      }
      case "unionfind": {
        const groups = [[1,2],[3,4,5]];
        return (
          <div className="space-y-3">
            <FlowLane label="merged groups">
              {groups.map((g, i) => <div key={i} className="flex gap-2 rounded-2xl border border-yellow-200 bg-white p-2">{g.map((n) => <MiniBlock key={n} tone="yellow" active>{n}</MiniBlock>)}</div>)}
            </FlowLane>
            <FlowHint>Instead of traversing the whole graph every time, union-find keeps a quick representative for each group.</FlowHint>
          </div>
        );
      }
      case "two-pointers": {
        const chars = ["r","a","c","e","c","a","r"];
        return (
          <div className="space-y-3">
            <FlowLane label="left and right move inward">
              {chars.map((ch, i) => <div key={i} className="flex flex-col items-center gap-1"><div className="text-[10px] text-slate-400">{i===0?"L":i===chars.length-1?"R":""}</div><MiniBlock tone="blue" active={i===0||i===chars.length-1}>{ch}</MiniBlock></div>)}
            </FlowLane>
            <FlowHint>Two pointers work when you can make progress without restarting earlier comparisons.</FlowHint>
          </div>
        );
      }
      case "sliding-window": {
        const nums = [2,1,3,4,2];
        return (
          <div className="space-y-3">
            <FlowLane label="one live window">{nums.map((n, i) => <MiniBlock key={i} tone="emerald" active={i>=1 && i<=3}>{n}</MiniBlock>)}</FlowLane>
            <FlowHint>Instead of recomputing every range, keep one contiguous window and update it as it moves.</FlowHint>
          </div>
        );
      }
      case "binary-search": {
        const nums = [1,3,5,7,9,11,13];
        return (
          <div className="space-y-3">
            <FlowLane label="bounds shrink around the answer">{nums.map((n, i) => <MiniBlock key={i} tone="violet" active={i>=2 && i<=4}>{n}</MiniBlock>)}</FlowLane>
            <FlowHint>The algorithm keeps only the half that could still contain the answer.</FlowHint>
          </div>
        );
      }
      case "dfs": {
        const path = ["A", "B", "D", "E"];
        return (
          <div className="space-y-3">
            <FlowLane label="go deep first">{path.map((n, i) => <React.Fragment key={n}><MiniBlock tone="amber" active>{n}</MiniBlock>{i<path.length-1 && <span className="text-slate-400">→</span>}</React.Fragment>)}</FlowLane>
            <FlowHint>DFS commits to one branch before backing up and trying siblings.</FlowHint>
          </div>
        );
      }
      case "bfs": {
        const levels = [["A"],["B","C"],["D","E","F"]];
        return (
          <div className="space-y-3">
            {levels.map((level, i) => <FlowLane key={i} label={`level ${i}`}>{level.map((n) => <MiniBlock key={n} tone="cyan" active={i<2}>{n}</MiniBlock>)}</FlowLane>)}
            <FlowHint>BFS spreads outward layer by layer, which is why it finds shortest paths in unweighted graphs.</FlowHint>
          </div>
        );
      }
      case "backtracking": {
        const path = [1,2,3];
        return (
          <div className="space-y-3">
            <FlowLane label="choose → recurse → undo">{path.map((n, i) => <React.Fragment key={i}><MiniBlock tone="rose" active>{n}</MiniBlock>{i<path.length-1 && <span className="text-slate-400">→</span>}</React.Fragment>)}</FlowLane>
            <FlowHint>Backtracking explores one branch, then unwinds so the next branch starts with clean state.</FlowHint>
          </div>
        );
      }
      case "dp": {
        const vals = [0,1,1,2,3,5,8];
        return (
          <div className="space-y-3">
            <FlowLane label="smaller answers build bigger answers">{vals.map((v,i)=><MiniBlock key={i} tone="indigo" active={i>=4}>{v}</MiniBlock>)}</FlowLane>
            <FlowHint>DP stores solved subproblems so later answers can reuse them instead of recomputing them.</FlowHint>
          </div>
        );
      }
      case "topological-sort": {
        const done = ["Plan","Code","Test","Deploy"];
        return (
          <div className="space-y-3">
            <FlowLane label="only unlocked tasks can move next">{done.map((n,i)=><MiniBlock key={n} tone="emerald" active={i<3}>{n}</MiniBlock>)}</FlowLane>
            <FlowHint>Nodes become eligible only after their prerequisites are satisfied.</FlowHint>
          </div>
        );
      }
      case "greedy": {
        const picks = [[1,3],[4,6],[6,8]];
        return (
          <div className="space-y-3">
            <FlowLane label="take the next safe local win">{picks.map(([a,b],i)=><MiniBlock key={i} tone="green" active>{`${a}-${b}`}</MiniBlock>)}</FlowLane>
            <FlowHint>Greedy succeeds when one local choice safely moves you toward a globally good outcome.</FlowHint>
          </div>
        );
      }
      case "prefix-sum": {
        const nums = [2,4,1,3];
        const prefix = [0,2,6,7,10];
        return (
          <div className="space-y-3">
            <FlowLane label="original">{nums.map((n,i)=><MiniBlock key={i} tone="violet">{n}</MiniBlock>)}</FlowLane>
            <FlowLane label="prefix totals">{prefix.map((n,i)=><MiniBlock key={i} tone="violet" active={i>0}>{n}</MiniBlock>)}</FlowLane>
            <FlowHint>Do the cumulative work once up front so later range queries are just subtraction.</FlowHint>
          </div>
        );
      }
      case "monotonic": {
        const kept = [5,4,3];
        return (
          <div className="space-y-3">
            <FlowLane label="keep only useful candidates">{kept.map((n,i)=><MiniBlock key={i} tone="amber" active>{n}</MiniBlock>)}</FlowLane>
            <FlowHint>Weaker candidates get popped immediately so the structure only keeps values that can still matter.</FlowHint>
          </div>
        );
      }
      default:
        return (
          <div className="space-y-3">
            <FlowLane label="concept flow"><MiniBlock tone="slate" active>{item.name}</MiniBlock></FlowLane>
            <FlowHint>Use the demo to see the state change and the sketch to match the code to that movement.</FlowHint>
          </div>
        );
    }
  })();

  return (
    <Box className="rounded-3xl border-slate-200 bg-slate-50">
      <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Flow of data</div>
      {visual}
    </Box>
  );
}

function SketchTabs({ item, activeBigO = "typical" }) {
  const examples = item.pythonExamples?.length ? item.pythonExamples : [{ label: "Sketch", code: item.python }];
  const focusToIndex = {
    fast: 0,
    typical: Math.min(1, examples.length - 1),
    expensive: Math.min(2, examples.length - 1),
    memory: 0,
  };
  const [active, setActive] = useState(focusToIndex[activeBigO] ?? 0);

  useEffect(() => {
    setActive(focusToIndex[activeBigO] ?? 0);
  }, [item.id, activeBigO]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {examples.map((example, idx) => (
          <Button key={example.label} size="sm" variant={idx === active ? "default" : "outline"} onClick={() => setActive(idx)}>
            {example.label}
          </Button>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
        This sketch is matched to the current Big O focus when possible.
      </div>
      <PythonBlock code={examples[active].code} />
    </div>
  );
}

function BigOTabs({ item, activeBigO = "typical", setActiveBigO }) {
  const tabs = [
    { key: "fast", label: "Fast", mapsTo: "best", helper: "When this tool feels quick." },
    { key: "typical", label: "Typical", mapsTo: "average", helper: "What usually happens in normal use." },
    { key: "expensive", label: "Expensive", mapsTo: "worst", helper: "Where this tool can get costly." },
    { key: "memory", label: "Memory", mapsTo: "space", helper: "How much extra room it tends to use." },
  ];

  useEffect(() => {
    setActiveBigO?.("typical");
  }, [item.id, setActiveBigO]);

  const activeTab = tabs.find((tab) => tab.key === activeBigO) || tabs[1];
  const points = item.bigO?.cases?.[activeTab.mapsTo] || [];

  return (
    <Box className="rounded-3xl bg-slate-50">
      <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Big O feel</div>
      <p className="mb-3 text-sm font-medium text-slate-700">{item.bigO?.summary}</p>
      <div className="mb-3 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Button key={tab.key} size="sm" variant={activeBigO === tab.key ? "default" : "outline"} onClick={() => setActiveBigO?.(tab.key)}>
            {tab.label}
          </Button>
        ))}
      </div>
      <div className="mb-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
        {activeTab.helper}
      </div>
      <div className="space-y-2">
        {points.map((point) => (
          <div key={point} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
            {point}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
        Translation: Big O is about how work grows as the input gets bigger, not about exact stopwatch time.
      </div>
    </Box>
  );
}

function BigOLegend() {
  const items = [
    { label: "O(1)", meaning: "stays flat", note: "input grows, cost barely changes" },
    { label: "O(log n)", meaning: "grows slowly", note: "you throw away lots of work each step" },
    { label: "O(n)", meaning: "grows with input", note: "touch each item about once" },
    { label: "O(n log n)", meaning: "usually sort + work", note: "common for sorting-based solutions" },
    { label: "O(n²)", meaning: "grows fast", note: "nested loops over the same data" },
    { label: "Exponential", meaning: "can blow up hard", note: "choices branch faster than input grows" },
  ];

  return (
    <Box className="rounded-3xl border-slate-200 bg-slate-50">
      <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Big O legend</div>
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-3">
            <div className="font-mono text-sm font-bold text-slate-900">{item.label}</div>
            <div className="mt-1 text-sm font-medium text-slate-700">{item.meaning}</div>
            <div className="mt-1 text-xs text-slate-500">{item.note}</div>
          </div>
        ))}
      </div>
    </Box>
  );
}

function MasteryBox({ item }) {
  const prompts = [
    `I can explain ${item.name} in plain English.`,
    `I know the main invariant of ${item.name}.`,
    `I can recognize when a problem smells like ${item.name}.`,
    `I know what simpler but slower approach ${item.name} can replace.`,
    `I can sketch ${item.name} from memory without copying code.`
  ];

  return (
    <Box className="rounded-3xl border-emerald-200 bg-emerald-50">
      <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-700">Mastery checklist</div>
      <div className="space-y-2">
        {prompts.map((prompt) => (
          <div key={prompt} className="rounded-2xl border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-700">
            ☐ {prompt}
          </div>
        ))}
      </div>
    </Box>
  );
}

function IntentBox({ item }) {
  return (
    <Box className="rounded-3xl border-blue-200 bg-blue-50">
      <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">Intent of the code</div>
      <p className="mt-2 text-sm leading-6 text-slate-700">
        The point of <span className="font-semibold">{item.name}</span> is to make the important operation cheap and obvious. When you use it well, the code should read like a statement of intent, not a pile of mechanics.
      </p>
    </Box>
  );
}

function DecisionRecipeBox({ item }) {
  return (
    <Box className="rounded-3xl border-purple-200 bg-purple-50">
      <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-purple-700">Decision recipe</div>
      <div className="space-y-2 text-sm text-slate-700">
        <div className="rounded-2xl border border-purple-200 bg-white px-3 py-2">1. What operation must be cheap?</div>
        <div className="rounded-2xl border border-purple-200 bg-white px-3 py-2">2. What shape does the data have?</div>
        <div className="rounded-2xl border border-purple-200 bg-white px-3 py-2">3. Which invariant must stay true while the code runs?</div>
        <div className="rounded-2xl border border-purple-200 bg-white px-3 py-2">4. Does <span className="font-semibold">{item.name}</span> make that intent clearer than the obvious brute-force option?</div>
      </div>
    </Box>
  );
}

function InvariantBox({ item }) {
  return (
    <Box className="rounded-3xl border-amber-200 bg-amber-50">
      <div className="text-sm font-semibold uppercase tracking-wide text-amber-700">Invariant</div>
      <p className="mt-2 text-sm leading-6 text-slate-700">{item.invariant}</p>
    </Box>
  );
}

function SmellBox({ item }) {
  return (
    <Box className="rounded-3xl border-cyan-200 bg-cyan-50">
      <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-700">Problem smells like</div>
      <div className="flex flex-wrap gap-2">
        {item.smells.map((smell) => (
          <Badge key={smell} className="rounded-full bg-cyan-600">{smell}</Badge>
        ))}
      </div>
    </Box>
  );
}

function CompareBox({ item }) {
  if (!item.compare) return null;
  return (
    <Box className="rounded-3xl border-rose-200 bg-rose-50">
      <div className="text-sm font-semibold uppercase tracking-wide text-rose-700">Why this, not that?</div>
      <p className="mt-2 text-sm text-slate-700">
        Reach for <span className="font-semibold">{item.compare.better}</span> instead of <span className="font-semibold">{item.compare.insteadOf}</span> when {item.compare.why}
      </p>
    </Box>
  );
}

function BeforeAfterBox({ item }) {
  if (!item.beforeAfter) return null;
  return (
    <Box className="rounded-3xl border-violet-200 bg-violet-50">
      <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-violet-700">Before vs after complexity</div>
      <div className="space-y-3 text-sm text-slate-700">
        <div><span className="font-semibold">Before:</span> {item.beforeAfter.before}</div>
        <div><span className="font-semibold">After:</span> {item.beforeAfter.after}</div>
        <div><span className="font-semibold">Big shift:</span> {item.beforeAfter.complexity}</div>
      </div>
    </Box>
  );
}

function GuidedLearnBox({ item }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, [item.id]);

  const steps = item.guidedSteps || [];

  return (
    <Box className="rounded-[2rem] border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Guided learn mode</div>
          <div className="text-lg font-bold text-slate-900">One bite-size step at a time</div>
        </div>
        <Badge className="rounded-full bg-indigo-600">Step {step + 1} / {steps.length}</Badge>
      </div>
      <div className="rounded-3xl border border-indigo-200 bg-white p-4 text-sm leading-6 text-slate-700">
        {steps[step]}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>Previous</Button>
        <Button size="sm" onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1}>Next</Button>
        <Button size="sm" variant="secondary" onClick={() => setStep(0)}>Restart</Button>
      </div>
    </Box>
  );
}

function ArrayDemo() {
  const base = [3, 7, 2];
  const [items, setItems] = useState(base);
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setItems((v) => [...v, Math.floor(Math.random() * 9) + 1])}>append</Button>
        <Button size="sm" variant="secondary" onClick={() => setItems((v) => (v.length ? v.slice(0, -1) : v))}>pop</Button>
        <Button size="sm" variant="outline" onClick={() => setItems(base)}>reset</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((n, i) => (
          <div key={`${n}-${i}`} className="flex w-16 flex-col items-center gap-1">
            <div className="text-xs text-slate-500">{i}</div>
            <motion.div layout className="grid h-14 w-14 place-items-center rounded-xl border-2 border-blue-300 bg-blue-50 font-bold text-blue-700">{n}</motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DynamicArrayDemo() {
  const base = [1, 2, 3];
  const [items, setItems] = useState(base);
  const capacity = items.length <= 1 ? 1 : 2 ** Math.ceil(Math.log2(items.length));
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setItems((v) => [...v, v.length + 1])}>append</Button>
        <Button size="sm" variant="secondary" onClick={() => setItems((v) => v.slice(0, -1))}>pop</Button>
        <Button size="sm" variant="outline" onClick={() => setItems(base)}>reset</Button>
      </div>
      <div className="text-sm text-slate-600">Length: <span className="font-semibold text-cyan-700">{items.length}</span> · Capacity bucket: <span className="font-semibold text-cyan-700">{capacity}</span></div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: capacity }).map((_, i) => {
          const filled = i < items.length;
          return (
            <div key={i} className={`grid h-14 w-14 place-items-center rounded-xl border-2 font-bold ${filled ? "border-cyan-300 bg-cyan-50 text-cyan-700" : "border-slate-200 bg-slate-50 text-slate-300"}`}>
              {filled ? items[i] : "·"}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StringDemo() {
  const base = "hello";
  const [text, setText] = useState(base);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Input value={text} onChange={(e) => setText(e.target.value)} className="max-w-sm" />
        <Button size="sm" variant="outline" onClick={() => setText(base)}>reset</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {text.split("").map((ch, i) => (
          <div key={`${ch}-${i}`} className="grid h-14 w-14 place-items-center rounded-xl border-2 border-sky-300 bg-sky-50 font-bold text-sky-700">{ch}</div>
        ))}
      </div>
    </div>
  );
}

function HashMapDemo() {
  const base = { a: 1, b: 2, c: 3 };
  const [pairs, setPairs] = useState(base);
  const [keyText, setKeyText] = useState("d");
  const [valText, setValText] = useState("4");
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Input value={keyText} onChange={(e) => setKeyText(e.target.value)} className="max-w-[120px]" placeholder="key" />
        <Input value={valText} onChange={(e) => setValText(e.target.value)} className="max-w-[120px]" placeholder="value" />
        <Button size="sm" onClick={() => keyText && setPairs((p) => ({ ...p, [keyText]: valText }))}>set item</Button>
        <Button size="sm" variant="outline" onClick={() => { setPairs(base); setKeyText("d"); setValText("4"); }}>reset</Button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {Object.entries(pairs).map(([k, v]) => (
          <div key={k} className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
            <div className="rounded-lg border border-emerald-300 bg-white px-3 py-2 font-mono text-emerald-700">{k}</div>
            <span className="text-lg font-bold text-emerald-500">→</span>
            <div className="rounded-lg border border-emerald-300 bg-white px-3 py-2 font-mono text-emerald-700">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SetDemo() {
  const base = ["A", "B", "C"];
  const [values, setValues] = useState(base);
  const [input, setInput] = useState("A");
  const unique = [...new Set(values)];
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} className="max-w-[120px]" />
        <Button size="sm" onClick={() => setValues((v) => [...v, input])}>add</Button>
        <Button size="sm" variant="outline" onClick={() => { setValues(base); setInput("A"); }}>reset</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {values.map((v, i) => {
          const duplicate = values.indexOf(v) !== i;
          return <div key={`${v}-${i}`} className={`grid h-14 w-14 place-items-center rounded-full border-2 font-bold ${duplicate ? "border-rose-300 bg-rose-50 text-rose-600 line-through" : "border-violet-300 bg-violet-50 text-violet-700"}`}>{v}</div>;
        })}
      </div>
      <Box className="bg-slate-50">
        <div className="text-sm font-semibold text-slate-700">Unique result</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {unique.map((v) => <Badge key={v} className="rounded-full bg-violet-600">{v}</Badge>)}
        </div>
      </Box>
    </div>
  );
}

function StackDemo() {
  const base = ["A", "B", "C"];
  const [stack, setStack] = useState(base);
  const nextLetter = String.fromCharCode(65 + stack.length);
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setStack((s) => [...s, nextLetter])}>push</Button>
        <Button size="sm" variant="secondary" onClick={() => setStack((s) => s.slice(0, -1))}>pop</Button>
        <Button size="sm" variant="outline" onClick={() => setStack(base)}>reset</Button>
      </div>
      <div className="flex min-h-[220px] items-end gap-2">
        <div className="flex flex-col-reverse gap-2">
          {stack.map((item, idx) => <motion.div key={`${item}-${idx}`} layout className="grid h-14 w-28 place-items-center rounded-xl border-2 border-orange-300 bg-orange-50 font-bold text-orange-700">{item}</motion.div>)}
        </div>
        <div className="pb-2 text-sm font-semibold text-slate-500">TOP ↑</div>
      </div>
    </div>
  );
}

function QueueDemo() {
  const base = ["A", "B", "C"];
  const [queue, setQueue] = useState(base);
  const nextLetter = String.fromCharCode(65 + queue.length);
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setQueue((q) => [...q, nextLetter])}>enqueue</Button>
        <Button size="sm" variant="secondary" onClick={() => setQueue((q) => q.slice(1))}>dequeue</Button>
        <Button size="sm" variant="outline" onClick={() => setQueue(base)}>reset</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="text-xs font-semibold text-slate-500">IN →</div>
        {queue.map((item, idx) => <motion.div key={`${item}-${idx}`} layout className="grid h-14 w-14 place-items-center rounded-xl border-2 border-teal-300 bg-teal-50 font-bold text-teal-700">{item}</motion.div>)}
        <div className="text-xs font-semibold text-slate-500">→ OUT</div>
      </div>
    </div>
  );
}

function DequeDemo() {
  const base = [2, 3, 4];
  const [deque, setDeque] = useState(base);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => setDeque((d) => [Math.floor(Math.random() * 9), ...d])}>appendleft</Button>
        <Button size="sm" onClick={() => setDeque((d) => [...d, Math.floor(Math.random() * 9)])}>append</Button>
        <Button size="sm" variant="secondary" onClick={() => setDeque((d) => d.slice(1))}>popleft</Button>
        <Button size="sm" variant="secondary" onClick={() => setDeque((d) => d.slice(0, -1))}>pop</Button>
        <Button size="sm" variant="outline" onClick={() => setDeque(base)}>reset</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="text-xs text-slate-500">⇤</div>
        {deque.map((item, idx) => <motion.div key={`${item}-${idx}`} layout className="grid h-14 w-14 place-items-center rounded-xl border-2 border-amber-300 bg-amber-50 font-bold text-amber-700">{item}</motion.div>)}
        <div className="text-xs text-slate-500">⇥</div>
      </div>
    </div>
  );
}

function LinkedListDemo() {
  const base = [1, 2, 3, 4];
  const [nodes, setNodes] = useState(base);
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setNodes((n) => [...n, n.length + 1])}>append node</Button>
        <Button size="sm" variant="secondary" onClick={() => setNodes((n) => n.slice(0, -1))}>remove tail</Button>
        <Button size="sm" variant="outline" onClick={() => setNodes(base)}>reset</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {nodes.map((n, i) => (
          <React.Fragment key={i}>
            <motion.div layout className="grid h-14 w-14 place-items-center rounded-full border-2 border-indigo-300 bg-indigo-50 font-bold text-indigo-700">{n}</motion.div>
            {i < nodes.length - 1 && <span className="text-lg font-bold text-indigo-400">→</span>}
          </React.Fragment>
        ))}
        <div className="text-xl text-slate-400">…</div>
      </div>
    </div>
  );
}

function GridMatrixDemo() {
  const base = [[1,2,3],[4,5,6],[7,8,9]];
  const [grid, setGrid] = useState(base);
  const [row, setRow] = useState(1);
  const [col, setCol] = useState(1);
  const bump = () => setGrid((g) => g.map((r, ri) => r.map((v, ci) => (ri === row && ci === col ? v + 1 : v))));
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="text-sm text-slate-600">row</div>
        <input type="range" min="0" max="2" value={row} onChange={(e) => setRow(Number(e.target.value))} />
        <div className="text-sm text-slate-600">col</div>
        <input type="range" min="0" max="2" value={col} onChange={(e) => setCol(Number(e.target.value))} />
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={bump}>increment selected cell</Button>
        <Button size="sm" variant="outline" onClick={() => { setGrid(base); setRow(1); setCol(1); }}>reset</Button>
      </div>
      <div className="inline-grid gap-2 rounded-3xl border border-lime-200 bg-lime-50 p-3" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
        {grid.flatMap((r, ri) => r.map((value, ci) => (
          <div key={`${ri}-${ci}`} className={`grid h-16 w-16 place-items-center rounded-xl border-2 font-bold ${ri === row && ci === col ? "border-lime-500 bg-white text-lime-700" : "border-lime-200 bg-white text-slate-700"}`}>
            <div className="text-center">
              <div className="text-[10px] text-slate-400">{ri},{ci}</div>
              <div>{value}</div>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
}

function TreeDemo() {
  const defaultTree = {
    value: "A",
    children: [
      { value: "B", children: [{ value: "D", children: [] }, { value: "E", children: [] }] },
      { value: "C", children: [{ value: "F", children: [] }] },
    ],
  };
  const [tree, setTree] = useState(defaultTree);
  const addLeaf = () => {
    setTree((current) => ({
      ...current,
      children: current.children.map((child) => child.value === "C" ? { ...child, children: [...child.children, { value: `X${child.children.length + 1}`, children: [] }] } : child),
    }));
  };
  const Node = ({ node }) => (
    <div className="flex flex-col items-center gap-2">
      <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-green-300 bg-green-50 font-bold text-green-700">{node.value}</div>
      {node.children?.length > 0 && <div className="flex items-start gap-4">{node.children.map((child) => <Node key={child.value} node={child} />)}</div>}
    </div>
  );
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" onClick={addLeaf}>add leaf</Button>
        <Button size="sm" variant="outline" onClick={() => setTree(defaultTree)}>reset</Button>
      </div>
      <div className="overflow-x-auto"><Node node={tree} /></div>
    </div>
  );
}

function HeapDemo() {
  const base = [5, 2, 8, 1, 6];
  const [nums, setNums] = useState(base);
  const sorted = [...nums].sort((a, b) => a - b);
  const popMin = () => setNums((v) => {
    if (!v.length) return v;
    const minIndex = v.indexOf(Math.min(...v));
    return v.filter((_, i) => i !== minIndex);
  });
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setNums((v) => [...v, Math.floor(Math.random() * 9) + 1])}>push</Button>
        <Button size="sm" variant="secondary" onClick={popMin}>pop min</Button>
        <Button size="sm" variant="outline" onClick={() => setNums(base)}>reset</Button>
      </div>
      <Box className="bg-fuchsia-50 border-fuchsia-200">
        <div className="text-sm font-semibold text-fuchsia-700">Priority order</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {sorted.map((n, i) => <div key={`${n}-${i}`} className={`grid h-12 w-12 place-items-center rounded-xl border-2 font-bold ${i === 0 ? "border-fuchsia-500 bg-white text-fuchsia-700 shadow" : "border-fuchsia-200 bg-white text-fuchsia-500"}`}>{n}</div>)}
        </div>
      </Box>
    </div>
  );
}

function GraphDemo() {
  const bfsOrder = ["A", "B", "C", "D", "E", "F"];
  const [visited, setVisited] = useState(["A"]);
  const next = () => setVisited((v) => bfsOrder.slice(0, Math.min(v.length + 1, bfsOrder.length)));
  const positions = {
    A: "left-1/2 top-2 -translate-x-1/2",
    B: "left-12 top-20",
    C: "right-12 top-20",
    D: "left-16 top-40",
    E: "right-16 top-40",
    F: "left-1/2 top-[11.5rem] -translate-x-1/2",
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" onClick={next}>step BFS</Button>
        <Button size="sm" variant="outline" onClick={() => setVisited(["A"])}>reset</Button>
      </div>
      <div className="relative h-72 overflow-hidden rounded-3xl border border-rose-200 bg-rose-50">
        {Object.keys(positions).map((node) => (
          <div key={node} className={`absolute ${positions[node]}`}>
            <div className={`grid h-12 w-12 place-items-center rounded-full border-2 font-bold ${visited.includes(node) ? "border-rose-500 bg-white text-rose-700" : "border-rose-200 bg-white text-rose-400"}`}>{node}</div>
          </div>
        ))}
      </div>
      <div className="text-sm text-slate-600">Visited order: <span className="font-semibold text-rose-700">{visited.join(" → ")}</span></div>
    </div>
  );
}

function TrieDemo() {
  const base = "ca";
  const [prefix, setPrefix] = useState(base);
  const words = ["cat", "car", "care", "dog", "dot", "door"];
  const matches = words.filter((w) => w.startsWith(prefix));
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Input value={prefix} onChange={(e) => setPrefix(e.target.value)} className="max-w-sm" placeholder="Type a prefix" />
        <Button size="sm" variant="outline" onClick={() => setPrefix(base)}>reset</Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {words.map((word) => {
          const match = word.startsWith(prefix);
          return (
            <div key={word} className={`rounded-2xl border p-4 font-mono text-lg ${match ? "border-sky-400 bg-sky-50 text-sky-700" : "border-slate-200 bg-white text-slate-500"}`}>
              {word.split("").map((ch, i) => <span key={i} className={i < prefix.length && match ? "rounded bg-sky-200 px-0.5" : ""}>{ch}</span>)}
            </div>
          );
        })}
      </div>
      <div className="text-sm text-slate-600">Matches: <span className="font-semibold text-sky-700">{matches.join(", ") || "none"}</span></div>
    </div>
  );
}

function UnionFindDemo() {
  const base = [[1, 2], [3], [4, 5]];
  const [groups, setGroups] = useState(base);
  const mergeFirstTwo = () => {
    if (groups.length < 2) return;
    setGroups(([a, b, ...rest]) => [[...a, ...b], ...rest]);
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" onClick={mergeFirstTwo}>union</Button>
        <Button size="sm" variant="outline" onClick={() => setGroups(base)}>reset</Button>
      </div>
      <div className="flex flex-wrap gap-4">
        {groups.map((group, i) => (
          <div key={i} className="rounded-3xl border-2 border-dashed border-yellow-300 bg-yellow-50 p-4">
            <div className="flex gap-2">
              {group.map((n) => <div key={n} className="grid h-12 w-12 place-items-center rounded-full border-2 border-yellow-400 bg-white font-bold text-yellow-700">{n}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TwoPointersDemo() {
  const base = "racecar";
  const [text, setText] = useState(base);
  const chars = text.split("");
  const left = 0;
  const right = chars.length - 1;
  const isPal = text === chars.slice().reverse().join("");
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Input value={text} onChange={(e) => setText(e.target.value)} className="max-w-sm" />
        <Button size="sm" variant="outline" onClick={() => setText(base)}>reset</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {chars.map((ch, i) => (
          <div key={i} className="flex w-14 flex-col items-center gap-1">
            <div className="text-xs text-slate-500">{i}</div>
            <div className={`grid h-14 w-14 place-items-center rounded-xl border-2 font-bold ${i === left || i === right ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600"}`}>{ch}</div>
            <div className="text-xs text-blue-500">{i === left ? "L" : i === right ? "R" : ""}</div>
          </div>
        ))}
      </div>
      <div className="text-sm text-slate-600">Palindrome? <span className={`font-bold ${isPal ? "text-green-600" : "text-rose-600"}`}>{isPal ? "yes" : "no"}</span></div>
    </div>
  );
}

function SlidingWindowDemo() {
  const nums = [2, 1, 3, 4, 2, 5, 1];
  const [k, setK] = useState(3);
  const windows = [];
  for (let i = 0; i <= nums.length - k; i++) {
    const slice = nums.slice(i, i + k);
    windows.push({ slice, sum: slice.reduce((a, b) => a + b, 0), i });
  }
  const best = Math.max(...windows.map((w) => w.sum));
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="text-sm text-slate-600">window size</div>
        <input type="range" min="2" max="5" value={k} onChange={(e) => setK(Number(e.target.value))} />
        <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">{k}</div>
        <Button size="sm" variant="outline" onClick={() => setK(3)}>reset</Button>
      </div>
      <div className="space-y-2">
        {windows.map((w) => (
          <div key={w.i} className={`rounded-2xl border p-3 ${w.sum === best ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap gap-2">
              {w.slice.map((n, idx) => <div key={idx} className="grid h-10 w-10 place-items-center rounded-lg border border-emerald-200 bg-white font-bold text-emerald-700">{n}</div>)}
              <div className="ml-2 self-center text-sm font-semibold text-slate-600">sum = {w.sum}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BinarySearchDemo() {
  const nums = [1, 3, 5, 7, 9, 11, 13];
  const [target, setTarget] = useState(7);
  const mid = Math.floor((0 + nums.length - 1) / 2);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Input type="number" value={target} onChange={(e) => setTarget(Number(e.target.value))} className="max-w-[140px]" />
        <Button size="sm" variant="outline" onClick={() => setTarget(7)}>reset</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {nums.map((n, i) => (
          <div key={n} className="flex w-16 flex-col items-center gap-1">
            <div className="text-xs text-slate-500">{i}</div>
            <div className={`grid h-14 w-14 place-items-center rounded-xl border-2 font-bold ${i === mid ? "border-violet-500 bg-violet-50 text-violet-700" : n === target ? "border-green-500 bg-green-50 text-green-700" : "border-slate-200 bg-white text-slate-600"}`}>{n}</div>
            <div className="text-xs text-violet-500">{i === mid ? "mid" : n === target ? "target" : ""}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DfsDemo() {
  const order = ["A", "B", "D", "E", "C", "F"];
  const [step, setStep] = useState(1);
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setStep((s) => Math.min(s + 1, order.length))}>step deeper</Button>
        <Button size="sm" variant="outline" onClick={() => setStep(1)}>reset</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {order.map((n, i) => <div key={n} className={`grid h-12 w-12 place-items-center rounded-full border-2 font-bold ${i < step ? "border-orange-500 bg-orange-50 text-orange-700" : "border-slate-200 bg-white text-slate-400"}`}>{n}</div>)}
      </div>
      <div className="text-sm text-slate-600">DFS order: <span className="font-semibold text-orange-700">{order.slice(0, step).join(" → ")}</span></div>
    </div>
  );
}

function BfsDemo() {
  const levels = [["A"], ["B", "C"], ["D", "E", "F"]];
  const [show, setShow] = useState(1);
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setShow((s) => Math.min(s + 1, levels.length))}>next level</Button>
        <Button size="sm" variant="outline" onClick={() => setShow(1)}>reset</Button>
      </div>
      <div className="space-y-3">
        {levels.map((level, i) => (
          <div key={i} className={`flex gap-2 ${i < show ? "opacity-100" : "opacity-25"}`}>
            {level.map((n) => <div key={n} className="grid h-12 w-12 place-items-center rounded-full border-2 border-cyan-400 bg-cyan-50 font-bold text-cyan-700">{n}</div>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function BacktrackingDemo() {
  const nums = [1, 2, 3];
  const [path, setPath] = useState([1]);
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {nums.map((n) => <Button key={n} size="sm" variant="outline" onClick={() => setPath((p) => [...p, n])}>choose {n}</Button>)}
        <Button size="sm" variant="secondary" onClick={() => setPath((p) => p.slice(0, -1))}>undo</Button>
        <Button size="sm" variant="outline" onClick={() => setPath([1])}>reset</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {path.map((n, i) => (
          <React.Fragment key={i}>
            <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-rose-400 bg-rose-50 font-bold text-rose-700">{n}</div>
            {i < path.length - 1 && <span className="mt-2 text-lg font-bold text-rose-400">→</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function DpDemo() {
  const [n, setN] = useState(7);
  const fib = [0, 1];
  for (let i = 2; i <= n; i++) fib.push(fib[i - 1] + fib[i - 2]);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="text-sm text-slate-600">n</div>
        <input type="range" min="2" max="10" value={n} onChange={(e) => setN(Number(e.target.value))} />
        <div className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">{n}</div>
        <Button size="sm" variant="outline" onClick={() => setN(7)}>reset</Button>
      </div>
      <div className="grid gap-2 sm:grid-cols-4 lg:grid-cols-8">
        {fib.map((v, i) => <div key={i} className="rounded-2xl border border-indigo-200 bg-indigo-50 p-3 text-center"><div className="text-xs text-indigo-500">dp[{i}]</div><div className="text-xl font-bold text-indigo-700">{v}</div></div>)}
      </div>
    </div>
  );
}

function TopologicalSortDemo() {
  const nodes = ["Plan", "Code", "Test", "Deploy"];
  const [done, setDone] = useState(["Plan"]);
  const prereqs = { Plan: [], Code: ["Plan"], Test: ["Code"], Deploy: ["Test"] };
  const available = nodes.filter((node) => !done.includes(node) && prereqs[node].every((p) => done.includes(p)));
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {available.map((node) => <Button key={node} size="sm" onClick={() => setDone((d) => [...d, node])}>take {node}</Button>)}
        <Button size="sm" variant="outline" onClick={() => setDone(["Plan"])}>reset</Button>
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        {nodes.map((node) => {
          const complete = done.includes(node);
          const unlocked = available.includes(node);
          return <div key={node} className={`rounded-2xl border p-4 ${complete ? "border-teal-400 bg-teal-50" : unlocked ? "border-teal-300 bg-white" : "border-slate-200 bg-slate-50"}`}><div className={`font-bold ${complete ? "text-teal-700" : unlocked ? "text-slate-800" : "text-slate-400"}`}>{node}</div><div className="mt-2 text-xs text-slate-500">needs: {prereqs[node].join(", ") || "nothing"}</div></div>;
        })}
      </div>
    </div>
  );
}

function GreedyDemo() {
  const base = [[1, 3], [2, 4], [4, 6], [6, 8]];
  const [intervals, setIntervals] = useState(base);
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setIntervals((items) => [...items, [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 3) + 7]].sort((a, b) => a[0] - b[0]))}>add interval</Button>
        <Button size="sm" variant="outline" onClick={() => setIntervals(base)}>reset</Button>
      </div>
      <div className="space-y-2">
        {intervals.map(([start, end], i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-12 text-sm text-slate-500">#{i + 1}</div>
            <div className="relative h-4 flex-1 rounded-full bg-slate-100">
              <div className={`absolute top-0 h-4 rounded-full ${i % 2 === 0 ? "bg-green-400" : "bg-slate-300"}`} style={{ left: `${start * 10}%`, width: `${Math.max((end - start) * 10, 8)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrefixSumDemo() {
  const base = [2, 4, 1, 3, 5];
  const [nums, setNums] = useState(base);
  const prefix = [0];
  nums.forEach((n) => prefix.push(prefix[prefix.length - 1] + n));
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setNums((items) => [...items, Math.floor(Math.random() * 6) + 1])}>append</Button>
        <Button size="sm" variant="secondary" onClick={() => setNums((items) => items.slice(0, -1))}>pop</Button>
        <Button size="sm" variant="outline" onClick={() => setNums(base)}>reset</Button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Box><div className="mb-3 text-sm font-semibold text-slate-700">Original</div><div className="flex flex-wrap gap-2">{nums.map((n, i) => <div key={i} className="grid h-12 w-12 place-items-center rounded-lg border border-purple-200 bg-purple-50 font-bold text-purple-700">{n}</div>)}</div></Box>
        <Box><div className="mb-3 text-sm font-semibold text-slate-700">Prefix</div><div className="flex flex-wrap gap-2">{prefix.map((n, i) => <div key={i} className="grid h-12 w-12 place-items-center rounded-lg border border-purple-200 bg-white font-bold text-purple-700">{n}</div>)}</div></Box>
      </div>
    </div>
  );
}

function MonotonicDemo() {
  const nums = [2, 1, 4, 3, 5];
  const [index, setIndex] = useState(2);
  const stack = [];
  for (let i = 0; i < index; i++) {
    while (stack.length && stack[stack.length - 1] < nums[i]) stack.pop();
    stack.push(nums[i]);
  }
  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-600">Source stream: <span className="font-semibold text-amber-700">{nums.join(", ")}</span></div>
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setIndex((v) => Math.min(v + 1, nums.length))}>next item</Button>
        <Button size="sm" variant="outline" onClick={() => setIndex(2)}>reset</Button>
      </div>
      <div className="flex min-h-[120px] items-end gap-2">{stack.map((n, i) => <div key={i} className="grid h-14 w-14 place-items-center rounded-xl border-2 border-amber-300 bg-amber-50 font-bold text-amber-700">{n}</div>)}</div>
    </div>
  );
}

function DemoRenderer({ item }) {
  switch (item.demo) {
    case "array": return <ArrayDemo />;
    case "dynamic-array": return <DynamicArrayDemo />;
    case "string": return <StringDemo />;
    case "hashmap": return <HashMapDemo />;
    case "set": return <SetDemo />;
    case "stack": return <StackDemo />;
    case "queue": return <QueueDemo />;
    case "deque": return <DequeDemo />;
    case "linkedlist": return <LinkedListDemo />;
    case "grid-matrix": return <GridMatrixDemo />;
    case "tree": return <TreeDemo />;
    case "heap": return <HeapDemo />;
    case "graph": return <GraphDemo />;
    case "trie": return <TrieDemo />;
    case "unionfind": return <UnionFindDemo />;
    case "two-pointers": return <TwoPointersDemo />;
    case "sliding-window": return <SlidingWindowDemo />;
    case "binary-search": return <BinarySearchDemo />;
    case "dfs": return <DfsDemo />;
    case "bfs": return <BfsDemo />;
    case "backtracking": return <BacktrackingDemo />;
    case "dp": return <DpDemo />;
    case "topological-sort": return <TopologicalSortDemo />;
    case "greedy": return <GreedyDemo />;
    case "prefix-sum": return <PrefixSumDemo />;
    case "monotonic": return <MonotonicDemo />;
    default: return <div className="text-sm text-slate-500">No demo yet.</div>;
  }
}

export default function CodingToolboxPopupBook() {
  const [mode, setMode] = useState("all");
  const [viewMode, setViewMode] = useState("guided");
  const [sortMode, setSortMode] = useState("usage");
  const [activeBigO, setActiveBigO] = useState("typical");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState("array");

  const visibleItems = useMemo(() => {
    const filtered = allItems.filter((item) => {
      const modeMatch = mode === "all" || item.type === mode;
      const q = query.toLowerCase();
      const textMatch = !q || item.name.toLowerCase().includes(q) || item.mentalModel.toLowerCase().includes(q) || item.useWhen.some((u) => u.toLowerCase().includes(q));
      return modeMatch && textMatch;
    });

    return [...filtered].sort((a, b) => {
      if (sortMode === "alphabetical") {
        return a.name.localeCompare(b.name);
      }
      if (a.usageRank !== b.usageRank) {
        return a.usageRank - b.usageRank;
      }
      return a.name.localeCompare(b.name);
    });
  }, [mode, query, sortMode]);

  const openItem = visibleItems.find((x) => x.id === openId) || visibleItems[0] || allItems[0];

  useEffect(() => {
    if (openItem && openItem.id !== openId) setOpenId(openItem.id);
  }, [openItem, openId]);

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,_#eef6ff,_#fdfcff_45%,_#ffffff_75%)] text-slate-800">
      <div className="w-full px-4 py-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <Card className="overflow-hidden rounded-[2rem] border-slate-200 bg-white/85 shadow-xl backdrop-blur">
            <CardContent className="p-6 md:p-10">
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.95fr)] 2xl:grid-cols-[minmax(0,1.35fr)_minmax(420px,0.9fr)] xl:items-stretch">
                <div className="flex h-full flex-col justify-between gap-6 rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-5 md:p-6 lg:p-7">
                  <div className="space-y-5">
                    <Badge className="rounded-full bg-indigo-600 px-4 py-1 text-sm">Digital popup book mode</Badge>
                    <div>
                      <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl 2xl:text-6xl">Coding Structures & Patterns Toolbox</h1>
                      <p className="mt-3 max-w-3xl text-lg text-slate-600 md:text-xl">Interactive mental models, Python sketches, demos, and Big O intuition for the core algorithm tools that show up in real systems.</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <Box className="rounded-3xl bg-white/80 p-4 shadow-sm">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Start here</div>
                      <div className="mt-2 text-sm font-semibold text-slate-800">Pick one tool</div>
                      <p className="mt-1 text-sm leading-6 text-slate-600">Use the left sidebar to choose one structure or pattern at a time.</p>
                    </Box>
                    <Box className="rounded-3xl bg-white/80 p-4 shadow-sm">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Best mode</div>
                      <div className="mt-2 text-sm font-semibold text-slate-800">Guided first</div>
                      <p className="mt-1 text-sm leading-6 text-slate-600">Start in Guided view, then switch to Reference once it clicks.</p>
                    </Box>
                    <Box className="rounded-3xl bg-white/80 p-4 shadow-sm">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Best order</div>
                      <div className="mt-2 text-sm font-semibold text-slate-800">Most used sort</div>
                      <p className="mt-1 text-sm leading-6 text-slate-600">Learn the most common tools first so the rest have anchors.</p>
                    </Box>
                    <Box className="rounded-3xl bg-white/80 p-4 shadow-sm">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">How it sticks</div>
                      <div className="mt-2 text-sm font-semibold text-slate-800">Demo → code → Big O</div>
                      <p className="mt-1 text-sm leading-6 text-slate-600">Watch the state change, then connect it to the sketch and cost.</p>
                    </Box>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <SectionPill>Think in tools, not tricks</SectionPill>
                    <SectionPill>Low cognitive load</SectionPill>
                    <SectionPill>Visual + interactive</SectionPill>
                    <SectionPill>Python-first mental models</SectionPill>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  <Box className="rounded-3xl border-indigo-200 bg-indigo-50 p-5">
                    <div className="text-sm font-semibold uppercase tracking-wide text-indigo-600">How to use this page</div>
                    <div className="mt-3 space-y-2 text-sm text-slate-700">
                      <div className="rounded-2xl border border-indigo-200 bg-white px-3 py-2">1. Pick a structure or pattern on the left.</div>
                      <div className="rounded-2xl border border-indigo-200 bg-white px-3 py-2">2. Start with <span className="font-semibold">Guided</span> view if the topic feels fuzzy.</div>
                      <div className="rounded-2xl border border-indigo-200 bg-white px-3 py-2">3. Use the demo to watch the state change.</div>
                      <div className="rounded-2xl border border-indigo-200 bg-white px-3 py-2">4. Match the Python sketch to the visual behavior.</div>
                    </div>
                  </Box>

                  <Box className="rounded-3xl border-slate-200 bg-slate-50 p-5">
                    <div className="text-sm font-semibold uppercase tracking-wide text-slate-600">What this teaches</div>
                    <div className="mt-3 space-y-2 text-sm text-slate-700">
                      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2">How the structure or pattern behaves</div>
                      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2">What invariant keeps it correct</div>
                      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2">When it beats the brute-force approach</div>
                      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2">How the code expresses intent</div>
                    </div>
                  </Box>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)] 2xl:grid-cols-[400px_minmax(0,1fr)] items-start">
            <Card className="rounded-[2rem] border-slate-200 bg-white/90 shadow-lg xl:sticky xl:top-4 max-h-[calc(100vh-2rem)] overflow-hidden">
              <CardHeader className="pb-3"><CardTitle className="text-2xl">Choose a page</CardTitle></CardHeader>
              <CardContent className="space-y-4 h-full overflow-hidden flex flex-col">
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tools, patterns, uses..." />
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant={mode === "all" ? "default" : "outline"} onClick={() => setMode("all")}>All</Button>
                    <Button size="sm" variant={mode === "structure" ? "default" : "outline"} onClick={() => setMode("structure")}>Structures</Button>
                    <Button size="sm" variant={mode === "pattern" ? "default" : "outline"} onClick={() => setMode("pattern")}>Patterns</Button>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sort</div>
                    <Button size="sm" variant={sortMode === "usage" ? "default" : "outline"} onClick={() => setSortMode("usage")}>Most used</Button>
                    <Button size="sm" variant={sortMode === "alphabetical" ? "default" : "outline"} onClick={() => setSortMode("alphabetical")}>Alphabetical</Button>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">View</div>
                    <Button size="sm" variant={viewMode === "guided" ? "default" : "outline"} onClick={() => setViewMode("guided")}>Guided</Button>
                    <Button size="sm" variant={viewMode === "reference" ? "default" : "outline"} onClick={() => setViewMode("reference")}>Reference</Button>
                  </div>
                </div>
                <div className="min-h-0 flex-1 space-y-2 overflow-auto pr-1">
                  {visibleItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button key={item.id} onClick={() => setOpenId(item.id)} className={`w-full rounded-2xl border p-3 text-left transition hover:shadow ${openItem?.id === item.id ? item.color : "border-slate-200 bg-white text-slate-700"}`}>
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/80 shadow-sm"><Icon className="h-5 w-5" /></div>
                          <div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-xs opacity-75">{item.type}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <AnimatePresence mode="wait">
              {openItem && (
                <motion.div key={openItem.id} initial={{ opacity: 0, rotateX: -8, y: 16 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} exit={{ opacity: 0, rotateX: 6, y: -8 }} transition={{ duration: 0.25 }} style={{ perspective: 1200 }} className="min-w-0">
                  <Card className="rounded-[2rem] border-slate-200 bg-white/95 shadow-2xl">
                    <CardContent className="p-5 md:p-8">
                      <div className="space-y-6 min-w-0">
                        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-5 md:p-6 lg:p-7">
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="space-y-4">
                              <div className={`inline-flex items-center gap-3 rounded-3xl border px-4 py-3 ${openItem.color}`}>
                                <openItem.icon className="h-6 w-6" />
                                <div>
                                  <div className="text-sm uppercase tracking-wide opacity-75">{openItem.type}</div>
                                  <div className="text-2xl font-black md:text-3xl">{openItem.name}</div>
                                </div>
                              </div>

                              <div className="max-w-3xl space-y-3">
                                <div>
                                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">Mental model</div>
                                  <p className="mt-2 text-lg font-semibold text-slate-800 md:text-xl">{openItem.mentalModel}</p>
                                </div>
                                <div>
                                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">Use it when</div>
                                  <div className="mt-3">
                                    <SmallBadgeList items={openItem.useWhen} />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 lg:w-[320px] lg:grid-cols-1">
                              <Box className="rounded-3xl border-indigo-200 bg-indigo-50">
                                <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">Why this matters in real systems</div>
                                <p className="mt-2 text-sm leading-6 text-slate-700">{openItem.realSystems}</p>
                              </Box>
                              <InvariantBox item={openItem} />
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.8fr)] items-start">
                          <div className="space-y-6 min-w-0">
                            {viewMode === "guided" && <GuidedLearnBox item={openItem} />}

                            <Box className="rounded-[2rem] bg-gradient-to-br from-white via-slate-50 to-indigo-50">
                              <div className="mb-4 flex items-center justify-between gap-3">
                                <div>
                                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">Interactive demo</div>
                                  <div className="text-lg font-bold text-slate-900">See the state change</div>
                                </div>
                                <Badge className="rounded-full bg-slate-800">interactive demo</Badge>
                              </div>
                              <DemoRenderer item={openItem} />
                            </Box>

                            <div className="grid gap-6 xl:grid-cols-2 items-start">
                              <div className="space-y-6">
                                <Box className="rounded-3xl">
                                  <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Python sketch</div>
                                  <SketchTabs item={openItem} activeBigO={activeBigO} />
                                </Box>
                                <FlowVisualizer item={openItem} sketchIndex={getDefaultSketchIndex(activeBigO, openItem.pythonExamples?.length || 1)} />
                              </div>
                              <div className="space-y-6">
                                <BigOTabs item={openItem} activeBigO={activeBigO} setActiveBigO={setActiveBigO} />
                                <BigOLegend />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-6 2xl:sticky 2xl:top-6 2xl:self-start min-w-0">
                            <IntentBox item={openItem} />
                            <SmellBox item={openItem} />
                            <CompareBox item={openItem} />
                            <BeforeAfterBox item={openItem} />
                            <DecisionRecipeBox item={openItem} />
                            <MasteryBox item={openItem} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
