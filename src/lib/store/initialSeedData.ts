import {
  Subject,
  Material,
  Question,
  EvaluationResult,
  WeaknessProfileItem,
  PracticeQuestion,
  StudyPlanItem,
  MockExam,
  Achievement,
  AppNotification,
  UserProfile,
} from '../types';

export const initialUser: UserProfile = {
  id: 'usr_alex_chen',
  name: 'Alex Chen',
  email: 'alex.chen@university.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  university: 'Metropolitan Institute of Technology',
  degree: 'B.Tech in Computer Science & Engineering',
  semester: 6,
  targetScorePercentage: 90,
  streakDays: 7,
  totalQuestionsAttempted: 34,
  overallEstimatedScore: 7.8,
  averageScore: 7.6,
  improvementPercentage: 18.5,
  strongestTopic: 'Binary Search Trees & Graphs',
  weakestTopic: 'Complexity Analysis & Mathematical Proofs',
};

export const initialSubjects: Subject[] = [
  {
    id: 'dsa',
    code: 'CS301',
    name: 'Data Structures & Algorithms',
    description: 'Algorithmic design techniques, asymptotic notation, trees, graphs, dynamic programming, and greedy methods.',
    iconName: 'Binary',
    semester: 6,
    topicsCount: 24,
    completedTopics: 18,
    averageScore: 7.4,
    color: 'from-blue-500 to-indigo-600',
    accentColor: 'indigo',
    activeWeaknessCount: 2,
    syllabusModules: [
      {
        id: 'dsa_m1',
        moduleNumber: 1,
        title: 'Asymptotic Analysis & Divide-and-Conquer',
        weightageMarks: 20,
        topics: ['Big-O, Omega, Theta', 'Master Theorem', 'Merge Sort', 'Quick Sort'],
      },
      {
        id: 'dsa_m2',
        moduleNumber: 2,
        title: 'Advanced Trees & Priority Queues',
        weightageMarks: 20,
        topics: ['AVL Trees', 'Red-Black Trees', 'Binary Heaps', 'B-Trees'],
      },
      {
        id: 'dsa_m3',
        moduleNumber: 3,
        title: 'Dynamic Programming & Greedy Strategies',
        weightageMarks: 30,
        topics: ['Memoization vs Tabulation', '0/1 Knapsack', 'Longest Common Subsequence', 'Matrix Chain Multiplication'],
      },
      {
        id: 'dsa_m4',
        moduleNumber: 4,
        title: 'Graph Algorithms & NP-Completeness',
        weightageMarks: 30,
        topics: ['Dijkstra & Bellman-Ford', 'Prim & Kruskal', 'Topological Sort', 'P vs NP Concepts'],
      },
    ],
  },
  {
    id: 'os',
    code: 'CS302',
    name: 'Operating Systems',
    description: 'Process management, synchronization primitives, deadlocks, memory virtualization, paging, and file systems.',
    iconName: 'Cpu',
    semester: 6,
    topicsCount: 20,
    completedTopics: 14,
    averageScore: 7.9,
    color: 'from-purple-500 to-pink-600',
    accentColor: 'purple',
    activeWeaknessCount: 1,
    syllabusModules: [
      {
        id: 'os_m1',
        moduleNumber: 1,
        title: 'Process Management & Scheduling',
        weightageMarks: 25,
        topics: ['Process States & PCB', 'CPU Scheduling Algorithms', 'Context Switching'],
      },
      {
        id: 'os_m2',
        moduleNumber: 2,
        title: 'Concurrency & Deadlocks',
        weightageMarks: 30,
        topics: ['Critical Section Problem', 'Semaphores & Mutexes', 'Bankers Algorithm', 'Deadlock Detection'],
      },
      {
        id: 'os_m3',
        moduleNumber: 3,
        title: 'Memory Virtualization',
        weightageMarks: 25,
        topics: ['Demand Paging', 'Page Replacement (LRU, FIFO)', 'Segmentation', 'TLB Architecture'],
      },
      {
        id: 'os_m4',
        moduleNumber: 4,
        title: 'Storage & I/O Systems',
        weightageMarks: 20,
        topics: ['File Allocation Tables', 'Disk Scheduling (SSTF, SCAN)', 'RAID Levels'],
      },
    ],
  },
  {
    id: 'dbms',
    code: 'CS303',
    name: 'Database Management Systems',
    description: 'Relational calculus, SQL tuning, relational normalization (1NF to BCNF), transaction processing, and indexing.',
    iconName: 'Database',
    semester: 6,
    topicsCount: 18,
    completedTopics: 15,
    averageScore: 8.2,
    color: 'from-emerald-500 to-teal-600',
    accentColor: 'emerald',
    activeWeaknessCount: 1,
    syllabusModules: [
      {
        id: 'dbms_m1',
        moduleNumber: 1,
        title: 'Relational Model & ER Diagrams',
        weightageMarks: 20,
        topics: ['ER to Relational Schema', 'Relational Algebra', 'Tuple Relational Calculus'],
      },
      {
        id: 'dbms_m2',
        moduleNumber: 2,
        title: 'Functional Dependencies & Normalization',
        weightageMarks: 30,
        topics: ['Closure of Attribute Sets', '1NF, 2NF, 3NF, BCNF', 'Lossless Join Decomposition'],
      },
      {
        id: 'dbms_m3',
        moduleNumber: 3,
        title: 'Transactions & Concurrency Control',
        weightageMarks: 30,
        topics: ['ACID Properties', 'Serializability', 'Two-Phase Locking (2PL)', 'Timestamp Ordering'],
      },
      {
        id: 'dbms_m4',
        moduleNumber: 4,
        title: 'Storage & Indexing',
        weightageMarks: 20,
        topics: ['B+ Tree Indexing', 'Hashing Techniques', 'Query Optimization'],
      },
    ],
  },
  {
    id: 'cn',
    code: 'CS304',
    name: 'Computer Networks',
    description: 'OSI & TCP/IP stack, routing protocols, flow & error control, transport protocols, and socket programming.',
    iconName: 'Network',
    semester: 6,
    topicsCount: 22,
    completedTopics: 16,
    averageScore: 7.7,
    color: 'from-amber-500 to-orange-600',
    accentColor: 'amber',
    activeWeaknessCount: 1,
    syllabusModules: [
      {
        id: 'cn_m1',
        moduleNumber: 1,
        title: 'Physical & Data Link Layers',
        weightageMarks: 20,
        topics: ['Framing', 'Error Detection (CRC, Checksum)', 'Sliding Window Protocols (Go-Back-N, SR)'],
      },
      {
        id: 'cn_m2',
        moduleNumber: 2,
        title: 'Network Layer & Routing',
        weightageMarks: 30,
        topics: ['IPv4/IPv6 Addressing', 'Subnetting & CIDR', 'Dijkstra Link-State', 'Distance Vector Routing'],
      },
      {
        id: 'cn_m3',
        moduleNumber: 3,
        title: 'Transport Layer & Congestion Control',
        weightageMarks: 30,
        topics: ['TCP 3-Way Handshake', 'TCP Congestion Control (Tahoe/Reno)', 'UDP Header vs TCP'],
      },
      {
        id: 'cn_m4',
        moduleNumber: 4,
        title: 'Application Layer & Network Security',
        weightageMarks: 20,
        topics: ['DNS Resolution Flow', 'HTTP/HTTPS Handshake', 'TLS/SSL Basics'],
      },
    ],
  },
  {
    id: 'ml',
    code: 'CS305',
    name: 'Machine Learning',
    description: 'Supervised and unsupervised learning, gradient descent optimization, regularization, neural networks, and evaluation metrics.',
    iconName: 'Brain',
    semester: 6,
    topicsCount: 20,
    completedTopics: 12,
    averageScore: 7.2,
    color: 'from-cyan-500 to-blue-600',
    accentColor: 'cyan',
    activeWeaknessCount: 1,
    syllabusModules: [
      {
        id: 'ml_m1',
        moduleNumber: 1,
        title: 'Linear Models & Optimization',
        weightageMarks: 25,
        topics: ['Linear Regression', 'Logistic Regression', 'Gradient Descent Variants', 'L1/L2 Regularization'],
      },
      {
        id: 'ml_m2',
        moduleNumber: 2,
        title: 'Tree Models & Ensembles',
        weightageMarks: 25,
        topics: ['Decision Trees (ID3, C4.5)', 'Random Forests', 'Gradient Boosting Machines'],
      },
      {
        id: 'ml_m3',
        moduleNumber: 3,
        title: 'Neural Networks & Deep Learning',
        weightageMarks: 30,
        topics: ['Perceptrons', 'Backpropagation Algorithm', 'Activation Functions', 'Loss Functions'],
      },
      {
        id: 'ml_m4',
        moduleNumber: 4,
        title: 'Unsupervised Learning & Evaluation',
        weightageMarks: 20,
        topics: ['K-Means Clustering', 'PCA Dimensionality Reduction', 'ROC-AUC & F1-Score'],
      },
    ],
  },
];

