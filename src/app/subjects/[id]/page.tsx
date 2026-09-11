'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  ArrowLeft,
  Target,
  PenTool,
  Brain,
  ShieldAlert,
  CheckCircle2,
  FileText,
  ChevronRight,
  FolderOpen,
  UploadCloud,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { useExamAce } from '@/lib/store/examAceStore';
import { DocumentUploadModal } from '@/components/materials/DocumentUploadModal';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SubjectDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { subjects, materials, weaknesses } = useExamAce();

  const subject =
    subjects.find((s) => s.id === resolvedParams.id) || subjects[0];

  const subjectMaterials = materials.filter(
    (m) => m.subjectId === subject.id || m.subjectName === subject.name
  );
  const subjectWeaknesses = weaknesses.filter(
    (w) => w.subject === subject.name
  );

  const [activeTab, setActiveTab] = useState<'modules' | 'questions' | 'materials'>('modules');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Curated questions for this subject
  const curatedQuestions = [
    {
      text: 'Explain Dynamic Programming with an example and state its time complexity.',
      marks: 10,
      module: 'Module 3: Dynamic Programming',
      type: 'Algorithm',
    },
    {
      text: 'Differentiate between Top-Down Memoization and Bottom-Up Tabulation with code snippets.',
      marks: 5,
      module: 'Module 3: Dynamic Programming',
      type: 'Comparison',
    },
    {
      text: 'Define Optimal Substructure and state 2 real-world algorithmic examples.',
      marks: 2,
      module: 'Module 3: Dynamic Programming',
      type: 'Theory',
    },
    {
      text: 'Explain 0/1 Knapsack problem. Give the state recurrence relation and analyze why it is pseudo-polynomial.',
      marks: 10,
      module: 'Module 3: Dynamic Programming',
      type: 'Derivation',
    },
    {
      text: 'Explain the Matrix Chain Multiplication problem. State the recurrence and derive its O(n^3) time complexity.',
      marks: 15,
      module: 'Module 3: Dynamic Programming',
      type: 'Derivation',
    },
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Back Link */}
        <Link
          href="/subjects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Subjects</span>
        </Link>

        {/* Subject Banner */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-lg bg-indigo-500/20 px-2.5 py-1 text-xs font-mono font-bold text-indigo-300 border border-indigo-500/30">
                  {subject.code}
                </span>
                <span className="text-xs text-slate-400">
                  Semester {subject.semester} • {subject.syllabusModules.length} Modules
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {subject.name}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {subject.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/ask?subject=${encodeURIComponent(subject.name)}`}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow-sm"
              >
                <Brain className="w-4 h-4" />
                <span>Ask Subject AI</span>
              </Link>

              <Link
                href={`/practice?subject=${encodeURIComponent(subject.name)}`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-all"
              >
                <PenTool className="w-4 h-4" />
                <span>Practice Questions</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-slate-800 gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('modules')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'modules'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Syllabus Modules ({subject.syllabusModules.length})
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'questions'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Question Bank ({curatedQuestions.length})
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'materials'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Attached Notes &amp; RAG ({subjectMaterials.length})
          </button>
        </div>

        {/* Tab 1: Modules */}
        {activeTab === 'modules' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subject.syllabusModules.map((mod) => (
              <div
                key={mod.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                    Module {mod.moduleNumber}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {mod.weightageMarks} Marks Exam Weight
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">{mod.title}</h3>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Key Topics Covered:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {mod.topics.map((top, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 rounded-lg bg-slate-950 p-2 border border-slate-800 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{top}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Question Bank */}
        {activeTab === 'questions' && (
          <div className="space-y-4">
            {curatedQuestions.map((q, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-indigo-500/40 transition-all"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                      {q.marks} Marks
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{q.module}</span>
                    <span className="text-[10px] text-slate-500">• {q.type}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{q.text}</h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/ask?question=${encodeURIComponent(q.text)}&marks=${q.marks}&subject=${encodeURIComponent(subject.name)}`}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    View Model
                  </Link>

                  <Link
                    href={`/practice?question=${encodeURIComponent(q.text)}&marks=${q.marks}&subject=${encodeURIComponent(subject.name)}`}
                    className="rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-sm"
                  >
                    Practice
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Materials */}
        {activeTab === 'materials' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white tracking-tight">
                Subject Study Materials ({subjectMaterials.length})
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-colors"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>+ Upload Document for {subject.code}</span>
              </button>
            </div>

            {subjectMaterials.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400">
                <FolderOpen className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-xs">No materials uploaded for this subject yet.</p>
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-colors"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload Syllabus / Notes Now</span>
                </button>
              </div>
            ) : (
              subjectMaterials.map((mat) => (
                <div
                  key={mat.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
                        {mat.fileType}
                      </span>
                      <span className="text-xs text-slate-400">{mat.chunksCount} Semantic Chunks</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{mat.title}</h4>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-1">{mat.summary}</p>
                  </div>

                  <Link
                    href="/materials"
                    className="rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:text-white shrink-0"
                  >
                    Inspect in RAG Library
                  </Link>
                </div>
              ))
            )}
          </div>
        )}

        {/* Document Upload Modal */}
        <DocumentUploadModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          defaultSubjectId={subject.id}
        />
      </div>
    </AppShell>
  );
}
