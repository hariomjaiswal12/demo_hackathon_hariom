import React from 'react';
import { Search, Bell, SlidersHorizontal } from 'lucide-react';

export function Header({ 
  title = 'My Bookings', 
  subtitle = '',
  onFilterClick,
  currentUser,
  actions
}) {
  return (
    <header className="w-full bg-white border-b border-slate-200 px-5 md:px-6 pt-5 pb-4 sticky top-0 z-30">
      {/* Page Title Row */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[22px] font-bold text-slate-900 leading-tight tracking-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[13px] text-slate-500 mt-0.5 leading-snug font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onFilterClick && (
            <button
              onClick={onFilterClick}
              aria-label="Filter"
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <SlidersHorizontal className="w-[18px] h-[18px]" strokeWidth={1.8} />
            </button>
          )}

          <button
            aria-label="Notifications"
            className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-[18px] h-[18px]" strokeWidth={1.8} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-indigo-600" />
          </button>

          {actions}
        </div>
      </div>
    </header>
  );
}
