import React from 'react';
import { Inbox } from 'lucide-react';

export function EmptyState({ title, description, actionLabel, onReset, icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
      </div>
      <h3 className="text-[15px] font-semibold text-slate-700 dark:text-slate-300 mb-1">{title}</h3>
      {description && (
        <p className="text-[13px] text-slate-400 dark:text-slate-500 max-w-xs leading-relaxed">{description}</p>
      )}
      {onReset && (
        <button
          onClick={onReset}
          className="btn btn-primary btn-sm mt-5 px-5"
        >
          {actionLabel || 'Get Started'}
        </button>
      )}
    </div>
  );
}
