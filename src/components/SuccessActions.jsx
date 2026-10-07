import React from 'react';
import { ArrowRight, LayoutGrid } from 'lucide-react';

export function SuccessActions({ onViewMyBookings, onReturnToDashboard }) {
  return (
    <div className="w-full space-y-2.5 mb-6">
      {/* Primary CTA */}
      <button
        onClick={onViewMyBookings}
        className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>View My Bookings</span>
        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
      </button>

      {/* Secondary CTA */}
      <button
        onClick={onReturnToDashboard}
        className="w-full py-3.5 px-4 rounded-2xl bg-slate-100/90 hover:bg-slate-200/80 active:scale-[0.99] text-slate-700 font-bold text-sm border border-slate-200/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <LayoutGrid className="w-4 h-4 text-slate-500" />
        <span>Return to Dashboard</span>
      </button>
    </div>
  );
}