export const initialMaterials: Material[] = [
  {
    id: 'mat_dsa_notes',
    subjectId: 'dsa',
    subjectName: 'Data Structures & Algorithms',
    title: 'Dynamic Programming & Memoization Comprehensive Notes.pdf',
    fileType: 'PDF',
    uploadDate: '2026-08-28',
    fileSizeBytes: 4280000,
    chunksCount: 24,
    status: 'indexed',
    summary: 'Comprehensive academic notes covering Bellman equations, optimal substructure proof templates, Fibonacci, 0/1 Knapsack matrix building, and time/space complexity derivations.',
    chunks: [
      {
        id: 'chk_dsa_1',
        materialId: 'mat_dsa_notes',
        chunkIndex: 0,
        content: 'Dynamic Programming solves optimization problems by breaking them into overlapping subproblems and memorizing subproblem solutions. Crucial criteria for DP applicability: (1) Optimal Substructure: An optimal solution to the problem contains within it optimal solutions to subproblems; (2) Overlapping Subproblems: A recursive algorithm revisits the same subproblems repeatedly rather than generating new ones.',
        keywords: ['Dynamic Programming', 'Optimal Substructure', 'Overlapping Subproblems', 'Memoization'],
        tokenCount: 84,
      },
      {
        id: 'chk_dsa_2',
        materialId: 'mat_dsa_notes',
        chunkIndex: 1,
        content: 'Examiner Guideline for 10-Mark Questions: Always present the state definition dp[i][j], the mathematical base cases, the recurrence relation, space and time complexity in Big-O notation, and an execution trace table or diagram.',
        keywords: ['State Definition', 'Recurrence Relation', 'Time Complexity', 'Execution Trace', '10-Mark Rubric'],
        tokenCount: 65,
      },
    ],
  },
  {
    id: 'mat_os_silberschatz',
    subjectId: 'os',
    subjectName: 'Operating Systems',
    title: 'Silberschatz Chapter 6 - Process Synchronization Excerpts.pdf',
    fileType: 'PDF',
    uploadDate: '2026-09-02',
    fileSizeBytes: 3150000,
    chunksCount: 18,
    status: 'indexed',
    summary: 'Essential excerpts on race conditions, Peterson algorithm correctness proof, counting semaphores, and monitor constructs.',
    chunks: [
      {
        id: 'chk_os_1',
        materialId: 'mat_os_silberschatz',
        chunkIndex: 0,
        content: 'Three requirements for any valid solution to the critical-section problem: 1. Mutual Exclusion: If process Pi is executing in its critical section, no other processes can be executing in their critical sections. 2. Progress: If no process is executing in its critical section and some processes wish to enter, selection cannot be postponed indefinitely. 3. Bounded Waiting: A bound must exist on the number of times other processes are allowed to enter.',
        keywords: ['Critical Section', 'Mutual Exclusion', 'Progress', 'Bounded Waiting'],
        tokenCount: 92,
      },
    ],
  },
  {
    id: 'mat_dbms_korth',
    subjectId: 'dbms',
    subjectName: 'Database Management Systems',
    title: 'Database Normalization & BCNF Decomposition Rules.notes',
    fileType: 'NOTES',
    uploadDate: '2026-09-05',
    fileSizeBytes: 840000,
    chunksCount: 12,
    status: 'indexed',
    summary: 'Step-by-step algorithms for computing closure F+, canonical cover, testing lossless decomposition, and dependency preservation.',
    chunks: [
      {
        id: 'chk_dbms_1',
        materialId: 'mat_dbms_korth',
        chunkIndex: 0,
        content: 'Testing Lossless-Join Decomposition: A decomposition of R into (R1, R2) is lossless-join with respect to F if and only if at least one of the following functional dependencies is in F+: R1 ∩ R2 -> R1 OR R1 ∩ R2 -> R2.',
        keywords: ['Lossless-Join', 'Functional Dependencies', 'BCNF', 'Decomposition'],
        tokenCount: 56,
      },
    ],
  },
];

