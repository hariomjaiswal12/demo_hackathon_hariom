import React from 'react';

const TABS = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

export function BookingTabs({ activeTab, onTabChange, counts = {} }) {
  return (
    <div className="flex items-center gap-1 px-5 md:px-6 pb-4 overflow-x-auto no-scrollbar">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const count = counts[tab.id];
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all whitespace-nowrap ${
              isActive
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
            }`}
          >
            {tab.label}
            {typeof count === 'number' && count > 0 && (
              <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none ${
                isActive
                  ? 'bg-white/25 text-white'
                  : 'bg-slate-300 text-slate-600'
              }`}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
