'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  PenTool,
  Brain,
  BarChart3,
  User,
  Sparkles,
} from 'lucide-react';

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Practice', href: '/practice', icon: PenTool },
    { label: 'Ask AI', href: '/ask', icon: Brain },
    { label: 'Demo', href: '/demo', icon: Sparkles, highlight: true },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
    { label: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/95 p-2 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
                item.highlight
                  ? 'text-amber-400 font-bold'
                  : isActive
                  ? 'text-indigo-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-lg ${
                  item.highlight
                    ? 'bg-amber-500/20 text-amber-400'
                    : isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