export const initialWeaknesses: WeaknessProfileItem[] = [
  {
    id: 'wk_complexity_analysis',
    topic: 'Complexity Analysis & Proofs',
    subject: 'Data Structures & Algorithms',
    weaknessTitle: 'Complexity Analysis Omission',
    category: 'Complexity',
    attemptsCount: 8,
    recurringLossCount: 6,
    averageScore: 5.8,
    lastDetected: '2026-09-10',
    severity: 'Critical',
    status: 'Needs Practice',
    beforeScore: 5.2,
    afterScore: 8.1,
    improvementPercentage: 55.7,
    description: 'You frequently omit time and space complexity analysis in algorithm and design questions. In 6 of your last 8 submitted answers, full marks were docked because Big-O time and auxiliary space were absent.',
    recommendedAction: 'Practice explicit time & space complexity derivation and recurrence solving for standard algorithms.',
  },
  {
    id: 'wk_os_diagrams',
    topic: 'Process Synchronization',
    subject: 'Operating Systems',
    weaknessTitle: 'Architecture & State Diagrams Missing',
    category: 'Diagram',
    attemptsCount: 5,
    recurringLossCount: 3,
    averageScore: 6.8,
    lastDetected: '2026-09-08',
    severity: 'Weak',
    status: 'In Progress',
    beforeScore: 6.0,
    afterScore: 7.5,
    improvementPercentage: 25.0,
    description: 'Examiners expect concurrency timeline diagrams, PCB state transitions, or semaphore wait-queue sketches for 10-mark answers.',
    recommendedAction: 'Draw quick ASCII/box-line block diagrams illustrating process state changes and critical section access.',
  },
  {
    id: 'wk_dbms_proofs',
    topic: 'Relational Normalization',
    subject: 'Database Management Systems',
    weaknessTitle: 'Lossless-Join Formal Step Omission',
    category: 'Key Concepts',
    attemptsCount: 4,
    recurringLossCount: 2,
    averageScore: 7.1,
    lastDetected: '2026-09-06',
    severity: 'Moderate',
    status: 'Improving',
    beforeScore: 6.5,
    afterScore: 8.0,
    improvementPercentage: 23.1,
    description: 'When decomposing schemas into BCNF, you state that decomposition is lossless without verifying (R1 ∩ R2) -> R1 or R2.',
    recommendedAction: 'Always include the 1-line intersection closure proof in your answers.',
  },
];

