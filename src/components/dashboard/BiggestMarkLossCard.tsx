'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { WeaknessProfileItem } from '../../lib/types';

interface BiggestMarkLossCardProps {
  weakness: WeaknessProfileItem | null;
}

export function BiggestMarkLossCard({ weakness }: BiggestMarkLossCardProps) {
  if (!weakness || weakness.recurringLossCount < 2) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-rose-500/40 bg-gradient-to-r from-rose-950/40 via-slate-900 to-indigo-950/40 p-6 backdrop-blur-xl shadow-2xl"
    >
      {/* Background ambient glow */}
      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400 shadow-inner">
            <ShieldAlert className="h-6 w-6 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                <AlertTriangle className="w-3 h-3 text-rose-400" />
                Biggest Mark-Loss Pattern Detected
              </span>
              <span className="text-xs text-slate-400">
                • {weakness.subject}
              </span>
            </div>

            <h2 className="mt-2 text-xl md:text-2xl font-extrabold text-white tracking-tight">
              {weakness.topic} ({weakness.category})
            </h2>

            <p className="mt-1.5 text-xs md:text-sm text-slate-300 leading-relaxed max-w-xl">
              Missing in <strong className="text-rose-400 font-semibold">{weakness.recurringLossCount} of your last {weakness.attemptsCount} answers</strong>.
              This recurring gap is costing you an estimated <span className="text-amber-300 font-semibold">1.5 – 2.5 marks</span> per theoretical question.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                Avg Score: {weakness.averageScore}/10
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                Status: {weakness.status}
              </span>
              <span className="text-[11px] text-slate-400 italic">
                {weakness.recommendedAction}
              </span>
            </div>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <Link
            href={`/practice?weakness=${weakness.id}`}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:from-rose-500 hover:to-indigo-500 transition-all group"
          >
            <Sparkles className="w-4 h-4 text-rose-200" />
            Practice This Topic
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
