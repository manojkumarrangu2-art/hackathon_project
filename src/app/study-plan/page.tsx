'use client';

import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  Flame,
  Target,
  Sparkles,
  AlertTriangle,
  Trash2,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { useExamAce } from '@/lib/store/examAceStore';
import { useToast } from '@/components/toast/ToastContext';
import { StudyPlanItem } from '@/lib/types';

export default function StudyPlanPage() {
  const { studyPlan, toggleStudyPlanItem, addStudyPlanItem, deleteStudyPlanItem, user } = useExamAce();
  const toast = useToast();

  const [activePeriod, setActivePeriod] = useState<'All' | 'Today' | 'This Week' | 'Upcoming' | 'Completed'>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Data Structures & Algorithms');
  const [newMinutes, setNewMinutes] = useState(45);
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  const filteredTasks = studyPlan.filter((item) => {
    if (activePeriod === 'All') return true;
    return item.period === activePeriod;
  });

  const completedCount = studyPlan.filter((item) => item.isCompleted).length;
  const progressPercent = Math.round((completedCount / studyPlan.length) * 100);

  const handleToggle = (id: string, title: string, wasCompleted: boolean) => {
    toggleStudyPlanItem(id);
    if (!wasCompleted) {
      toast.achievement('Target Completed! 🔥', `Finished "${title}". Streak maintained!`);
    } else {
      toast.info('Task Marked Pending', `"${title}" moved back to active list.`);
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.warning('Title Required', 'Please enter a task title.');
      return;
    }

    const newTask: StudyPlanItem = {
      id: `sp_${Date.now()}`,
      title: newTitle,
      subject: newSubject,
      topic: newSubject,
      date: new Date().toISOString().split('T')[0],
      timeAllocatedMinutes: newMinutes,
      priority: newPriority,
      category: 'Weakness Practice',
      period: 'Today',
      isCompleted: false,
    };

    addStudyPlanItem(newTask);
    setShowAddModal(false);
    setNewTitle('');
    toast.success('Study Task Scheduled', `Added "${newTitle}" to Today's timetable.`);
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <Calendar className="h-7 w-7 text-indigo-400" />
                Adaptive AI Study Plan
              </h1>
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
                14 Days to Finals
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Personalized study schedule dynamically weighted toward your recurring mark-loss topics.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Study Task</span>
          </button>
        </div>

        {/* Progress Banner */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Curriculum Mastery Progress
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                {progressPercent}% Complete
              </span>
            </div>
            <h2 className="text-xl font-bold text-white">
              {completedCount} of {studyPlan.length} Essential Milestones Cleared
            </h2>
            <p className="text-xs text-slate-400">
              Daily goal: 90 minutes focused on Complexity Analysis &amp; Concurrency.
            </p>
          </div>

          <div className="w-full sm:w-72 space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Today&apos;s Target</span>
              <span className="text-emerald-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Period Filter Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          {(['All', 'Today', 'This Week', 'Upcoming', 'Completed'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                activePeriod === period
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center text-slate-400 text-xs">
              No tasks scheduled under &quot;{activePeriod}&quot;.
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border p-4 transition-all ${
                  task.isCompleted
                    ? 'border-emerald-500/20 bg-emerald-950/10 opacity-75'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => handleToggle(task.id, task.title, task.isCompleted)}
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                      task.isCompleted
                        ? 'border-emerald-500 bg-emerald-500 text-slate-950'
                        : 'border-slate-700 bg-slate-900 hover:border-indigo-500'
                    }`}
                  >
                    {task.isCompleted && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-semibold text-indigo-400">
                        {task.subject}
                      </span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${
                          task.priority === 'High'
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {task.priority} Priority
                      </span>
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400 font-mono">
                        {task.timeAllocatedMinutes} mins
                      </span>
                      <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] text-indigo-300">
                        {task.category}
                      </span>
                    </div>

                    <h4
                      className={`text-sm font-bold tracking-tight ${
                        task.isCompleted ? 'text-slate-400 line-through' : 'text-white'
                      }`}
                    >
                      {task.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => deleteStudyPlanItem(task.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                    aria-label="Delete Task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Task Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
              <h3 className="text-base font-bold text-white">Add Study Milestone</h3>
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Master Peterson's Algorithm Proof"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Time (Minutes)
                    </label>
                    <input
                      type="number"
                      value={newMinutes}
                      onChange={(e) => setNewMinutes(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Priority
                    </label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as any)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500"
                  >
                    Schedule Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