export const initialPracticeQuestions: PracticeQuestion[] = [
  {
    id: 'pq_1',
    weaknessId: 'wk_complexity_analysis',
    tier: 'Easy',
    marks: 2,
    questionText: 'State the best, average, and worst-case time complexity of QuickSort. Under what input condition does the worst case occur?',
    promptHint: 'Write 2 concise points. Mention pivot selection skewness.',
    expectedFocus: 'Asymptotic notation for time and input condition.',
    isCompleted: true,
    evaluatedScore: 2.0,
  },
  {
    id: 'pq_2',
    weaknessId: 'wk_complexity_analysis',
    tier: 'Medium',
    marks: 5,
    questionText: 'Derive the time and space complexity of computing the n-th Fibonacci number using (a) Naive Recursion vs (b) Bottom-Up Dynamic Programming.',
    promptHint: 'Show recursion tree height and array allocation space.',
    expectedFocus: 'Contrast exponential O(2^n) recursion with linear O(n) DP and O(1) space optimization.',
    isCompleted: true,
    evaluatedScore: 4.5,
  },
  {
    id: 'pq_3',
    weaknessId: 'wk_complexity_analysis',
    tier: 'Application',
    marks: 10,
    questionText: 'Explain Dijkstra’s Shortest Path algorithm. Analyze its time complexity using (1) an Adjacency Matrix and (2) a Min-Heap with an Adjacency List. Why does the heap variant scale better?',
    promptHint: 'Include Big-O derivations for vertex extractions and edge relaxations.',
    expectedFocus: 'O(V^2) vs O((V + E) log V) breakdown.',
    isCompleted: false,
  },
  {
    id: 'pq_4',
    weaknessId: 'wk_complexity_analysis',
    tier: 'Exam-style',
    marks: 10,
    questionText: 'Formulate the 0/1 Knapsack Problem using Dynamic Programming. Provide the state transition equation, tabular algorithm, and step-by-step time and space complexity analysis.',
    promptHint: 'Explain why 0/1 Knapsack is pseudo-polynomial.',
    expectedFocus: 'O(n * W) time complexity and pseudo-polynomial definition.',
    isCompleted: false,
  },
  {
    id: 'pq_5',
    weaknessId: 'wk_complexity_analysis',
    tier: 'Challenge',
    marks: 15,
    questionText: 'Explain the Matrix Chain Multiplication problem. State the recurrence relation, develop the dynamic programming table algorithm, and rigorously derive its O(n^3) time and O(n^2) space complexity.',
    promptHint: 'Include parenthesization example and nested loop indices.',
    expectedFocus: 'Rigorous derivation of summation sum_{l=2}^n (n-l+1)(l-1) = O(n^3).',
    isCompleted: false,
  },
];

