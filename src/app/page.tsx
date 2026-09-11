'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Brain,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Target,
  BarChart3,
  BookOpen,
  Cpu,
  Layers,
  Award,
  Zap,
  Check,
  X,
  Code,
  FileText,
  HelpCircle,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function LandingPage() {
  const agentLoopSteps = [
    { title: 'STUDY', desc: 'Read syllabus & textbook notes' },
    { title: 'ASK QUESTION', desc: 'Select marks: 2M, 5M, 10M, 15M' },
    { title: 'UNDERSTAND', desc: 'Classify topic & examiner criteria' },
    { title: 'GENERATE ANSWER', desc: 'Synthesize marks-aware outline & diagram' },
    { title: 'PRACTICE', desc: 'Write & submit your response' },
    { title: 'EVALUATE', desc: 'Rubric scoring & mark-loss diagnosis' },
    { title: 'DETECT WEAKNESS', desc: 'Detect recurring omission patterns' },
    { title: 'TARGETED DRILL', desc: 'Auto-generate 5-tier practice set' },
    { title: 'RE-EVALUATE', desc: 'Verify score jump from 5.8 to 8.5/10' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        {/* Ambient atmospheric gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-cyan-500/20 blur-[130px] pointer-events-none" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.2)] mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Marks Optimization &amp; Exam Preparation Agent</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight"
          >
            ExamAce
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent"
          >
            Don&apos;t just study. Learn how to score.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            An AI marks-optimization agent that understands exam questions, generates marks-aware answers, evaluates your responses, identifies recurring weaknesses, and trains you to stop losing marks.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(79,70,229,0.4)] hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Start Preparing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-6 py-3.5 text-sm font-bold text-amber-300 hover:bg-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(245,158,11,0.15)]"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>Try Live Demo (Judge Walkthrough)</span>
            </Link>
          </motion.div>

          {/* Quick Login / Register Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400"
          >
            <span>Have an account?</span>
            <Link href="/login" className="font-bold text-indigo-400 hover:text-indigo-300 hover:underline">
              Sign In
            </Link>
            <span>•</span>
            <Link href="/register" className="font-bold text-purple-400 hover:text-purple-300 hover:underline">
              Register New Student
            </Link>
          </motion.div>

          {/* USP Quote Callout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 inline-block rounded-2xl border border-slate-800 bg-slate-900/60 p-4 max-w-2xl backdrop-blur-xl"
          >
            <p className="text-xs sm:text-sm font-serif italic text-slate-300">
              &ldquo;ExamAce doesn&apos;t just grade your answer. It learns why you lost marks and trains you to stop losing them.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Closed-Loop Agent Workflow Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-900 bg-slate-950/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              The Engine
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              The Closed-Loop Agentic Learning Workflow
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Traditional platforms stop at grading. ExamAce turns mark deduction into targeted, measurable improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {agentLoopSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                    Step {idx + 1}
                  </span>
                  <span className="text-[10px] text-slate-500">Stage {idx + 1}</span>
                </div>
                <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-indigo-200 transition-colors">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Core Problem & Comparison Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              The Hidden Gap
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Why Smart Students Still Lose Marks
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">
              Students often fully understand a concept, but university examiners look for specific academic criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Typical Loss */}
            <div className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-6">
              <div className="flex items-center gap-2 mb-4 text-rose-400 font-bold text-sm">
                <X className="w-5 h-5" />
                <span>Without ExamAce: Unexplained Mark Loss</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span><strong>Unknown Structure:</strong> Writing the same 50 words whether the question is for 2 Marks or 10 Marks.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span><strong>Omitted Big-O Complexity:</strong> Explaining logic perfectly but losing 1.5 to 2.0 marks because time complexity was missing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span><strong>Missing Diagrams:</strong> No call-tree, memory table, or architecture block sketch for high-mark questions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span><strong>Unconscious Repetition:</strong> Repeating the exact same mistakes in subsequent exams without realizing it.</span>
                </li>
              </ul>
            </div>

            {/* Right: ExamAce Marks Optimization */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6">
              <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold text-sm">
                <Check className="w-5 h-5" />
                <span>With ExamAce: Marks-Optimized Performance</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>Marks-Aware Generation:</strong> Tailored depth for 2, 5, 10, or 15 marks with exact examiner headings.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>Signature Mark-Loss Breakdown:</strong> Explicit diagnosis explaining why marks were lost (-1.5M Complexity, -1.0M Diagram).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>Recurring Weakness Detection:</strong> Automatically flags patterns (&quot;Complexity missing in 6 of last 8 answers&quot;).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong>Targeted 5-Tier Drills:</strong> Easy, Medium, Application, Exam-style, and Challenge practice with measured +55.7% improvement.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Interaction Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-900 bg-slate-950/60">
        <div className="mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Signature Interaction
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              The 3-Step ExamAce Breakthrough
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col items-center">
              <div className="h-12 w-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-lg mb-4 border border-rose-500/30">
                1
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Why Did I Lose Marks?
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Pinpoint exact deductions like missing Big-O analysis, lacking diagrams, or weak examples.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col items-center">
              <div className="h-12 w-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg mb-4 border border-amber-500/30">
                2
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                What Should I Practice?
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                ExamAce automatically crafts a 5-tier targeted drill focused entirely on your detected weakness.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col items-center">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg mb-4 border border-emerald-500/30">
                3
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Did I Improve?
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Re-evaluate after practice to measure tangible score jumps (+55.7% from 5.2 to 8.1/10).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-900 bg-slate-900/20">
        <div className="mx-auto max-w-6xl text-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
            Production-Ready Architecture
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
            <span className="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 font-semibold">
              Next.js (App Router)
            </span>
            <span className="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 font-semibold">
              TypeScript &amp; React 19
            </span>
            <span className="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 font-semibold">
              Tailwind CSS &amp; Framer Motion
            </span>
            <span className="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 font-semibold">
              Google Gemini &amp; OpenAI
            </span>
            <span className="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 font-semibold">
              Recharts Analytics
            </span>
            <span className="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 font-semibold">
              Zero-Config Demo Mode Fallback
            </span>
          </div>
        </div>
      </section>

      {/* Call to Action Final Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-indigo-950/30">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Optimize Your Exam Scores?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Experience the full agentic loop in our 60-second guided Hackathon Judge Walkthrough without needing any login.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:opacity-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-slate-950 animate-spin" />
              <span>Launch Live Judge Demo</span>
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 transition-all"
            >
              <span>Go to Student Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
