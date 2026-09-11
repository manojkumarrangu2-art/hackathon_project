'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Brain,
  PenTool,
  CheckCircle2,
  Clock,
  BookOpen,
  FolderOpen,
  BarChart3,
  Calendar,
  User,
  Settings,
  Sparkles,
  ShieldAlert,
  ChevronRight,
  LogIn,
  UserPlus,
  UploadCloud,
} from 'lucide-react';
import { useExamAce } from '../../lib/store/examAceStore';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { weaknesses } = useExamAce();

  const criticalWeaknessCount = weaknesses.filter(
    (w) => w.severity === 'Critical' || w.recurringLossCount >= 4
  ).length;

  const navItems = [
    {
      group: 'Core Agent Loop',
      items: [
        {
          label: 'Dashboard',
          href: '/dashboard',
          icon: LayoutDashboard,
          badge: null,
        },
        {
          label: 'Ask ExamAce',
          href: '/ask',
          icon: Brain,
          badge: 'Marks AI',
          badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
        },
        {
          label: 'Practice Mode',
          href: '/practice',
          icon: PenTool,
          badge: null,
        },
        {
          label: 'Evaluate & Diff',
          href: '/evaluate',
          icon: CheckCircle2,
          badge: 'Signature',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        },
        {
          label: 'Mock Exam',
          href: '/mock-exam',
          icon: Clock,
          badge: 'Timed',
          badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        },
      ],
    },
    {
      group: 'Academic Knowledge',
      items: [
        {
          label: 'Subjects & Syllabi',
          href: '/subjects',
          icon: BookOpen,
          badge: null,
        },
        {
          label: 'Study Materials & Upload',
          href: '/materials',
          icon: UploadCloud,
          badge: 'Upload',
          badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        },
      ],
    },
    {
      group: 'Performance & Growth',
      items: [
        {
          label: 'Analytics & Trends',
          href: '/analytics',
          icon: BarChart3,
          badge: null,
        },
        {
          label: 'Personalized Study Plan',
          href: '/study-plan',
          icon: Calendar,
          badge: null,
        },
        {
          label: 'Student Profile',
          href: '/profile',
          icon: User,
          badge: null,
        },
        {
          label: 'Settings & AI Models',
          href: '/settings',
          icon: Settings,
          badge: null,
        },
      ],
    },
    {
      group: 'Account & Access',
      items: [
        {
          label: 'Sign In (Login)',
          href: '/login',
          icon: LogIn,
          badge: 'Auth',
          badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
        },
        {
          label: 'Create Account',
          href: '/register',
          icon: UserPlus,
          badge: null,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && onClose && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 border-r border-slate-800/80 bg-slate-950/95 p-4 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="overflow-y-auto pr-1">
          {/* Brand header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 text-white font-bold text-sm shadow-md">
                EA
              </div>
              <div>
                <span className="font-extrabold text-sm tracking-tight text-white block">
                  ExamAce
                </span>
                <span className="text-[10px] text-indigo-400 font-medium block -mt-0.5">
                  AI Marks Optimization
                </span>
              </div>
            </Link>
          </div>

          {/* Hackathon Judge Demo Banner */}
          <Link
            href="/demo"
            onClick={onClose}
            className={`group mb-4 block rounded-xl border p-3 transition-all ${
              pathname === '/demo'
                ? 'border-amber-500/50 bg-amber-500/15 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                : 'border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:border-amber-500/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                Live Judge Demo
              </span>
              <span className="text-[10px] font-mono font-semibold bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-300 border border-amber-500/30">
                60s Flow
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors">
              Closed-loop agent walkthrough without account setup.
            </p>
          </Link>

          {/* Navigation Groups */}
          <div className="space-y-6">
            {navItems.map((group, gIdx) => (
              <div key={gIdx}>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
                  {group.group}
                </h4>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white font-semibold shadow-[0_0_15px_rgba(79,70,229,0.3)]'
                            : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                          <span>{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`rounded-full px-2 py-0.5 text-[9px] font-semibold border ${
                              isActive ? 'bg-white/20 text-white border-white/30' : item.badgeColor
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Card: Active Weakness alert */}
        {criticalWeaknessCount > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <Link
              href="/practice?weakness=wk_complexity_analysis"
              onClick={onClose}
              className="flex items-center justify-between rounded-xl border border-rose-500/30 bg-rose-500/10 p-2.5 text-xs text-rose-300 hover:bg-rose-500/15 transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="font-semibold text-[11px] leading-tight">
                  {criticalWeaknessCount} Recurring Weakness Active
                </span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
