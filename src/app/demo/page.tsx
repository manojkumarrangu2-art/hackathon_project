'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Check,
  AlertTriangle,
  RotateCcw,
  Target,
  Brain,
  Award,
  Zap,
  Play,
  TrendingUp,
  FileText,
  ShieldAlert,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { AIProcessingPipeline } from '@/components/ui/AIProcessingPipeline';
import { ScoreIndicator } from '@/components/ui/ScoreIndicator';
import { MarkLossReasonCard } from '@/components/evaluate/MarkLossReasonCard';
import { AnswerComparisonDiff } from '@/components/evaluate/AnswerComparisonDiff';
import { BiggestMarkLossCard } from '@/components/dashboard/BiggestMarkLossCard';
import { useExamAce } from '@/lib/store/examAceStore';
import { useToast } from '@/components/toast/ToastContext';

export default function DemoPage() {
  const { weaknesses, practiceQuestions, completePracticeQuestion } = useExamAce();
  const toast = useToast();

  // Guided demo steps
  // Step 0: Welcome & Overview
  // Step 1: Question Analysis & Marks Allocation (10 Marks DP)
  // Step 2: Generated Exam-Oriented Model Answer
  // Step 3: Student Submits Flawed Answer (Missing Complexity & Diagram)
  // Step 4: AI Evaluation: 7.0/10 Score & "Why Did You Lose Marks?"
  // Step 5: Autonomous Agent: Recurring Weakness Detection Triggered
  // Step 6: 5-Tier Targeted Practice Set Generated
  // Step 7: Practice Completion & Measured Improvement (+55.7%)
  const [currentStep, setCurrentStep] = useState(0);
  const [isSimulatingAI, setIsSimulatingAI] = useState(false);
  const [pipelineIndex, setPipelineIndex] = useState(0);

  const stepsList = [
    { title: 'Overview', label: '1. Judge Flow' },
    { title: 'Question', label: '2. 10M Question' },
    { title: 'Model Answer', label: '3. Marks Structure' },
    { title: 'Student Attempt', label: '4. Flawed Answer' },
    { title: 'Evaluation', label: '5. 7/10 & Mark Loss' },
    { title: 'Recurring Agent', label: '6. Weakness Alert' },
    { title: 'Targeted Practice', label: '7. 5-Tier Drill' },
    { title: 'Measurable Gain', label: '8. +55.7% Proof' },
  ];

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Simulate live AI pipeline
      setIsSimulatingAI(true);
      setPipelineIndex(0);
      const timer = setInterval(() => {
        setPipelineIndex((p) => {
          if (p < 5) return p + 1;
          clearInterval(timer);
          return p;
        });
      }, 350);

      setTimeout(() => {
        clearInterval(timer);
        setIsSimulatingAI(false);
        setCurrentStep(2);
      }, 2100);
      return;
    }

    if (currentStep === 3) {
      setIsSimulatingAI(true);
      setPipelineIndex(0);
      const timer = setInterval(() => {
        setPipelineIndex((p) => {
          if (p < 5) return p + 1;
          clearInterval(timer);
          return p;
        });
      }, 350);

      setTimeout(() => {
        clearInterval(timer);
        setIsSimulatingAI(false);
        setCurrentStep(4);
        toast.aiInsight(
          'Recurring Weakness Pattern Detected',
          'Complexity Analysis has been missing in 6 of your last 8 answers.'
        );
      }, 2100);
      return;
    }

    if (currentStep < stepsList.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const topWeakness = weaknesses[0];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Judge Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/40">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                Hackathon Judge Guided Walkthrough
              </span>
              <span className="text-xs text-slate-400">Zero Signup Required</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ExamAce Closed-Loop Agent Demonstration
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Demonstrating the signature loop: <strong>Evaluate → Explain Mark-Loss → Act Automatically → Measure Improvement</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentStep(0)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Flow</span>
            </button>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-colors"
            >
              <span>Exit to Live App</span>
            </Link>
          </div>
        </div>

        {/* Step Indicator Tracker Bar */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {stepsList.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl text-center border transition-all ${
                currentStep === idx
                  ? 'border-indigo-500 bg-indigo-600/20 text-white shadow-[0_0_15px_rgba(99,102,241,0.25)]'
                  : currentStep > idx
                  ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                  : 'border-slate-800 bg-slate-950 text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className="text-[10px] font-bold uppercase">{step.label}</span>
              <span className="text-[11px] font-medium truncate w-full">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Interactive Step Container */}
        <div className="min-h-[420px]">
          {/* STEP 0: OVERVIEW */}
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur-xl shadow-xl space-y-6"
            >
              <div className="max-w-2xl">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                  Welcome Judges &amp; Mentors
                </span>
                <h2 className="mt-2 text-2xl font-extrabold text-white">
                  Why ExamAce is Not Just Another AI Chatbot
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Generic LLMs answer questions generically without knowing exam marks. A 2-mark answer looks the same as a 10-mark answer. Students study hard but still lose marks because they omit complexity analysis, skip diagrams, and don&apos;t know examiner rubrics.
                </p>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong>ExamAce is an autonomous learning loop:</strong> it benchmarks questions against marks, audits submissions, identifies why marks were lost, alerts students of recurring weakness traps, and generates targeted drills that boost performance.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4">
                  <Target className="w-5 h-5 text-indigo-400 mb-2" />
                  <h3 className="text-xs font-bold text-white uppercase">1. Marks-Aware Depth</h3>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Dynamically scales depth for 2, 5, 10, or 15 marks with exact examiner rubrics.
                  </p>
                </div>

                <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4">
                  <ShieldAlert className="w-5 h-5 text-rose-400 mb-2" />
                  <h3 className="text-xs font-bold text-white uppercase">2. Mark-Loss Diagnostics</h3>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Signature &ldquo;Why Did You Lose Marks?&rdquo; explains exact deductions (-1.5M Complexity).
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                  <TrendingUp className="w-5 h-5 text-emerald-400 mb-2" />
                  <h3 className="text-xs font-bold text-white uppercase">3. Closed-Loop Growth</h3>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Autonomous weakness detection triggers targeted practice with verified +55.7% score gains.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 1: QUESTION INPUT */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur-xl shadow-xl space-y-6"
            >
              <div>
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase">
                  Step 1 • Question Specification
                </span>
                <h2 className="mt-2 text-xl sm:text-2xl font-bold text-white">
                  University Exam Question: 10 Marks Allocation
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Observe how ExamAce recognizes the subject, topic, and 10-mark examiner rubric requirements.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-950 p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
                    10 Marks
                  </span>
                  <span className="text-xs font-semibold text-slate-300">
                    Subject: Data Structures &amp; Algorithms (CS301)
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  &ldquo;Explain Dynamic Programming with an example and state its time complexity.&rdquo;
                </h3>
              </div>

              {isSimulatingAI ? (
                <AIProcessingPipeline
                  currentStepIndex={pipelineIndex}
                  title="ExamAce Agent Analyzing 10-Mark Rubric"
                  subtitle="Grounding against university syllabus notes and examiner marking scheme"
                />
              ) : (
                <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-indigo-400">Examiner Expectation:</strong> For a 10-mark algorithm question, examiners allocate marks for: (1) Definition (2M), (2) Optimal Substructure &amp; Overlapping Subproblems (2M), (3) Tabulation Algorithm (2M), (4) Recursion Call Tree (2M), and (5) Big-O Time &amp; Auxiliary Space (2M).
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 2: MODEL ANSWER */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur-xl shadow-xl space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                    Step 2 • Marks-Aware Model Structure
                  </span>
                  <h2 className="mt-1 text-xl sm:text-2xl font-bold text-white">
                    Generated Model Response (Full 10/10 Rubric)
                  </h2>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                  10/10 Benchmark
                </span>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 text-xs text-slate-200 space-y-4 max-h-72 overflow-y-auto font-sans leading-relaxed">
                <div>
                  <h4 className="font-bold text-white text-sm">1. Formal Definition &amp; Core Properties</h4>
                  <p className="mt-1 text-slate-300">
                    Dynamic Programming (DP) solves problems by caching solutions to overlapping subproblems exhibiting optimal substructure.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">2. Recurrence Relation &amp; Algorithm</h4>
                  <p className="mt-1 font-mono text-indigo-300">dp[i] = dp[i-1] + dp[i-2] (Base: dp[0]=0, dp[1]=1)</p>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">3. Visual Subproblem Tree &amp; State Progression</h4>
                  <pre className="mt-1 bg-slate-900 p-2.5 rounded border border-slate-800 text-[11px] text-cyan-300 font-mono">
{`fib(5) -> fib(4) + fib(3) [Overlapping Redundancy in O(2^n)]
Table: [ 0 | 1 | 1 | 2 | 3 | 5 ] -> Evaluated linearly in O(n)`}
                  </pre>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">4. Rigorous Big-O Complexity</h4>
                  <p className="mt-1 text-slate-300">
                    Time Complexity: O(n). Auxiliary Space: O(n) array, optimizable to O(1) space with 2 variables.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: STUDENT FLAWED ATTEMPT */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur-xl shadow-xl space-y-6"
            >
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                  Step 3 • Student Practice Attempt
                </span>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold text-white">
                  Student Submits a Typical Flawed Response
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Notice: The student explains the code and properties correctly, but completely omits Big-O complexity and call-tree diagrams!
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-950 p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Student Response (118 words):
                </span>
                <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-sans bg-slate-900/50 p-4 rounded-lg border border-slate-800">
{`Dynamic programming is an algorithmic technique used to solve problems by breaking them into subproblems. It stores the results of subproblems so we don't have to recompute them.

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
This is much faster than recursion.`}
                </div>
              </div>

              {isSimulatingAI ? (
                <AIProcessingPipeline
                  currentStepIndex={pipelineIndex}
                  title="ExamAce Evaluating Student Submission"
                  subtitle="Detecting missing criteria: Complexity and Diagram audits active"
                />
              ) : (
                <p className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                  Click <strong>&ldquo;Run AI Evaluation&rdquo;</strong> to see how ExamAce flags the exact mark deductions.
                </p>
              )}
            </motion.div>
          )}

          {/* STEP 4: AI EVALUATION: 7/10 & WHY DID YOU LOSE MARKS? */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <ScoreIndicator
                score={7.0}
                maxMarks={10}
                rubricBreakdown={[
                  {
                    category: 'Technical Accuracy',
                    score: 1.8,
                    maxScore: 2.0,
                    percentage: 90,
                    status: 'excellent',
                    feedback: 'Correct definitions and working code.',
                  },
                  {
                    category: 'Complexity',
                    score: 0.5,
                    maxScore: 2.0,
                    percentage: 25,
                    status: 'missing',
                    feedback: 'Time and space Big-O analysis completely omitted!',
                  },
                  {
                    category: 'Diagram',
                    score: 0.6,
                    maxScore: 1.5,
                    percentage: 40,
                    status: 'needs_work',
                    feedback: 'No subproblem recursion call tree or array state diagram.',
                  },
                  {
                    category: 'Structure',
                    score: 1.3,
                    maxScore: 1.5,
                    percentage: 86,
                    status: 'good',
                    feedback: 'Clean formatting.',
                  },
                ]}
              />

              {/* Signature Why Did You Lose Marks? */}
              <div className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-6 backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-4 border-b border-rose-500/20 pb-3">
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Why Did You Lose Marks? (Score: 7.0 / 10)
                  </h3>
                </div>

                <div className="space-y-4">
                  <MarkLossReasonCard
                    reason={{
                      id: 'demo_loss_1',
                      title: 'Complexity Analysis Missing',
                      category: 'Complexity',
                      marksDeducted: 1.5,
                      severity: 'critical',
                      explanation:
                        'You explained the algorithmic logic correctly but omitted the time complexity (O(n)) and auxiliary space complexity. For a 10-mark answer, examiners allocate 1.5 marks explicitly for asymptotic derivation.',
                      examinerQuote:
                        '"An algorithm answer without time and space complexity cannot receive an A grade."',
                      solution:
                        'Append explicit Big-O derivations for time and space with 1 sentence explaining why.',
                      recurringCount: 6,
                    }}
                  />

                  <MarkLossReasonCard
                    reason={{
                      id: 'demo_loss_2',
                      title: 'Subproblem Tree / State Progression Diagram Missing',
                      category: 'Diagram',
                      marksDeducted: 1.0,
                      severity: 'moderate',
                      explanation:
                        'University examiners allocate 1.0 to 1.5 marks for a visual representation contrasting naive recursive branching with the DP table.',
                      examinerQuote:
                        '"Draw the fib(4) -> fib(3) call tree to visually prove overlapping subproblems."',
                      solution:
                        'Draw a quick block diagram or recursion tree contrasting naive branching with the DP table.',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: AUTONOMOUS AGENT RECURRING WEAKNESS ALERT */}
          {currentStep === 5 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-rose-400 font-bold uppercase">
                  Step 5 • Autonomous Agent Intelligence
                </span>
                <h2 className="mt-1 text-2xl font-bold text-white">
                  Recurring Weakness Detection Engine Triggers
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  ExamAce doesn&apos;t just evaluate one answer—it correlates past answers across your history.
                </p>
              </div>

              {topWeakness && <BiggestMarkLossCard weakness={topWeakness} />}

              <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-6 backdrop-blur-xl space-y-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-base font-bold text-white">
                    Agent Action Taken Automatically:
                  </h3>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Updated Weakness Profile: <strong>Complexity Analysis Omission (Critical Severity)</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Flagged pattern: <strong>Complexity missing in 6 of your last 8 answers</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>Synthesized a tailored <strong>5-tier practice drill</strong> to eliminate this specific gap</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* STEP 6: 5-TIER TARGETED PRACTICE */}
          {currentStep === 6 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur-xl shadow-xl space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                    Step 6 • Targeted Practice Generation
                  </span>
                  <h2 className="mt-1 text-2xl font-bold text-white">
                    Targeted Practice Set: Complexity Analysis
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Graduated difficulty curve designed to rebuild student mastery from fundamentals to university exam level.
                  </p>
                </div>
                <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
                  5 Tier Progression
                </span>
              </div>

              <div className="space-y-3">
                {practiceQuestions.map((pq, idx) => (
                  <div
                    key={pq.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-slate-700">
                          Tier {idx + 1}: {pq.tier}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {pq.marks} Marks
                        </span>
                        {pq.isCompleted && (
                          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Completed ({pq.evaluatedScore}/{pq.marks})
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-white">{pq.questionText}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 italic">
                        Examiner Focus: {pq.expectedFocus}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        completePracticeQuestion(pq.id, 'Sample answer with Big-O complexity analysis O(n)', pq.marks);
                        toast.success('Question Completed', `Tier ${idx + 1} marked as completed!`);
                      }}
                      className="rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors shrink-0"
                    >
                      {pq.isCompleted ? 'Re-Practice' : 'Complete Drill'}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 7: MEASURABLE GAIN PROOF */}
          {currentStep === 7 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-indigo-950/30 p-8 backdrop-blur-xl shadow-2xl space-y-6"
            >
              <div className="text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-1.5 text-xs font-bold text-emerald-300 border border-emerald-500/30 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Closed-Loop Agent Goal Achieved</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Measurable Score Improvement Verified!
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-300">
                  After completing targeted complexity analysis drills, student re-evaluation demonstrates a significant leap in scoring efficiency.
                </p>
              </div>

              {/* Before vs After Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
                <div className="rounded-2xl border border-rose-500/30 bg-slate-950/80 p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                    Initial Average Score
                  </span>
                  <div className="mt-2 text-3xl font-extrabold text-rose-300">5.2 / 10</div>
                  <p className="mt-1 text-[11px] text-slate-400">Repeated complexity omissions</p>
                </div>

                <div className="rounded-2xl border border-emerald-500/30 bg-slate-950/80 p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Score After Practice
                  </span>
                  <div className="mt-2 text-3xl font-extrabold text-emerald-300">8.1 / 10</div>
                  <p className="mt-1 text-[11px] text-slate-400">Big-O &amp; diagram criteria satisfied</p>
                </div>

                <div className="rounded-2xl border border-indigo-500/30 bg-slate-950/80 p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    Net Improvement
                  </span>
                  <div className="mt-2 text-3xl font-extrabold text-indigo-300">+55.7%</div>
                  <p className="mt-1 text-[11px] text-emerald-400 font-semibold">Weakness Mastered 🧠</p>
                </div>
              </div>

              <div className="text-center pt-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                >
                  <span>Explore Full Student Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-6">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 0}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors disabled:opacity-40"
          >
            Previous Step
          </button>

          <span className="text-xs font-mono text-slate-400 font-semibold">
            Step {currentStep + 1} of {stepsList.length}
          </span>

          <button
            onClick={handleNextStep}
            disabled={currentStep === stepsList.length - 1}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-5 py-2 text-xs font-bold text-white hover:from-indigo-500 hover:to-cyan-500 transition-all shadow-md disabled:opacity-40"
          >
            <span>{currentStep === 1 || currentStep === 3 ? 'Run AI Step' : 'Next Step'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
