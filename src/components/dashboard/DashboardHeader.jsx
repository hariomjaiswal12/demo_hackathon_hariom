import React from 'react';
import { Bell, Calendar as CalendarIcon } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';

function Avatar({ name = 'User' }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-xs font-bold shadow-2xs shrink-0">
      {initials}
    </div>
  );
}

export function DashboardHeader({ currentUser }) {
  const firstName = currentUser?.name?.split(' ')[0] || 'there';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const todayDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="bg-white dark:bg-[#0F172A] border-b border-slate-200/80 dark:border-slate-800 px-6 lg:px-8 py-4 mb-6 transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {greeting}, {firstName} 👋
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
            {todayDateStr} • Workspace overview & active resource schedule
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70 text-slate-600 dark:text-slate-300 text-xs font-medium">
            <CalendarIcon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>{todayDateStr}</span>
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="relative w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700/70 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
          >
            <Bell className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-slate-900" />
          </button>

          <ThemeToggle />

          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
            <Avatar name={currentUser?.name} />
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[120px]">
                {currentUser?.name || 'Sarah Jenkins'}
              </p>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {currentUser?.role || 'USER'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
