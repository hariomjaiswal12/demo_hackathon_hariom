import React from 'react';
import { ActivityItem } from './ActivityItem';
import { Activity, ArrowRight } from 'lucide-react';

export function RecentActivity({ bookings = [], currentUser, isLoading = false, onNavigate }) {
  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-2xs">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            Recent Activity
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Real-time workspace activity feed</p>
        </div>
        <button
          onClick={() => onNavigate('timeline')}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
        >
          View timeline <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3 py-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-10 rounded-xl" />
          ))}
        </div>
      ) : recentBookings.length > 0 ? (
        <div className="py-1">
          {recentBookings.map((b, idx) => (
            <ActivityItem
              key={b._id || b.id || idx}
              booking={b}
              currentUser={currentUser}
              isLast={idx === recentBookings.length - 1}
            />
          ))}
        </div>
      ) : (
        <div className="py-6 text-center text-slate-400 dark:text-slate-500 text-xs font-medium">
          No recent activity logged yet.
        </div>
      )}
    </div>
  );
}
