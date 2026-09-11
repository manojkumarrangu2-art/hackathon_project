'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  BookOpen,
  Target,
  PenTool,
  SearchCheck,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

export interface PipelineStep {
  id: string;
  label: string;
  detail: string;
  icon: React.ElementType;
}

export const DEFAULT_PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 'understanding',
    label: 'Understanding Question',
    detail: 'Classifying subject, question type, and core academic concepts',
    icon: Brain,
  },
  {
    id: 'retrieving',
    label: 'Retrieving Study Material',
    detail: 'Searching semantic embeddings in syllabus & textbook notes',
    icon: BookOpen,
  },
  {
    id: 'marks_analysis',
    label: 'Analyzing Marks Requirements',
    detail: 'Mapping depth: 2M, 5M, 10M, or 15M examiner rubric expectations',
    icon: Target,
  },
  {
    id: 'building',
    label: 'Building Exam-Oriented Answer',
    detail: 'Synthesizing definitions, algorithms, diagrams, and exam tips',
    icon: PenTool,
  },
  {
    id: 'checking',
    label: 'Checking Accuracy & Rubric',
    detail: 'Auditing keyword density, structure, and missing mark-loss traps',
    icon: SearchCheck,
  },
  {
    id: 'finalizing',
    label: 'Finalizing Result',
    detail: 'Structuring response with "How to Get More Marks" guidance',
    icon: CheckCircle2,
  },
];

interface AIProcessingPipelineProps {
  currentStepIndex: number; // 0 to 5
  steps?: PipelineStep[];
  title?: string;
  subtitle?: string;
}

export function AIProcessingPipeline({
  currentStepIndex,
  steps = DEFAULT_PIPELINE_STEPS,
  title = 'ExamAce Agent Workflow',
  subtitle = 'Executing closed-loop marks optimization pipeline',
}: AIProcessingPipelineProps) {
  return (
    <div className="w-full rounded-2xl border border-indigo-500/20 bg-slate-950/80 p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 shadow-inner">
            <Brain className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white flex items-center gap-2">
              {title}
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Live Agent
              </span>
            </h3>
            <p className="text-xs text-slate-400">{subtitle}</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono text-indigo-400 font-semibold">
            Stage {Math.min(currentStepIndex + 1, steps.length)} of {steps.length}
          </span>
          <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isUpcoming = idx > currentStepIndex;
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0.5, x: -5 }}
              animate={{
                opacity: isUpcoming ? 0.35 : 1,
                x: 0,
                scale: isCurrent ? 1.01 : 1,
              }}
              transition={{ duration: 0.2 }}
              className={`flex items-center justify-between rounded-xl p-3 border transition-all ${
                isCurrent
                  ? 'border-indigo-500/50 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                  : isCompleted
                  ? 'border-emerald-500/30 bg-emerald-950/20 text-slate-300'
                  : 'border-slate-800/60 bg-slate-900/40 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
                    isCompleted
                      ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-400'
                      : isCurrent
                      ? 'border-indigo-500/50 bg-indigo-500/20 text-indigo-300'
                      : 'border-slate-800 bg-slate-900 text-slate-600'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : isCurrent ? (
                    <Icon className="h-4 w-4 animate-pulse" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold ${
                        isCurrent
                          ? 'text-indigo-200'
                          : isCompleted
                          ? 'text-slate-200'
                          : 'text-slate-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{step.detail}</p>
                </div>
              </div>

              <div className="shrink-0 text-right pl-3">
                {isCompleted && (
                  <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                    Done
                  </span>
                )}
                {isCurrent && (
                  <span className="text-[11px] font-medium text-cyan-400 flex items-center gap-1.5">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Processing...
                  </span>
                )}
                {isUpcoming && (
                  <span className="text-[11px] text-slate-600">Pending</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
