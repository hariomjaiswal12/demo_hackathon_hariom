import React from 'react';

export function TimelineBlock({ block, isSelected, onClick }) {
  const { status, label, sublabel, widthPercent } = block;

  const getBlockStyle = () => {
    if (isSelected) {
      return 'bg-emerald-400 text-slate-900 font-bold border-2 border-emerald-600 shadow-md z-10';
    }

    switch (status) {
      case 'AVAILABLE':
        return 'bg-emerald-100 hover:bg-emerald-200/90 text-emerald-800 font-semibold cursor-pointer border-r border-white/80';
      case 'MY_BOOKING':
        return 'bg-indigo-600 text-white font-bold cursor-pointer shadow-xs border-r border-white/80';
      case 'BOOKED':
        return 'bg-indigo-100/90 text-indigo-800 font-semibold cursor-not-allowed border-r border-white/80';
      case 'MAINTENANCE':
        return 'bg-slate-200 text-slate-600 font-semibold cursor-not-allowed border-r border-white/80 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:6px_6px]';
      case 'LIVE':
        return 'bg-rose-100 text-rose-700 font-bold border-r border-white/80';
      default:
        return 'bg-slate-100 text-slate-600';
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
