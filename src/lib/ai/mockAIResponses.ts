import {
  AnswerGenerationResult,
  EvaluationResult,
  QuestionMarks,
  EvaluationRubricCategory,
  MarkLossReason,
  StructuredAnswerSection,
} from '../types';
import { countWords } from '../utils';

// ============================================================================
// CURATED TOPIC HANDLERS FOR PRESET & HIGH-YIELD EXAM QUESTIONS
// ============================================================================

interface TopicAnswerBuilder {
  topic: string;
  defaultSubject: string;
  generate: (question: string, marks: QuestionMarks) => AnswerGenerationResult;
}

/** 1. DYNAMIC PROGRAMMING */
function buildDPAnswer(question: string, marks: QuestionMarks): AnswerGenerationResult {
  const is2Marks = marks === 2;
  const is5Marks = marks === 5;
  const is15Marks = marks === 15;

  let markdown = '';
  let sections: StructuredAnswerSection[] = [];

  if (is2Marks) {
    markdown = `## Dynamic Programming (2 Marks Allocation)

### 1. Formal Definition
**Dynamic Programming (DP)** is an algorithmic paradigm that solves complex optimization problems by breaking them down into simpler, overlapping subproblems, storing each subproblem result in memory (memoization or tabulation) to guarantee each is solved **only once**.

### 2. Core Necessary Properties
1. **Optimal Substructure:** Optimal solution of the problem contains optimal solutions of its subproblems.
2. **Overlapping Subproblems:** Subproblems are repeatedly revisited across recursive call branches.

**Examiner Tip:** For 2 marks, state both essential properties (*Optimal Substructure* and *Overlapping Subproblems*). Omitting either loses 1 mark immediately.`;

    sections = [
      {
        heading: 'Definition & Core Properties',
        content: 'Dynamic Programming caches overlapping subproblem solutions. Requires optimal substructure and overlapping subproblems.',
        keyKeywords: ['Optimal Substructure', 'Overlapping Subproblems', 'Memoization', 'Tabulation'],
      },
    ];
  } else if (is5Marks) {
    markdown = `## Dynamic Programming (5 Marks Allocation)

### 1. Definition & Core Philosophy
**Dynamic Programming (DP)** is an optimization method that transforms exponential-time recursive algorithms into polynomial time by caching overlapping subproblem results.

### 2. Two Fundamental Preconditions
- **Optimal Substructure:** The global optimal solution is constructed from the optimal solutions of subproblems (e.g., Shortest Path: $d(u, v) = d(u, w) + d(w, v)$).
- **Overlapping Subproblems:** Identical subproblems are encountered repeatedly during recursion (distinguishing DP from Divide-and-Conquer).

### 3. Implementation Approaches: Memoization vs Tabulation
| Feature | Top-Down (Memoization) | Bottom-Up (Tabulation) |
| :--- | :--- | :--- |
| **Strategy** | Recursive with lookup cache | Iterative array / table fill |
| **Call Stack** | Overhead of $O(n)$ recursion stack | Zero call stack overhead |
| **Subproblem Order** | Evaluated on-demand as required | Evaluated in topological dependency order |

### 4. Concrete Example: Fibonacci State Recurrence
- **Recurrence:** $\\text{dp}[i] = \\text{dp}[i-1] + \\text{dp}[i-2]$ for $i \\ge 2$ with base cases $\\text{dp}[0]=0, \\text{dp}[1]=1$.
- **Complexity:** Time: $\\mathcal{O}(n)$, Space: $\\mathcal{O}(n)$ (optimizable to $\\mathcal{O}(1)$ with two variables).

### 5. Exam Writing Tip
> **Examiner Tip:** In 5-mark questions, always contrast Memoization vs Tabulation in a short table and explicitly state the mathematical recurrence relation.`;

    sections = [
      {
        heading: '1. Definition & Core Philosophy',
        content: 'Dynamic Programming caches overlapping subproblems to achieve polynomial time.',
        keyKeywords: ['Optimal Substructure', 'Overlapping Subproblems', 'Memoization', 'Tabulation'],
      },
      {
        heading: '2. Approaches Comparison',
        content: 'Top-down memoization vs bottom-up tabulation trade-offs.',
        keyKeywords: ['Call Stack', 'Topological Order', 'Iterative Table'],
      },
      {
        heading: '3. Recurrence & Complexity',
        content: 'Fibonacci recurrence dp[i]=dp[i-1]+dp[i-2], Time: O(n), Space: O(n) or O(1).',
        keyKeywords: ['Base Cases', 'Recurrence Relation', 'O(n) Time', 'O(1) Auxiliary Space'],
      },
    ];
  } else if (is15Marks) {
    markdown = `## Dynamic Programming: Comprehensive 15-Mark Academic Answer

### 1. Executive Definition & Foundational Theory
**Dynamic Programming (DP)**, formalised by Richard Bellman in the 1950s, is an algorithmic design paradigm applicable to optimization problems that exhibit **Optimal Substructure** and **Overlapping Subproblems**. DP replaces exponential branching ($O(2^n)$ or $O(n!)$) with structured memory traversal ($O(n^k)$).

### 2. Rigorous Characterization of the Two Key Properties
1. **Optimal Substructure Property:** An optimal solution to an instance of the problem contains within it optimal solutions to subproblem instances. Proved via the **"Cut-and-Paste" method**: assuming a suboptimal subproblem solution would contradict the optimality of the overall solution.
2. **Overlapping Subproblems Property:** The recursive problem decomposition visits the exact same small subproblems repeatedly rather than creating distinct subproblems (as in Divide-and-Conquer like Merge Sort).

### 3. Architectural Paradigm Contrast: Top-Down vs Bottom-Up
\`\`\`
Top-Down (Memoization):
[Problem] ---> Check Cache? --(Hit)--> Return Result
                    |
                 (Miss)
                    v
             Recurse Subproblems ---> Store in Cache ---> Return

Bottom-Up (Tabulation):
[Base Cases (dp[0], dp[1])] ---> Fill dp[2] ---> ... ---> Target dp[n]
\`\`\`

### 4. Canonical Paradigm Problem: 0/1 Knapsack Problem
Given $n$ items with weights $w[i]$ and values $v[i]$, and a knapsack capacity $W$:
$$\\text{dp}[i][w] = \\begin{cases} 
0 & \\text{if } i = 0 \\text{ or } w = 0 \\\\
\\text{dp}[i-1][w] & \\text{if } w[i-1] > w \\\\
\\max(\\text{dp}[i-1][w], \\, v[i-1] + \\text{dp}[i-1][w - w[i-1]]) & \\text{if } w[i-1] \\le w
\\end{cases}$$

\`\`\`cpp
// 0/1 Knapsack Tabulation (C++)
int knapsack(int W, const vector<int>& wt, const vector<int>& val, int n) {
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (wt[i - 1] <= w) {
                dp[i][w] = max(dp[i - 1][w], val[i - 1] + dp[i - 1][w - wt[i - 1]]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][W];
}
\`\`\`

### 5. Execution Trace Table (Items: (2kg, $3), (3kg, $4), (4kg, $5); Capacity W=5)
\`\`\`
 i\\w | 0 | 1 | 2 | 3 | 4 | 5
-----+---+---+---+---+---+---
  0  | 0 | 0 | 0 | 0 | 0 | 0
  1  | 0 | 0 | 3 | 3 | 3 | 3
  2  | 0 | 0 | 3 | 4 | 4 | 7  <-- item 2 included (3kg+$4 + dp[1][2]=3) = 7
  3  | 0 | 0 | 3 | 4 | 5 | 7
\`\`\`

### 6. Asymptotic Complexity Derivation
- **Time Complexity:** $\\mathcal{O}(n \\cdot W)$ operations because each state in the 2D grid is computed in $O(1)$ constant time. Note: This is **pseudo-polynomial**, as $W$ is numeric and represented in $\\log W$ bits.
- **Space Complexity:** $\\mathcal{O}(n \\cdot W)$ for table allocation. Space can be optimized to $\\mathcal{O}(W)$ by tracking only the current and previous row.

### 7. Examiner Mark-Loss Traps & High-Scoring Strategies
> **Examiner Warning:**
> 1. Never omit the **Base Cases** in the recurrence equation (-1.5 marks).
> 2. Always note that $O(n \\cdot W)$ is **pseudo-polynomial time**, not polynomial time (-1 mark).
> 3. Provide both the recurrence formula AND the table state progression.`;

    sections = [
      {
        heading: '1. Foundational Theory & Properties',
        content: 'Bellman equations, cut-and-paste proof for optimal substructure, overlapping subproblems.',
        keyKeywords: ['Bellman Equation', 'Optimal Substructure', 'Cut-and-Paste Proof', 'Overlapping Subproblems'],
      },
      {
        heading: '2. Top-Down vs Bottom-Up Architecture',
        content: 'Call stack and dependency DAG analysis of memoization vs tabulation.',
        keyKeywords: ['DAG Dependency', 'Call Stack Overhead', 'Memoization Table'],
        hasDiagram: true,
      },
      {
        heading: '3. 0/1 Knapsack Recurrence & Code',
        content: 'State equation dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w-wt[i-1]]) and working C++ implementation.',
        keyKeywords: ['State Equation', 'Tabulation Grid', 'Edge Cases'],
        hasAlgorithm: true,
      },
      {
        heading: '4. Trace Table & Asymptotic Analysis',
        content: 'Time Complexity O(n*W) pseudo-polynomial derivation, space reduction to O(W).',
        keyKeywords: ['Pseudo-Polynomial', 'O(n*W) Time', 'O(W) Space Optimization'],
        hasExample: true,
      },
    ];
  } else {
    // 10 Marks standard
    markdown = `## Dynamic Programming: Comprehensive 10-Mark Academic Answer

### 1. Definition & Core Philosophy
**Dynamic Programming (DP)** is an algorithmic paradigm that solves complex optimization and combinatorial problems by breaking them down into simpler, overlapping subproblems. Rather than recomputing solutions to identical subproblems as in naive recursion, DP solves each subproblem **exactly once** and caches its result in a memory store.

### 2. Fundamental Properties Required for DP
An algorithm can only be tackled via Dynamic Programming if it exhibits two strict properties:
1. **Optimal Substructure:** An optimal solution to the overall problem instance incorporates within it the optimal solutions to its constituent subproblem instances.
2. **Overlapping Subproblems:** The recursive solution traverses the exact same smaller subproblems repeatedly.

### 3. Implementation Paradigms
- **Top-Down with Memoization:** Maintains the natural recursive control flow while intercepting calls using a hash map or array lookup before execution.
- **Bottom-Up with Tabulation:** Iteratively constructs solutions starting from base cases upwards, avoiding function call-stack overhead.

### 4. Step-by-Step Example: Fibonacci Sequence & Tabulation Trace
**State Recurrence Relation:**
$$\\text{dp}[i] = \\text{dp}[i-1] + \\text{dp}[i-2] \\quad (\\text{for } i \\ge 2)$$
$$\\text{Base Cases: } \\text{dp}[0] = 0, \\quad \\text{dp}[1] = 1$$

\`\`\`cpp
// Efficient Bottom-Up Tabulation (C++)
int fibonacciDP(int n) {
    if (n <= 1) return n;
    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
\`\`\`

### 5. Architectural Subproblem Tree vs Table Progression
\`\`\`
Naive Recursive Call Tree (Exponential Redundancy O(2^n)):
               fib(5)
             /        \\
         fib(4)        fib(3)  <-- REDUNDANT WORK
        /     \\        /    \\
     fib(3)  fib(2)  fib(2) fib(1)
       ^       ^       ^
       Subproblems evaluated multiple times!

DP Tabulation State Flow (Linear O(n)):
State Array: [ 0 | 1 | 1 | 2 | 3 | 5 ]
Step:          0   1   2   3   4   5
               Base -> Iteratively accumulates to target in O(n)
\`\`\`

### 6. Rigorous Asymptotic Complexity Analysis
- **Time Complexity:** $\\mathcal{O}(n)$. The naive recursive tree requires $\\mathcal{O}(2^n)$ operations due to branching. DP reduces this to $n-1$ constant-time arithmetic additions.
- **Space Complexity:** $\\mathcal{O}(n)$ auxiliary space to allocate the \`dp\` array.
- **Space Optimization Note:** Can be reduced to $\\mathcal{O}(1)$ auxiliary space by caching only the preceding two states (\`prev1\` and \`prev2\`).

### 7. Examiner Writing Tip
> **Examiner Tip for 10-Mark Questions:** Always explicitly write the **Recurrence Relation**, sketch the **Subproblem Call Tree**, and present both **Time and Space Complexity** in Big-O notation. Omission of Big-O complexity typically results in an immediate 1.5 to 2.0 mark deduction.`;

    sections = [
      {
        heading: '1. Definition & Core Philosophy',
        content: 'Dynamic Programming breaks problems into overlapping subproblems and stores results.',
        keyKeywords: ['Optimal Substructure', 'Overlapping Subproblems', 'Memoization', 'Tabulation'],
      },
      {
        heading: '2. Recurrence Relation & Algorithm',
        content: 'dp[i] = dp[i-1] + dp[i-2], with base cases dp[0]=0, dp[1]=1.',
        keyKeywords: ['State Equation', 'Base Cases', 'Iterative Array'],
        hasAlgorithm: true,
      },
      {
        heading: '3. Architectural Subproblem Tree',
        content: 'Visual recursion tree contrasting O(2^n) exponential tree with O(n) table.',
        keyKeywords: ['Recursion Tree', 'Tabular Progression'],
        hasDiagram: true,
      },
      {
        heading: '4. Complexity Analysis',
        content: 'Time Complexity: O(n). Auxiliary Space: O(n), optimizable to O(1).',
        keyKeywords: ['O(n) Time', 'O(1) Space Optimization', 'Big-O Analysis'],
      },
    ];
  }

  return {
    id: `ans_${Date.now()}`,
    question,
    subject: 'Data Structures & Algorithms',
    topic: 'Dynamic Programming',
    marks,
    difficulty: marks >= 10 ? 'Hard' : marks === 5 ? 'Medium' : 'Easy',
    answerMarkdown: markdown,
    structuredSections: sections,
    examWritingTip: marks >= 10 
      ? 'Always state the recurrence relation, draw the subproblem tree, and explicitly derive Big-O space and time complexity.' 
      : 'Define both optimal substructure and overlapping subproblems with a recurrence relation.',
    howToGetMoreMarks: {
      missingCommonMistakes: [
        'Omitting the space optimization trick (reducing O(n) to O(1))',
        'Writing code without stating the formal recurrence relation',
        'Forgetting to mention overlapping subproblems as the distinction from Divide-and-Conquer',
      ],
      highYieldKeywords: [
        'Optimal Substructure',
        'Overlapping Subproblems',
        'Memoization Cache',
        'State Transition Equation',
        'Bottom-Up Tabulation',
      ],
      recommendedStructure: [
        '1. Formal Definition & Two Properties',
        '2. Top-Down vs Bottom-Up Comparison',
        '3. Mathematical Recurrence Relation',
        '4. Code / Pseudocode',
        '5. Call Tree / Table Diagram',
        '6. Asymptotic Time & Space Derivation',
      ],
      diagramAdvice: 'Always draw a 3-level binary recursion tree highlighting duplicate nodes like fib(3) to demonstrate redundant exponential branching.',
      examinerExpectations: [
        'Explicit state recurrence formula',
        'Big-O time and space complexity',
        'Base case definitions',
      ],
    },
  };
}

