import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ExamAceProvider } from '@/lib/store/examAceStore';
import { ToastProvider } from '@/components/toast/ToastContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ExamAce — Don’t just study. Learn how to score.',
  description:
    'An AI marks-optimization agent that understands exam questions, generates marks-aware answers, evaluates your responses, identifies recurring weaknesses, and trains you to improve.',
  keywords: [
    'ExamAce',
    'AI Exam Preparation',
    'Marks Optimization',
    'Engineering Exams',
    'Answer Evaluation',
    'Recurring Weakness Detection',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark h-full`}>
      <body className="min-h-full bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
        <ExamAceProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ExamAceProvider>
      </body>
    </html>
  );
}
