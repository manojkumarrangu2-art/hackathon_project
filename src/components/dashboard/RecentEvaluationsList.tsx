'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ChevronRight, AlertTriangle, ArrowRight } from 'lucide-react';
import { EvaluationResult } from '../../lib/types';
import { useExamAce } from '../../lib/store/examAceStore';
import { getScoreColor } from '../../lib/utils';

interface RecentEvaluationsListProps {
  evaluations: EvaluationResult[];
}

export function RecentEvaluationsList({ evaluations }: RecentEvaluationsListProps) {
  const router = useRouter();
  const { setCurrentEvaluation } = useExamAce();

  if (!evaluations || evaluations.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center text-slate-400">
        <p className="text-xs">No evaluations recorded yet. Start practicing to generate your first audit!</p>
      </div>
    );
  }

  const handleSelectEval = (item: EvaluationResult) => {
    setCurrentEvaluation(item);
    router.push('/evaluate');
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Recent Answer Evaluations
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Detailed marks breakdown and examiner deductions.
          </p>
        </div>

        <Link
          href="/practice"
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
        >
          <span>Practice More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {evaluations.map((item) => {
          const scoreStyles = getScoreColor(item.percentage);
          const topLossReason = item.markLossReasons?.[0];

          return (
            <div
              key={item.id}
              onClick={() => handleSelectEval(item)}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border border-slate-800/80 bg-slate-950/50 p-4 hover:border-indigo-500/40 hover:bg-slate-950/80 transition-all cursor-pointer"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300 border border-slate-700">
                    {item.marks} Marks
                  </span>
                  <span className="text-xs font-semibold text-indigo-400">
                    {item.subject}
                  </span>
                  <span className="text-[11px] text-slate-500">• {item.evaluationDate}</span>
                </div>

                <h4 className="text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors line-clamp-1">
                  {item.questionText}
                </h4>

                {topLossReason && topLossReason.marksDeducted > 0 ? (
                  <p className="mt-1 text-xs text-rose-300 flex items-center gap-1.5 line-clamp-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>
                      <strong>Mark Deduction:</strong> {topLossReason.title} (-{topLossReason.marksDeducted}M)
                    </span>
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Met all primary examiner rubric criteria</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 shrink-0">
                <div className="text-right">
                  <span className={`text-base font-extrabold ${scoreStyles.text}`}>
                    {item.aiEstimatedScore.toFixed(1)} / {item.maxMarks}
                  </span>
                  <span className="text-[11px] text-slate-400 block -mt-0.5">
                    ({item.percentage}%)
                  </span>
                </div>

                <div className="rounded-lg p-2 text-slate-400 group-hover:text-white group-hover:bg-indigo-600/20 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
