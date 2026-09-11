'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Brain,
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { useExamAce } from '@/lib/store/examAceStore';
import { useToast } from '@/components/toast/ToastContext';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useExamAce();
  const toast = useToast();

  const [email, setEmail] = useState('alex.chen@university.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setUser({
        id: 'usr_alex_chen',
        name: 'Alex Chen',
        email: email || 'alex.chen@university.edu',
        avatar: '',
        university: 'Metropolitan Institute of Technology',
        degree: 'B.Tech in Computer Science & Engineering',
        semester: 6,
        targetScorePercentage: 90,
        streakDays: 7,
        totalQuestionsAttempted: 34,
        overallEstimatedScore: 7.8,
        averageScore: 7.6,
        improvementPercentage: 18.5,
        strongestTopic: 'Binary Search Trees & Graphs',
        weakestTopic: 'Complexity Analysis & Mathematical Proofs',
      });
      setIsLoading(false);
      toast.success('Welcome Back, Alex!', 'Session authenticated. Directing to Student Dashboard...');
      router.push('/dashboard');
    }, 600);
  };

  const handleQuickDemoLogin = (name: string, role: string, score: number, streak: number) => {
    setIsLoading(true);
    setUser({
      id: `usr_${name.toLowerCase().replace(/\s+/g, '_')}`,
      name,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@university.edu`,
      avatar: '',
      university: 'Metropolitan Institute of Technology',
      degree: role,
      semester: 6,
      targetScorePercentage: 92,
      streakDays: streak,
      totalQuestionsAttempted: 34,
      overallEstimatedScore: score,
      averageScore: score - 0.2,
      improvementPercentage: 21.4,
      strongestTopic: 'Algorithmic Paradigms',
      weakestTopic: 'Complexity Analysis',
    });

    toast.success(`Logged in as ${name}`, 'Instant Demo profile loaded for evaluation.');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative selection:bg-indigo-500 selection:text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 text-white font-extrabold text-lg shadow-lg group-hover:scale-105 transition-transform">
            EA
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight">ExamAce</span>
        </Link>
        <h1 className="mt-4 text-2xl font-extrabold text-white tracking-tight">
          Sign In to ExamAce
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Access marks optimization, evaluator feedback, and your weakness profile.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          {/* Top Auth Navigation Tabs */}
          <div className="grid grid-cols-2 rounded-xl bg-slate-950 p-1 border border-slate-800">
            <Link
              href="/login"
              className="rounded-lg bg-indigo-600 py-2 text-center text-xs font-bold text-white shadow-sm"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-lg py-2 text-center text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Create Account
            </Link>
          </div>

          {/* 1-Click Instant Demo Profiles */}
          <div className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                1-Click Judge &amp; Mentor Access
              </span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded">
                Instant
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Alex Chen', 'B.Tech CS (3rd Year)', 7.8, 7)}
                className="rounded-xl border border-amber-500/30 bg-slate-950/80 p-2.5 text-left hover:border-amber-400 hover:bg-slate-950 transition-all group"
              >
                <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors block">
                  Alex Chen
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  CS 3rd Year • 7.8/10
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Priya Sharma', 'AI & Systems Major', 8.4, 12)}
                className="rounded-xl border border-amber-500/30 bg-slate-950/80 p-2.5 text-left hover:border-amber-400 hover:bg-slate-950 transition-all group"
              >
                <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors block">
                  Priya Sharma
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  AI Major • 8.4/10
                </span>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-[10px] text-slate-500 uppercase font-bold tracking-wider absolute">
              Or Sign In with Email
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                University Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <span className="text-[11px] text-indigo-400 hover:underline cursor-pointer">
                  Forgot?
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] disabled:opacity-50 mt-2"
            >
              <span>{isLoading ? 'Signing In...' : 'Sign In to Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Switch to Signup */}
          <div className="text-center pt-2 border-t border-slate-800 text-xs text-slate-400">
            <span>New to ExamAce? </span>
            <Link href="/register" className="font-bold text-indigo-400 hover:text-indigo-300 hover:underline">
              Create a free student profile →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