/** 2. PAGING VS SEGMENTATION */
function buildPagingSegmentationAnswer(question: string, marks: QuestionMarks): AnswerGenerationResult {
  const is2Marks = marks === 2;
  const is5Marks = marks === 5;
  const is15Marks = marks === 15;

  let markdown = '';
  let sections: StructuredAnswerSection[] = [];

  if (is2Marks) {
    markdown = `## Paging vs Segmentation (2 Marks Allocation)

### 1. Primary Distinction
- **Paging** is a **hardware-driven, fixed-size** memory management scheme where physical memory is partitioned into fixed frames and logical memory into pages of equal size (avoids external fragmentation, suffers internal fragmentation).
- **Segmentation** is a **user-centric, variable-size** memory management scheme where memory is divided into variable-sized logical units such as code, stack, heap, and routines (avoids internal fragmentation, suffers external fragmentation).

### 2. Quick Key Contrast
- **Paging:** Fixed size, transparent to programmer, internal fragmentation.
- **Segmentation:** Variable size, visible to programmer/compiler, external fragmentation.`;

    sections = [
      {
        heading: 'Paging vs Segmentation Comparison',
        content: 'Paging uses fixed-size blocks (internal fragmentation); segmentation uses variable-size logical units (external fragmentation).',
        keyKeywords: ['Fixed-Size Pages', 'Variable-Size Segments', 'Internal Fragmentation', 'External Fragmentation'],
      },
    ];
  } else if (is5Marks || marks === 10 || is15Marks) {
    markdown = `## Differentiate Between Paging and Segmentation (${marks} Marks)

### 1. Conceptual Overview & Architecture
In modern Operating Systems, memory virtualization abstracts physical RAM into contiguous logical address spaces. Paging and Segmentation represent the two foundational approaches to non-contiguous memory allocation.

### 2. Comprehensive Comparison Matrix
| Parameter | Paging | Segmentation |
| :--- | :--- | :--- |
| **Block Nature** | **Fixed-size** blocks called pages (typically 4 KB). | **Variable-size** blocks reflecting logical code modules. |
| **User Visibility** | Completely **transparent** to programmer/compiler. | **Visible** to compiler and programmer (logical view). |
| **Address Structure** | 1D logical address: \`<Page Number, Offset>\` | 2D logical address: \`<Segment Number, Offset>\` |
| **Hardware Mapping** | **Page Table** maps page number to frame number. | **Segment Table** contains \`<Base Address, Limit>\`. |
| **Fragmentation** | Suffers from **Internal Fragmentation** (last page). | Suffers from **External Fragmentation** (variable holes). |
| **Protection & Sharing** | Difficult to share semantic modules cleanly. | Natural for sharing code/libraries (e.g., shared libc). |
| **Speed / Overhead** | Fast address translation, assisted by **TLB**. | Requires bound check: \`Offset < Limit\`, else trap error. |

### 3. Address Translation Mechanism & Diagram
\`\`\`
Paging Translation:
Logical Address: [ Page Number (p) | Offset (d) ]
                         |
                         v
                    [ Page Table ] ---> Frame Number (f)
                                              |
Physical Address:                       [ Frame (f) | Offset (d) ]

Segmentation Translation:
Logical Address: [ Segment Number (s) | Offset (d) ]
                         |
                         v
                    [ Segment Table ] ---> [ Limit | Base ]
                                                |       |
                                  If d < Limit -+       v
                                    (else TRAP)    Physical Base + d
\`\`\`

### 4. Segmented Paging (Hybrid Architecture)
To overcome the external fragmentation of pure segmentation and the lack of logical structure in pure paging, modern systems (such as x86) implement **Paged Segmentation**:
- The program is divided into logical segments.
- Each segment is further divided into fixed-size pages.
- Memory allocation achieves logical modularity without external fragmentation.

### 5. Examiner Writing Tip
> **Examiner Advice for Scoring Full Marks:**
> 1. Always include the **Fragmentation** trade-off (*Internal for Paging*, *External for Segmentation*).
> 2. Draw both translation block diagrams showing the **Limit check** in segmentation.
> 3. Mention the hybrid **Paged Segmentation** architecture as an advanced note.`;

    sections = [
      {
        heading: '1. Conceptual Overview',
        content: 'Non-contiguous memory allocation mechanisms: physical frames vs logical modules.',
        keyKeywords: ['Memory Virtualization', 'Non-Contiguous Allocation', 'Logical Address Space'],
      },
      {
        heading: '2. Comparison Matrix',
        content: 'Seven distinct comparison criteria covering block size, fragmentation, and address translation.',
        keyKeywords: ['Fixed Size', 'Variable Size', 'Internal Fragmentation', 'External Fragmentation', 'TLB', 'Base and Limit'],
      },
      {
        heading: '3. Address Translation Diagrams',
        content: 'Hardware mapping flowcharts for page tables and segment tables with limit-bound checks.',
        keyKeywords: ['Page Table', 'Segment Table', 'Base Address', 'Limit Register', 'Physical Address'],
        hasDiagram: true,
      },
      {
        heading: '4. Hybrid Paged Segmentation',
        content: 'Combining logical segmentation with physical paging to eliminate external fragmentation.',
        keyKeywords: ['Paged Segmentation', 'x86 Architecture', 'TLB Optimization'],
      },
    ];
  }

  return {
    id: `ans_${Date.now()}`,
    question,
    subject: 'Operating Systems',
    topic: 'Memory Management: Paging & Segmentation',
    marks,
    difficulty: marks >= 10 ? 'Hard' : marks === 5 ? 'Medium' : 'Easy',
    answerMarkdown: markdown,
    structuredSections: sections,
    examWritingTip: 'Present comparisons in a neat tabular format with at least 5 distinct criteria, and always sketch the address translation diagram.',
    howToGetMoreMarks: {
      missingCommonMistakes: [
        'Confusing internal fragmentation with external fragmentation',
        'Forgetting to mention the Limit Register check in Segmentation address translation',
        'Not drawing the address translation flowcharts',
      ],
      highYieldKeywords: [
        'Fixed-size Pages',
        'Variable-size Segments',
        'Internal Fragmentation',
        'External Fragmentation',
        'Segment Base & Limit',
        'Paged Segmentation',
      ],
      recommendedStructure: [
        '1. Formal Definition of Both Techniques',
        '2. Comparison Table (Block size, visibility, fragmentation, hardware)',
        '3. Address Translation Diagrams',
        '4. Hybrid Paged Segmentation',
      ],
      diagramAdvice: 'Draw the two address translation pathways showing the Page Table lookup vs the Segment Table Base+Limit check.',
      examinerExpectations: [
        'Clear distinction of fragmentation types',
        'Address components <p, d> vs <s, d>',
        'Tabular comparison layout',
      ],
    },
  };
}

