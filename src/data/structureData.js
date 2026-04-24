// Simplified structure data for GitHub Pages
const structureData = [
  {
    id: "array",
    type: "structure",
    name: "Array / List",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    mentalModel: "A straight shelf of labeled bins.",
    useWhen: ["Ordered items", "Index access", "Scans"],
    python: `nums = [3, 7, 2]
nums.append(9)
value = nums[1]
# [3, 7, 2, 9]`,
    realSystems: "Arrays back API response lists, log buffers, UI collections, metrics, and in-memory batches where order and index access matter.",
  },
  {
    id: "dynamic-array",
    type: "structure",
    name: "Dynamic Array",
    color: "bg-cyan-50 border-cyan-200 text-cyan-700",
    mentalModel: "An array that grows when it runs out of room.",
    useWhen: ["Append-heavy workloads", "Indexed access", "Resizable sequences"],
    python: `nums = []
for x in [1, 2, 3, 4]:
    nums.append(x)
# Python lists are dynamic arrays`,
    realSystems: "Dynamic arrays power Python lists, JS arrays, UI collections, batched records, and most everyday sequence storage.",
  },
  {
    id: "string",
    type: "structure",
    name: "String",
    color: "bg-sky-50 border-sky-200 text-sky-700",
    mentalModel: "An array of characters with grammar problems.",
    useWhen: ["Parsing text", "Matching", "Scanning"],
    python: `text = "hello"
chars = list(text)
first = text[0]`,
    realSystems: "Strings drive parsing and validation: request paths, search input, tokens, file names, commands, and lightweight protocols.",
  },
  {
    id: "hashmap",
    type: "structure",
    name: "Hash Map",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    mentalModel: "A magic filing cabinet: key to value.",
    useWhen: ["Fast lookup", "Counting", "Grouping"],
    python: `counts = {}
for ch in "banana":
    counts[ch] = counts.get(ch, 0) + 1`,
    realSystems: "Hash maps power caches, config lookups, session state, ID indexes, counters, and joins between related data.",
  },
  {
    id: "set",
    type: "structure",
    name: "Set",
    color: "bg-violet-50 border-violet-200 text-violet-700",
    mentalModel: "A guest list. You are either in or out.",
    useWhen: ["Uniqueness", "Membership", "Visited tracking"],
    python: `seen = set()
seen.add("a")
seen.add("a")
# seen = {"a"}`,
    realSystems: "Sets shine in deduplication, permission checks, feature flags, and visited tracking.",
  },
  {
    id: "stack",
    type: "structure",
    name: "Stack",
    color: "bg-orange-50 border-orange-200 text-orange-700",
    mentalModel: "A stack of plates: last in, first out.",
    useWhen: ["Undo", "Nesting", "Recent-first"],
    python: `stack = []
stack.append("A")
stack.append("B")
item = stack.pop()
# item = "B"`,
    realSystems: "Stacks show up in undo history, parser state, nested UI flows, and depth-first traversal.",
  },
  {
    id: "queue",
    type: "structure",
    name: "Queue",
    color: "bg-teal-50 border-teal-200 text-teal-700",
    mentalModel: "A checkout line: first in, first out.",
    useWhen: ["Arrival order", "BFS", "Work queue"],
    python: `from collections import deque
q = deque(["A"])
q.append("B")
item = q.popleft()
# item = "A"`,
    realSystems: "Queues power job runners, buffering, message processing, and background work.",
  },
  {
    id: "deque",
    type: "structure",
    name: "Deque",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    mentalModel: "A hallway with doors on both ends.",
    useWhen: ["Sliding windows", "Flexible buffering", "Double-ended work"],
    python: `from collections import deque
d = deque([2, 3])
d.appendleft(1)
d.append(4)
# deque([1, 2, 3, 4])`,
    realSystems: "Deques help with stream buffers, rolling windows, and both-end push/pop workloads.",
  },
  {
    id: "linkedlist",
    type: "structure",
    name: "Linked List",
    color: "bg-indigo-50 border-indigo-200 text-indigo-700",
    mentalModel: "A chain where each node points to the next clue.",
    useWhen: ["Pointer operations", "Cheap inserts", "Node manipulation"],
    python: `class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next`,
    realSystems: "Linked lists still show up inside LRU caches, allocator internals, and low-level structures.",
  },
  {
    id: "grid-matrix",
    type: "structure",
    name: "Grid / Matrix",
    color: "bg-lime-50 border-lime-200 text-lime-700",
    mentalModel: "A chessboard of cells addressed by row and column.",
    useWhen: ["2D data", "Neighbors matter", "Maps and boards"],
    python: `grid = [[1,2,3],[4,5,6],[7,8,9]]
value = grid[1][2]
# value = 6`,
    realSystems: "Grids show up in game boards, images, heat maps, spreadsheets, and 2D pathfinding.",
  },
  {
    id: "tree",
    type: "structure",
    name: "Tree",
    color: "bg-green-50 border-green-200 text-green-700",
    mentalModel: "Folders inside folders.",
    useWhen: ["Hierarchy", "Recursion", "Parent/child data"],
    python: `tree = {"A": ["B", "C"], "B": ["D", "E"]}`,
    realSystems: "Trees model file systems, DOMs, menus, ASTs, and org charts.",
  },
  {
    id: "heap",
    type: "structure",
    name: "Heap / Priority Queue",
    color: "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700",
    mentalModel: "An ER desk: most urgent item comes out next.",
    useWhen: ["Top K", "Min/max next", "Priority scheduling"],
    python: `import heapq
heap = [5, 2, 8]
heapq.heapify(heap)
smallest = heapq.heappop(heap)
# smallest = 2`,
    realSystems: "Heaps help schedulers, ranking pipelines, retry systems, and top-K features.",
  },
  {
    id: "graph",
    type: "structure",
    name: "Graph",
    color: "bg-rose-50 border-rose-200 text-rose-700",
    mentalModel: "A subway map of connected things.",
    useWhen: ["Paths", "Dependencies", "Relationships"],
    python: `graph = {"A": ["B", "C"], "B": ["D"], "C": ["D"]}`,
    realSystems: "Graphs model dependencies, workflows, routing, social links, and service relationships.",
  },
  {
    id: "trie",
    type: "structure",
    name: "Trie",
    color: "bg-sky-50 border-sky-200 text-sky-700",
    mentalModel: "A word tree that reuses shared beginnings.",
    useWhen: ["Autocomplete", "Prefix search", "Dictionary matching"],
    python: `trie = {}
for word in ["cat", "car"]:
    node = trie
    for ch in word:
        node = node.setdefault(ch, {})`,
    realSystems: "Tries are useful for autocomplete, prefix search, command suggestion, and router matching.",
  },
  {
    id: "bloom",
    type: "structure",
    name: "Bloom Filter",
    color: "bg-pink-50 border-pink-200 text-pink-700",
    mentalModel: "A bouncer with a maybe list.",
    useWhen: ["Fast negative lookups", "Deduplication", "Spam checks"],
    python: `from pybloom import BloomFilter
bf = BloomFilter(capacity=1000, error_rate=0.001)
bf.add("seen")
is_possible = "seen" in bf`,
    realSystems: "Bloom filters help with cache invalidation, spell checkers, and preventing duplicate writes.",
  },
  {
    id: "lru",
    type: "pattern",
    name: "LRU Cache",
    color: "bg-rose-50 border-rose-200 text-rose-700",
    mentalModel: "A library shelf where recently read books move to the front.",
    useWhen: ["Cache expiration", "Limited memory", "Access patterns"],
    python: `from functools import lru_cache
@lru_cache(maxsize=128)
def get_data(key):
    return expensive_lookup(key)`,
    realSystems: "LRU caches manage limited memory in databases, browsers, and CDNs.",
  },
  {
    id: "two-pointer",
    type: "pattern",
    name: "Two Pointers",
    color: "bg-slate-50 border-slate-200 text-slate-700",
    mentalModel: "Two runners on a track meeting in the middle.",
    useWhen: ["Sorted arrays", "Sum problems", "Partitioning"],
    python: `l, r = 0, len(arr) - 1
while l < r:
    if arr[l] + arr[r] < target:
        l += 1
    else:
        r -= 1`,
    realSystems: "Two pointers solve sorted pair sums, merge detection, and palindrome checking.",
  },
  {
    id: "sliding-window",
    type: "pattern",
    name: "Sliding Window",
    color: "bg-teal-50 border-teal-200 text-teal-700",
    mentalModel: "A camera on a conveyor belt, capturing a moving frame.",
    useWhen: ["Subarray problems", "Max/min of subarrays", "String matching"],
    python: `for i in range(len(arr) - k + 1):
    window = arr[i:i+k]
    result = max(result, sum(window))`,
    realSystems: "Sliding windows power rate limiters, traffic analysis, and rolling statistics.",
  },
  {
    id: "prefix-sum",
    type: "pattern",
    name: "Prefix Sum",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    mentalModel: "Mile markers on a highway.",
    useWhen: ["Range queries", "Subarray sums", "Cumulative values"],
    python: `prefix = [0]
for x in arr:
    prefix.append(prefix[-1] + x)
# sum from i to j = prefix[j+1] - prefix[i]`,
    realSystems: "Prefix sums enable fast range queries in analytics, spreadsheets, and cumulative charts.",
  },
  {
    id: "binary-search",
    type: "pattern",
    name: "Binary Search",
    color: "bg-indigo-50 border-indigo-200 text-indigo-700",
    mentalModel: "Flipping through a dictionary to a page, then halves again.",
    useWhen: ["Sorted data", "Finding boundaries", "Insert position"],
    python: `lo, hi = 0, len(arr)
while lo < hi:
    mid = (lo + hi) // 2
    if arr[mid] < target:
        lo = mid + 1
    else:
        hi = mid
return lo`,
    realSystems: "Binary search backs database indexes, sorted containers, and search UIs.",
  },
  {
    id: "bfs",
    type: "pattern",
    name: "BFS",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    mentalModel: "Ripples expanding outward from a splash.",
    useWhen: ["Shortest path", "Level-order", "Unweighted graphs"],
    python: `from collections import deque
queue = deque([start])
visited = {start}
while queue:
    node = queue.popleft()
    for neighbor in adj[node]:
        if neighbor not in visited:
            visited.add(neighbor)
            queue.append(neighbor)`,
    realSystems: "BFS finds shortest paths in mazes, social graphs, and network routing.",
  },
  {
    id: "dfs",
    type: "pattern",
    name: "DFS",
    color: "bg-violet-50 border-violet-200 text-violet-700",
    mentalModel: "Going as deep as possible before backtracking.",
    useWhen: ["Maze solving", "Topological sort", "Cycle detection"],
    python: `def dfs(node, visited):
    visited.add(node)
    for neighbor in adj[node]:
        if neighbor not in visited:
            dfs(neighbor, visited)
    visited.remove(node)`,
    realSystems: "DFS solves sudoku, finds SCCs, and detects cycles in dependency graphs.",
  },
  {
    id: "backtracking",
    type: "pattern",
    name: "Backtracking",
    color: "bg-rose-50 border-rose-200 text-rose-700",
    mentalModel: "Trying a door, checking what's behind it, and returning to try another.",
    useWhen: ["Combination problems", "Permutations", "Constraint solving"],
    python: `def backtrack(path, choices):
    if valid(path):
        result.append(path)
    for choice in choices:
        path.append(choice)
        backtrack(path, remaining)
        path.pop()`,
    realSystems: "Backtracking solves N-queens, Sudoku, and scheduling with constraints.",
  },
  {
    id: "dp",
    type: "pattern",
    name: "Dynamic Programming",
    color: "bg-cyan-50 border-cyan-200 text-cyan-700",
    mentalModel: "Building a table of answers and reusing subanswers.",
    useWhen: ["Optimal substructure", "Overlapping subproblems", "Optimization"],
    python: `dp = [0] * (n + 1)
for i in range(1, n + 1):
    dp[i] = max(dp[i-1], dp[i-2] + values[i])
return dp[n]`,
    realSystems: "DP powers resource allocation, sequence alignment, and route optimization.",
  },
  {
    id: "greedy",
    type: "pattern",
    name: "Greedy",
    color: "bg-lime-50 border-lime-200 text-lime-700",
    mentalModel: "Always taking the best immediate option.",
    useWhen: ["Local optimal = global optimal", "Sorting helps", "One pass"],
    python: `# Sort by end time
jobs.sort(key=lambda x: x.end)
current_end = 0
count = 0
for job in jobs:
    if job.start >= current_end:
        count += 1
        current_end = job.end`,
    realSystems: "Greedy solves scheduling, Huffman coding, and minimum spanning trees.",
  },
  {
    id: "recursion",
    type: "pattern",
    name: "Recursion",
    color: "bg-orange-50 border-orange-200 text-orange-700",
    mentalModel: "Asking a smaller version of yourself.",
    useWhen: ["Tree traversal", "Divide and conquer", "Self-similar problems"],
    python: `def solve(problem):
    if base_case(problem):
        return base_answer()
    smaller = reduce(problem)
    return solve(smaller)`,
    realSystems: "Recursion powers file system traversal, AST evaluation, and factorials.",
  },
  {
    id: "hash-conflict",
    type: "pattern",
    name: "Hash Collision",
    color: "bg-red-50 border-red-200 text-red-700",
    mentalModel: "Two keys fighting for the same locker.",
    useWhen: ["Custom hashes", "Performance tuning"],
    python: `# Chaining: same bucket holds multiple entries
bucket = [entry1, entry2, ...]

# Open addressing: probe for next free slot
if bucket[hash] occupied:
    try bucket[hash + 1]`,
    realSystems: "Understanding collisions helps with denial-of-service prevention and load factor tuning.",
  },
]

export default structureData