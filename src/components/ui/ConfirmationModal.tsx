'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, HelpCircle, Trash2, CheckCircle2, Loader2, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'primary';
  isLoading?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary',
  isLoading = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: <Trash2 className="h-6 w-6 text-rose-400" />,
          iconBg: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
          btnBg: 'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)]',
          borderColor: 'border-rose-500/30',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="h-6 w-6 text-amber-400" />,
          iconBg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
          btnBg: 'bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]',
          borderColor: 'border-amber-500/30',
        };
      default:
        return {
          icon: <HelpCircle className="h-6 w-6 text-indigo-400" />,
          iconBg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
          btnBg: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]',
          borderColor: 'border-indigo-500/30',
        };
    }
  };

  const style = getVariantStyles();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={isLoading ? undefined : onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className={`relative w-full max-w-md rounded-2xl border ${style.borderColor} bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl z-10 text-slate-100`}
        >
          <button
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-4 right-4 rounded-lg p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${style.iconBg}`}>
              {style.icon}
            </div>

            <div className="flex-1">
              <h3 className="text-base font-semibold text-white tracking-tight">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">{description}</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors disabled:opacity-50"
            >
              {cancelLabel}
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all disabled:opacity-50 ${style.btnBg}`}
            >
              {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {confirmLabel}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
