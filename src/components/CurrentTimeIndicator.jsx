import React from 'react';

export function CurrentTimeIndicator({ timeLabel = "2:15 PM", positionPercent = 64 }) {
  return (
    <div 
      className="absolute top-0 bottom-0 z-20 flex flex-col items-center pointer-events-none"
      style={{ left: `${positionPercent}%` }}
    >
      {/* Top Red Time Tag */}
      <span className="bg-rose-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-sm shadow-xs -mt-2.5 whitespace-nowrap">
        {timeLabel}
      </span>
      {/* Vertical Red Line */}
      <div className="w-0.5 flex-1 bg-rose-600 shadow-xs"></div>
    </div>
  );
}
