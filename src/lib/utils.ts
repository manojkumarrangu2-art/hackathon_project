import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatScore(score: number, maxMarks: number = 10): string {
  return `${score.toFixed(1)} / ${maxMarks}`;
}

export function getScorePercentage(score: number, maxMarks: number = 10): number {
  if (maxMarks <= 0) return 0;
  return Math.round((score / maxMarks) * 100);
}

export function getScoreColor(percentage: number): {
  text: string;
  bg: string;
  border: string;
  ring: string;
  badge: string;
} {
  if (percentage >= 80) {
    return {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      ring: 'stroke-emerald-400',
      badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    };
  }
  if (percentage >= 60) {
    return {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      ring: 'stroke-amber-400',
      badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    };
  }
  return {
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    ring: 'stroke-rose-400',
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  };
}

export function getSeverityBadge(severity: 'critical' | 'moderate' | 'minor' | 'Critical' | 'Weak' | 'Moderate' | 'Mastered') {
  const s = severity.toLowerCase();
  if (s === 'critical') {
    return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
  }
  if (s === 'weak' || s === 'moderate') {
    return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  }
  if (s === 'mastered') {
    return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  }
  return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
}

export function countWords(text: string): number {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

export function estimateReadingTimeMinutes(text: string): number {
  const words = countWords(text);
  return Math.max(1, Math.ceil(words / 200));
}

export function getSafeLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function setSafeLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing to localStorage key "${key}":`, error);
  }
}
