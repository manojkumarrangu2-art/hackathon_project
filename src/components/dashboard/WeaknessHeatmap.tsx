'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowRight, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { WeaknessProfileItem } from '../../lib/types';

interface WeaknessHeatmapProps {
  weaknesses: WeaknessProfileItem[];
}

export function WeaknessHeatmap({ weaknesses }: WeaknessHeatmapProps) {
  // Group by severity
  const critical = weaknesses.filter((w) => w.severity === 'Critical');
  const weak = weaknesses.filter((w) => w.severity === 'Weak');
  const moderate = weaknesses.filter((w) => w.severity === 'Moderate');
  const mastered = weaknesses.filter((w) => w.severity === 'Mastered');

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            Weakness Heatmap &amp; Mark-Loss Radar
            <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
              Agent Monitored
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time classification based on your recent evaluation and exam attempts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px]">
          <span className="flex items-center gap-1 text-rose-400 font-medium">
            <span className="h-2 w-2 rounded-full bg-rose-500" /> Critical
          </span>
          <span className="flex items-center gap-1 text-amber-400 font-medium">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> Weak
          </span>
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Mastered
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {weaknesses.map((item) => {
          const isCritical = item.severity === 'Critical';
          const isWeak = item.severity === 'Weak';

          return (
            <div
              key={item.id}
              className={`rounded-xl border p-4 transition-all flex flex-col justify-between ${
                isCritical
                  ? 'border-rose-500/40 bg-rose-950/20 hover:border-rose-500/60'
                  : isWeak
                  ? 'border-amber-500/40 bg-amber-950/20 hover:border-amber-500/60'
                  : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 truncate">
                    {item.subject}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-extrabold border ${
                      isCritical
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : isWeak
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {item.severity}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white tracking-tight">{item.topic}</h4>
                <p className="mt-1 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-mono">
                  <span className="text-slate-400">Score:</span>
                  <span className="font-bold text-white">{item.averageScore}/10</span>
                  {item.improvementPercentage !== undefined && (
                    <span className="text-emerald-400 font-bold ml-1">
                      +{item.improvementPercentage}%
                    </span>
                  )}
                </div>

                <Link
                  href={`/practice?weakness=${item.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 group"
                >
                  <span>Practice</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
