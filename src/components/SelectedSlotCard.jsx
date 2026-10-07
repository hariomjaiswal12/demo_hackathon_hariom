import React from 'react';
import { Clock, SlidersHorizontal } from 'lucide-react';

export function SelectedSlotCard({ selectedSlot, onAdjustSlot }) {
  if (!selectedSlot) {
    return (
      <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-100 text-center mb-4">
        <p className="text-xs font-semibold text-slate-500">No time slot selected yet. Click an available window on the timeline above.</p>
      </div>
    );
  }

  const { timeRange = "3:00 PM – 4:30 PM", duration = "1h 30m", note = "Next available open window" } = selectedSlot;

  return (
    <div className="bg-slate-50/90 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-700/60 mb-4 transition-all">
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 stroke-[2.2]" />
          <span className="text-xs font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
            SELECTED SLOT
          </span>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300">
          {duration}
        </span>
      </div>

      {/* Main Time Range & Subtext + Adjust Action */}
      <div className="flex items-end justify-between gap-3 mt-1">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
            {timeRange}
          </h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
            {note}
          </p>
        </div>

        <button
          onClick={onAdjustSlot}
          className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors py-1 px-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/60"
        >
          <span>Adjust</span>
          <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2.2]" />
        </button>
      </div>
    </div>
  );
}
