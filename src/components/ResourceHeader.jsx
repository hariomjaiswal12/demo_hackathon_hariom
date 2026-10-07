import React from 'react';
import { ArrowLeft } from 'lucide-react';

export function ResourceHeader({ title = "New Reservation", onBack, avatarUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" }) {
  return (
    <header className="w-full pt-4 pb-3 px-4 sm:px-6 flex items-center justify-between">
      {/* Left Group: Back Button + Logo + Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          aria-label="Back to bookings"
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* DeskDrop Small Brand Icon */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-xs">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
          </svg>
        </div>

        <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>
      </div>

      {/* Right Group: User Avatar */}
      <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white dark:ring-slate-800 shadow-xs border border-slate-200 dark:border-slate-700 cursor-pointer">
        <img
          src={avatarUrl}
          alt="User Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </header>
  );
}
