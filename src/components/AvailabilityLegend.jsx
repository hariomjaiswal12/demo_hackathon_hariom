import React from 'react';

export function AvailabilityLegend() {
  const legendItems = [
    { label: 'Available', dotBg: 'bg-emerald-400' },
    { label: 'My Booking', dotBg: 'bg-indigo-600' },
    { label: 'Booked', dotBg: 'bg-indigo-200 dark:bg-indigo-800' },
    { label: 'Maintenance', dotBg: 'bg-slate-300 dark:bg-slate-600' },
  ];

  return (
    <div className="w-full px-4 sm:px-6 mb-4">
      <div className="bg-white dark:bg-[#111827] rounded-2xl py-2.5 px-4 shadow-xs border border-slate-100 dark:border-slate-800 flex items-center justify-around flex-wrap gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 transition-colors duration-200">
        {legendItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${item.dotBg}`}></span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