export const initialEvaluations: EvaluationResult[] = [
  {
    id: 'eval_dp_demo',
    questionText: 'Explain Dynamic Programming with an example. (10 Marks)',
    subject: 'Data Structures & Algorithms',
    topic: 'Dynamic Programming',
    marks: 10,
    studentAnswer: `Dynamic programming is an algorithmic technique used to solve problems by breaking them into subproblems. It stores the results of subproblems so we don't have to recompute them.

There are two main properties:
1. Optimal substructure: The solution to the problem can be composed from solutions of its subproblems.
2. Overlapping subproblems: The same subproblems are solved multiple times.

Example: Fibonacci Series
Fibonacci series is defined as F(n) = F(n-1) + F(n-2).
In normal recursion, it calculates the same Fibonacci numbers repeatedly.
Using dynamic programming, we can use an array:
int fib(int n) {
  int f[n+1];
  f[0] = 0; f[1] = 1;
  for(int i=2; i<=n; i++) {
    f[i] = f[i-1] + f[i-2];
  }
  return f[n];
}
This is much faster than recursion.`,
    recommendedAnswer: `### 1. Introduction & Formal Definition
Dynamic Programming (DP) is a powerful algorithmic paradigm applicable to optimization and counting problems where a naive recursive solution performs redundant calculations.

### 2. Core Principles
To apply DP, a problem must satisfy two fundamental characteristics:
- **Optimal Substructure:** An optimal solution to the overarching problem contains within it optimal solutions to its constituent subproblems.
- **Overlapping Subproblems:** The recursive formulation visits the exact same subproblem instances repeatedly.

### 3. Approaches: Top-Down vs Bottom-Up
- **Top-Down (Memoization):** Recursive approach with a cache table storing computed results upon return.
- **Bottom-Up (Tabulation):** Iterative method that fills an n-dimensional table starting from base cases upwards.

### 4. Detailed Example: Fibonacci Numbers
**Recurrence Relation:**
$$\\text{dp}[i] = \\text{dp}[i-1] + \\text{dp}[i-2] \\quad \\text{for } i \\ge 2$$
$$\\text{dp}[0] = 0, \\quad \\text{dp}[1] = 1$$

**Tabulation Algorithm (C++):**
\`\`\`cpp
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

### 5. Architectural Diagram / Subproblem Tree
\`\`\`
Naive Recursive Tree (O(2^n)):
         fib(5)
       /        \\
    fib(4)      fib(3)  <-- Duplicate computation!
    /    \\       /    \\
 fib(3) fib(2) fib(2) fib(1)

DP State Progression (O(n)):
Index:   0   1   2   3   4   5
Value: [ 0 | 1 | 1 | 2 | 3 | 5 ]
         ^   ^
        Base Cases ---> Linearly builds to target
\`\`\`

### 6. Complexity Analysis (Crucial for 10 Marks)
- **Time Complexity:** $\\mathcal{O}(n)$ because each state from $2$ to $n$ is evaluated exactly once in constant $\\mathcal{O}(1)$ time. This represents an exponential speedup from the naive recursive tree $\\mathcal{O}(2^n)$.
- **Space Complexity:** $\\mathcal{O}(n)$ auxiliary space for the DP array. (Note: Can be further optimized to $\\mathcal{O}(1)$ auxiliary space using two variables).

### 7. Examiner Summary & Applications
DP is widely utilized in Dijkstra with DAGs, Floyd-Warshall (all-pairs shortest paths), Matrix Chain Multiplication, and the 0/1 Knapsack problem.`,
    aiEstimatedScore: 7.0,
    maxMarks: 10,
    percentage: 70,
    rubricBreakdown: [
      {
        category: 'Technical Accuracy',
        score: 1.8,
        maxScore: 2.0,
        percentage: 90,
        status: 'excellent',
        feedback: 'Correct definitions of optimal substructure and overlapping subproblems.',
      },
      {
        category: 'Key Concepts',
        score: 1.6,
        maxScore: 2.0,
        percentage: 80,
        status: 'good',
        feedback: 'Mentioned memoization vs tabulation conceptually, but did not contrast them formally.',
      },
      {
        category: 'Complexity',
        score: 0.5,
        maxScore: 2.0,
        percentage: 25,
        status: 'missing',
        feedback: 'Missing time and space complexity analysis! For a 10-mark answer, Big-O derivation is mandatory.',
      },
      {
        category: 'Diagram',
        score: 0.6,
        maxScore: 1.5,
        percentage: 40,
        status: 'needs_work',
        feedback: 'No recursion tree or DP array progression diagram provided.',
      },
      {
        category: 'Structure',
        score: 1.3,
        maxScore: 1.5,
        percentage: 86,
        status: 'good',
        feedback: 'Good use of bullet points and code block.',
      },
      {
        category: 'Example',
        score: 1.2,
        maxScore: 1.0,
        percentage: 100,
        status: 'excellent',
        feedback: 'Fibonacci implementation is clean and working.',
      },
    ],
    markLossReasons: [
      {
        id: 'mlr_1',
        title: 'Complexity Analysis Missing',
        category: 'Complexity',
        marksDeducted: 1.5,
        severity: 'critical',
        explanation: 'You explained the algorithmic logic correctly but omitted the time complexity (O(n) vs O(2^n)) and space complexity (O(n) auxiliary space).',
        examinerQuote: '"A 10-mark algorithm answer without Big-O complexity analysis cannot receive an A grade."',
        solution: 'State both time complexity and space complexity with 1 sentence explaining why.',
        recurringCount: 6,
      },
      {
        id: 'mlr_2',
        title: 'Subproblem Tree / State Diagram Missing',
        category: 'Diagram',
        marksDeducted: 1.0,
        severity: 'moderate',
        explanation: 'University examiners allocate 1 to 1.5 marks specifically for a visual recursion tree showing redundant subproblems or a table layout.',
        examinerQuote: '"Draw the fib(4) -> fib(3) call tree to visually prove why overlapping subproblems cause exponential blowup."',
        solution: 'Draw a brief ASCII or box diagram contrasting the recursive tree with the linear DP table.',
      },
      {
        id: 'mlr_3',
        title: 'Space Optimization Extension Omitted',
        category: 'Key Concepts',
        marksDeducted: 0.5,
        severity: 'minor',
        explanation: 'Mentioning that the O(n) array space can be reduced to O(1) space with two variables elevates an answer into full marks.',
        examinerQuote: '"Top candidates always mention the space optimization trick for Fibonacci."',
        solution: 'Add a 1-sentence note on O(1) space optimization.',
      },
    ],
    improvementSteps: [
      'Add Big-O time and auxiliary space complexity analysis to every algorithm question.',
      'Draw a recursion tree diagram showing overlapping branches.',
      'Mention how O(n) space can be reduced to O(1) using previous two values.',
      'Highlight keywords: "Optimal Substructure", "Memoization Cache", "Tabulation State".',
    ],
    yourAnswerAnalysis: {
      strengths: [
        'Clear definitions of optimal substructure and overlapping subproblems',
        'Valid C-style iterative Fibonacci code',
      ],
      weaknesses: [
        'Completely omitted time and space complexity Big-O notations',
        'No visual diagram or recursion tree',
        'Did not discuss space optimization',
      ],
      wordCount: 118,
    },
    evaluationDate: '2026-09-10',
    evaluationTimestamp: 1789046400000,
  },
  {
    id: 'eval_os_paging',
    questionText: 'Explain the mechanism of Demand Paging with the Page Fault Handling sequence. (10 Marks)',
    subject: 'Operating Systems',
    topic: 'Memory Virtualization',
    marks: 10,
    studentAnswer: 'Demand paging brings pages into memory only when they are needed. When a process accesses a page that is not in physical memory, a page fault occurs. The OS traps to the kernel, looks up the frame on backing store, swaps it in, updates the page table valid-invalid bit, and restarts the instruction.',
    recommendedAnswer: 'Comprehensive 10-mark breakdown with 6-step hardware/OS trap sequence, TLB miss penalty, page fault service time equation, and dirty bit handling.',
    aiEstimatedScore: 7.5,
    maxMarks: 10,
    percentage: 75,
    rubricBreakdown: [
      {
        category: 'Technical Accuracy',
        score: 1.8,
        maxScore: 2.0,
        percentage: 90,
        status: 'excellent',
        feedback: 'Accurate trap sequence description.',
      },
      {
        category: 'Diagram',
        score: 0.7,
        maxScore: 2.0,
        percentage: 35,
        status: 'needs_work',
        feedback: 'Omitted the 6-step architecture diagram showing Trap, Backing Store, Physical Memory, and Page Table.',
      },
      {
        category: 'Key Concepts',
        score: 1.7,
        maxScore: 2.0,
        percentage: 85,
        status: 'good',
        feedback: 'Covered valid-invalid bit.',
      },
      {
        category: 'Complexity',
        score: 1.3,
        maxScore: 2.0,
        percentage: 65,
        status: 'needs_work',
        feedback: 'Missing effective access time (EAT) mathematical formula.',
      },
      {
        category: 'Structure',
        score: 2.0,
        maxScore: 2.0,
        percentage: 100,
        status: 'excellent',
        feedback: 'Logical flow.',
      },
    ],
    markLossReasons: [
      {
        id: 'mlr_os_1',
        title: 'Effective Memory Access Time (EAT) Equation Missing',
        category: 'Complexity',
        marksDeducted: 1.5,
        severity: 'critical',
        explanation: 'For a 10-mark question on demand paging, the examiner expects EAT = (1-p) * ma + p * page_fault_time.',
        examinerQuote: '"Numerical formula is required to show understanding of page fault overhead."',
        solution: 'Include the EAT formula whenever demand paging or TLB is asked.',
      },
      {
        id: 'mlr_os_2',
        title: 'Diagram of Page Fault Trapping Steps Missing',
        category: 'Diagram',
        marksDeducted: 1.0,
        severity: 'moderate',
        explanation: 'Missing visual diagram numbered 1 through 6.',
        examinerQuote: '"Standard Silberschatz 6-step diagram should be sketched."',
        solution: 'Draw the 6-step block diagram.',
      },
    ],
    improvementSteps: [
      'Include EAT formula: (1-p)*memory_access + p*fault_penalty.',
      'Draw the 6-step page fault flow.',
    ],
    yourAnswerAnalysis: {
      strengths: ['Clear explanation of valid-invalid bit', 'Correct instruction restart mention'],
      weaknesses: ['Missing mathematical formula', 'No step diagram'],
      wordCount: 65,
    },
    evaluationDate: '2026-09-08',
    evaluationTimestamp: 1788873600000,
  },
];

