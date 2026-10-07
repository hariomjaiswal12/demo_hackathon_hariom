import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';

export function QuickActionCard({ icon: Icon, iconBg, iconColor, title, description, onClick, highlight }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 group flex items-center justify-between gap-3 ${
        highlight
          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/15 hover:bg-indigo-700'
          : 'bg-white dark:bg-[#111827] border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-2xs text-slate-900 dark:text-white'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
          highlight ? 'bg-white/15 text-white' : `${iconBg} ${iconColor}`
        }`}>
          {highlight ? <Plus className="w-5 h-5 stroke-[2.5]" /> : <Icon className="w-4 h-4" strokeWidth={2} />}
        </div>
        <div className="min-w-0">
          <h4 className={`text-xs sm:text-sm font-bold leading-snug truncate ${
            highlight ? 'text-white' : 'text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
          }`}>
            {title}
          </h4>
          <p className={`text-[11px] truncate mt-0.5 ${
            highlight ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
          }`}>
            {description}
          </p>
        </div>
      </div>

      <ArrowRight className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${
        highlight ? 'text-white/80' : 'text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
      }`} />
    </button>
  );
}
