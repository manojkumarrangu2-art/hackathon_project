export type SubjectId = 'dsa' | 'os' | 'dbms' | 'cn' | 'ml' | string;

export interface SyllabusModule {
  id: string;
  moduleNumber: number;
  title: string;
  weightageMarks: number;
  topics: string[];
}

export interface Subject {
  id: SubjectId;
  code: string;
  name: string;
  description: string;
  iconName: string;
  semester: number;
  topicsCount: number;
  completedTopics: number;
  averageScore: number; // e.g. 7.6
  color: string; // Tailwind color class or hex
  accentColor: string;
  syllabusModules: SyllabusModule[];
  activeWeaknessCount: number;
}

export interface MaterialChunk {
  id: string;
  materialId: string;
  chunkIndex: number;
  content: string;
  keywords: string[];
  tokenCount: number;
  relevanceScore?: number;
}

export interface Material {
  id: string;
  subjectId: SubjectId;
  subjectName: string;
  title: string;
  fileType: 'PDF' | 'DOCX' | 'TXT' | 'NOTES';
  uploadDate: string;
  fileSizeBytes: number;
  chunksCount: number;
  status: 'indexed' | 'processing' | 'ready';
  summary: string;
  /** Original uploaded filename used for grounding/audit display. */
  sourceFileName?: string;
  /** Number of pages when the source is a PDF, when available. */
  pageCount?: number;
  chunks: MaterialChunk[];
}

export type QuestionMarks = 2 | 5 | 10 | 15;
export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard';
export type QuestionType = 'Theory' | 'Algorithm' | 'Derivation' | 'Comparison' | 'Numerical' | 'Architecture';

export interface Question {
  id: string;
  subjectId: SubjectId;
  subjectName: string;
  topic: string;
  marks: QuestionMarks;
  questionText: string;
  difficulty: QuestionDifficulty;
  questionType: QuestionType;
  expectedComponents: string[];
  timeRecommendationMinutes: number;
  standardAnswerOutline?: string[];
}

export interface StructuredAnswerSection {
  heading: string;
  content: string;
  keyKeywords: string[];
  hasDiagram?: boolean;
  diagramAscii?: string;
  hasAlgorithm?: boolean;
  hasExample?: boolean;
  weightMarksApprox?: number;
}

export interface AnswerGenerationResult {
  id: string;
  question: string;
  subject: string;
  topic: string;
  marks: QuestionMarks;
  difficulty: QuestionDifficulty;
  answerMarkdown: string;
  structuredSections: StructuredAnswerSection[];
  examWritingTip: string;
  howToGetMoreMarks: {
    missingCommonMistakes: string[];
    highYieldKeywords: string[];
    recommendedStructure: string[];
    diagramAdvice: string;
    examinerExpectations: string[];
  };
  groundedMaterialsUsed?: string[];
}

export type RubricCategoryName =
  | 'Technical Accuracy'
  | 'Key Concepts'
  | 'Keywords'
  | 'Structure'
  | 'Relevance'
  | 'Completeness'
  | 'Diagram'
  | 'Example'
  | 'Algorithm / Steps'
  | 'Complexity';

export interface EvaluationRubricCategory {
  category: RubricCategoryName;
  score: number;
  maxScore: number;
  percentage: number;
  status: 'excellent' | 'good' | 'needs_work' | 'missing';
  feedback: string;
}

export interface MarkLossReason {
  id: string;
  title: string;
  category: string;
  marksDeducted: number;
  severity: 'critical' | 'moderate' | 'minor';
  explanation: string;
  examinerQuote: string;
  solution: string;
  recurringCount?: number;
}

export interface AnswerComparisonSegment {
  text: string;
  status: 'matched' | 'missing' | 'weak' | 'extra';
  note?: string;
}

export interface EvaluationResult {
  id: string;
  questionId?: string;
  questionText: string;
  subject: string;
  topic: string;
  marks: QuestionMarks;
  studentAnswer: string;
  recommendedAnswer: string;
  aiEstimatedScore: number;
  maxMarks: number;
  percentage: number;
  rubricBreakdown: EvaluationRubricCategory[];
  markLossReasons: MarkLossReason[];
  improvementSteps: string[];
  yourAnswerAnalysis: {
    strengths: string[];
    weaknesses: string[];
    wordCount: number;
  };
  evaluationDate: string;
  evaluationTimestamp: number;
}

export interface WeaknessProfileItem {
  id: string;
  topic: string;
  subject: string;
  weaknessTitle: string;
  category: string;
  attemptsCount: number;
  recurringLossCount: number;
  averageScore: number;
  lastDetected: string;
  severity: 'Critical' | 'Weak' | 'Moderate' | 'Mastered';
  status: 'Needs Practice' | 'In Progress' | 'Improving' | 'Resolved';
  beforeScore: number;
  afterScore?: number;
  improvementPercentage?: number;
  description: string;
  recommendedAction: string;
}

export interface PracticeQuestion {
  id: string;
  weaknessId: string;
  tier: 'Easy' | 'Medium' | 'Application' | 'Exam-style' | 'Challenge';
  questionText: string;
  marks: QuestionMarks;
  promptHint: string;
  expectedFocus: string;
  isCompleted?: boolean;
  studentAnswer?: string;
  evaluatedScore?: number;
}

export interface StudyPlanItem {
  id: string;
  title: string;
  subject: string;
  topic: string;
  date: string;
  timeAllocatedMinutes: number;
  priority: 'High' | 'Medium' | 'Low';
  category: 'Weakness Practice' | 'Syllabus Revision' | 'Mock Exam' | 'Formula Sheet';
  period: 'Today' | 'This Week' | 'Upcoming' | 'Completed';
  isCompleted: boolean;
}

export interface MockExamQuestion {
  id: string;
  questionText: string;
  subject: string;
  topic: string;
  marks: QuestionMarks;
  expectedComponents: string[];
  studentAnswer?: string;
  isMarkedForReview?: boolean;
  isAnswered?: boolean;
  evaluatedScore?: number;
  feedback?: string;
}

export interface MockExam {
  id: string;
  title: string;
  subject: string;
  totalMarks: number;
  durationMinutes: number;
  questions: MockExamQuestion[];
  status: 'not_started' | 'in_progress' | 'completed';
  totalScoreAchieved?: number;
  startedAt?: string;
  completedAt?: string;
  topicPerformance?: { topic: string; score: number; maxScore: number }[];
  mainWeaknessSummary?: string;
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  earnedAt?: string;
  isUnlocked: boolean;
  category: 'Practice' | 'Score' | 'Streak' | 'Weakness';
}

export interface AppNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'ai_insight' | 'achievement' | 'progress';
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  isRead: boolean;
  createdAt: string;
  timestamp: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  university: string;
  degree: string;
  semester: number;
  targetScorePercentage: number;
  streakDays: number;
  totalQuestionsAttempted: number;
  overallEstimatedScore: number;
  averageScore: number;
  improvementPercentage: number;
  strongestTopic: string;
  weakestTopic: string;
}

export interface AISettings {
  provider: 'gemini' | 'openai' | 'demo';
  geminiApiKey?: string;
  openaiApiKey?: string;
  selectedModel?: string;
  isConfigured: boolean;
  showVisualAgentPipeline: boolean;
  streamResponses: boolean;
}