export const initialStudyPlan: StudyPlanItem[] = [
  {
    id: 'sp_1',
    title: 'Complexity Analysis & Proofs Practice Set',
    subject: 'Data Structures & Algorithms',
    topic: 'Asymptotic Analysis & Recurrences',
    date: '2026-09-11',
    timeAllocatedMinutes: 45,
    priority: 'High',
    category: 'Weakness Practice',
    period: 'Today',
    isCompleted: false,
  },
  {
    id: 'sp_2',
    title: 'Review Silberschatz Chapter 6 Synchronization Diagrams',
    subject: 'Operating Systems',
    topic: 'Process Synchronization',
    date: '2026-09-11',
    timeAllocatedMinutes: 30,
    priority: 'High',
    category: 'Syllabus Revision',
    period: 'Today',
    isCompleted: false,
  },
  {
    id: 'sp_3',
    title: 'Lossless-Join Decomposition 5-Question Drill',
    subject: 'Database Management Systems',
    topic: 'Normalization',
    date: '2026-09-13',
    timeAllocatedMinutes: 40,
    priority: 'Medium',
    category: 'Weakness Practice',
    period: 'This Week',
    isCompleted: false,
  },
  {
    id: 'sp_4',
    title: 'TCP vs UDP 10-Mark Answer Writing Drill',
    subject: 'Computer Networks',
    topic: 'Transport Layer',
    date: '2026-09-14',
    timeAllocatedMinutes: 35,
    priority: 'Medium',
    category: 'Weakness Practice',
    period: 'This Week',
    isCompleted: false,
  },
  {
    id: 'sp_5',
    title: 'Full Midterm Algorithms & OS Timed Mock Exam',
    subject: 'Data Structures & Algorithms',
    topic: 'All Syllabus Modules 1-3',
    date: '2026-09-18',
    timeAllocatedMinutes: 90,
    priority: 'High',
    category: 'Mock Exam',
    period: 'Upcoming',
    isCompleted: false,
  },
  {
    id: 'sp_6',
    title: 'AVL Tree Rotations & Balance Factors Revision',
    subject: 'Data Structures & Algorithms',
    topic: 'Self-Balancing Trees',
    date: '2026-09-07',
    timeAllocatedMinutes: 40,
    priority: 'Medium',
    category: 'Syllabus Revision',
    period: 'Completed',
    isCompleted: true,
  },
];

