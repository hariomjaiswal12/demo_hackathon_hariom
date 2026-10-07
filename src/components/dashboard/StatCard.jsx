import React from 'react';

export function StatCard({ label, value, icon: Icon, iconBg, iconColor, sub, subColor }) {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between h-[145px]">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{label}</span>
        <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-4 h-4 ${iconColor}`} strokeWidth={2} />
        </div>
      </div>

      <div>
        {value === null ? (
          <div className="skeleton h-8 w-16 rounded-lg" />
        ) : (
          <p className="text-3xl font-black text-slate-900 dark:text-white leading-none tracking-tight">{value}</p>
        )}
        <p className={`text-xs font-semibold mt-2 ${subColor || 'text-slate-400 dark:text-slate-500'}`}>{sub}</p>
      </div>
    </div>
  );
}
