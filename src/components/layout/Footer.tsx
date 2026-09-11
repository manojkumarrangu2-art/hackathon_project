import React from 'react';
import Link from 'next/link';
import { Brain, Sparkles, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 text-white font-bold text-sm">
                EA
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">ExamAce</span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              <strong>Don&apos;t just study. Learn how to score.</strong> An AI marks-optimization agent that understands exam questions, generates marks-aware answers, evaluates student responses, identifies recurring weaknesses, and trains you to stop losing marks.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>Engineered for Engineering &amp; Academic Excellence</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-indigo-400">
                <Sparkles className="w-3 h-3" /> Closed-Loop Learning
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Core Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/ask" className="hover:text-white transition-colors">
                  Marks-Aware Answer Engine
                </Link>
              </li>
              <li>
                <Link href="/practice" className="hover:text-white transition-colors">
                  Interactive Practice Mode
                </Link>
              </li>
              <li>
                <Link href="/evaluate" className="hover:text-white transition-colors">
                  Rubric Scoring &amp; Diff
                </Link>
              </li>
              <li>
                <Link href="/mock-exam" className="hover:text-white transition-colors">
                  Timed Mock Exams
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Agent &amp; Demo
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/demo" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Live Judge Demo
                </Link>
              </li>
              <li>
                <Link href="/materials" className="hover:text-white transition-colors">
                  RAG Study Materials
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-white transition-colors">
                  Weakness Analytics
                </Link>
              </li>
              <li>
                <Link href="/study-plan" className="hover:text-white transition-colors">
                  Adaptive Study Plan
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-white transition-colors">
                  AI Model Config
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ExamAce. AI Marks Optimization Platform.</p>
          <p className="flex items-center gap-1">
            Built with Next.js, TypeScript, Tailwind CSS, &amp; Gemini / OpenAI.
          </p>
        </div>
      </div>
    </footer>
  );
}
