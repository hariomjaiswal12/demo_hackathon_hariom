import React from 'react';

export function TimelineDateSelector({ selectedDate, onSelectDate }) {
  const dates = [
    { id: '23', day: 'Mon', date: '23' },
    { id: '24', day: 'Tue', date: '24' },
    { id: '25', day: 'Wed', date: '25' },
    { id: '26', day: 'Thu', date: '26' },
    { id: '27', day: 'Fri', date: '27' },
  ];

  return (
    <div className="w-full px-4 sm:px-6 mb-4">
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {dates.map((item) => {
          const isSelected = selectedDate === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectDate(item.id)}
              className={`flex flex-col items-center justify-center py-2.5 sm:py-3 rounded-2xl transition-all duration-200 ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-100/90 hover:bg-slate-200/70 text-slate-700'
              }`}
            >
              <span className={`text-xs font-semibold ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                {item.day}
              </span>
              <span className="text-base sm:text-lg font-bold leading-tight mt-0.5">
                {item.date}
              </span>
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
