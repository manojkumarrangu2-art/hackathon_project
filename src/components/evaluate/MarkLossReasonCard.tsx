'use client';

import React from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  XCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Quote,
  Lightbulb,
} from 'lucide-react';
import { MarkLossReason } from '../../lib/types';

interface MarkLossReasonCardProps {
  reason: MarkLossReason;
  onPractice?: () => void;
}

export function MarkLossReasonCard({ reason, onPractice }: MarkLossReasonCardProps) {
  const isCritical = reason.severity === 'critical';
  const isModerate = reason.severity === 'moderate';

  return (
    <div
      className={`rounded-2xl border p-5 transition-all backdrop-blur-xl ${
        isCritical
          ? 'border-rose-500/40 bg-rose-950/20 shadow-[0_0_20px_rgba(244,63,94,0.12)]'
          : isModerate
          ? 'border-amber-500/40 bg-amber-950/20 shadow-[0_0_20px_rgba(245,158,11,0.12)]'
          : 'border-slate-800 bg-slate-900/60'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
              isCritical
                ? 'border-rose-500/40 bg-rose-500/20 text-rose-400'
                : isModerate
                ? 'border-amber-500/40 bg-amber-500/20 text-amber-400'
                : 'border-blue-500/40 bg-blue-500/20 text-blue-400'
            }`}
          >
            {isCritical ? (
              <XCircle className="h-5 w-5" />
            ) : isModerate ? (
              <AlertTriangle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-bold text-white tracking-tight">{reason.title}</h4>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold border ${
                  isCritical
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}
              >
                -{reason.marksDeducted.toFixed(1)} Marks
              </span>
              {reason.recurringCount && reason.recurringCount >= 2 && (
                <span className="rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-semibold">
                  Recurring in {reason.recurringCount} recent answers
                </span>
              )}
            </div>

            <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
              {reason.explanation}
            </p>

            {/* Examiner Perspective Quote */}
            {reason.examinerQuote && (
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-slate-950/70 border border-slate-800/90 p-2.5 text-slate-300">
                <Quote className="h-3.5 w-3.5 shrink-0 text-indigo-400 mt-0.5" />
                <p className="text-[11px] italic font-serif leading-snug">
                  {reason.examinerQuote}
                </p>
              </div>
            )}

            {/* Actionable solution */}
            <div className="mt-3 flex items-start gap-2 text-xs text-emerald-300 font-medium">
              <Lightbulb className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
              <span>
                <strong className="text-emerald-400">Examiner Fix:</strong> {reason.solution}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