/** 3. ACID PROPERTIES IN DBMS */
function buildACIDAnswer(question: string, marks: QuestionMarks): AnswerGenerationResult {
  const is2Marks = marks === 2;
  const is5Marks = marks === 5;
  const is15Marks = marks === 15;

  let markdown = '';
  let sections: StructuredAnswerSection[] = [];

  if (is2Marks) {
    markdown = `## ACID Properties in DBMS Transactions (2 Marks)

A **Transaction** is a logical unit of database processing that must satisfy the **ACID** properties to ensure database integrity:
1. **Atomicity (All-or-Nothing):** Entire transaction succeeds or entirely rolls back to initial state (handled by Transaction Manager & Undo Logs).
2. **Consistency (Correctness):** Preserves database integrity constraints before and after execution (e.g., Total Balance invariant).
3. **Isolation (Independence):** Concurrent transactions execute without mutual interference as if serial (handled by Concurrency Control / 2PL).
4. **Durability (Permanence):** Once committed, updates survive any subsequent system or power crashes (handled by Write-Ahead Logging / Redo Logs).`;

    sections = [
      {
        heading: 'ACID Properties Summary',
        content: 'Atomicity (all-or-nothing), Consistency (integrity constraints), Isolation (concurrency control), Durability (persistence after commit).',
        keyKeywords: ['Atomicity', 'Consistency', 'Isolation', 'Durability', 'Commit', 'Rollback'],
      },
    ];
  } else {
    markdown = `## ACID Properties in DBMS Transactions (${marks} Marks Allocation)

### 1. Concept of Database Transaction
A **Transaction** is an atomic program unit comprising multiple read/write database operations. To maintain data integrity across concurrent accesses and unexpected system crashes, database management systems enforce the four **ACID** properties.

### 2. In-Depth Analysis of ACID Properties
#### A — Atomicity ("All-or-Nothing")
- **Principle:** Either all database modifications in the transaction are successfully committed, or none are applied. If an error occurs midway, the transaction aborts and state rolls back.
- **Example:** In a fund transfer of $100 from Account A to B: debiting A and crediting B must both occur. A crash between debit and credit must restore A's $100.
- **DBMS Component:** **Recovery Manager** utilizing **Undo Logs** (Write-Ahead Logging).

#### C — Consistency ("State Correctness")
- **Principle:** Execution of a transaction must transition the database from one valid consistent state to another, satisfying all declared integrity constraints, schema checks, and cascading rules.
- **Example:** In bank transfers, $\\text{Balance}(A) + \\text{Balance}(B)$ before transaction must equal $\\text{Balance}(A) + \\text{Balance}(B)$ after transaction.
- **DBMS Component:** **Application Logic** & **DBMS Integrity Constraint Enforcement**.

#### I — Isolation ("Concurrent Independence")
- **Principle:** Intermediate states of a transaction are concealed from concurrently running transactions. Concurrently executing transactions produce the exact state as if executed serially.
- **Phenomena Prevented:** Dirty Reads (uncommitted data read), Non-repeatable Reads, Phantom Reads.
- **DBMS Component:** **Concurrency Control Manager** implementing **Two-Phase Locking (2PL)**, Timestamp Ordering, or Multiversion Concurrency Control (MVCC).

#### D — Durability ("Survivability / Permanence")
- **Principle:** Once a transaction commits successfully, its updates persist indefinitely in non-volatile storage, even in the event of immediate power failure or OS crash.
- **Example:** Once an ATM displays "Withdrawal Successful", power disconnection immediately afterward cannot undo the balance debit.
- **DBMS Component:** **Recovery Manager** utilizing **Redo Logging** and **Checkpoints**.

### 3. ACID Properties Architectural Mapping Matrix
| Property | Enforcing DBMS Subsystem | Mechanism / Technology | Failure Prevented |
| :--- | :--- | :--- | :--- |
| **Atomicity** | Recovery Manager | Undo Logging (WAL) | Partial transaction updates |
| **Consistency** | DBMS Constraint Engine | Referential constraints, Triggers | Invariant violations |
| **Isolation** | Concurrency Controller | 2-Phase Locking (2PL), MVCC | Race conditions, Dirty reads |
| **Durability** | Recovery Manager | Redo Logging, Disk Checkpoints | Post-commit crash data loss |

### 4. Write-Ahead Logging (WAL) Architecture Diagram
\`\`\`
[ Transaction Begins ]
         |
         v
[ Buffer Cache Modification ] ---> [ WAL Log Buffer: <T1, A, old_val, new_val> ]
                                                  |
                                                  v (Flush log to disk FIRST)
                                      [ Non-Volatile Disk Log ]
                                                  |
                                                  v (Commit Record Flushed)
                                      [ Transaction Committed ]
\`\`\`

### 5. Examiner Writing Tip
> **Examiner Tip:** To achieve maximum marks for ACID properties, never write only definitions. Always include:
> 1. The **real-world bank transfer example** for each letter.
> 2. The specific **DBMS subsystem** responsible (Recovery Manager, Concurrency Manager).
> 3. The underlying mechanism (**WAL, 2PL, MVCC, Checkpoints**).`;

    sections = [
      {
        heading: '1. Transaction Concept',
        content: 'Definition of transaction as an atomic unit of work maintaining consistency.',
        keyKeywords: ['Transaction', 'State Transition', 'Commit', 'Abort'],
      },
      {
        heading: '2. Four ACID Properties',
        content: 'Detailed breakdown of Atomicity, Consistency, Isolation, Durability with examples and failure modes.',
        keyKeywords: ['Atomicity', 'Consistency', 'Isolation', 'Durability', 'Undo Log', '2PL', 'MVCC', 'Redo Log'],
      },
      {
        heading: '3. Architectural Mapping',
        content: 'Tabular mapping of each ACID property to its enforcing DBMS subsystem and mechanism.',
        keyKeywords: ['Recovery Manager', 'Concurrency Controller', 'Integrity Constraints'],
      },
      {
        heading: '4. Write-Ahead Logging Flow',
        content: 'WAL protocol diagram illustrating log-before-data persistence guarantee.',
        keyKeywords: ['WAL', 'Checkpoints', 'Non-Volatile Storage'],
        hasDiagram: true,
      },
    ];
  }

  return {
    id: `ans_${Date.now()}`,
    question,
    subject: 'Database Management Systems',
    topic: 'Transactions: ACID Properties',
    marks,
    difficulty: marks >= 10 ? 'Hard' : marks === 5 ? 'Medium' : 'Easy',
    answerMarkdown: markdown,
    structuredSections: sections,
    examWritingTip: 'For each ACID property, explicitly name the responsible DBMS subsystem (e.g. Recovery Manager for A & D, Concurrency Control for I) and provide a concrete banking example.',
    howToGetMoreMarks: {
      missingCommonMistakes: [
        'Giving only dictionary definitions without explaining DBMS implementation mechanics (WAL, 2PL, MVCC)',
        'Not providing a concrete banking transfer example',
        'Confusing Consistency with Isolation',
      ],
      highYieldKeywords: [
        'Write-Ahead Logging (WAL)',
        'Undo Log / Redo Log',
        'Two-Phase Locking (2PL)',
        'Serializability',
        'Checkpoints',
        'Integrity Constraints',
      ],
      recommendedStructure: [
        '1. Transaction Definition',
        '2. Detailed A-C-I-D Breakdown with Examples',
        '3. Component & Subsystem Mapping Table',
        '4. Write-Ahead Logging (WAL) Protocol Diagram',
      ],
      diagramAdvice: 'Draw the Write-Ahead Logging buffer flush pipeline showing log writes preceding disk dirty block writes.',
      examinerExpectations: [
        'Accurate terminology (WAL, 2PL, MVCC, Checkpoint)',
        'Subsystem mapping',
        'Bank transfer scenario',
      ],
    },
  };
}

/** 4. DIJKSTRA SHORTEST PATH ALGORITHM */
function buildDijkstraAnswer(question: string, marks: QuestionMarks): AnswerGenerationResult {
  const is2Marks = marks === 2;
  const is5Marks = marks === 5;
  const is15Marks = marks === 15;

  let markdown = '';
  let sections: StructuredAnswerSection[] = [];

  if (is2Marks) {
    markdown = `## Dijkstra's Shortest Path Algorithm (2 Marks)

### 1. Definition & Core Principle
**Dijkstra's Algorithm** is a greedy graph algorithm that computes the **Single-Source Shortest Path (SSSP)** from a source vertex $s$ to all other vertices in a weighted, directed or undirected graph with **non-negative edge weights**.

### 2. Complexity & Limitation
- **Time Complexity:** $\\mathcal{O}((V + E) \\log V)$ using a Min-Heap / Priority Queue.
- **Critical Limitation:** Fails on graphs containing **negative weight edges** (Bellman-Ford must be used instead).`;

    sections = [
      {
        heading: 'Dijkstra Definition & Core Properties',
        content: 'Greedy SSSP algorithm on non-negative weights with O((V+E) log V) time.',
        keyKeywords: ['Greedy Strategy', 'SSSP', 'Non-Negative Weights', 'Min-Heap', 'O((V+E) log V)'],
      },
    ];
  } else {
    markdown = `## Dijkstra's Shortest Path Algorithm (${marks} Marks Allocation)

### 1. Algorithm Overview & Problem Statement
Given a weighted graph $G = (V, E)$ with edge weight function $w: E \\to \\mathbb{R}_{\\ge 0}$ and a source vertex $s \\in V$, **Dijkstra's Algorithm** finds the minimum distance path from $s$ to all other vertices $v \\in V$. It follows a **Greedy Strategy**, permanently settling the vertex with minimum tentative distance at each step.

### 2. Edge Relaxation Condition
The fundamental operation is **Relaxation** of edge $(u, v)$ with weight $w(u, v)$:
$$\\text{If } \\text{dist}[u] + w(u, v) < \\text{dist}[v] \\implies \\text{dist}[v] = \\text{dist}[u] + w(u, v), \\quad \\text{parent}[v] = u$$

### 3. Step-by-Step Pseudocode
\`\`\`cpp
// Dijkstra Algorithm with Min-Heap Priority Queue (C++)
void dijkstra(int source, int V, const vector<vector<pair<int, int>>>& adj) {
    vector<int> dist(V, INT_MAX);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

    dist[source] = 0;
    pq.push({0, source}); // {distance, vertex}

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();

        if (d > dist[u]) continue; // Stale heap entry

        for (auto& edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;

            // Relaxation step
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
}
\`\`\`

### 4. Execution Trace on Sample Graph
\`\`\`
Graph: (A) --4--> (B) --1--> (C)
        |          |          ^
        +----2-----+----5-----+

Source = A:
Initial Distances: dist[A]=0, dist[B]=inf, dist[C]=inf. Settled = {}
Step 1: Extract min A (0). Relax A->B (4), A->B direct edge (2). dist[B]=2.
Step 2: Extract min B (2). Relax B->C (2+1 = 3). dist[C]=3.
Step 3: Extract min C (3). All vertices settled.
Final Shortest Paths from A: A=0, B=2, C=3.
\`\`\`

### 5. Architectural Flow & Data Structures
\`\`\`
[ Source Vertex ] ---> Initialize dist[] = INF, dist[src] = 0
                                |
                                v
               +---> [ Extract Min Vertex u from PQ ]
               |                |
               |                v
               |      For each neighbor v of u:
               |         Can we relax dist[v]?
               |         YES: dist[v] = dist[u] + w(u,v)
               |              Push {dist[v], v} to PQ
               +----------------+
\`\`\`

### 6. Rigorous Asymptotic Complexity Analysis
| Implementation | Extract-Min Time | Decrease-Key Time | Total Time Complexity |
| :--- | :--- | :--- | :--- |
| **Adjacency Matrix + Array** | $O(V)$ | $O(1)$ | $\\mathcal{O}(V^2)$ (Better for Dense Graphs) |
| **Binary Min-Heap (PQ)** | $O(\\log V)$ | $O(\\log V)$ | $\\mathcal{O}((V + E) \\log V)$ (Sparse Graphs) |
| **Fibonacci Heap** | $O(\\log V)$ amortized | $O(1)$ amortized | $\\mathcal{O}(E + V \\log V)$ (Theoretical Optimum) |
- **Space Complexity:** $\\mathcal{O}(V)$ for \`dist\` array and Priority Queue storage.

### 7. Negative Weight Edge Limitation: Why Dijkstra Fails
Dijkstra assumes that adding an edge to a path never decreases total path cost (**Greedy Invariance**). When negative edge weights exist:
- A vertex already extracted from the priority queue and declared "settled" could later find a shorter route via a negative weight cycle or edge.
- **Solution:** For graphs with negative weights, use the **Bellman-Ford Algorithm** ($O(V \\cdot E)$).

### 8. Examiner Writing Tip
> **Examiner Advice:** Never forget to state the **Relaxation condition formula**, the **negative weight failure reason**, and compare the **Binary Heap vs Fibonacci Heap complexity**.`;

    sections = [
      {
        heading: '1. Problem Formulation & Greedy Paradigm',
        content: 'Single-Source Shortest Path formulation on non-negative edge graphs.',
        keyKeywords: ['SSSP', 'Greedy Strategy', 'Non-Negative Weights'],
      },
      {
        heading: '2. Edge Relaxation & Pseudocode',
        content: 'Mathematical relaxation condition and C++ implementation using std::priority_queue.',
        keyKeywords: ['Relaxation', 'Priority Queue', 'Min-Heap', 'Settled Vertices'],
        hasAlgorithm: true,
      },
      {
        heading: '3. Execution Trace Example',
        content: 'Step-by-step trace showing tentative distance updates.',
        keyKeywords: ['Trace Table', 'Tentative Distance'],
        hasExample: true,
      },
      {
        heading: '4. Complexity Derivation & Heap Trade-offs',
        content: 'O((V+E) log V) derivation with Binary Heap, Fibonacci Heap O(E + V log V), Array O(V^2).',
        keyKeywords: ['Binary Heap', 'Fibonacci Heap', 'Asymptotic Complexity', 'Sparse vs Dense'],
      },
      {
        heading: '5. Negative Weight Failure',
        content: 'Explanation of why greedy choice fails with negative weights and contrast with Bellman-Ford.',
        keyKeywords: ['Negative Weight Failure', 'Bellman-Ford', 'Greedy Invariant'],
      },
    ];
  }

  return {
    id: `ans_${Date.now()}`,
    question,
    subject: 'Data Structures & Algorithms',
    topic: 'Graph Algorithms: Dijkstra SSSP',
    marks,
    difficulty: marks >= 10 ? 'Hard' : marks === 5 ? 'Medium' : 'Easy',
    answerMarkdown: markdown,
    structuredSections: sections,
    examWritingTip: 'Explicitly write the edge relaxation condition formula and state why Dijkstra fails on negative edge weights.',
    howToGetMoreMarks: {
      missingCommonMistakes: [
        'Forgetting to mention the non-negative edge weight restriction',
        'Not providing the mathematical edge relaxation formula',
        'Only quoting O(V^2) without mentioning Min-Heap O((V+E) log V) and Fibonacci Heap',
      ],
      highYieldKeywords: [
        'Single-Source Shortest Path (SSSP)',
        'Edge Relaxation',
        'Min-Heap / Priority Queue',
        'O((V+E) log V)',
        'Fibonacci Heap O(E + V log V)',
        'Negative Weight Edge Limitation',
      ],
      recommendedStructure: [
        '1. Formal Problem Definition & Greedy Principle',
        '2. Edge Relaxation Equation',
        '3. Working C++/Pseudocode Implementation',
        '4. Complexity Analysis Table (Array vs Binary Heap vs Fibonacci Heap)',
        '5. Failure Case: Negative Weights and Bellman-Ford Contrast',
      ],
      diagramAdvice: 'Sketch an execution trace with 4 vertices showing tentative distance array updates at each priority queue pop.',
      examinerExpectations: [
        'Mathematical relaxation condition',
        'Full complexity breakdown for different data structures',
        'Explanation of negative edge weight limitation',
      ],
    },
  };
}

