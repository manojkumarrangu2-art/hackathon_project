'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Target,
  Award,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
} from 'recharts';
import { AppShell } from '@/components/layout/AppShell';
import { useExamAce } from '@/lib/store/examAceStore';

const scoreTrendsData = [
  { date: 'Aug 24', score: 6.2, average: 6.0 },
  { date: 'Aug 28', score: 6.5, average: 6.2 },
  { date: 'Sep 01', score: 6.9, average: 6.4 },
  { date: 'Sep 04', score: 7.1, average: 6.6 },
  { date: 'Sep 07', score: 7.4, average: 6.8 },
  { date: 'Sep 09', score: 7.6, average: 7.0 },
  { date: 'Sep 11', score: 8.1, average: 7.2 },
];

const topicPerformanceData = [
  { topic: 'Trees & Heaps', score: 8.8, nationalAvg: 7.2 },
  { topic: 'Graphs (Dijkstra)', score: 8.2, nationalAvg: 6.8 },
  { topic: 'Dynamic Programming', score: 7.4, nationalAvg: 6.4 },
  { topic: 'OS Synchronization', score: 7.9, nationalAvg: 6.9 },
  { topic: 'DBMS Normalization', score: 8.1, nationalAvg: 7.0 },
  { topic: 'Complexity Proofs', score: 5.8, nationalAvg: 5.5 },
];

const marksDistributionData = [
  { marks: '2 Marks', studentAvg: 90, examinerBenchmark: 85 },
  { marks: '5 Marks', studentAvg: 82, examinerBenchmark: 78 },
  { marks: '10 Marks', studentAvg: 74, examinerBenchmark: 70 },
  { marks: '15 Marks', studentAvg: 68, examinerBenchmark: 65 },
];

const weaknessFrequencyData = [
  { name: 'Complexity Omission', count: 6, fill: '#f43f5e' },
  { name: 'Diagram Missing', count: 4, fill: '#fbbf24' },
  { name: 'Short Example', count: 3, fill: '#6366f1' },
  { name: 'Keyword Omission', count: 2, fill: '#38bdf8' },
  { name: 'Lossless Proof Step', count: 2, fill: '#a855f7' },
];

export default function AnalyticsPage() {
  const { user, weaknesses } = useExamAce();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('All');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <BarChart3 className="h-7 w-7 text-indigo-400" />
                Performance Analytics &amp; Mastery
              </h1>
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
                Exam-Ready Metrics
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Correlating student answer data against university examiner benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white focus:outline-none"
            >
              <option value="All">All Subjects</option>
              <option value="dsa">Data Structures &amp; Algorithms</option>
              <option value="os">Operating Systems</option>
              <option value="dbms">DBMS</option>
              <option value="cn">Computer Networks</option>
            </select>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">
              Estimated Exam Grade
            </span>
            <div className="mt-2 text-3xl font-extrabold text-white">8.1 / 10</div>
            <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">
              +18.5% improvement trend
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">
              Strongest Topic
            </span>
            <div className="mt-2 text-base font-bold text-indigo-300 truncate">
              {user.strongestTopic}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">8.8/10 average score</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">
              Critical Weakness
            </span>
            <div className="mt-2 text-base font-bold text-rose-300 truncate">
              Complexity Analysis
            </div>
            <span className="text-[11px] text-rose-400 mt-1 block">6 recurring deductions</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">
              Targeted Drill Gain
            </span>
            <div className="mt-2 text-3xl font-extrabold text-emerald-400">+55.7%</div>
            <span className="text-[11px] text-emerald-300 mt-1 block">Post-drill recovery</span>
          </div>
        </div>

        {isMounted ? (
          <div className="space-y-8">
            {/* Chart 1: Score Trajectory Area Chart */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Historical Score Trajectory vs Peer Average
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Measured score progression over successive evaluation cycles.
                  </p>
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={scoreTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="scoreArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis domain={[4, 10]} stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-xl border border-slate-700 bg-slate-950 p-3 shadow-xl text-xs">
                              <p className="font-bold text-white mb-1">{label}</p>
                              <p className="text-indigo-400 font-semibold">Your Score: {payload[0].value}/10</p>
                              <p className="text-slate-400">Class Average: {payload[1]?.value}/10</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fill="url(#scoreArea)" />
                    <Area type="monotone" dataKey="average" stroke="#64748b" strokeWidth={2} strokeDasharray="4 4" fill="transparent" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2 & 3: Topic Performance & Weakness Frequency */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Topic Performance Bar Chart */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl">
                <h3 className="text-base font-bold text-white tracking-tight mb-1">
                  Topic Scoring vs University Examiner Average
                </h3>
                <p className="text-xs text-slate-400 mb-5">
                  Comparison against university distinction thresholds.
                </p>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topicPerformanceData} layout="vertical" margin={{ top: 5, right: 15, left: 35, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                      <XAxis type="number" domain={[0, 10]} stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis type="category" dataKey="topic" stroke="#cbd5e1" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#6366f1" radius={[0, 4, 4, 0]} name="Your Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Weakness Frequency Breakdown */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl">
                <h3 className="text-base font-bold text-white tracking-tight mb-1">
                  Recurring Mark-Loss Frequency Breakdown
                </h3>
                <p className="text-xs text-slate-400 mb-5">
                  Number of times specific criteria were docked across your submitted answers.
                </p>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weaknessFrequencyData} margin={{ top: 5, right: 10, left: -20, bottom: 25 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="name" stroke="#cbd5e1" fontSize={10} angle={-25} textAnchor="end" tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Bar dataKey="count" name="Times Deducted" radius={[4, 4, 0, 0]}>
                        {weaknessFrequencyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Chart 4: Marks Allocation Scoring Efficiency */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl">
              <h3 className="text-base font-bold text-white tracking-tight mb-1">
                Marks Allocation Efficiency (2M vs 5M vs 10M vs 15M)
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Notice how scores decrease on higher-mark questions where diagrams and complexity analysis are expected.
              </p>

              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marksDistributionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="marks" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 100]} stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} unit="%" />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="studentAvg" fill="#38bdf8" name="Your Scoring %" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="examinerBenchmark" fill="#475569" name="Examiner Benchmark %" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-64 rounded-2xl border border-slate-800 bg-slate-900/50 flex items-center justify-center text-xs text-slate-500">
            Loading interactive analytics...
          </div>
        )}
      </div>
    </AppShell>
  );
}
