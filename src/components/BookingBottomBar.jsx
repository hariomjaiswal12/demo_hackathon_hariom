import React from 'react';
import { ArrowRight } from 'lucide-react';

export function BookingBottomBar({ selectedSlot, onContinue }) {
  const isEnabled = Boolean(selectedSlot);
  const timeText = selectedSlot ? selectedSlot.timeRange : "No Slot Selected";
  const durationText = selectedSlot ? selectedSlot.duration : "";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-xl py-3 px-4 sm:px-6">
      <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto flex items-center justify-between gap-3">
        {/* Left Information */}
        <div>
          <span className="text-[10px] sm:text-xs font-bold tracking-wider text-slate-400 uppercase block">
            ACTIVE ALLOCATION
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xs sm:text-sm font-bold text-slate-900">
              {timeText}
            </span>
            {durationText && (
              <span className="text-xs font-semibold text-slate-500">
                ({durationText})
              </span>
            )}
          </div>
        </div>

        {/* Right CTA Button */}
        <button
          disabled={!isEnabled}
          onClick={onContinue}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            isEnabled
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/25 active:scale-[0.98] cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Continue to Booking</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