export const initialMockExams: MockExam[] = [
  {
    id: 'mock_midterm_dsa',
    title: 'DSA Midterm Scoring Simulation',
    subject: 'Data Structures & Algorithms',
    totalMarks: 50,
    durationMinutes: 60,
    status: 'not_started',
    questions: [
      {
        id: 'mq_1',
        questionText: 'Define Dynamic Programming and explain its two primary conditions: Optimal Substructure and Overlapping Subproblems. (5 Marks)',
        subject: 'Data Structures & Algorithms',
        topic: 'Dynamic Programming',
        marks: 5,
        expectedComponents: ['Definition', 'Optimal Substructure', 'Overlapping Subproblems', 'Mini Example'],
      },
      {
        id: 'mq_2',
        questionText: 'Explain the 0/1 Knapsack problem. Give the DP recurrence relation, algorithm, and derive both time and space complexity. (10 Marks)',
        subject: 'Data Structures & Algorithms',
        topic: 'Dynamic Programming',
        marks: 10,
        expectedComponents: ['Recurrence Relation', 'DP Matrix Algorithm', 'Time Complexity O(nW)', 'Auxiliary Space O(nW)', 'Exam Writing Tip'],
      },
      {
        id: 'mq_3',
        questionText: 'State Master Theorem and solve: T(n) = 3T(n/4) + n log n. (5 Marks)',
        subject: 'Data Structures & Algorithms',
        topic: 'Asymptotic Analysis',
        marks: 5,
        expectedComponents: ['Master Theorem 3 cases', 'Values of a, b, f(n)', 'Correct Case Identification', 'Final Big-O'],
      },
      {
        id: 'mq_4',
        questionText: 'Describe Dijkstra’s Algorithm for single-source shortest path. Compare its time complexity when implemented using an array vs a binary min-heap. (10 Marks)',
        subject: 'Data Structures & Algorithms',
        topic: 'Graph Algorithms',
        marks: 10,
        expectedComponents: ['Greedy Approach', 'Edge Relaxation step', 'Array O(V^2)', 'Min-Heap O((V+E) log V)', 'Negative weights limitation'],
      },
      {
        id: 'mq_5',
        questionText: 'Explain Longest Common Subsequence (LCS). Illustrate the DP table construction for strings "AGGTAB" and "GXTXAYB". Analyze complexity. (15 Marks)',
        subject: 'Data Structures & Algorithms',
        topic: 'Dynamic Programming',
        marks: 15,
        expectedComponents: ['Formal Definition', 'Recurrence Relation', 'Filled 7x7 DP Table', 'Backtracking Path', 'Time Complexity O(mn)', 'Applications'],
      },
      {
        id: 'mq_6',
        questionText: 'Differentiate between greedy method and dynamic programming with at least 4 comparison points. (5 Marks)',
        subject: 'Data Structures & Algorithms',
        topic: 'Algorithmic Paradigms',
        marks: 5,
        expectedComponents: ['Comparison Table', 'Choice Property', 'Subproblem Dependency', 'Backtracking need', 'Examples (Fractional vs 0/1 Knapsack)'],
      },
    ],
  },
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach_first_eval',
    code: 'FIRST_EVAL',
    title: 'First Evaluation',
    description: 'Submitted your first answer and received an AI Marks-Loss Breakdown.',
    icon: 'Award',
    earnedAt: '2026-09-01',
    isUnlocked: true,
    category: 'Practice',
  },
  {
    id: 'ach_7day_streak',
    code: '7DAY_STREAK',
    title: '🔥 7-Day Practice Streak',
    description: 'Maintained consistent exam preparation for 7 consecutive days.',
    icon: 'Flame',
    earnedAt: '2026-09-10',
    isUnlocked: true,
    category: 'Streak',
  },
  {
    id: 'ach_improvement',
    code: '20_PERCENT_IMPROVE',
    title: '📈 20% Score Improvement',
    description: 'Raised your average score by over 20% through targeted weakness practice.',
    icon: 'TrendingUp',
    earnedAt: '2026-09-09',
    isUnlocked: true,
    category: 'Score',
  },
  {
    id: 'ach_weakness_eliminated',
    code: 'WEAKNESS_ELIMINATED',
    title: '🧠 Weakness Mastered',
    description: 'Completed a 5-tier weakness drill and boosted topic score above 8.0/10.',
    icon: 'ShieldCheck',
    earnedAt: '2026-09-08',
    isUnlocked: true,
    category: 'Weakness',
  },
  {
    id: 'ach_25_questions',
    code: '25_QUESTIONS',
    title: '📚 25 Questions Completed',
    description: 'Attempted and submitted 25 university exam questions.',
    icon: 'BookOpen',
    earnedAt: '2026-09-05',
    isUnlocked: true,
    category: 'Practice',
  },
  {
    id: 'ach_perfect_10',
    code: 'PERFECT_10',
    title: '🎯 10/10 Score',
    description: 'Achieved a perfect 10/10 score on an advanced university-level question.',
    icon: 'Target',
    isUnlocked: false,
    category: 'Score',
  },
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif_1',
    type: 'ai_insight',
    title: '⚠️ Recurring Mark-Loss Pattern Detected',
    message: 'You omitted Complexity Analysis in 6 of your last 8 answers. ExamAce generated a 5-question targeted practice set.',
    actionLabel: 'Practice Now',
    actionHref: '/practice?weakness=wk_complexity_analysis',
    isRead: false,
    createdAt: '10 minutes ago',
    timestamp: Date.now() - 600000,
  },
  {
    id: 'notif_2',
    type: 'achievement',
    title: '🔥 Practice Streak Maintained!',
    message: 'You completed 7 consecutive days of exam preparation. Keep the momentum going for your midterm!',
    isRead: false,
    createdAt: '2 hours ago',
    timestamp: Date.now() - 7200000,
  },
  {
    id: 'notif_3',
    type: 'progress',
    title: 'Great Progress in Dynamic Programming!',
    message: 'Your Dynamic Programming score improved by 22% after completing the Tabulation vs Memoization drill.',
    isRead: true,
    createdAt: 'Yesterday',
    timestamp: Date.now() - 86400000,
  },
];
