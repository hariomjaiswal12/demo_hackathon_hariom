import React from 'react';

export function ResourceFilter({ selectedCategory, onSelectCategory }) {
  const filters = [
    { id: 'all', label: 'All Resources' },
    { id: 'mics', label: 'Audio Mics' },
    { id: 'displays', label: 'Displays' },
    { id: 'vr', label: 'VR Kits' },
    { id: 'laptops', label: 'Laptops' },
  ];

  return (
    <div className="w-full px-4 sm:px-6 mb-4">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {filters.map((filter) => {
          const isSelected = selectedCategory === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => onSelectCategory(filter.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100/90 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-700/80 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
