'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import { EvaluationRubricCategory } from '../../lib/types';
import { getScoreColor } from '../../lib/utils';

interface ScoreIndicatorProps {
  score: number;
  maxMarks: number;
  rubricBreakdown?: EvaluationRubricCategory[];
  showRubricBars?: boolean;
}

export function ScoreIndicator({
  score,
  maxMarks,
  rubricBreakdown = [],
  showRubricBars = true,
}: ScoreIndicatorProps) {
  const percentage = Math.round((score / maxMarks) * 100);
  const colors = getScoreColor(percentage);

  // SVG circular dimensions
  const size = 150;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Circular Animated Score */}
        <div className="flex items-center gap-6">
          <div className="relative flex items-center justify-center">
            <svg width={size} height={size} className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className="stroke-slate-800"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Animated Progress Circle */}
              <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className={colors.ring}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Centered Score Number */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">
                Score
              </span>
              <div className="flex items-baseline gap-0.5">
                <motion.span
                  className="text-3xl font-extrabold text-white tracking-tight"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {score.toFixed(1)}
                </motion.span>
                <span className="text-sm font-semibold text-slate-400">/{maxMarks}</span>
              </div>
              <span className={`text-xs font-bold ${colors.text} mt-0.5`}>
                {percentage}%
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                AI Estimated Score
              </span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-white tracking-tight">
              {percentage >= 80
                ? 'Exam-Ready Response'
                : percentage >= 60
                ? 'Good Foundation, Mark-Loss Detected'
                : 'Substantial Mark Deduction Traps'}
            </h3>
            <p className="mt-1 text-xs text-slate-300 max-w-sm">
              {percentage >= 80
                ? 'Excellent structure and key terminology. Minor polish will secure top-band marks.'
                : percentage >= 60
                ? 'Strong understanding, but you missed critical examiner criteria like complexity or diagrams.'
                : 'Core concepts are present but major academic components were omitted.'}
            </p>

            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <Info className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>This is an AI-generated estimate and not an official examiner score.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Level Analysis Breakdown */}
      {showRubricBars && rubricBreakdown.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Category-Level Rubric Breakdown
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {rubricBreakdown.map((item, idx) => {
              const catColor = getScoreColor(item.percentage);
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-3 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-200">{item.category}</span>
                    <span className="font-mono text-xs font-bold text-slate-300">
                      {item.score.toFixed(1)} / {item.maxScore.toFixed(1)} ({item.percentage}%)
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-2">
                    <motion.div
                      className={`h-full ${
                        item.percentage >= 80
                          ? 'bg-emerald-400'
                          : item.percentage >= 60
                          ? 'bg-amber-400'
                          : 'bg-rose-400'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.1 * idx }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-1">{item.feedback}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
