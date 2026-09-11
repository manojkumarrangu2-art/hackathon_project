'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Flame,
  Award,
  TrendingUp,
  Target,
  Brain,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  UploadCloud,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { useExamAce } from '@/lib/store/examAceStore';
import { BiggestMarkLossCard } from '@/components/dashboard/BiggestMarkLossCard';
import { WeaknessHeatmap } from '@/components/dashboard/WeaknessHeatmap';
import { ScoreTrendChart } from '@/components/dashboard/ScoreTrendChart';
import { RecentEvaluationsList } from '@/components/dashboard/RecentEvaluationsList';
import { DocumentUploadModal } from '@/components/materials/DocumentUploadModal';

export default function DashboardPage() {
  const { user, weaknesses, evaluations, subjects } = useExamAce();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Find the primary recurring weakness
  const topWeakness = weaknesses.find((w) => w.recurringLossCount >= 4) || weaknesses[0] || null;

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome back, {user.name}
              </h1>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300 border border-emerald-500/30">
                Exam Mode Active
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              {user.degree} • Semester {user.semester} • Target Exam: Final Term
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-2.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-all shadow-sm"
            >
              <UploadCloud className="w-4 h-4 text-indigo-400" />
              <span>Upload Document</span>
            </button>

            <Link
              href="/ask"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
              <Brain className="w-4 h-4" />
              <span>Ask Marks AI</span>
            </Link>

            <Link
              href="/practice"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-all"
            >
              <span>Practice Question</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Signature BIGGEST MARK-LOSS CARD */}
        {topWeakness && <BiggestMarkLossCard weakness={topWeakness} />}

        {/* Performance Overview Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Overall AI Score</span>
              <Target className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-white">
                {user.overallEstimatedScore.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400 font-bold">/ 10</span>
            </div>
            <span className="mt-1 text-[11px] text-emerald-400 font-medium block">
              +{user.improvementPercentage}% vs baseline
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Questions Submitted</span>
              <BookOpen className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white">
                {user.totalQuestionsAttempted}
              </span>
            </div>
            <span className="mt-1 text-[11px] text-slate-400 block">
              Across 5 core subjects
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Practice Streak</span>
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-amber-400">
                {user.streakDays}
              </span>
              <span className="text-xs text-slate-400 font-semibold">days</span>
            </div>
            <span className="mt-1 text-[11px] text-amber-300 font-medium block">
              Consistent daily practice
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Target Benchmark</span>
              <Award className="w-4 h-4 text-purple-400" />
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-white">
                {user.targetScorePercentage}%
              </span>
            </div>
            <span className="mt-1 text-[11px] text-purple-300 font-medium block">
              Grade &apos;O&apos; Distinction
            </span>
          </div>
        </div>

        {/* AI Recommendations: What should you practice next? */}
        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              ExamAce AI Recommendation: What Should You Practice Next?
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">
                Master 0/1 Knapsack &amp; Matrix Chain Multiplication Time Derivations
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                Targeting your recurring gap in <strong>{user.weakestTopic}</strong> will recover up to 2.5 marks on your next university exam.
              </p>
            </div>
            <Link
              href="/practice?weakness=wk_complexity_analysis"
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-all shrink-0 shadow-sm"
            >
              <span>Start 5-Tier Drill</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Performance Graph & Weakness Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScoreTrendChart />
          <WeaknessHeatmap weaknesses={weaknesses} />
        </div>

        {/* Recent Evaluations */}
        <RecentEvaluationsList evaluations={evaluations} />

        {/* Document Upload Modal */}
        <DocumentUploadModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
        />
      </div>
    </AppShell>
  );
}