/** 5. MASTER THEOREM */
function buildMasterTheoremAnswer(question: string, marks: QuestionMarks): AnswerGenerationResult {
  const markdown = `## The Master Theorem for Divide-and-Conquer Recurrences (${marks} Marks)

### 1. Scope & Standard Form
The **Master Theorem** provides a direct asymptotic bound for divide-and-conquer recurrences of the form:
$$T(n) = a \\cdot T\\left(\\frac{n}{b}\\right) + f(n)$$
Where:
- $a \\ge 1$: Number of subproblems generated in each recursive split.
- $b > 1$: Factor by which the input problem size is divided.
- $f(n)$: Asymptotic cost of dividing the problem and combining the subproblem results ($f(n) = \\Theta(n^c)$ or $\\mathcal{O}(n^c)$).

### 2. Critical Exponent: $c_{\\text{crit}} = \\log_b a$
The behavior is governed by comparing $f(n)$ with the watershed benchmark function $n^{\\log_b a}$ (which represents the cost of all leaf nodes in the recursion tree).

### 3. The Three Master Cases
#### Case 1: Subproblem Leaves Dominate (Bottom-Heavy)
- **Condition:** If $f(n) = \\mathcal{O}\\left(n^{\\log_b a - \\epsilon}\\right)$ for some constant $\\epsilon > 0$.
- **Solution:** $$T(n) = \\Theta\\left(n^{\\log_b a}\\right)$$
- **Intuition:** The cost at the leaves of the recursion tree dominates the total execution time.
- **Example:** $T(n) = 8T(n/2) + 1000n^2 \\implies a=8, b=2, \\log_2 8 = 3$. Since $f(n) = O(n^2)$ and $2 < 3$, **Case 1 applies**: $T(n) = \\Theta(n^3)$.

#### Case 2: Even Distribution Across Levels (Balanced)
- **Condition:** If $f(n) = \\Theta\\left(n^{\\log_b a} \\cdot \\log^k n\\right)$ for $k \\ge 0$ (Standard case when $k=0: f(n) = \\Theta(n^{\\log_b a})$).
- **Solution:** $$T(n) = \\Theta\\left(n^{\\log_b a} \\cdot \\log^{k+1} n\\right)$$
- **Intuition:** Every level of the recursion tree contributes an identical amount of computational work.
- **Example (Merge Sort):** $T(n) = 2T(n/2) + \\Theta(n) \\implies a=2, b=2, \\log_2 2 = 1$. Since $f(n) = \\Theta(n^1)$ ($k=0$), **Case 2 applies**: $T(n) = \\Theta(n \\log n)$.

#### Case 3: Root Division/Combine Cost Dominates (Top-Heavy)
- **Condition:** If $f(n) = \\Omega\\left(n^{\\log_b a + \\epsilon}\\right)$ for some $\\epsilon > 0$, **AND** satisfies the **Regularity Condition**:
  $$a \\cdot f\\left(\\frac{n}{b}\\right) \\le c \\cdot f(n) \\quad \\text{for some constant } c < 1 \\text{ and sufficiently large } n$$
- **Solution:** $$T(n) = \\Theta(f(n))$$
- **Intuition:** The root node (dividing and combining) dominates total execution time.
- **Example:** $T(n) = 2T(n/2) + n^2 \\implies a=2, b=2, \\log_2 2 = 1$. Since $f(n) = n^2 = \\Omega(n^{1 + 1})$ and $2(n/2)^2 = n^2/2 \\le \\frac{1}{2} n^2$ ($c=1/2 < 1$), **Case 3 applies**: $T(n) = \\Theta(n^2)$.

### 4. Cases Where Master Theorem Cannot Be Applied
1. $T(n) = 2^n T(n/2) + n^n$ ($a$ is not a constant).
2. $T(n) = 2T(n/2) + \\frac{n}{\\log n}$ (polynomial difference $\\epsilon > 0$ does not exist between $n^1$ and $n / \\log n$).
3. $T(n) = 4T(n/2) - n^2$ ($f(n)$ is negative).
4. Subproblems of unequal size: $T(n) = T(n/3) + T(2n/3) + n$ (use **Akra-Bazzi** or **Recursion Tree** instead).

### 5. Examiner Writing Tip
> **Examiner Tip:** When writing Case 3, always state and verify the **Regularity Condition** ($a f(n/b) \\le c f(n)$). Candidates who omit the regularity condition forfeit 1 full mark.`;

  return {
    id: `ans_${Date.now()}`,
    question,
    subject: 'Data Structures & Algorithms',
    topic: 'Asymptotic Analysis: Master Theorem',
    marks,
    difficulty: marks >= 10 ? 'Hard' : marks === 5 ? 'Medium' : 'Easy',
    answerMarkdown: markdown,
    structuredSections: [
      {
        heading: 'Standard Form & Critical Exponent',
        content: 'T(n) = aT(n/b) + f(n) with critical exponent log_b(a).',
        keyKeywords: ['Divide and Conquer', 'Standard Recurrence', 'Critical Exponent'],
      },
      {
        heading: 'The Three Master Cases with Examples',
        content: 'Case 1 (Leaf dominant O(n^(log_b a))), Case 2 (Balanced Theta(n^(log_b a) log^(k+1) n)), Case 3 (Root dominant Theta(f(n))).',
        keyKeywords: ['Case 1 Leaf Dominant', 'Case 2 Balanced', 'Case 3 Root Dominant', 'Regularity Condition'],
      },
      {
        heading: 'Applicability Limitations',
        content: 'Conditions where Master Theorem fails: non-polynomial gaps, non-constant a, unequal partitions.',
        keyKeywords: ['Akra-Bazzi', 'Non-constant a', 'Recursion Tree'],
      },
    ],
    examWritingTip: 'Always explicitly test the regularity condition for Case 3, and explain the significance of the polynomial factor epsilon.',
    howToGetMoreMarks: {
      missingCommonMistakes: [
        'Forgetting the regularity condition in Case 3 (a*f(n/b) <= c*f(n))',
        'Applying Master Theorem when f(n) differs from n^(log_b a) by a logarithmic rather than polynomial factor (e.g. n/log n)',
        'Not stating the constraints a >= 1 and b > 1',
      ],
      highYieldKeywords: [
        'Standard Form T(n) = aT(n/b) + f(n)',
        'Critical Exponent log_b(a)',
        'Regularity Condition',
        'Polynomial Difference epsilon > 0',
        'Akra-Bazzi Theorem',
      ],
      recommendedStructure: [
        '1. Standard Recurrence Equation & Parameters',
        '2. The 3 Master Cases with Recurrence Equations and Real Examples',
        '3. Regularity Condition for Case 3',
        '4. Four Cases Where Master Theorem Cannot Be Applied',
      ],
      diagramAdvice: 'Draw a 3-level recursion tree illustrating how Case 1 is bottom-heavy, Case 2 is uniform, and Case 3 is top-heavy.',
      examinerExpectations: [
        'Explicit formulas for all three cases',
        'Working examples for each case (e.g. Merge Sort for Case 2)',
        'Regularity condition check',
      ],
    },
  };
}

/** 6. PROCESS SYNCHRONIZATION & CRITICAL SECTION */
function buildSynchronizationAnswer(question: string, marks: QuestionMarks): AnswerGenerationResult {
  const markdown = `## Process Synchronization & The Critical Section Problem (${marks} Marks)

### 1. The Critical Section Problem
A **Critical Section** is a code segment in concurrent programming where shared resources (shared variables, files, memory tables) are accessed. Concurrent execution without synchronization leads to **Race Conditions**, where outcome depends on arbitrary thread scheduling order.

### 2. Three Mandatory Criteria for a Valid Solution
Any valid synchronization solution must satisfy all three criteria:
1. **Mutual Exclusion:** If process $P_i$ is executing in its critical section, no other process can be executing in their critical sections.
2. **Progress:** If no process is in its critical section and some processes wish to enter, only processes not executing in their remainder sections can participate in deciding who enters next, and selection cannot be postponed indefinitely.
3. **Bounded Waiting:** A bound must exist on the number of times other processes are allowed to enter their critical sections after a process has requested entry before that request is granted (prevents starvation).

### 3. Synchronization Primitives: Mutex vs Counting Semaphore
| Feature | Mutex (Mutual Exclusion Lock) | Counting Semaphore |
| :--- | :--- | :--- |
| **Concept** | Locking mechanism with ownership | Signalling mechanism with an integer counter |
| **Ownership** | Only the thread that acquired the lock can release it | Any thread can signal / release the semaphore |
| **Values** | Binary (0 or 1) | Non-negative integer ($0$ to $N$) |
| **Use Case** | Serializing access to a single shared resource | Managing a pool of $N$ identical resources |

### 4. Classic Semaphore Operations: wait() and signal()
\`\`\`c
// Atomic definition of wait() [P operation]
void wait(Semaphore S) {
    while (S <= 0)
        ; // Busy waiting (in spinlocks) or block process
    S--;
}

// Atomic definition of signal() [V operation]
void signal(Semaphore S) {
    S++;
}
\`\`\`

### 5. Architectural State Transition
\`\`\`
[ Entry Section: wait(mutex) ]
             |
             v
[ CRITICAL SECTION: Shared Resource Access ]
             |
             v
[ Exit Section: signal(mutex) ]
             |
             v
[ Remainder Section ]
\`\`\`

### 6. Examiner Writing Tip
> **Examiner Advice:** Always state the **Three Mandatory Criteria** (Mutual Exclusion, Progress, Bounded Waiting) word-for-word. Omitting "Bounded Waiting" or "Progress" is the most common reason for mark deduction in OS synchronization questions.`;

  return {
    id: `ans_${Date.now()}`,
    question,
    subject: 'Operating Systems',
    topic: 'Process Synchronization: Critical Section',
    marks,
    difficulty: marks >= 10 ? 'Hard' : marks === 5 ? 'Medium' : 'Easy',
    answerMarkdown: markdown,
    structuredSections: [
      {
        heading: '1. Critical Section Problem & Race Conditions',
        content: 'Definition of critical section, race condition, and shared memory access.',
        keyKeywords: ['Critical Section', 'Race Condition', 'Shared Resources'],
      },
      {
        heading: '2. The Three Mandatory Criteria',
        content: 'Mutual Exclusion, Progress, and Bounded Waiting formal definitions.',
        keyKeywords: ['Mutual Exclusion', 'Progress', 'Bounded Waiting', 'Starvation Prevention'],
      },
      {
        heading: '3. Mutex vs Semaphore Comparison',
        content: 'Locking mechanism with ownership vs signalling mechanism with integer counter.',
        keyKeywords: ['Mutex', 'Counting Semaphore', 'wait(P)', 'signal(V)'],
      },
    ],
    examWritingTip: 'Always write down the exact definitions of Mutual Exclusion, Progress, and Bounded Waiting.',
    howToGetMoreMarks: {
      missingCommonMistakes: [
        'Listing only Mutual Exclusion while forgetting Progress and Bounded Waiting',
        'Describing a semaphore as just a lock without explaining the integer counter and signalling mechanism',
      ],
      highYieldKeywords: ['Mutual Exclusion', 'Progress', 'Bounded Waiting', 'Race Condition', 'wait() and signal()'],
      recommendedStructure: ['1. Definition', '2. 3 Criteria', '3. Primitives Comparison', '4. wait/signal definitions'],
      diagramAdvice: 'Draw the Entry Section -> Critical Section -> Exit Section -> Remainder Section state block.',
      examinerExpectations: ['All 3 criteria satisfied', 'Atomic operations explained', 'Accurate comparison'],
    },
  };
}

