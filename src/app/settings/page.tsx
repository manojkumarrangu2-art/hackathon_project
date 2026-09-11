'use client';

import React, { useState } from 'react';
import {
  Settings,
  Cpu,
  Key,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Check,
  Eye,
  EyeOff,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { useExamAce } from '@/lib/store/examAceStore';
import { useToast } from '@/components/toast/ToastContext';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';

export default function SettingsPage() {
  const { aiSettings, updateAISettings, resetToDefaults } = useExamAce();
  const toast = useToast();

  const [provider, setProvider] = useState<'demo' | 'gemini' | 'openai'>(aiSettings.provider);
  const [geminiKey, setGeminiKey] = useState(aiSettings.geminiApiKey || '');
  const [openaiKey, setOpenaiKey] = useState(aiSettings.openaiApiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    model?: string;
    latencyMs?: number;
  } | null>(null);

  const handleSaveAISettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateAISettings({
      provider,
      geminiApiKey: geminiKey.trim(),
      openaiApiKey: openaiKey.trim(),
      isConfigured: provider === 'demo' ? false : Boolean(geminiKey.trim() || openaiKey.trim()),
    });
    toast.success('AI Settings Saved', `Active AI Provider set to ${provider.toUpperCase()}.`);
  };

  const handleTestConnection = async () => {
    const keyToTest = provider === 'gemini' ? geminiKey.trim() : openaiKey.trim();
    if (!keyToTest) {
      toast.warning('API Key Required', `Please enter your ${provider.toUpperCase()} API key before testing.`);
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/ai/test-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, apiKey: keyToTest }),
      });

      const data = await res.json();
      if (data.success) {
        setTestResult({
          success: true,
          message: data.message || 'Connection successful!',
          model: data.model,
          latencyMs: data.latencyMs,
        });
        toast.success('Connection Verified', data.message);
      } else {
        setTestResult({
          success: false,
          message: data.error || 'Failed to authenticate with provider.',
        });
        toast.error('Connection Failed', data.error || 'Check API key permissions.');
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err?.message || 'Network error while testing connection.',
      });
      toast.error('Test Error', 'Failed to reach validation endpoint.');
    } finally {
      setIsTesting(false);
    }
  };

  const handleConfirmReset = () => {
    resetToDefaults();
    setShowResetModal(false);
    toast.info('Data Reset Complete', 'All practice answers, evaluations, and progress reset to default state.');
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <div className="border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <Settings className="h-7 w-7 text-indigo-400" />
              Settings &amp; AI Provider Configuration
            </h1>
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
              Model Hub
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Configure live Gemini, OpenAI, or the offline university-grade knowledge engine. API keys are stored locally in your browser.
          </p>
        </div>

        {/* AI Provider Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              AI Intelligence Engine
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Choose which model generates marks-aware answers and evaluates your submissions.
            </p>
          </div>

          <form onSubmit={handleSaveAISettings} className="space-y-6">
            {/* Provider Radios */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                onClick={() => {
                  setProvider('demo');
                  setTestResult(null);
                }}
                className={`rounded-xl border p-4 cursor-pointer transition-all ${
                  provider === 'demo'
                    ? 'border-amber-500/50 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-300">University Knowledge Engine</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Zero-config academic syllabus engine with curated marks-aware rubrics across all subjects. No API keys required.
                </p>
              </div>

              <div
                onClick={() => {
                  setProvider('gemini');
                  setTestResult(null);
                }}
                className={`rounded-xl border p-4 cursor-pointer transition-all ${
                  provider === 'gemini'
                    ? 'border-indigo-500/50 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-300">Google Gemini</span>
                  <Cpu className="w-4 h-4 text-indigo-400" />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Gemini 2.5 / 1.5 Flash. Real-time reasoning via Google AI Studio API key.
                </p>
              </div>

              <div
                onClick={() => {
                  setProvider('openai');
                  setTestResult(null);
                }}
                className={`rounded-xl border p-4 cursor-pointer transition-all ${
                  provider === 'openai'
                    ? 'border-purple-500/50 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-purple-300">OpenAI</span>
                  <Cpu className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  GPT-4o / GPT-4o-mini. Connect with your OpenAI Platform API key.
                </p>
              </div>
            </div>

            {/* Keys Input if Gemini or OpenAI */}
            {provider === 'gemini' && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-300">
                    Google Gemini API Key
                  </label>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 underline"
                  >
                    Get free API key from Google AI Studio &rarr;
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={geminiKey}
                    onChange={(e) => {
                      setGeminiKey(e.target.value);
                      setTestResult(null);
                    }}
                    placeholder="AIzaSy..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {provider === 'openai' && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-300">
                    OpenAI API Key
                  </label>
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-purple-400 hover:text-purple-300 underline"
                  >
                    Get API key from OpenAI Platform &rarr;
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={openaiKey}
                    onChange={(e) => {
                      setOpenaiKey(e.target.value);
                      setTestResult(null);
                    }}
                    placeholder="sk-..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Test Status Banner */}
            {testResult && (
              <div
                className={`rounded-xl border p-3.5 flex items-start gap-3 text-xs ${
                  testResult.success
                    ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300'
                    : 'border-rose-500/30 bg-rose-950/20 text-rose-300'
                }`}
              >
                {testResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold">{testResult.message}</p>
                  {testResult.model && (
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Model Verified: <span className="text-white font-mono">{testResult.model}</span> | Latency: {testResult.latencyMs}ms
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>Save AI Configuration</span>
              </button>

              {provider !== 'demo' && (
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTesting}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-all disabled:opacity-50"
                >
                  {isTesting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                  ) : (
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                  )}
                  <span>{isTesting ? 'Testing Connection...' : 'Test Connection'}</span>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Danger Zone: Reset Progress */}
        <div className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-6 sm:p-8 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>Danger Zone</span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white">Reset All Progress &amp; Data</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Clears stored answer drafts, custom evaluations, and restores seeded university courses and weakness history.
              </p>
            </div>

            <button
              onClick={() => setShowResetModal(true)}
              className="rounded-xl border border-rose-500/40 bg-rose-600/20 px-4 py-2 text-xs font-bold text-rose-300 hover:bg-rose-600/30 transition-colors shrink-0"
            >
              Reset Application Data
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={showResetModal}
          onClose={() => setShowResetModal(false)}
          onConfirm={handleConfirmReset}
          title="Reset Everything to Defaults?"
          description="This will clear your evaluated answers, weakness tracking history, and reset your study plan to the university baseline. This action cannot be undone."
          confirmLabel="Yes, Reset Data"
          cancelLabel="Cancel"
          variant="danger"
        />
      </div>
    </AppShell>
  );
}
