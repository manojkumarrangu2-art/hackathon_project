'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Brain,
  ArrowRight,
  User,
  Mail,
  School,
  Target,
  Sparkles,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';
import { useExamAce } from '@/lib/store/examAceStore';
import { useToast } from '@/components/toast/ToastContext';

export default function SignupPage() {
  const router = useRouter();
  const { setUser } = useExamAce();
  const toast = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [university, setUniversity] = useState('Metropolitan Institute of Technology');
  const [degree, setDegree] = useState('B.Tech in Computer Science & Engineering');
  const [semester, setSemester] = useState(6);
  const [targetScore, setTargetScore] = useState(90);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.warning('Required Fields', 'Please provide your name and university email.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setUser({
        id: `usr_${Date.now()}`,
        name,
        email,
        avatar: '',
        university,
        degree,
        semester,
        targetScorePercentage: targetScore,
        streakDays: 1,
        totalQuestionsAttempted: 0,
        overallEstimatedScore: 7.2,
        averageScore: 7.0,
        improvementPercentage: 0,
        strongestTopic: 'Fundamentals',
        weakestTopic: 'Awaiting First Answer Evaluation',
      });
      setIsLoading(false);
      toast.achievement('Account Created! 🚀', `Welcome ${name}! Initializing marks optimization profile.`);
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative selection:bg-indigo-500 selection:text-white">
      {/* Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-purple-600/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 text-white font-extrabold text-lg shadow-lg group-hover:scale-105 transition-transform">
            EA
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight">ExamAce</span>
        </Link>
        <h1 className="mt-4 text-2xl font-extrabold text-white tracking-tight">
          Create Student Account
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Personalized marks-optimization &amp; recurring weakness tracking.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          {/* Top Auth Navigation Tabs */}
          <div className="grid grid-cols-2 rounded-xl bg-slate-950 p-1 border border-slate-800">
            <Link
              href="/login"
              className="rounded-lg py-2 text-center text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-indigo-600 py-2 text-center text-xs font-bold text-white shadow-sm"
            >
              Create Account
            </Link>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

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
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create secure password"
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Current Semester
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Target Score
                </label>
                <select
                  value={targetScore}
                  onChange={(e) => setTargetScore(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value={90}>90%+ (Distinction)</option>
                  <option value={80}>80%+ (First Class)</option>
                  <option value={70}>70%+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Degree / Engineering Branch
              </label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] disabled:opacity-50 mt-2"
            >
              <span>{isLoading ? 'Creating Account...' : 'Register & Start Optimizing'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Switch to Sign in */}
          <div className="text-center pt-2 border-t border-slate-800 text-xs text-slate-400">
            <span>Already have an account? </span>
            <Link href="/login" className="font-bold text-indigo-400 hover:text-indigo-300 hover:underline">
              Sign in here →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
