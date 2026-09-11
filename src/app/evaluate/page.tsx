'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Share2,
  RotateCcw,
  BookOpen,
  Target,
  FileText,
  Lightbulb,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { useExamAce } from '@/lib/store/examAceStore';
import { ScoreIndicator } from '@/components/ui/ScoreIndicator';
import { MarkLossReasonCard } from '@/components/evaluate/MarkLossReasonCard';
import { AnswerComparisonDiff } from '@/components/evaluate/AnswerComparisonDiff';

export default function EvaluatePage() {
  const router = useRouter();
  const { currentEvaluation, weaknesses } = useExamAce();

  if (!currentEvaluation) {
    return (
      <AppShell>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center max-w-lg mx-auto my-12">
          <FileText className="w-10 h-10 text-slate-500 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-white">No Evaluation Selected</h2>
          <p className="mt-2 text-xs text-slate-400">
            Submit an answer in Practice Mode or select an evaluation from your Dashboard to view the marks audit.
          </p>
          <Link
            href="/practice"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-all"
          >
            <span>Go to Practice Mode</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AppShell>
    );
  }

  // Find if there's a primary weakness tied to this topic
  const primaryWeakness = weaknesses.find((w) => w.topic.toLowerCase().includes('complexity')) || weaknesses[0];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-bold text-indigo-300 border border-indigo-500/30">
                Evaluation Result
              </span>
              <span className="text-xs text-slate-400">
                {currentEvaluation.subject} • {currentEvaluation.evaluationDate}
              </span>
            </div>
            <h1 className="mt-2 text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {currentEvaluation.questionText}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/practice?question=${encodeURIComponent(currentEvaluation.questionText)}&marks=${currentEvaluation.marks}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Question</span>
            </Link>

            <Link
              href={`/practice?weakness=${primaryWeakness?.id || 'wk_complexity_analysis'}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 px-5 py-2 text-xs font-bold text-white hover:from-rose-500 hover:to-indigo-500 transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-200" />
              <span>Practice This Weakness</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Animated Score Indicator Gauge & Category Bars */}
        <ScoreIndicator
          score={currentEvaluation.aiEstimatedScore}
          maxMarks={currentEvaluation.maxMarks}
          rubricBreakdown={currentEvaluation.rubricBreakdown}
        />

        {/* Signature Section: WHY DID YOU LOSE MARKS? */}
        <div className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4 border-b border-rose-500/20 pb-3">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Why Did You Lose Marks?
              </h2>
              <p className="text-xs text-slate-400">
                Detailed examiner deduction breakdown identifying exact marks docked.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {currentEvaluation.markLossReasons.map((reason) => (
              <MarkLossReasonCard key={reason.id} reason={reason} />
            ))}
          </div>
        </div>

        {/* How to Improve Checklist */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4 border-b border-emerald-500/20 pb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Action Plan: How to Secure Full Marks
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentEvaluation.improvementSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-xl bg-slate-900/80 p-3.5 border border-slate-800 text-xs text-slate-200"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                  {idx + 1}
                </div>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Side-by-side Answer Comparison Diff */}
        <AnswerComparisonDiff
          studentAnswer={currentEvaluation.studentAnswer}
          recommendedAnswer={currentEvaluation.recommendedAnswer}
        />

        {/* Bottom CTA for Closed-Loop Learning */}
        <div className="rounded-2xl border border-indigo-500/40 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-purple-950/40 p-6 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Don&apos;t Let This Mark Loss Repeat on Your Exam
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              ExamAce has constructed an adaptive 5-question practice set based on your missing complexity and diagram traits.
            </p>
          </div>

          <Link
            href={`/practice?weakness=${primaryWeakness?.id || 'wk_complexity_analysis'}`}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] shrink-0"
          >
            <Sparkles className="w-4 h-4 text-indigo-200" />
            <span>Practice This Weakness Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
