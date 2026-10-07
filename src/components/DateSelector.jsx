import React from 'react';

export function DateSelector({ selectedDate, onSelectDate }) {
  const dates = [
    { id: 'today', tag: 'TODAY', label: 'Mon 23 Oct' },
    { id: 'tomorrow', tag: 'TOMORROW', label: 'Tue 24' },
    { id: 'upcoming', tag: 'UPCOMING', label: 'Wed 25' },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
      {dates.map((item) => {
        const isSelected = selectedDate === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectDate(item.id)}
            className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl transition-all duration-200 ${
              isSelected
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 border border-indigo-500'
                : 'bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-transparent dark:border-slate-700/50'
            }`}
          >
            <span className={`text-[10px] sm:text-xs font-bold tracking-wider uppercase ${
              isSelected ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
            }`}>
              {item.tag}
            </span>
            <span className="text-xs sm:text-sm font-bold mt-0.5 whitespace-nowrap">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
