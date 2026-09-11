'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Plus,
  ArrowRight,
  Target,
  ShieldAlert,
  ChevronRight,
  Layers,
  Award,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { useExamAce } from '@/lib/store/examAceStore';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { useToast } from '@/components/toast/ToastContext';

export default function SubjectsPage() {
  const { subjects } = useExamAce();
  const toast = useToast();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectCode, setNewSubjectCode] = useState('');

  const handleAddSubject = () => {
    if (!newSubjectName.trim() || !newSubjectCode.trim()) {
      toast.warning('Fields Required', 'Please enter both subject name and code.');
      return;
    }
    toast.success('Subject Added', `Enrolled in ${newSubjectName} (${newSubjectCode}).`);
    setShowAddModal(false);
    setNewSubjectName('');
    setNewSubjectCode('');
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <BookOpen className="h-7 w-7 text-indigo-400" />
                Enrolled Subjects &amp; Syllabi
              </h1>
              <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
                {subjects.length} Active Courses
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Track module completion, syllabus weightages, and active mark-loss weaknesses across all courses.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Subject</span>
          </button>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => {
            const completionPercent = Math.round(
              (subject.completedTopics / subject.topicsCount) * 100
            );

            return (
              <div
                key={subject.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between hover:border-indigo-500/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-mono font-bold text-indigo-300 border border-slate-700">
                      {subject.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Sem {subject.semester}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {subject.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {subject.description}
                  </p>

                  {/* Progress bar */}
                  <div className="mt-5 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-400">Syllabus Progress</span>
                      <span className="text-white">
                        {subject.completedTopics} / {subject.topicsCount} Topics ({completionPercent}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${completionPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Modules Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {subject.syllabusModules.slice(0, 3).map((mod) => (
                      <span
                        key={mod.id}
                        className="rounded-md bg-slate-950 px-2 py-0.5 text-[10px] text-slate-400 border border-slate-800"
                      >
                        M{mod.moduleNumber}: {mod.title.split(' ')[0]}
                      </span>
                    ))}
                    {subject.syllabusModules.length > 3 && (
                      <span className="rounded-md bg-slate-950 px-2 py-0.5 text-[10px] text-slate-500">
                        +{subject.syllabusModules.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">
                      Avg Score: <strong className="text-white">{subject.averageScore}/10</strong>
                    </span>
                    {subject.activeWeaknessCount > 0 && (
                      <span className="flex items-center gap-1 rounded bg-rose-500/10 px-1.5 py-0.5 text-[10px] font-bold text-rose-300 border border-rose-500/20">
                        <ShieldAlert className="w-3 h-3 text-rose-400" />
                        {subject.activeWeaknessCount}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/subjects/${subject.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>View Syllabus</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Subject Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
              <h3 className="text-base font-bold text-white mb-4">Enroll in New Subject</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                    placeholder="e.g. Compiler Design"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Course Code
                  </label>
                  <input
                    type="text"
                    value={newSubjectCode}
                    onChange={(e) => setNewSubjectCode(e.target.value)}
                    placeholder="e.g. CS306"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSubject}
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500"
                >
                  Enroll Course
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
