'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Sparkles,
  Target,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  FileText,
  Copy,
  Check,
  Zap,
  UploadCloud,
  FolderOpen,
  Paperclip,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { useExamAce } from '@/lib/store/examAceStore';
import { useToast } from '@/components/toast/ToastContext';
import { AIProcessingPipeline } from '@/components/ui/AIProcessingPipeline';
import { DocumentUploadModal } from '@/components/materials/DocumentUploadModal';
import { QuestionMarks, AnswerGenerationResult } from '@/lib/types';
import { AIProviderService } from '@/lib/ai/aiProvider';

export default function AskPage() {
  const { subjects, materials, aiSettings } = useExamAce();
  const toast = useToast();

  const [question, setQuestion] = useState('Explain Dynamic Programming with an example.');
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.name || 'Data Structures & Algorithms');
  const [selectedMaterialId, setSelectedMaterialId] = useState('auto');
  const [marks, setMarks] = useState<QuestionMarks>(10);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [result, setResult] = useState<AnswerGenerationResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Quick preset questions
  const presetQuestions = [
    {
      q: 'Explain Dynamic Programming with an example.',
      sub: 'Data Structures & Algorithms',
      m: 10 as QuestionMarks,
    },
    {
      q: 'Differentiate between Paging and Segmentation.',
      sub: 'Operating Systems',
      m: 5 as QuestionMarks,
    },
    {
      q: 'Explain ACID properties in DBMS transactions.',
      sub: 'Database Management Systems',
      m: 5 as QuestionMarks,
    },
    {
      q: 'Explain Dijkstra Shortest Path algorithm with complexity.',
      sub: 'Data Structures & Algorithms',
      m: 10 as QuestionMarks,
    },
    {
      q: 'State the Master Theorem and describe its 3 cases.',
      sub: 'Data Structures & Algorithms',
      m: 5 as QuestionMarks,
    },
  ];

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!question.trim()) {
      toast.warning('Question Required', 'Please enter or select an exam question.');
      return;
    }

    setIsProcessing(true);
    setPipelineStep(0);
    setResult(null);

    // Simulate animated high-level agent stages
    const stepTimer = setInterval(() => {
      setPipelineStep((prev) => {
        if (prev < 5) return prev + 1;
        clearInterval(stepTimer);
        return prev;
      });
    }, 450);

    try {
      // Grounding is document-first: choose only a material belonging to the
      // selected subject, then rank its chunks against the current question.
      let materialContext: string | undefined = undefined;
      if (selectedMaterialId !== 'none') {
        const selectedSubjectRecord = subjects.find((s) => s.name === selectedSubject);
        const chosenMat =
          selectedMaterialId === 'auto'
            ? materials.find(
                (m) =>
                  (selectedSubjectRecord?.id && m.subjectId === selectedSubjectRecord.id) ||
                  m.subjectName === selectedSubject
              )
            : materials.find((m) => m.id === selectedMaterialId);

        if (chosenMat) {
          const questionTerms = question
            .toLowerCase()
            .replace(/[^a-z0-9+#.-]+/g, ' ')
            .split(/\s+/)
            .filter((term) => term.length >= 2);

          const scoredChunks = chosenMat.chunks
            .map((chunk) => {
              const haystack = `${chunk.content} ${chunk.keywords.join(' ')}`.toLowerCase();
              const score = questionTerms.reduce(
                (total, term) => total + (haystack.includes(term) ? 1 : 0),
                0
              );
              return { chunk, score };
            })
            .sort((a, b) => b.score - a.score || a.chunk.chunkIndex - b.chunk.chunkIndex);

          const selectedChunks = scoredChunks
            .filter((item) => item.score > 0)
            .slice(0, 8)
            .map((item) => item.chunk);

          const fallbackChunks = selectedChunks.length
            ? selectedChunks
            : chosenMat.chunks.slice(0, 3);

          materialContext = [
            `SOURCE_DOCUMENT: ${chosenMat.sourceFileName || chosenMat.title}`,
            `SOURCE_MATERIAL_ID: ${chosenMat.id}`,
            `SUBJECT: ${chosenMat.subjectName}`,
            `IMPORTANT: Answer from this document only. Do not substitute content from another uploaded document.`,
            ...fallbackChunks.map(
              (c) => `CHUNK ${c.chunkIndex + 1}:\n${c.content}`
            ),
          ].join('\n\n');
        }
      }

      const response = await AIProviderService.generateAnswer({
        question,
        subject: selectedSubject,
        marks,
        materialContext,
        settings: aiSettings,
      });

      // Allow pipeline animation to finish smoothly
      setTimeout(() => {
        clearInterval(stepTimer);
        setPipelineStep(5);
        setIsProcessing(false);
        setResult(response.result);

        toast.success(
          'Exam-Oriented Answer Ready',
          `Generated marks-aware answer formatted specifically for ${marks} Marks allocation.`
        );
      }, 2400);
    } catch (err) {
      clearInterval(stepTimer);
      setIsProcessing(false);
      toast.error('Generation Failed', 'Something went wrong while generating the answer. Please try again.');
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.answerMarkdown);
    setCopied(true);
    toast.info('Copied to Clipboard', 'Exam answer outline copied for study.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <Brain className="h-7 w-7 text-indigo-400" />
              Ask ExamAce
            </h1>
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
              Marks-Aware Synthesizer
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Specify the question and the exact marks allocation (2, 5, 10, or 15 Marks). ExamAce synthesizes the exact depth, structure, algorithms, and diagrams expected by university examiners.
          </p>
        </div>

        {/* Question Form Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl">
          <form onSubmit={handleGenerate} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Exam Question Prompt
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. Explain Dynamic Programming with an example and state its time complexity..."
                rows={3}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Subject selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Academic Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs font-medium text-white focus:border-indigo-500 focus:outline-none"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Marks Selector (2M, 5M, 10M, 15M) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Examiner Marks Allocation
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {([2, 5, 10, 15] as QuestionMarks[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMarks(m)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                        marks === m
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {m} Marks
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grounding Material Attachment & Document Upload Option */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Syllabus / Textbook Grounding (RAG)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-colors w-fit"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload Document (PDF / DOCX)</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedMaterialId}
                  onChange={(e) => setSelectedMaterialId(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="auto">⚡ Auto-match classroom textbook by subject ({selectedSubject})</option>
                  {materials.map((m) => (
                    <option key={m.id} value={m.id}>
                      📄 {m.title} ({m.chunksCount} chunks • {m.subjectName})
                    </option>
                  ))}
                  <option value="none">🌐 General AI Knowledge Only (No custom document grounding)</option>
                </select>
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                Sample University Questions:
              </span>
              <div className="flex flex-wrap gap-2">
                {presetQuestions.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setQuestion(p.q);
                      setSelectedSubject(p.sub);
                      setMarks(p.m);
                    }}
                    className="rounded-lg border border-slate-800 bg-slate-950/70 px-2.5 py-1 text-[11px] text-slate-300 hover:border-indigo-500/40 hover:text-white transition-colors"
                  >
                    {p.q} ({p.m}M)
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isProcessing}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-6 py-3 text-xs font-bold text-white shadow-lg hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-50 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isProcessing ? 'Agent Synthesizing...' : `Generate ${marks}-Mark Model Answer`}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Multi-Stage AI Pipeline */}
        {isProcessing && (
          <AIProcessingPipeline
            currentStepIndex={pipelineStep}
            title="ExamAce Marks Agent Processing"
            subtitle={`Structuring answer for ${marks} Marks in ${selectedSubject}`}
          />
        )}

        {/* Generated Answer Display */}
        {result && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Top action toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
                  {result.marks} Marks Layout
                </span>
                <span className="text-xs text-slate-400">
                  Topic: <strong>{result.topic}</strong>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Answer'}</span>
                </button>

                <Link
                  href={`/practice?question=${encodeURIComponent(result.question)}&marks=${result.marks}&subject=${encodeURIComponent(result.subject)}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-indigo-500 transition-colors shadow-sm"
                >
                  <span>Practice This Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Main Generated Answer Container */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl">
              <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
                <div className="whitespace-pre-wrap font-sans text-slate-200">
                  {result.answerMarkdown}
                </div>
              </div>

              {/* Examiner Writing Tip Callout */}
              <div className="mt-8 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-200">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-1 text-amber-300">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Exam Writing Tip from Senior Examiner:</span>
                </div>
                <p className="text-xs leading-relaxed text-amber-100/90 pl-6">
                  {result.examWritingTip}
                </p>
              </div>
            </div>

            {/* Signature "How to Get More Marks" Section */}
            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4 border-b border-indigo-500/20 pb-3">
                <Target className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  How to Get More Marks on This Question
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-2">
                    Common Mark-Loss Mistakes to Avoid:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {result.howToGetMoreMarks.missingCommonMistakes.map((mistake, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">
                    High-Yield Keywords Expected by Examiners:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {result.howToGetMoreMarks.highYieldKeywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-300"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {result.howToGetMoreMarks.diagramAdvice && (
                <div className="mt-4 pt-4 border-t border-indigo-500/20 text-xs text-slate-300">
                  <strong className="text-indigo-300">Diagram Guidance: </strong>
                  {result.howToGetMoreMarks.diagramAdvice}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Document Upload Modal */}
        <DocumentUploadModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          defaultSubjectId={subjects.find((s) => s.name === selectedSubject)?.id}
        />
      </div>
    </AppShell>
  );
}