/** 7. DATABASE NORMALIZATION: 1NF TO BCNF */
function buildNormalizationAnswer(question: string, marks: QuestionMarks): AnswerGenerationResult {
  const markdown = `## Relational Normalization: 1NF to BCNF (${marks} Marks)

### 1. Motivation for Normalization
**Normalization** is the systematic technique of organizing relational database schemas to **eliminate data redundancy** and avoid **insertion, update, and deletion anomalies** while preserving functional dependencies and lossless joins.

### 2. Normal Forms Hierarchy
$$\\text{UNF} \\subset \\text{1NF} \\subset \\text{2NF} \\subset \\text{3NF} \\subset \\text{BCNF}$$

### 3. Step-by-Step Normal Forms Definitions
#### 1NF (First Normal Form)
- **Rule:** Every column must hold **atomic** (indivisible) values. No repeating groups or multi-valued attributes are allowed.
- **Violation:** An employee row storing \`Skills = "Java, Python, SQL"\`.

#### 2NF (Second Normal Form)
- **Rule:** Must be in 1NF, and **no partial functional dependency** can exist. Every non-prime attribute must be fully functionally dependent on the entire primary key (relevant when primary key is composite).
- **Violation:** In table \`Enrollment(StudentID, CourseID, StudentName)\`, \`StudentID -> StudentName\` is a partial dependency on a subset of the composite key \`{StudentID, CourseID}\`.

#### 3NF (Third Normal Form)
- **Rule:** Must be in 2NF, and **no transitive functional dependency** can exist. Non-prime attributes must not depend on other non-prime attributes.
- **Formal Condition:** For every functional dependency $X \\to Y$:
  - $X$ is a **Super Key**, OR
  - $Y$ is a **Prime Attribute** (part of some candidate key).
- **Violation:** \`EmpID -> DeptID\` and \`DeptID -> DeptName\`. \`EmpID -> DeptName\` is a transitive dependency.

#### BCNF (Boyce-Codd Normal Form / Strict 3NF)
- **Rule:** Must be in 3NF. For every non-trivial functional dependency $X \\to Y$, **$X$ must be a Super Key**.
- **Key Distinction from 3NF:** BCNF removes the relaxation where $Y$ could be a prime attribute.

### 4. Summary Comparison Matrix
| Normal Form | Dependency Eliminated | Formal Requirement |
| :--- | :--- | :--- |
| **1NF** | Multi-valued attributes | Atomic domain values |
| **2NF** | Partial dependencies | Non-prime depends on full candidate key |
| **3NF** | Transitive dependencies | In $X \\to Y$, either $X$ is Super Key OR $Y$ is Prime |
| **BCNF** | All functional redundancy | In $X \\to Y$, $X$ must be Super Key |

### 5. Lossless-Join Decomposition Test
A decomposition of $R$ into $R_1$ and $R_2$ is **lossless-join** if and only if:
$$(R_1 \\cap R_2) \\to R_1 \\quad \\text{OR} \\quad (R_1 \\cap R_2) \\to R_2$$
*(The common attributes must form a super key for at least one of the decomposed relations).*

### 6. Examiner Writing Tip
> **Examiner Tip:** In 10-mark questions, always write the formal mathematical conditions for 3NF and BCNF ($X \\to Y$), define *Prime vs Non-Prime attributes*, and cite the 1-line **Lossless-Join Decomposition Condition**.`;

  return {
    id: `ans_${Date.now()}`,
    question,
    subject: 'Database Management Systems',
    topic: 'Relational Design: Normalization (1NF to BCNF)',
    marks,
    difficulty: marks >= 10 ? 'Hard' : marks === 5 ? 'Medium' : 'Easy',
    answerMarkdown: markdown,
    structuredSections: [
      {
        heading: '1. Motivation & Anomalies',
        content: 'Eliminating insertion, update, and deletion anomalies via schema decomposition.',
        keyKeywords: ['Redundancy', 'Update Anomaly', 'Insertion Anomaly', 'Deletion Anomaly'],
      },
      {
        heading: '2. Normal Forms Hierarchy (1NF to BCNF)',
        content: 'Atomic values (1NF), partial dependencies (2NF), transitive dependencies (3NF), super-key condition (BCNF).',
        keyKeywords: ['Atomic Values', 'Partial Dependency', 'Transitive Dependency', 'Super Key', 'Prime Attribute', 'BCNF'],
      },
      {
        heading: '3. Lossless-Join Decomposition Test',
        content: 'Condition (R1 ∩ R2) -> R1 or (R1 ∩ R2) -> R2.',
        keyKeywords: ['Lossless-Join', 'Dependency Preservation'],
      },
    ],
    examWritingTip: 'Provide the formal mathematical definition of 3NF vs BCNF and write the 1-line lossless-join test equation.',
    howToGetMoreMarks: {
      missingCommonMistakes: [
        'Confusing partial dependency (2NF) with transitive dependency (3NF)',
        'Forgetting the condition that makes BCNF stricter than 3NF',
        'Not stating the lossless-join verification formula',
      ],
      highYieldKeywords: ['Atomic Domains', 'Partial Dependency', 'Transitive Dependency', 'Candidate Key', 'Super Key', 'Lossless Join'],
      recommendedStructure: ['1. Goal of Normalization', '2. Step-by-step 1NF, 2NF, 3NF, BCNF with examples', '3. Comparison Table', '4. Lossless Join Theorem'],
      diagramAdvice: 'Draw Venn diagrams showing the containment hierarchy UNF -> 1NF -> 2NF -> 3NF -> BCNF.',
      examinerExpectations: ['Formal definitions', 'Clear violations with tables', 'Lossless decomposition check'],
    },
  };
}

/** 8. TCP 3-WAY HANDSHAKE & OSI VS TCP/IP */
function buildNetworkingAnswer(question: string, marks: QuestionMarks): AnswerGenerationResult {
  const isHandshake = question.toLowerCase().includes('handshake') || question.toLowerCase().includes('tcp');
  
  if (isHandshake) {
    const markdown = `## TCP 3-Way Handshake & Connection Management (${marks} Marks)

### 1. Purpose of TCP 3-Way Handshake
**Transmission Control Protocol (TCP)** is a connection-oriented, reliable transport protocol. Before data exchange can begin, the client and server establish a virtual circuit through the **3-Way Handshake** to:
1. Synchronize Initial Sequence Numbers (**ISN**).
2. Agree on socket parameters (Maximum Segment Size, Window Size).
3. Allocate transmission buffers on both endpoints.

### 2. Step-by-Step Handshake Flow
\`\`\`
Client (Initiator)                                    Server (Listener)
      |                                                      |
      |   Step 1: SYN [Seq = x, ACK = 0]                     |
      |----------------------------------------------------->| (SYN-RCVD state)
      |                                                      |
      |   Step 2: SYN + ACK [Seq = y, ACK = x + 1]           |
      |<-----------------------------------------------------|
      |                                                      |
      |   Step 3: ACK [Seq = x + 1, ACK = y + 1]             |
      |----------------------------------------------------->|
      |                                                      |
 (ESTABLISHED)                                          (ESTABLISHED)
\`\`\`

#### Step 1: SYN (Client to Server)
- The client selects a randomized 32-bit Initial Sequence Number ($x$).
- Sends a TCP segment with flags \`SYN = 1, ACK = 0\`, sequence number $x$.
- Client transitions to **SYN-SENT** state.

#### Step 2: SYN-ACK (Server to Client)
- The server responds acknowledging client's sequence number: \`ACK = x + 1\`.
- The server selects its own randomized Initial Sequence Number ($y$) and sets \`SYN = 1, ACK = 1\`.
- Server transitions to **SYN-RECEIVED** state.

#### Step 3: ACK (Client to Server)
- The client acknowledges the server's sequence number: \`ACK = y + 1\`, \`Seq = x + 1\`.
- Both sides transition to the **ESTABLISHED** state; payload data transfer can now begin.

### 3. Why Not 2-Way Handshake?
A **2-Way Handshake** cannot prevent duplicate or delayed connection requests in unreliable packet networks:
- If an old delayed SYN segment from a dead connection arrives at the server, a 2-way handshake would cause the server to allocate resources and open a false connection.
- The 3rd ACK verifies to the server that the client genuinely initiated the request and is alive.

### 4. Connection Termination: 4-Way Handshake (FIN-ACK)
To close a connection gracefully in both directions (full-duplex):
1. Client sends **FIN**.
2. Server responds with **ACK** (half-closed).
3. Server sends **FIN**.
4. Client responds with **ACK** and enters **TIME-WAIT** state ($2 \\times \\text{MSL}$) to ensure the final ACK arrives.

### 5. Examiner Writing Tip
> **Examiner Tip:** In 10-mark networking questions, always draw the message sequence ladder diagram with **Sequence and Acknowledgement Numbers ($x, x+1, y, y+1$)**, and explain why a 2-way handshake is insufficient.`;

    return {
      id: `ans_${Date.now()}`,
      question,
      subject: 'Computer Networks',
      topic: 'Transport Layer: TCP Connection Management',
      marks,
      difficulty: marks >= 10 ? 'Hard' : marks === 5 ? 'Medium' : 'Easy',
      answerMarkdown: markdown,
      structuredSections: [
        {
          heading: '1. Purpose of Handshake',
          content: 'Synchronizing initial sequence numbers (ISN) and buffer allocation for reliable transmission.',
          keyKeywords: ['TCP', 'Connection-Oriented', 'ISN', 'Virtual Circuit'],
        },
        {
          heading: '2. Step-by-Step Handshake Protocol',
          content: 'SYN -> SYN-ACK -> ACK message flow with sequence and acknowledgement arithmetic.',
          keyKeywords: ['SYN', 'SYN-ACK', 'ACK', 'Seq=x', 'ACK=x+1', 'SYN-SENT', 'ESTABLISHED'],
          hasDiagram: true,
        },
        {
          heading: '3. Why 2-Way Handshake Fails',
          content: 'Preventing duplicate delayed SYN packets and ghost connections.',
          keyKeywords: ['Delayed Duplicate', 'Ghost Connection', 'Resource Leak'],
        },
      ],
      examWritingTip: 'Always draw the time-sequence ladder diagram showing the state transitions on both client and server.',
      howToGetMoreMarks: {
        missingCommonMistakes: [
          'Forgetting that ACK number is Seq + 1',
          'Not explaining why 2-way handshake is inadequate',
          'Omitting the client TIME-WAIT state in connection termination',
        ],
        highYieldKeywords: ['SYN', 'ACK', 'ISN Synchronization', 'TIME-WAIT', '2*MSL', 'Full-Duplex'],
        recommendedStructure: ['1. Definition & Goals', '2. Sequence Ladder Diagram', '3. State Machine', '4. Why 2-Way Fails'],
        diagramAdvice: 'Draw the 3-step ladder diagram with labeled sequence numbers x, y, x+1, y+1.',
        examinerExpectations: ['Sequence number arithmetic', 'State transitions', 'Failure prevention logic'],
      },
    };
  }

  // Fallback to OSI vs TCP/IP
  const markdown = `## OSI 7-Layer Model vs TCP/IP Protocol Architecture (${marks} Marks)

### 1. Architectural Foundations
- **OSI (Open Systems Interconnection):** A theoretical, 7-layer reference model developed by ISO to standardize vendor-independent network communications.
- **TCP/IP Model:** The pragmatic, 4-layer (or 5-layer) implementation-oriented architecture that powers the global Internet.

### 2. Layer Mapping Comparison
| OSI 7-Layer Model | TCP/IP Model | Protocol Data Unit (PDU) | Primary Protocols / Functions |
| :--- | :--- | :--- | :--- |
| **7. Application** | **Application** | Data | HTTP, HTTPS, DNS, SMTP, FTP |
| **6. Presentation** | *(Merged into App)* | Data | SSL/TLS, ASCII, JPEG, Encryption |
| **5. Session** | *(Merged into App)* | Data | Sockets, RPC, Session Checkpointing |
| **4. Transport** | **Transport** | Segment / Datagram | TCP (Reliable), UDP (Fast) |
| **3. Network** | **Internet** | Packet | IPv4, IPv6, ICMP, OSPF, BGP |
| **2. Data Link** | **Network Access** | Frame | Ethernet (802.3), Wi-Fi (802.11), MAC |
| **1. Physical** | *(Merged into Access)* | Bits | Signals, Cables, Fiber, Manchester Encoding |

### 3. Core Differences
1. **Design Philosophy:** OSI is a theoretical conceptual standard designed prior to protocols; TCP/IP protocols were implemented first and the model documented the working stack.
2. **Layer Count:** OSI has 7 distinct layers; TCP/IP has 4 layers (Session and Presentation are integrated into the Application layer).
3. **Transport Services:** OSI supports both connectionless and connection-oriented at network and transport layers; TCP/IP supports connectionless at Network (IP) and both at Transport (TCP/UDP).`;

  return {
    id: `ans_${Date.now()}`,
    question,
    subject: 'Computer Networks',
    topic: 'Network Models: OSI vs TCP/IP',
    marks,
    difficulty: marks >= 10 ? 'Hard' : marks === 5 ? 'Medium' : 'Easy',
    answerMarkdown: markdown,
    structuredSections: [
      {
        heading: 'Layer Mapping Table',
        content: 'Mapping of 7 OSI layers to 4 TCP/IP layers with protocols.',
        keyKeywords: ['OSI 7 Layers', 'TCP/IP 4 Layers', 'PDU', 'Encapsulation'],
      },
    ],
    examWritingTip: 'Present the mapping table clearly showing which OSI layers were merged in TCP/IP.',
    howToGetMoreMarks: {
      missingCommonMistakes: ['Confusing which layers merged', 'Forgetting the PDU names (Data, Segment, Packet, Frame, Bits)'],
      highYieldKeywords: ['PDU', 'Encapsulation', 'TCP/IP', 'OSI', 'Transport Layer'],
      recommendedStructure: ['1. Layer Mapping Table', '2. Key Differences', '3. Advantages of TCP/IP'],
      diagramAdvice: 'Draw horizontal stack showing 7 OSI blocks next to 4 TCP/IP blocks.',
      examinerExpectations: ['All 7 layers in order', 'Correct PDU names', 'Accurate protocol examples'],
    },
  };
}

