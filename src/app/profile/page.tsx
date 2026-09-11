'use client';

import React from 'react';
import {
  User,
  Award,
  Flame,
  Target,
  BookOpen,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { useExamAce } from '@/lib/store/examAceStore';

export default function ProfilePage() {
  const { user, achievements } = useExamAce();

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Profile Card Banner */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 text-2xl font-extrabold text-white shadow-xl">
              {user.name.charAt(0)}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-extrabold text-white tracking-tight">
                  {user.name}
                </h1>
                <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
                  Semester {user.semester}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">{user.degree}</p>
              <p className="text-xs text-slate-400">{user.university}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Streak</span>
              <div className="flex items-center justify-center gap-1 mt-1 text-lg font-extrabold text-amber-400">
                <Flame className="w-5 h-5 text-amber-500" />
                <span>{user.streakDays}d</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Avg Score</span>
              <div className="text-lg font-extrabold text-white mt-1">
                {user.averageScore}/10
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Target</span>
              <div className="text-lg font-extrabold text-emerald-400 mt-1">
                {user.targetScorePercentage}%
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Milestone Achievements ({unlockedCount} / {achievements.length} Unlocked)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Earned through exam practice, rubric mastery, and streak consistency.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`rounded-xl border p-4 transition-all flex items-start gap-3.5 ${
                  ach.isUnlocked
                    ? 'border-indigo-500/30 bg-indigo-950/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                    : 'border-slate-800/80 bg-slate-950/40 opacity-50'
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                    ach.isUnlocked
                      ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                      : 'border-slate-800 bg-slate-900 text-slate-600'
                  }`}
                >
                  {ach.isUnlocked ? <Award className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-white tracking-tight">{ach.title}</h3>
                    {ach.isUnlocked && (
                      <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300">
                        Earned
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[11px] text-slate-300 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Targets & Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Exam Benchmark Goals
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span>Target Final CGPA / Marks:</span>
                <strong className="text-white">90% (Grade &apos;O&apos;)</strong>
              </li>
              <li className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span>Current Estimated Band:</span>
                <strong className="text-emerald-400">81.0% (Grade &apos;A+&apos;)</strong>
              </li>
              <li className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span>Weekly Practice Target:</span>
                <strong className="text-white">5 questions / subject</strong>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Agent Diagnosis Summary
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span>Strongest Domain:</span>
                <strong className="text-indigo-400">{user.strongestTopic}</strong>
              </li>
              <li className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span>Primary Learning Focus:</span>
                <strong className="text-rose-400">{user.weakestTopic}</strong>
              </li>
              <li className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span>Agent Status:</span>
                <strong className="text-emerald-400">Continuous Monitoring</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
