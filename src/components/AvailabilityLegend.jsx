import React from 'react';

export function AvailabilityLegend() {
  const legendItems = [
    { label: 'Available', dotBg: 'bg-emerald-400' },
    { label: 'My Booking', dotBg: 'bg-indigo-600' },
    { label: 'Booked', dotBg: 'bg-indigo-200' },
    { label: 'Maintenance', dotBg: 'bg-slate-300' },
  ];

  return (
    <div className="w-full px-4 sm:px-6 mb-4">
      <div className="bg-white rounded-2xl py-2.5 px-4 shadow-xs border border-slate-100 flex items-center justify-around flex-wrap gap-2 text-xs font-semibold text-slate-600">
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
