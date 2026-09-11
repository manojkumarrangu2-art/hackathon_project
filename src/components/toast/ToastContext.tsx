'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  Brain,
  Award,
  Loader2,
  X,
  ArrowRight,
} from 'lucide-react';

export type ToastType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'ai_insight'
  | 'achievement'
  | 'progress'
  | 'processing';

export interface ToastOptions {
  id?: string;
  type: ToastType;
  title: string;
  description: string;
  durationMs?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  progress?: number; // 0 to 100
}

interface ToastContextType {
  toasts: ToastOptions[];
  showToast: (options: ToastOptions) => string;
  dismissToast: (id: string) => void;
  success: (title: string, description: string, action?: ToastOptions['action']) => string;
  error: (title: string, description: string) => string;
  warning: (title: string, description: string, action?: ToastOptions['action']) => string;
  info: (title: string, description: string) => string;
  aiInsight: (title: string, description: string, action?: ToastOptions['action']) => string;
  achievement: (title: string, description: string) => string;
  processing: (title: string, description: string) => string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (options: ToastOptions) => {
      const id = options.id || `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const duration = options.durationMs !== undefined ? options.durationMs : options.type === 'processing' ? 0 : 5000;

      const toastItem: ToastOptions = { ...options, id };

      setToasts((prev) => {
        // Remove duplicate ID if exists
        const filtered = prev.filter((t) => t.id !== id);
        return [toastItem, ...filtered];
      });

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }

      return id;
    },
    [dismissToast]
  );

  const success = useCallback(
    (title: string, description: string, action?: ToastOptions['action']) =>
      showToast({ type: 'success', title, description, action }),
    [showToast]
  );

  const error = useCallback(
    (title: string, description: string) =>
      showToast({ type: 'error', title, description }),
    [showToast]
  );

  const warning = useCallback(
    (title: string, description: string, action?: ToastOptions['action']) =>
      showToast({ type: 'warning', title, description, action }),
    [showToast]
  );

  const info = useCallback(
    (title: string, description: string) =>
      showToast({ type: 'info', title, description }),
    [showToast]
  );

  const aiInsight = useCallback(
    (title: string, description: string, action?: ToastOptions['action']) =>
      showToast({ type: 'ai_insight', title, description, action }),
    [showToast]
  );

  const achievement = useCallback(
    (title: string, description: string) =>
      showToast({ type: 'achievement', title, description, durationMs: 7000 }),
    [showToast]
  );

  const processing = useCallback(
    (title: string, description: string) =>
      showToast({ type: 'processing', title, description, durationMs: 8000 }),
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        dismissToast,
        success,
        error,
        warning,
        info,
        aiInsight,
        achievement,
        processing,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastOptions[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence mode="sync">
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastOptions;
  onDismiss: (id: string) => void;
}) {
  const getStyling = (type: ToastType) => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
          borderColor: 'border-emerald-500/40',
          bgColor: 'bg-slate-900/95',
          accentGlow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
          badgeText: 'text-emerald-400',
        };
      case 'error':
        return {
          icon: <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />,
          borderColor: 'border-rose-500/40',
          bgColor: 'bg-slate-900/95',
          accentGlow: 'shadow-[0_0_20px_rgba(244,63,94,0.15)]',
          badgeText: 'text-rose-400',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
          borderColor: 'border-amber-500/40',
          bgColor: 'bg-slate-900/95',
          accentGlow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
          badgeText: 'text-amber-400',
        };
      case 'ai_insight':
        return {
          icon: <Brain className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />,
          borderColor: 'border-indigo-500/50',
          bgColor: 'bg-slate-900/95',
          accentGlow: 'shadow-[0_0_25px_rgba(99,102,241,0.25)]',
          badgeText: 'text-indigo-400',
        };
      case 'achievement':
        return {
          icon: <Award className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />,
          borderColor: 'border-yellow-500/50',
          bgColor: 'bg-slate-900/95',
          accentGlow: 'shadow-[0_0_25px_rgba(234,179,8,0.25)]',
          badgeText: 'text-yellow-400',
        };
      case 'processing':
        return {
          icon: <Loader2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 animate-spin" />,
          borderColor: 'border-cyan-500/40',
          bgColor: 'bg-slate-900/95',
          accentGlow: 'shadow-[0_0_20px_rgba(6,182,212,0.2)]',
          badgeText: 'text-cyan-400',
        };
      default:
        return {
          icon: <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />,
          borderColor: 'border-blue-500/40',
          bgColor: 'bg-slate-900/95',
          accentGlow: 'shadow-[0_0_20px_rgba(59,130,246,0.15)]',
          badgeText: 'text-blue-400',
        };
    }
  };

  const style = getStyling(toast.type);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`pointer-events-auto relative w-full rounded-xl border backdrop-blur-xl p-4 text-slate-100 ${style.bgColor} ${style.borderColor} ${style.accentGlow} transition-all`}
    >
      <div className="flex items-start gap-3">
        {style.icon}
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold tracking-tight text-white">{toast.title}</h4>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-slate-300">{toast.description}</p>

          {toast.action && (
            <button
              onClick={() => {
                toast.action?.onClick();
                if (toast.id) onDismiss(toast.id);
              }}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-indigo-500/20 px-2.5 py-1 text-xs font-medium text-indigo-300 hover:bg-indigo-500/30 transition-colors border border-indigo-500/30"
            >
              {toast.action.label}
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

          {toast.progress !== undefined && (
            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <motion.div
                className="h-full bg-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${toast.progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          )}
        </div>

        <button
          onClick={() => toast.id && onDismiss(toast.id)}
          aria-label="Dismiss notification"
          className="rounded-lg p-1 text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
