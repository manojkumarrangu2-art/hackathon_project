'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Brain,
  Bell,
  Sparkles,
  ShieldCheck,
  Check,
  ArrowRight,
  ExternalLink,
  Flame,
  Menu,
  X,
  LogIn,
  UserPlus,
  User,
  Settings,
  LogOut,
  UploadCloud,
} from 'lucide-react';
import { useExamAce } from '../../lib/store/examAceStore';

export function Navbar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const pathname = usePathname();
  const { user, notifications, markAllNotificationsAsRead } = useExamAce();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left: Brand & Sidebar toggle */}
        <div className="flex items-center gap-4">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden rounded-lg p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:scale-105 transition-transform">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <Brain className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                  ExamAce
                </span>
                <span className="hidden sm:inline-block rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
                  AI Marks Agent
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-slate-400 font-medium -mt-0.5">
                Don&apos;t just study. Learn how to score.
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Quick navigation pill */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-slate-800/80 bg-slate-900/60 p-1 backdrop-blur-md">
          <Link
            href="/dashboard"
            className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
              pathname === '/dashboard'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/ask"
            className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
              pathname === '/ask'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Ask AI (Marks-Aware)
          </Link>
          <Link
            href="/practice"
            className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
              pathname === '/practice'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Practice Mode
          </Link>
          <Link
            href="/evaluate"
            className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
              pathname === '/evaluate'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Evaluate &amp; Diff
          </Link>
          <Link
            href="/materials"
            className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
              pathname === '/materials'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Study Materials
          </Link>
          <Link
            href="/mock-exam"
            className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors ${
              pathname === '/mock-exam'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Mock Exam
          </Link>
        </nav>

        {/* Right: Actions, Auth Buttons & User Info */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Direct Visible Auth Links for convenience */}
          <Link
            href="/login"
            className="hidden md:inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </Link>

          <Link
            href="/register"
            className="hidden md:inline-flex items-center gap-1 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-100 px-3 py-1.5 transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5 text-indigo-400" />
            <span>Register</span>
          </Link>

          {/* Hackathon Demo CTA button */}
          <Link
            href="/demo"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-3 py-1.5 text-xs font-semibold text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Judge Demo</span>
          </Link>

          {/* Streak indicator */}
          <div className="flex items-center gap-1 rounded-xl bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs font-semibold text-amber-400">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>{user.streakDays}d</span>
          </div>

          {/* Notifications dropdown trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="relative rounded-xl border border-slate-800 bg-slate-900/80 p-2 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-[0_0_8px_rgba(244,63,94,0.5)]">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-800 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-2xl z-50 text-slate-100 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Smart Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-semibold text-rose-300 border border-rose-500/30">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-6">No notifications yet.</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`rounded-xl border p-2.5 transition-colors ${
                          n.isRead
                            ? 'border-slate-800/60 bg-slate-950/40 text-slate-400'
                            : 'border-indigo-500/30 bg-indigo-500/5 text-slate-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-white">{n.title}</h4>
                          <span className="text-[10px] text-slate-500 shrink-0">{n.createdAt}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                        {n.actionLabel && n.actionHref && (
                          <Link
                            href={n.actionHref}
                            onClick={() => setShowNotifications(false)}
                            className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-indigo-400 hover:text-indigo-300"
                          >
                            {n.actionLabel}
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User profile avatar & menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-1.5 pr-2.5 hover:border-slate-700 transition-colors"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white shadow-sm">
                {user.name.charAt(0)}
              </div>
              <div className="hidden xl:block text-left">
                <span className="text-xs font-semibold text-white block leading-tight">
                  {user.name}
                </span>
                <span className="text-[10px] text-slate-400 block leading-tight">
                  Sem {user.semester} • {user.overallEstimatedScore}/10 Avg
                </span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-800 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-2xl z-50 text-slate-200 animate-in fade-in slide-in-from-top-2">
                <div className="p-2 border-b border-slate-800/80 mb-1">
                  <p className="text-xs font-bold text-white truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                </div>

                <div className="space-y-0.5">
                  <Link
                    href="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Student Profile</span>
                  </Link>
                  <Link
                    href="/materials?upload=true"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-cyan-300 hover:bg-slate-800 hover:text-cyan-200 transition-colors"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload Document (RAG)</span>
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-indigo-400" />
                    <span>AI Settings</span>
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-amber-300 hover:bg-slate-800 hover:text-amber-200 transition-colors"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Switch Account (Login)</span>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-indigo-300 hover:bg-slate-800 hover:text-indigo-200 transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Register New Student</span>
                  </Link>
                </div>

                <div className="pt-1 mt-1 border-t border-slate-800/80">
                  <Link
                    href="/login"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
