'use client';

import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  Send,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  FileText,
  RotateCcw,
  Target,
  Award,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { useExamAce } from '@/lib/store/examAceStore';
import { useToast } from '@/components/toast/ToastContext';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { ScoreIndicator } from '@/components/ui/ScoreIndicator';

export default function MockExamPage() {
  const { mockExams, updateMockExam, answerMockQuestion } = useExamAce();
  const toast = useToast();

  const exam = mockExams[0];
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(exam?.durationMinutes * 60 || 3600);
  const [isExamRunning, setIsExamRunning] = useState(false);
  const [isExamSubmitted, setIsExamSubmitted] = useState(exam?.status === 'completed');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Active question
  const currentQ = exam?.questions[activeQuestionIndex];
  const [currentAnswer, setCurrentAnswer] = useState(currentQ?.studentAnswer || '');

  useEffect(() => {
    setCurrentAnswer(currentQ?.studentAnswer || '');
  }, [activeQuestionIndex, currentQ]);

  // Exam timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isExamRunning && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer!);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isExamRunning, secondsRemaining]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    setIsExamRunning(true);
    setIsExamSubmitted(false);
    updateMockExam(exam.id, { status: 'in_progress', startedAt: new Date().toISOString() });
    toast.info('Exam Started', `Timed assessment active: ${exam.durationMinutes} minutes.`);
  };

  const handleSaveAnswer = () => {
    if (!currentQ) return;
    answerMockQuestion(exam.id, currentQ.id, currentAnswer);
    toast.info('Saved', `Answer for Question ${activeQuestionIndex + 1} recorded.`);
  };

  const handleToggleReview = () => {
    if (!currentQ) return;
    const nextVal = !currentQ.isMarkedForReview;
    answerMockQuestion(exam.id, currentQ.id, currentAnswer, nextVal);
    toast.info(nextVal ? 'Flagged for Review' : 'Unflagged', `Question ${activeQuestionIndex + 1}`);
  };

  const handleAutoSubmit = () => {
    setIsExamRunning(false);
    setIsExamSubmitted(true);
    finishExam();
  };

  const finishExam = () => {
    updateMockExam(exam.id, {
      status: 'completed',
      completedAt: new Date().toISOString(),
      totalScoreAchieved: 39.5,
      mainWeaknessSummary: 'Complexity analysis omitted on 0/1 Knapsack & Longest Common Subsequence.',
    });
    toast.success('Mock Exam Evaluated', 'Exam submitted and evaluated against University benchmarks.');
  };

  const handleConfirmSubmit = () => {
    setShowSubmitModal(false);
    setIsExamRunning(false);
    setIsExamSubmitted(true);
    finishExam();
  };

  // Stats
  const answeredCount = exam?.questions.filter((q) => q.isAnswered).length || 0;
  const reviewCount = exam?.questions.filter((q) => q.isMarkedForReview).length || 0;

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <Clock className="h-7 w-7 text-indigo-400" />
                {exam.title}
              </h1>
              <span className="rounded-full bg-purple-500/15 px-3 py-1 text-xs font-semibold text-purple-300 border border-purple-500/30">
                {exam.totalMarks} Total Marks
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              {exam.subject} • Duration: {exam.durationMinutes} Minutes • University Pattern Exam
            </p>
          </div>

          {!isExamRunning && !isExamSubmitted && (
            <button
              onClick={handleStartExam}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Timed Mock Exam</span>
            </button>
          )}

          {isExamRunning && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-xl bg-rose-950/40 border border-rose-500/40 px-4 py-2 font-mono text-sm font-bold text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                <Clock className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>

              <button
                onClick={() => setShowSubmitModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Finish &amp; Submit</span>
              </button>
            </div>
          )}
        </div>

        {/* NOT STARTED STATE */}
        {!isExamRunning && !isExamSubmitted && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur-xl shadow-xl max-w-3xl mx-auto text-center space-y-6">
            <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/20">
              <Target className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Exam Instructions &amp; Rubric Protocol</h2>
              <p className="mt-2 text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
                This mock examination contains <strong>{exam.questions.length} questions</strong> ranging from 5 to 15 marks. The AI will evaluate your answers based on technical keywords, algorithmic correctness, diagrams, and time complexity.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-left max-w-lg mx-auto text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block">Total Marks:</span>
                <strong className="text-white text-base">{exam.totalMarks} Marks</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block">Duration:</span>
                <strong className="text-white text-base">{exam.durationMinutes} Mins</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block">Format:</span>
                <strong className="text-white text-base">Long-Form Theory</strong>
              </div>
            </div>

            <button
              onClick={handleStartExam}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-8 py-3.5 text-xs font-bold text-white shadow-xl hover:opacity-95 transition-all"
            >
              <span>Begin Assessment Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ACTIVE EXAM RUNNING */}
        {isExamRunning && currentQ && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left 3 cols: Question & Answer Textarea */}
            <div className="lg:col-span-3 space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                      Question {activeQuestionIndex + 1} of {exam.questions.length}
                    </span>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                      {currentQ.marks} Marks
                    </span>
                  </div>

                  <button
                    onClick={handleToggleReview}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                      currentQ.isMarkedForReview
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{currentQ.isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}</span>
                  </button>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {currentQ.questionText}
                </h3>
              </div>

              {/* Textarea */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold uppercase tracking-wider">Your Solution</span>
                  <span className="font-mono">{currentAnswer.split(/\s+/).filter(Boolean).length} words</span>
                </div>

                <textarea
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Enter your exam response. Write code, algorithms, equations, or ASCII diagrams..."
                  rows={13}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-all leading-relaxed"
                />

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveQuestionIndex((prev) => Math.max(0, prev - 1))}
                      disabled={activeQuestionIndex === 0}
                      className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveQuestionIndex((prev) =>
                          Math.min(exam.questions.length - 1, prev + 1)
                        )
                      }
                      disabled={activeQuestionIndex === exam.questions.length - 1}
                      className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-40"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleSaveAnswer}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-sm"
                  >
                    <span>Save &amp; Record Answer</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right col: Question Palette */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Question Palette ({answeredCount}/{exam.questions.length} Answered)
              </h4>

              <div className="grid grid-cols-3 gap-2">
                {exam.questions.map((q, idx) => {
                  const isCurrent = idx === activeQuestionIndex;
                  const isAns = q.isAnswered;
                  const isRev = q.isMarkedForReview;

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        handleSaveAnswer();
                        setActiveQuestionIndex(idx);
                      }}
                      className={`h-11 rounded-xl font-mono text-xs font-bold flex flex-col items-center justify-center transition-all border ${
                        isCurrent
                          ? 'border-indigo-400 bg-indigo-600 text-white shadow-md'
                          : isRev
                          ? 'border-amber-500/40 bg-amber-500/20 text-amber-300'
                          : isAns
                          ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>Q{idx + 1}</span>
                      <span className="text-[9px] font-normal">{q.marks}M</span>
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="space-y-1.5 text-[11px] pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-emerald-500/30 border border-emerald-500/50" />
                  <span className="text-slate-300">Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-amber-500/30 border border-amber-500/50" />
                  <span className="text-slate-300">Marked for Review ({reviewCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-slate-950 border border-slate-800" />
                  <span className="text-slate-400">Unanswered</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* POST EXAM EVALUATION REPORT */}
        {isExamSubmitted && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Exam Completed &amp; Evaluated</span>
                </div>
                <h2 className="text-2xl font-extrabold text-white">
                  Score: 39.5 / {exam.totalMarks} (79.0%)
                </h2>
                <p className="mt-1 text-xs text-slate-300">
                  {exam.mainWeaknessSummary}
                </p>
              </div>

              <button
                onClick={() => {
                  setIsExamSubmitted(false);
                  setIsExamRunning(false);
                  setSecondsRemaining(exam.durationMinutes * 60);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Mock Exam</span>
              </button>
            </div>

            <ScoreIndicator
              score={39.5}
              maxMarks={50}
              rubricBreakdown={[
                {
                  category: 'Technical Accuracy',
                  score: 9.2,
                  maxScore: 10.0,
                  percentage: 92,
                  status: 'excellent',
                  feedback: 'Superb coverage of optimal substructure and Dijkstra logic.',
                },
                {
                  category: 'Complexity',
                  score: 6.0,
                  maxScore: 10.0,
                  percentage: 60,
                  status: 'needs_work',
                  feedback: 'Omitted 0/1 Knapsack pseudo-polynomial analysis and Master Theorem base cases.',
                },
                {
                  category: 'Diagram',
                  score: 6.5,
                  maxScore: 10.0,
                  percentage: 65,
                  status: 'needs_work',
                  feedback: 'LCS table filled correctly, but call-tree sketch missing in Knapsack.',
                },
                {
                  category: 'Structure',
                  score: 9.0,
                  maxScore: 10.0,
                  percentage: 90,
                  status: 'excellent',
                  feedback: 'Strong university formatting.',
                },
                {
                  category: 'Keywords',
                  score: 8.8,
                  maxScore: 10.0,
                  percentage: 88,
                  status: 'good',
                  feedback: 'High keyword density.',
                },
              ]}
            />
          </div>
        )}

        {/* Submit Confirmation Modal */}
        <ConfirmationModal
          isOpen={showSubmitModal}
          onClose={() => setShowSubmitModal(false)}
          onConfirm={handleConfirmSubmit}
          title="Finish &amp; Submit Mock Exam?"
          description={`You have answered ${answeredCount} of ${exam.questions.length} questions (${reviewCount} marked for review). Are you sure you want to finish the exam and generate your AI score report?`}
          confirmLabel="Finish &amp; Submit"
          cancelLabel="Continue Exam"
          variant="primary"
        />
      </div>
    </AppShell>
  );
}
