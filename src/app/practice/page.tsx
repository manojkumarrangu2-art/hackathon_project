'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  PenTool,
  Clock,
  Target,
  Sparkles,
  Save,
  Send,
  HelpCircle,
  FileText,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { useExamAce } from '@/lib/store/examAceStore';
import { useToast } from '@/components/toast/ToastContext';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { AIProcessingPipeline } from '@/components/ui/AIProcessingPipeline';
import { QuestionMarks } from '@/lib/types';
import { countWords } from '@/lib/utils';
import { AIProviderService } from '@/lib/ai/aiProvider';

function PracticeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { subjects, addEvaluation, setCurrentEvaluation, practiceQuestions, weaknesses, aiSettings } = useExamAce();
  const toast = useToast();

  const urlQuestion = searchParams.get('question');
  const urlMarks = searchParams.get('marks');
  const urlSubject = searchParams.get('subject');
  const urlWeakness = searchParams.get('weakness');

  const [question, setQuestion] = useState(
    urlQuestion || 'Explain Dynamic Programming with an example. (10 Marks)'
  );
  const [selectedSubject, setSelectedSubject] = useState(
    urlSubject || 'Data Structures & Algorithms'
  );
  const [marks, setMarks] = useState<QuestionMarks>(
    urlMarks ? (parseInt(urlMarks) as QuestionMarks) : 10
  );
  const [answer, setAnswer] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const wordCount = countWords(answer);

  const handleSaveDraft = () => {
    toast.info('Draft Saved', 'Your answer progress has been saved locally.');
  };

  const handleClear = () => {
    setAnswer('');
    setTimerSeconds(0);
    toast.info('Editor Reset', 'Answer draft cleared.');
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);
    setPipelineStep(0);

    const stepInterval = setInterval(() => {
      setPipelineStep((prev) => {
        if (prev < 5) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 400);

    try {
      const { result } = await AIProviderService.evaluateAnswer({
        question,
        subject: selectedSubject,
        marks,
        studentAnswer: answer,
        settings: aiSettings,
      });

      setTimeout(() => {
        clearInterval(stepInterval);
        setIsSubmitting(false);
        addEvaluation(result);
        setCurrentEvaluation(result);

        toast.success(
          'Answer Evaluated',
          `AI Estimated Score: ${result.aiEstimatedScore.toFixed(1)} / ${result.maxMarks}. Mark-loss analysis ready.`
        );

        router.push('/evaluate');
      }, 2200);
    } catch (err) {
      clearInterval(stepInterval);
      setIsSubmitting(false);
      toast.error('Evaluation Error', 'Failed to evaluate answer. Your response is saved.');
    }
  };

  const handleSubmitAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) {
      toast.warning('Answer Empty', 'Please write your response before submitting for evaluation.');
      return;
    }
    setShowConfirmModal(true);
  };

  // Sample student flawed answer filler (ideal for quick demo testing)
  const handleInsertSampleAnswer = () => {
    setAnswer(`Dynamic programming is an algorithmic technique used to solve problems by breaking them into smaller overlapping subproblems. It caches results so each subproblem is computed only once.

Key Properties:
1. Optimal substructure: Optimal solution to the problem can be formed from optimal solutions to subproblems.
2. Overlapping subproblems: The same subproblems are solved repeatedly.

Example: Fibonacci Sequence
F(n) = F(n-1) + F(n-2)
Using an array dp[], we can store:
int fib(int n) {
  int dp[n+1];
  dp[0] = 0; dp[1] = 1;
  for(int i=2; i<=n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
}
This avoids exponential recursion.`);
    toast.info('Demo Answer Inserted', 'Sample flawed answer loaded (Notice it lacks complexity analysis and diagrams!).');
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <PenTool className="h-7 w-7 text-indigo-400" />
                Practice Mode
              </h1>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                Interactive Arena
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Practice answering university exam questions under timed conditions with real-time feedback.
            </p>
          </div>

          <button
            type="button"
            onClick={handleInsertSampleAnswer}
            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Load Demo Answer</span>
          </button>
        </div>

        {/* Question Metadata Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
                {marks} Marks
              </span>
              <span className="text-xs font-semibold text-slate-300">
                {selectedSubject}
              </span>
              <span className="text-xs text-slate-500">
                • Rec. Time: {marks === 10 ? '15 mins' : marks === 15 ? '22 mins' : '8 mins'}
              </span>
            </div>

            {/* Timer widget */}
            <div className="flex items-center gap-2 rounded-xl bg-slate-950 px-3 py-1.5 border border-slate-800 font-mono text-xs text-amber-400">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>{formatTimer(timerSeconds)}</span>
              <button
                type="button"
                onClick={() => setTimerActive(!timerActive)}
                className="text-[10px] text-slate-400 hover:text-white ml-1 underline"
              >
                {timerActive ? 'Pause' : 'Resume'}
              </button>
            </div>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
            {question}
          </h2>
        </div>

        {/* Editor Form */}
        <form onSubmit={handleSubmitAttempt} className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-400" />
                Your Exam Response
              </span>
              <div className="flex items-center gap-4 text-slate-400 font-mono">
                <span>Words: <strong className="text-white">{wordCount}</strong></span>
                <span>Expected: <strong className="text-slate-300">{marks >= 10 ? '300-450' : '100-200'}</strong></span>
              </div>
            </div>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your exam answer here. Use clear headings, numbered points, formulas, algorithms, or ASCII diagrams..."
              rows={14}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all font-sans leading-relaxed"
            />

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <AlertCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Tip: University examiners award points for explicit Big-O complexity and structured diagrams.</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  Clear
                </button>

                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Draft</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit for AI Evaluation</span>
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Live Evaluation Pipeline during submission */}
        {isSubmitting && (
          <AIProcessingPipeline
            currentStepIndex={pipelineStep}
            title="ExamAce Evaluating Your Answer"
            subtitle="Auditing response against marks rubric, keywords, and mark-loss traps"
          />
        )}

        {/* Reusable Confirmation Modal */}
        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmSubmit}
          title="Submit Answer for AI Marks Evaluation?"
          description={`You have written ${wordCount} words for this ${marks}-Mark question. ExamAce will analyze your technical accuracy, keywords, diagram presence, and check for recurring mark-loss patterns.`}
          confirmLabel="Submit &amp; Evaluate"
          cancelLabel="Continue Editing"
          variant="primary"
          isLoading={isSubmitting}
        />
      </div>
    </AppShell>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-xs text-slate-500">Loading practice arena...</div>}>
      <PracticeContent />
    </Suspense>
  );
}