/** 9. MACHINE LEARNING & GRADIENT DESCENT */
function buildMLAnswer(question: string, marks: QuestionMarks): AnswerGenerationResult {
  const isRegression = question.toLowerCase().includes('regression');
  const isOverfitting = question.toLowerCase().includes('overfitting') || question.toLowerCase().includes('regularization');

  if (isOverfitting) {
    const markdown = `## Overfitting, Underfitting & Regularization Techniques (${marks} Marks)

### 1. The Bias-Variance Trade-off
- **Underfitting (High Bias):** Model is too simplistic to capture the underlying data patterns (e.g., fitting a linear model to quadratic data). High training and test error.
- **Overfitting (High Variance):** Model memorizes training noise and random fluctuations rather than generalizing to unseen data. Low training error, very high test error.
- **Goal:** Minimize Total Generalization Error: $\\text{Error} = \\text{Bias}^2 + \\text{Variance} + \\sigma^2$.

### 2. Regularization Strategies
Regularization adds a penalty term $\\Omega(\\theta)$ to the loss function $J(\\theta)$ to penalize excessively large weights:
$$J_{\\text{regularized}}(\\theta) = J(\\theta) + \\lambda \\, \\Omega(\\theta)$$

#### A. L1 Regularization (Lasso Regression)
- **Penalty:** $\\Omega(\\theta) = \\sum_{j=1}^d |w_j|$
- **Property:** Produces **sparse weight vectors** (drives non-critical feature weights strictly to zero). Acts as automated feature selection.

#### B. L2 Regularization (Ridge Regression)
- **Penalty:** $\\Omega(\\theta) = \\sum_{j=1}^d w_j^2$
- **Property:** Shrinks weights uniformly toward zero without setting them exactly to zero. Robust to multicollinearity.

#### C. Other Regularization Techniques
1. **Dropout (Neural Networks):** Randomly deactivates neurons during training with probability $p$ to prevent co-adaptation.
2. **Early Stopping:** Terminates gradient descent when validation loss begins to rise.
3. **Data Augmentation:** Artificially expands training data with rotations, crops, and flips.`;

    return {
      id: `ans_${Date.now()}`,
      question,
      subject: 'Machine Learning',
      topic: 'Model Evaluation: Bias-Variance & Regularization',
      marks,
      difficulty: marks >= 10 ? 'Hard' : marks === 5 ? 'Medium' : 'Easy',
      answerMarkdown: markdown,
      structuredSections: [
        {
          heading: '1. Bias-Variance Decomposition',
          content: 'Underfitting vs Overfitting definitions and generalization error formula.',
          keyKeywords: ['High Bias', 'High Variance', 'Overfitting', 'Underfitting'],
        },
        {
          heading: '2. L1 (Lasso) vs L2 (Ridge) Regularization',
          content: 'Mathematical formulation of penalty terms, sparsity vs shrinkage.',
          keyKeywords: ['L1 Lasso', 'L2 Ridge', 'Weight Decay', 'Sparsity', 'Multicollinearity'],
        },
      ],
      examWritingTip: 'Write the explicit regularized loss function equations and explain why L1 achieves sparsity while L2 achieves weight shrinkage.',
      howToGetMoreMarks: {
        missingCommonMistakes: ['Confusing L1 and L2 penalty formulas', 'Omitting the validation loss early stopping rule'],
        highYieldKeywords: ['Bias-Variance Tradeoff', 'L1 Lasso', 'L2 Ridge', 'Dropout', 'Generalization Error'],
        recommendedStructure: ['1. Definitions', '2. Loss Formulations', '3. L1 vs L2 Table', '4. Additional Techniques'],
        diagramAdvice: 'Draw the U-shaped Bias-Variance curves with the optimal model complexity point.',
        examinerExpectations: ['Mathematical equations', 'Sparsity explanation', 'Clear differentiation'],
      },
    };
  }

  // Default ML: Gradient Descent
  const markdown = `## Gradient Descent Optimization in Machine Learning (${marks} Marks)

### 1. Conceptual Foundation
**Gradient Descent** is an iterative first-order optimization algorithm used to minimize a differentiable objective/loss function $J(\\theta)$ by updating parameters in the opposite direction of the gradient:
$$\\theta := \\theta - \\alpha \\nabla_\\theta J(\\theta)$$
Where $\\alpha > 0$ is the **learning rate**, and $\\nabla_\\theta J(\\theta)$ is the vector of partial derivatives representing the direction of steepest ascent.

### 2. The Three Gradient Descent Variants
| Variant | Batch Size per Update | Gradient Variance / Trajectory | Speed & Memory Trade-off |
| :--- | :--- | :--- | :--- |
| **Batch Gradient Descent (BGD)** | Entire dataset ($m$ samples) | Smooth, monotonic descent directly to minimum | High memory usage; slow for large datasets |
| **Stochastic Gradient Descent (SGD)** | Exactly $1$ random sample | High noise / erratic oscillations; helps escape local minima | Extremely fast per step; erratic convergence |
| **Mini-Batch Gradient Descent** | $B$ samples ($32, 64, 128$) | Balanced, stable trajectory; vectorizable on GPU | **Industry standard**; optimal hardware utilization |

### 3. Hyperparameter Sensitivity: Learning Rate ($\\alpha$)
- **Too Small ($\\alpha \\ll 0$):** Extremely slow convergence; risk of getting stuck in saddle points or plateau.
- **Too Large ($\\alpha \\gg 0$):** Overshoots the minimum; causes numerical divergence and loss oscillation.
- **Remedies:** Learning rate schedulers, Adam optimizer with adaptive momentum ($m_t, v_t$).`;

  return {
    id: `ans_${Date.now()}`,
    question,
    subject: 'Machine Learning',
    topic: 'Optimization: Gradient Descent Variants',
    marks,
    difficulty: marks >= 10 ? 'Hard' : marks === 5 ? 'Medium' : 'Easy',
    answerMarkdown: markdown,
    structuredSections: [
      {
        heading: '1. Mathematical Foundation',
        content: 'Parameter update rule theta = theta - alpha * gradient(J).',
        keyKeywords: ['Gradient Descent', 'Learning Rate', 'Objective Function', 'Steepest Descent'],
      },
      {
        heading: '2. Comparison of the Three Variants',
        content: 'Batch GD vs Stochastic GD vs Mini-Batch GD comparison table.',
        keyKeywords: ['Batch GD', 'SGD', 'Mini-Batch', 'GPU Vectorization'],
      },
    ],
    examWritingTip: 'Write the mathematical update rule and contrast Batch, Stochastic, and Mini-Batch in a 3-column table.',
    howToGetMoreMarks: {
      missingCommonMistakes: ['Forgetting the negative sign in theta := theta - alpha*grad', 'Not explaining the learning rate trade-off'],
      highYieldKeywords: ['Learning Rate', 'Gradient Vector', 'Mini-batch', 'Convex Optimization', 'Loss Surface'],
      recommendedStructure: ['1. Mathematical Definition', '2. Variants Table', '3. Learning Rate Tradeoff', '4. Trajectory Diagram'],
      diagramAdvice: 'Draw contour plots comparing the smooth path of Batch GD against the oscillating path of SGD.',
      examinerExpectations: ['Update formula', 'Clear variant comparison', 'Learning rate effect'],
    },
  };
}

// ============================================================================
// DYNAMIC INTELLIGENT ACADEMIC SYNTHESIZER FOR ANY UNSEEN / CUSTOM QUESTION
// ============================================================================

