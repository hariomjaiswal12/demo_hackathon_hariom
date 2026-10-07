import React from 'react';

export function TimelineBlock({ block, isSelected, onClick }) {
  const { status, label, sublabel, widthPercent } = block;

  const getBlockStyle = () => {
    if (isSelected) {
      return 'bg-emerald-400 text-slate-950 font-bold border-2 border-emerald-500 shadow-md shadow-emerald-500/20 z-10';
    }

    switch (status) {
      case 'AVAILABLE':
        return 'bg-emerald-100/90 hover:bg-emerald-200 dark:bg-emerald-950/70 dark:hover:bg-emerald-900/80 text-emerald-900 dark:text-emerald-300 font-semibold cursor-pointer border-r border-white/60 dark:border-slate-800/80';
      case 'MY_BOOKING':
        return 'bg-indigo-600 dark:bg-indigo-600 text-white font-bold cursor-pointer shadow-xs border-r border-white/60 dark:border-slate-800/80';
      case 'BOOKED':
        return 'bg-indigo-100/90 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-300 font-semibold cursor-not-allowed border-r border-white/60 dark:border-slate-800/80';
      case 'MAINTENANCE':
        return 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold cursor-not-allowed border-r border-white/60 dark:border-slate-800/80 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:6px_6px]';
      case 'LIVE':
        return 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 font-bold border-r border-white/60 dark:border-slate-800/80';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
    }
  };

  return (
    <div
      onClick={onClick}
      style={{ width: `${widthPercent}%` }}
      className={`h-full flex flex-col justify-center px-1.5 overflow-hidden text-[10px] sm:text-[11px] leading-tight transition-all ${getBlockStyle()}`}
      title={`${status}: ${label || ''} ${sublabel || ''}`}
    >
      {isSelected ? (
        <div className="flex items-center gap-1 font-bold text-slate-900 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-800 animate-pulse shrink-0"></span>
          <span className="truncate">Selected</span>
        </div>
      ) : (
        <>
          {label && <span className="truncate font-bold">{label}</span>}
          {sublabel && <span className="truncate text-[9px] opacity-80">{sublabel}</span>}
        </>
      )}
    </div>
  );
}
