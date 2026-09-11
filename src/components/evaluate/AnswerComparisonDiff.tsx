'use client';

import React, { useState } from 'react';
import { Check, X, AlertTriangle, Eye, ArrowRight, Sparkles } from 'lucide-react';

interface AnswerComparisonDiffProps {
  studentAnswer: string;
  recommendedAnswer: string;
  missingKeywords?: string[];
  omittedComponents?: string[];
}

export function AnswerComparisonDiff({
  studentAnswer,
  recommendedAnswer,
  missingKeywords = [
    'Time Complexity O(n)',
    'Auxiliary Space O(1)',
    'Optimal Substructure',
    'Subproblem Tree',
    'State Transition Equation',
  ],
  omittedComponents = [
    'Big-O Asymptotic Complexity Derivation',
    'Call-Tree Architecture Diagram',
    'Space Optimization Note',
  ],
}: AnswerComparisonDiffProps) {
  const [activeTab, setActiveTab] = useState<'side-by-side' | 'missing-checklist'>('side-by-side');

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white tracking-tight">
              Answer Comparison &amp; Mark-Loss Diff
            </h3>
            <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
              Visual Auditor
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare your submission against the examiner-approved model response.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
          <button
            onClick={() => setActiveTab('side-by-side')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'side-by-side'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Side-by-Side Diff
          </button>
          <button
            onClick={() => setActiveTab('missing-checklist')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'missing-checklist'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Omission Audit ({omittedComponents.length})
          </button>
        </div>
      </div>

      {activeTab === 'side-by-side' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Student Answer with mark loss callouts */}
          <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                Your Submitted Answer
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {studentAnswer.split(/\s+/).length} words
              </span>
            </div>

            <div className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-sans bg-slate-900/40 rounded-lg p-3 border border-slate-800/50 flex-1">
              {studentAnswer}
            </div>

            <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3">
              <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block mb-1">
                Detected Deficiencies in Your Text:
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Missing Big-O time and space complexity analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>No visual subproblem call-tree or state progression</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Did not mention O(1) space optimization trick</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Recommended Answer */}
          <div className="flex flex-col rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4">
            <div className="flex items-center justify-between pb-3 border-b border-indigo-500/20 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                ExamAce Recommended Model Answer
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                10/10 Benchmark
              </span>
            </div>

            <div className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed font-sans bg-slate-950/60 rounded-lg p-3 border border-indigo-500/20 max-h-[380px] overflow-y-auto space-y-2 flex-1">
              {recommendedAnswer}
            </div>

            <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block mb-1">
                Examiner Award Criteria Present:
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Mathematical state recurrence: dp[i] = dp[i-1] + dp[i-2]</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Call-tree recursion diagram contrasting O(2^n) with O(n)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Rigorous asymptotic Big-O time and auxiliary space derivation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* Missing Checklist Tab */
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              High-Yield Keywords Audit
            </h4>
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-300"
                >
                  <X className="w-3 h-3 text-rose-400" />
                  {kw} (Missing from your response)
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Mandatory Structural Components for Full Marks
            </h4>
            <div className="space-y-2">
              {omittedComponents.map((comp, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg bg-slate-900/80 p-3 border border-slate-800 text-xs"
                >
                  <span className="font-semibold text-slate-200">{comp}</span>
                  <span className="text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    Omitted
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
