import React, { useState } from 'react';
import { Search, Bell, SlidersHorizontal } from 'lucide-react';

export function TimelineHeader({ onFilterClick, avatarUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" }) {
  const [viewMode, setViewMode] = useState('day'); // 'day' or 'week'

  return (
    <header className="w-full pt-4 pb-2 px-4 sm:px-6">
      {/* Top Navbar */}
      <div className="flex items-center justify-between mb-4">
        {/* Logo and App Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white font-bold text-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight tracking-tight">DeskDrop</h2>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-none">Resources</p>
          </div>
        </div>

        {/* Right Top Actions */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Search"
            className="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </button>
          
          <button
            aria-label="Notifications"
            className="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors relative"
          >
            <Bell className="w-5 h-5 stroke-[2]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-slate-900"></span>
          </button>

          {/* User Avatar */}
          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white dark:ring-slate-800 shadow-xs border border-slate-200 dark:border-slate-700 cursor-pointer">
            <img 
              src={avatarUrl} 
              alt="User profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Page Title + Day/Week Segmented Control + Filter Button */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Timeline</h1>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 uppercase tracking-wide">
            LIVE
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Day / Week Switch */}
          <div className="bg-slate-200/70 dark:bg-slate-800/80 p-1 rounded-2xl flex items-center gap-1 border border-slate-200/50 dark:border-slate-700/50">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'day'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => {
                setViewMode('week');
                alert('Week view coming soon. Showing daily timeline schedule.');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'week'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Week
            </button>
          </div>

          {/* Filter Button */}
          <button 
            onClick={onFilterClick}
            aria-label="Filter timeline"
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200/60 dark:border-slate-700"
          >
            <SlidersHorizontal className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </header>
  );
}