function synthesizeIntelligentAnswer(
  question: string,
  subject: string,
  marks: QuestionMarks
): AnswerGenerationResult {
  const cleanQ = question.trim().replace(/[.?]+$/, '');
  const qLower = cleanQ.toLowerCase();

  // Extract primary command intent
  const isDiff = /\bdifferen|\bdistinguish|\bversus\b|\bvs\b|\bcompare\b/i.test(qLower);
  const isAlgorithm = /\balgorithm\b|\bstep\b|\bprocedure\b|\bpseudocode\b|\bcomplexity\b/i.test(qLower);
  const isArchitecture = /\barchitecture\b|\bstructure\b|\bmodel\b|\bdesign\b|\bcomponent\b/i.test(qLower);

  // Extract core entity keywords
  const stopWords = new Set([
    'what', 'why', 'how', 'explain', 'describe', 'define', 'discuss', 'with', 'an', 'the',
    'and', 'for', 'about', 'from', 'this', 'that', 'give', 'write', 'state', 'list', 'using',
    'example', 'examples', 'marks', 'mark', 'short', 'note', 'following', 'detail', 'briefly'
  ]);
  const topicTokens = cleanQ
    .replace(/[^a-zA-Z0-9+#.-]+/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 2 && !stopWords.has(w.toLowerCase()));

  const topicName = topicTokens.slice(0, 4).join(' ') || cleanQ;
  const is2Marks = marks === 2;
  const is5Marks = marks === 5;
  const is15Marks = marks === 15;

  let markdown = '';
  let sections: StructuredAnswerSection[] = [];

  if (is2Marks) {
    markdown = `## ${cleanQ} (2 Marks Allocation)

### 1. Formal Academic Definition
In the domain of **${subject}**, **${topicName}** is defined as the core principle or mechanism that governs:
1. **Primary Functionality:** Ensures deterministic, efficient operation under standard operational constraints.
2. **Fundamental Rule / Property:** Enforces correctness, modular abstraction, and state consistency across the system.

### 2. Key Formula / Principle
- **Governing Invariant:** Ensures optimal time/resource trade-off under boundary conditions.
- **Examiner Note:** State the formal textbook definition and the primary distinguishing attribute to secure both marks.`;

    sections = [
      {
        heading: 'Formal Definition & Primary Rule',
        content: `Standard academic definition and primary operating principle for ${topicName} in ${subject}.`,
        keyKeywords: [topicName, subject, 'Formal Definition', 'System Invariant'],
      },
    ];
  } else if (is5Marks) {
    markdown = `## ${cleanQ} (5 Marks Allocation)

### 1. Introduction & Formal Definition
**${topicName}** represents a fundamental concept in **${subject}**. It addresses the design objective of achieving reliable, scalable, and verifiable system behavior through standardized architectural protocols.

### 2. Core Working Principles & Key Mechanisms
1. **Primary Operational Mechanism:** Coordinates dataflow, state transformations, and parameter evaluation in accordance with standard university syllabus specifications.
2. **Boundary Conditions & Invariants:** Guarantees deterministic state transitions, boundary safety, and error containment during peak workload or edge-case scenarios.
3. **Modular Architecture:** Decouples interface specification from internal execution to ensure high cohesion and minimal external coupling.
4. **Practical Use Case:** Extensively applied in modern computer engineering systems to optimize resource utilization and throughput.

### 3. Execution / Working Summary
\`\`\`
[ Input / Preconditions ] ---> [ Verification & Processing Engine ] ---> [ Deterministic Output ]
                                            |
                                            v
                                 [ State Invariant Preserved ]
\`\`\`

### 4. Exam Writing Tip & Examiner Perspective
> **Examiner Tip for 5 Marks:** Provide the formal definition, write at least 4 numbered technical points with exact terminology, and include a clear summary diagram or trace.`;

    sections = [
      {
        heading: '1. Formal Definition & Scope',
        content: `Core academic concept and role of ${topicName} in ${subject}.`,
        keyKeywords: [topicName, 'Formal Definition', 'System Scope'],
      },
      {
        heading: '2. Four Key Working Mechanisms',
        content: 'Numbered technical breakdown of operational principles, invariants, and modular architecture.',
        keyKeywords: ['Operational Mechanism', 'State Transitions', 'Invariant Preservation', 'Modular Architecture'],
      },
      {
        heading: '3. Architectural Summary',
        content: 'Pipeline execution diagram showing input, processing, and state verification.',
        keyKeywords: ['Pipeline Execution', 'Verification Engine'],
        hasDiagram: true,
      },
    ];
  } else if (is15Marks) {
    markdown = `## ${cleanQ}: Comprehensive 15-Mark Academic Answer

### 1. Executive Introduction & Theoretical Foundations
In university computer engineering curricula, **${cleanQ}** in **${subject}** represents an advanced topic demanding rigorous conceptual understanding, mathematical or procedural formulation, and trade-off analysis.

### 2. Core Mathematical Formulation / Theoretical Invariants
1. **Formal System Model:** Represents the system state as a tuple $\\mathcal{S} = \\langle \\mathcal{I}, \\mathcal{O}, \\mathcal{T}, \\mathcal{C} \\rangle$ where $\\mathcal{I}$ denotes inputs, $\\mathcal{O}$ outputs, $\\mathcal{T}$ state transitions, and $\\mathcal{C}$ operational constraints.
2. **Governing Equations & Invariants:** State transitions are verified to satisfy safety and liveness properties throughout execution.
3. **Boundary Condition Constraints:** Handles edge conditions, overflow protection, and error recovery gracefully.

### 3. Step-by-Step Algorithm & Architectural Workflow
\`\`\`
1. Initialization Phase: Verify input preconditions and allocate auxiliary structures.
2. Traversal & Evaluation: Iteratively process components according to priority heuristics.
3. State Verification: Validate intermediate states against governing invariants.
4. Convergence & Output: Emit finalized result, commit state, and deallocate resources.
\`\`\`

### 4. Architectural System Diagram
\`\`\`
+---------------------+      +------------------------+      +---------------------+
| Input Specification | ---> | Control & State Engine | ---> | Validated Result    |
+---------------------+      +------------------------+      +---------------------+
                                         |
                                         v
                             +------------------------+
                             | Auxiliary Cache / Logs |
                             +------------------------+
\`\`\`

### 5. Asymptotic Time and Space Complexity Derivation
- **Time Complexity:** $\\mathcal{O}(n \\log n)$ for hierarchical/sorted access, or $\\mathcal{O}(n)$ for linear traversal.
- **Auxiliary Space:** $\\mathcal{O}(n)$ auxiliary memory for state buffers, or $\\mathcal{O}(1)$ for in-place configurations.

### 6. Comparative Evaluation Matrix
| Evaluation Dimension | ${topicName} Approach | Conventional / Naive Alternative |
| :--- | :--- | :--- |
| **Algorithmic Efficiency** | High efficiency with optimized asymptotic bounds | Prone to exponential scaling or bottlenecks |
| **Robustness & Safety** | Provable invariants and deterministic fault isolation | Ad-hoc error recovery and edge vulnerabilities |
| **Scalability** | Graceful degradation under distributed / large loads | Limited scalability under high input volume |

### 7. Examiner Mark-Loss Traps & High-Scoring Strategies
> **Examiner Guidance:**
> 1. Structure the answer across distinct numbered academic headings.
> 2. Always state both Time and Space complexity in Big-O notation.
> 3. Provide the architecture diagram and the comparative trade-off matrix.`;

    sections = [
      {
        heading: '1. Theoretical Foundations & Model',
        content: `Rigorous conceptual foundation and system model for ${topicName}.`,
        keyKeywords: [topicName, 'System Model', 'Formal Foundations'],
      },
      {
        heading: '2. Procedural Workflow & Algorithm',
        content: 'Complete 4-stage algorithmic execution sequence.',
        keyKeywords: ['Initialization', 'State Verification', 'Convergence'],
        hasAlgorithm: true,
      },
      {
        heading: '3. Architectural State Diagram',
        content: 'Dataflow diagram showing component decoupling and state buffers.',
        keyKeywords: ['Architecture Diagram', 'State Engine', 'Cache / Logs'],
        hasDiagram: true,
      },
      {
        heading: '4. Complexity Derivation & Comparative Matrix',
        content: 'Big-O time and space complexity with comparative trade-off table.',
        keyKeywords: ['Time Complexity', 'Auxiliary Space', 'Comparative Matrix'],
      },
    ];
  } else {
    // 10 Marks standard
    markdown = `## ${cleanQ}: Comprehensive 10-Mark Academic Answer

### 1. Introduction & Formal Academic Definition
In **${subject}**, **${topicName}** is an essential syllabus concept. It provides the foundational theoretical and operational framework necessary to guarantee correctness, resource optimization, and deterministic performance in engineering systems.

### 2. Core Theoretical Principles & Architecture
1. **Primary Operational Protocol:** Operates by decomposing complex system states into modular, verifiable functional components.
2. **System Invariants:** Enforces strict boundary checks and invariant preservation throughout all execution cycles.
3. **Interface Abstraction:** Decouples low-level execution details from high-level interface calls to maximize modularity.

### 3. Step-by-Step Procedure / Algorithm
\`\`\`
1. Verify system preconditions and initialize data structures.
2. Sequentially process input components according to defined priority order.
3. Evaluate intermediate state transitions against governing validation rules.
4. Finalize output result and release temporary auxiliary buffers.
\`\`\`

### 4. Architectural Block Diagram
\`\`\`
[ Input Stream / Data ] ---> [ Core Processing Unit ] ---> [ Output / Result ]
                                       |
                                       v
                             [ State Memory / Table ]
\`\`\`

### 5. Asymptotic Time & Space Complexity
- **Time Complexity:** $\\mathcal{O}(n \\log n)$ or $\\mathcal{O}(n)$ depending on the underlying data structures and traversal strategy.
- **Space Complexity:** $\\mathcal{O}(n)$ auxiliary memory for state allocation, optimizable to $\\mathcal{O}(1)$ in-place.

### 6. Examiner Writing Tip
> **Examiner Tip for 10 Marks:** University examiners look for:
> 1. Formal definition with standard technical keywords.
> 2. Step-by-step algorithm or working mechanism.
> 3. Clean architectural block diagram.
> 4. Explicit Big-O Time and Space complexity statements.`;

    sections = [
      {
        heading: '1. Introduction & Formal Definition',
        content: `Formal definition and role of ${topicName} in ${subject}.`,
        keyKeywords: [topicName, 'Formal Definition', 'System Framework'],
      },
      {
        heading: '2. Core Principles & Architecture',
        content: 'Primary operational protocol, system invariants, and interface abstraction.',
        keyKeywords: ['Operational Protocol', 'System Invariants', 'Interface Abstraction'],
      },
      {
        heading: '3. Procedure / Algorithm & Diagram',
        content: 'Algorithmic execution trace and architectural dataflow diagram.',
        keyKeywords: ['Step-by-step Algorithm', 'Architectural Diagram'],
        hasAlgorithm: true,
        hasDiagram: true,
      },
      {
        heading: '4. Complexity Analysis & Examiner Tips',
        content: 'Big-O time and space complexity analysis and examiner rubric guidelines.',
        keyKeywords: ['Time Complexity', 'Space Complexity', 'Big-O Analysis', 'Examiner Tips'],
      },
    ];
  }

  return {
    id: `ans_${Date.now()}`,
    question,
    subject,
    topic: topicName,
    marks,
    difficulty: marks >= 10 ? 'Hard' : marks === 5 ? 'Medium' : 'Easy',
    answerMarkdown: markdown,
    structuredSections: sections,
    examWritingTip: `For ${marks} marks, format your answer with clear numbered headings, include the architectural diagram, and provide the exact Big-O complexity.`,
    howToGetMoreMarks: {
      missingCommonMistakes: [
        'Writing unstructured paragraphs instead of numbered sections',
        'Omitting Big-O asymptotic time and space complexity',
        'Skipping the architectural or flow diagram',
      ],
      highYieldKeywords: [
        topicName,
        'Asymptotic Complexity',
        'State Invariant',
        'Modular Abstraction',
        'Deterministic Execution',
      ],
      recommendedStructure: [
        '1. Formal Definition & Scope',
        '2. Core Working Principles',
        '3. Step-by-Step Algorithm / Procedure',
        '4. Architectural Diagram',
        '5. Time & Space Complexity in Big-O',
      ],
      diagramAdvice: 'Sketch a clear block diagram illustrating data flow through input, processing, and state verification.',
      examinerExpectations: [
        'Technical accuracy with academic terminology',
        'Explicit Big-O complexity',
        'Clean diagrams and structured headings',
      ],
    },
  };
}

// ============================================================================
// MAIN ROUTER FOR GENERATING ANSWERS
// ============================================================================

export function getMockAnswerForQuestion(
  question: string,
  subject: string,
  marks: QuestionMarks
): AnswerGenerationResult {
  const q = question.toLowerCase();

  // 1. Dynamic Programming
  if (q.includes('dynamic programming') || q.includes(' dp ') || q.startsWith('dp ') || q.endsWith(' dp') || q.includes('memoization') || q.includes('knapsack')) {
    return buildDPAnswer(question, marks);
  }

  // 2. Dijkstra / Shortest Path
  if (q.includes('dijkstra') || q.includes('shortest path') || q.includes('bellman')) {
    return buildDijkstraAnswer(question, marks);
  }

  // 3. Paging vs Segmentation / Virtual Memory
  if (q.includes('paging') || q.includes('segmentation') || q.includes('page replacement') || q.includes('virtual memory')) {
    return buildPagingSegmentationAnswer(question, marks);
  }

  // 4. ACID Properties / Transactions
  if (q.includes('acid') || q.includes('transaction') || q.includes('serializability') || q.includes('2pl')) {
    return buildACIDAnswer(question, marks);
  }

  // 5. Master Theorem / Recurrences
  if (q.includes('master theorem') || q.includes('recurrence') || q.includes('divide and conquer')) {
    return buildMasterTheoremAnswer(question, marks);
  }

  // 6. Process Synchronization / Critical Section / Semaphores
  if (q.includes('critical section') || q.includes('semaphore') || q.includes('mutex') || q.includes('synchronization') || q.includes('deadlock') || q.includes('banker')) {
    return buildSynchronizationAnswer(question, marks);
  }

  // 7. Relational Normalization / BCNF / 3NF / Functional Dependency
  if (q.includes('normal') || q.includes('bcnf') || q.includes('3nf') || q.includes('functional depend') || q.includes('lossless')) {
    return buildNormalizationAnswer(question, marks);
  }

  // 8. Computer Networks: Handshake / OSI / TCP / IP
  if (q.includes('handshake') || q.includes('tcp') || q.includes('osi') || q.includes('udp') || q.includes('sliding window')) {
    return buildNetworkingAnswer(question, marks);
  }

  // 9. Machine Learning: Gradient Descent / Overfitting / Regression / Neural
  if (q.includes('gradient descent') || q.includes('regression') || q.includes('overfitting') || q.includes('regularization') || q.includes('neural') || q.includes('machine learning')) {
    return buildMLAnswer(question, marks);
  }

  // 10. Intelligent Academic Synthesizer for Any Custom / Unseen Topic
  return synthesizeIntelligentAnswer(question, subject, marks);
}

// ============================================================================
// EVALUATOR FOR STUDENT ANSWERS
// ============================================================================

export function evaluateStudentAnswerMock(
  question: string,
  subject: string,
  marks: QuestionMarks,
  studentAnswer: string
): EvaluationResult {
  const words = countWords(studentAnswer);
  const answer = studentAnswer.trim();
  const textLower = answer.toLowerCase();

  const stopWords = new Set([
    'what', 'why', 'how', 'explain', 'describe', 'define', 'discuss', 'with',
    'give', 'write', 'state', 'list', 'using', 'about', 'from', 'this', 'that',
    'the', 'and', 'for', 'with', 'into', 'between', 'compare', 'different',
    'example', 'examples', 'marks', 'mark', 'short', 'note', 'following',
    'algorithm', 'method', 'technique', 'concept', 'subject'
  ]);

  const questionKeywords = Array.from(
    new Set(
      question
        .toLowerCase()
        .replace(/[^a-z0-9+#.-]+/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length >= 2 && !stopWords.has(w))
    )
  );

  const keywordHits = questionKeywords.filter((k) => textLower.includes(k)).length;
  const keywordCoverage = questionKeywords.length
    ? keywordHits / questionKeywords.length
    : 0;

  const meaningfulTokens = textLower
    .replace(/[^a-z0-9+#.-]+/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 2);
  const uniqueMeaningfulTokens = new Set(meaningfulTokens);
  const hasRepeatedGibberish =
    meaningfulTokens.length > 0 && uniqueMeaningfulTokens.size / meaningfulTokens.length < 0.45;
  const looksLikeGibberish =
    words <= 6 && keywordHits === 0 && uniqueMeaningfulTokens.size <= 5;

  const hasComplexity = /\bcomplexity\b|big[- ]?o|o\s*\(\s*[a-z0-9]/i.test(textLower);
  const hasDiagram = /diagram|tree|table|matrix|chart|graph|figure/i.test(textLower);
  const hasExample = /example|e\.g\.?|such as|for instance|sample/i.test(textLower);
  const hasDefinition = /\bis\b|\bmeans\b|\bdefined as\b|\brefers to\b/i.test(textLower);
  const hasSteps = /\b(step|first|second|then|finally|procedure|algorithm|recurrence|formula)\b/i.test(textLower);

  const recommendedResult = getMockAnswerForQuestion(question, subject, marks);

  // A very short irrelevant answer is intentionally scored very low.
  if (!answer || looksLikeGibberish || hasRepeatedGibberish) {
    const aiEstimatedScore = 0;
    const rubricBreakdown: EvaluationRubricCategory[] = [
      {
        category: 'Technical Accuracy', score: 0, maxScore: Number((marks * 0.2).toFixed(1)), percentage: 0,
        status: 'missing', feedback: 'No verifiable subject-specific content was provided.'
      },
      {
        category: 'Key Concepts', score: 0, maxScore: Number((marks * 0.2).toFixed(1)), percentage: 0,
        status: 'missing', feedback: 'The response does not demonstrate the concepts asked in the question.'
      },
      {
        category: 'Complexity', score: 0, maxScore: Number((marks * 0.2).toFixed(1)), percentage: 0,
        status: 'missing', feedback: 'No complexity analysis was provided.'
      },
      {
        category: 'Diagram', score: 0, maxScore: Number((marks * 0.15).toFixed(1)), percentage: 0,
        status: 'missing', feedback: 'No diagram or visual explanation was provided.'
      },
      {
        category: 'Structure', score: 0, maxScore: Number((marks * 0.15).toFixed(1)), percentage: 0,
        status: 'missing', feedback: 'The response is too short to demonstrate an exam-ready structure.'
      },
      {
        category: 'Example', score: 0, maxScore: Number((marks * 0.1).toFixed(1)), percentage: 0,
        status: 'missing', feedback: 'No example was provided.'
      },
    ];

    return {
      id: `eval_${Date.now()}`,
      questionText: question,
      subject,
      topic: recommendedResult.topic || question,
      marks,
      studentAnswer,
      recommendedAnswer: recommendedResult.answerMarkdown,
      aiEstimatedScore,
      maxMarks: marks,
      percentage: 0,
      rubricBreakdown,
      markLossReasons: [{
        id: `mlr_${Date.now()}`,
        title: 'Insufficient / Irrelevant Answer',
        category: 'Completeness',
        marksDeducted: marks,
        severity: 'critical',
        explanation: `Only ${words} word${words === 1 ? '' : 's'} were submitted and the response does not contain enough relevant academic content to award marks.`,
        examinerQuote: 'An answer must address the question with relevant concepts to receive marks.',
        solution: 'Write the definition and key concepts first, then add the required explanation, example, algorithm/steps, and complexity or diagram when applicable.',
      }],
      improvementSteps: [
        'Start with a direct definition or introduction related to the question.',
        'Include the main subject-specific concepts and terminology.',
        marks >= 5 ? 'Add an example, steps/working, or supporting explanation.' : 'Keep the answer concise but directly address the question.',
        marks >= 10 ? 'Add complexity and a relevant diagram when the question requires them.' : 'Cover the exact points expected for the allocated marks.',
      ],
      yourAnswerAnalysis: {
        strengths: [],
        weaknesses: ['Answer is too short or unrelated to the question.'],
        wordCount: words,
      },
      evaluationDate: new Date().toISOString().split('T')[0],
      evaluationTimestamp: Date.now(),
    };
  }

  // Normal answer evaluation
  const lengthTarget = marks >= 15 ? 300 : marks >= 10 ? 220 : marks === 5 ? 100 : 35;
  const lengthScore = Math.min(1, words / lengthTarget);
  const relevanceScore = Math.min(1, keywordCoverage * 1.25 + (questionKeywords.length === 0 ? 0.25 : 0));
  const conceptScore = Math.min(1,
    relevanceScore * 0.55 +
    (hasDefinition ? 0.15 : 0) +
    (hasSteps ? 0.1 : 0) +
    (hasExample ? 0.1 : 0) +
    (hasComplexity ? 0.1 : 0)
  );
  const structureScore = Math.min(1, lengthScore * 0.65 + (hasDefinition ? 0.15 : 0) + (hasSteps ? 0.2 : 0));
  const complexityScore = hasComplexity ? 1 : marks >= 10 ? Math.min(0.25, lengthScore * 0.25) : 0.6;
  const diagramScore = hasDiagram ? 1 : marks >= 10 ? 0.15 : 0.8;
  const exampleScore = hasExample ? 1 : marks >= 10 ? 0.2 : 0.75;
  const accuracyScore = Math.min(1, relevanceScore * 0.8 + conceptScore * 0.2);

  let overall = (
    accuracyScore * 0.20 +
    conceptScore * 0.20 +
    complexityScore * 0.20 +
    diagramScore * 0.15 +
    structureScore * 0.15 +
    exampleScore * 0.10
  );

  overall *= Math.max(0.15, relevanceScore);
  if (words < 10) overall = Math.min(overall, 0.15);
  else if (words < 25) overall = Math.min(overall, 0.30);

  const aiEstimatedScore = Number(Math.max(0, Math.min(marks, marks * overall)).toFixed(1));
  const percentage = Math.round((aiEstimatedScore / marks) * 100);

  const rubric = (
    category: EvaluationRubricCategory['category'],
    fraction: number,
    feedback: string
  ): EvaluationRubricCategory => {
    const maxScore = Number((marks * ({
      'Technical Accuracy': 0.2,
      'Key Concepts': 0.2,
      'Complexity': 0.2,
      'Diagram': 0.15,
      'Structure': 0.15,
      'Example': 0.1,
    } as Record<string, number>)[category]).toFixed(1));
    const pct = Math.round(Math.max(0, Math.min(1, fraction)) * 100);
    return {
      category,
      score: Number((maxScore * Math.max(0, Math.min(1, fraction))).toFixed(1)),
      maxScore,
      percentage: pct,
      status: pct >= 85 ? 'excellent' : pct >= 65 ? 'good' : pct >= 35 ? 'needs_work' : 'missing',
      feedback,
    };
  };

  const rubricBreakdown: EvaluationRubricCategory[] = [
    rubric('Technical Accuracy', accuracyScore, relevanceScore < 0.35 ? 'The answer contains limited question-specific information.' : 'Relevant technical content is present.'),
    rubric('Key Concepts', conceptScore, conceptScore >= 0.65 ? 'Core concepts are reasonably covered.' : 'Important concepts are missing or only briefly mentioned.'),
    rubric('Complexity', complexityScore, hasComplexity ? 'Complexity analysis is included.' : marks >= 10 ? 'Time/space complexity is missing.' : 'Complexity is not essential for every low-mark question.'),
    rubric('Diagram', diagramScore, hasDiagram ? 'A relevant visual/diagram is mentioned.' : marks >= 10 ? 'A relevant diagram could improve the answer.' : 'A diagram is usually optional for this mark allocation.'),
    rubric('Structure', structureScore, structureScore >= 0.65 ? 'The response has a usable exam structure.' : 'The response needs clearer organization and more explanation.'),
    rubric('Example', exampleScore, hasExample ? 'A supporting example is included.' : marks >= 10 ? 'A suitable example would improve completeness.' : 'An example is optional at this mark level.'),
  ];

  const markLossReasons: MarkLossReason[] = [];
  if (relevanceScore < 0.5) {
    markLossReasons.push({
      id: `mlr_relevance_${Date.now()}`,
      title: 'Question Relevance Is Weak', category: 'Technical Accuracy',
      marksDeducted: Number((marks * 0.25).toFixed(1)), severity: 'critical',
      explanation: 'Only a small portion of the response matches the key terms or concepts in the question.',
      examinerQuote: 'The answer must directly address the asked question.',
      solution: 'Use the exact topic terminology from the question and explain the concept being asked.',
    });
  }
  if (marks >= 10 && !hasComplexity) {
    markLossReasons.push({
      id: `mlr_complexity_${Date.now()}`,
      title: 'Complexity Analysis Missing', category: 'Complexity',
      marksDeducted: Number((marks * 0.2).toFixed(1)), severity: 'moderate',
      explanation: 'For technical and algorithmic questions with large mark allocation, time and space complexity in Big-O should be explicitly stated.',
      examinerQuote: 'Include the relevant time and auxiliary-space complexity with Big-O notation.',
      solution: 'Add time complexity and auxiliary space complexity with a short derivation or justification.',
    });
  }
  if (marks >= 10 && words < 80) {
    markLossReasons.push({
      id: `mlr_depth_${Date.now()}`,
      title: 'Explanation Too Brief', category: 'Completeness',
      marksDeducted: Number((marks * 0.15).toFixed(1)), severity: 'moderate',
      explanation: `The response contains only ${words} words, which is insufficient depth for a ${marks}-mark answer.`,
      examinerQuote: 'Higher-mark questions require enough explanation to demonstrate depth.',
      solution: 'Expand the answer with definition, key points, working/steps, example, and applicable complexity.',
    });
  }
  if (marks >= 10 && !hasDiagram) {
    markLossReasons.push({
      id: `mlr_diagram_${Date.now()}`,
      title: 'Relevant Diagram Missing', category: 'Diagram',
      marksDeducted: Number((marks * 0.1).toFixed(1)), severity: 'minor',
      explanation: 'A relevant architectural diagram, flow chart, or state transition diagram improves clarity and presentation for a 10/15-mark answer.',
      examinerQuote: 'Use a diagram when it genuinely explains the concept.',
      solution: 'Add a simple relevant diagram, flow, table, graph, or architecture where appropriate.',
    });
  }

  const improvementSteps = [
    'Directly answer the question with a formal definition before adding general background.',
    'Use subject-specific keywords and explain each important point thoroughly.',
    ...(marks >= 5 ? ['Include a relevant example or working/steps.'] : []),
    ...(marks >= 10 ? ['Include applicable time/space complexity in Big-O and a useful diagram.'] : []),
  ];

  return {
    id: `eval_${Date.now()}`,
    questionText: question,
    subject,
    topic: recommendedResult.topic || question,
    marks,
    studentAnswer,
    recommendedAnswer: recommendedResult.answerMarkdown,
    aiEstimatedScore,
    maxMarks: marks,
    percentage,
    rubricBreakdown,
    markLossReasons: markLossReasons.length ? markLossReasons : [{
      id: `mlr_none_${Date.now()}`,
      title: 'No Major Mark Loss Detected', category: 'Completeness', marksDeducted: 0,
      severity: 'minor', explanation: 'The response addresses the question with reasonable coverage for the allocated marks.',
      examinerQuote: 'The answer demonstrates sufficient coverage for the mark allocation.',
      solution: 'Maintain direct, accurate and well-structured explanations.',
    }],
    improvementSteps,
    yourAnswerAnalysis: {
      strengths: [
        ...(relevanceScore >= 0.5 ? ['The response contains question-relevant content.'] : []),
        ...(hasDefinition ? ['A definition/introduction is present.'] : []),
        ...(hasExample ? ['A supporting example is included.'] : []),
      ],
      weaknesses: markLossReasons.map((r) => r.title),
      wordCount: words,
    },
    evaluationDate: new Date().toISOString().split('T')[0],
    evaluationTimestamp: Date.now(),
  };
}
