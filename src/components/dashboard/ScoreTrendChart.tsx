'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const trendData = [
  { session: 'Aug 24', score: 6.2, target: 8.5 },
  { session: 'Aug 28', score: 6.5, target: 8.5 },
  { session: 'Sep 01', score: 6.9, target: 8.5 },
  { session: 'Sep 04', score: 7.1, target: 8.5 },
  { session: 'Sep 07', score: 7.4, target: 8.5 },
  { session: 'Sep 09', score: 7.6, target: 8.5 },
  { session: 'Sep 11 (Today)', score: 8.1, target: 8.5 },
];

export function ScoreTrendChart() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-64 w-full rounded-2xl border border-slate-800 bg-slate-900/50 flex items-center justify-center text-xs text-slate-500">
        Loading score trajectory...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Performance &amp; Marks Trajectory
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            AI Estimated Score progression over your last 7 practice cycles.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
            <span className="h-2 w-2 rounded-full bg-indigo-500" /> Current Score
          </span>
          <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <span className="h-2 w-2 rounded-full bg-cyan-400" /> Target (8.5)
          </span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="scoreGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="session"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[4, 10]}
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              ticks={[4, 6, 8, 10]}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-xl border border-slate-700 bg-slate-950 p-3 shadow-xl text-xs">
                      <p className="font-bold text-white mb-1">{label}</p>
                      <p className="text-indigo-400 font-semibold">
                        Estimated Score: {payload[0].value} / 10
                      </p>
                      <p className="text-cyan-400 font-medium">Target: 8.5 / 10</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#scoreGlow)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
