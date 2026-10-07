import React from 'react';
import { QuickActionCard } from './QuickActionCard';
import { Building2, Calendar, Bookmark, ShieldCheck } from 'lucide-react';

export function QuickActions({ onNavigate, currentUser }) {
  const isAdmin = currentUser?.role === 'ADMIN';

  return (
    <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between h-full shadow-2xs">
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Quick Actions
          </span>
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">Shortcuts</span>
        </div>

        <div className="space-y-2.5">
          <QuickActionCard
            icon={Building2}
            highlight
            title="Reserve Resource"
            description="Find and book available office resources"
            onClick={() => onNavigate('resource-details')}
          />
          <QuickActionCard
            icon={Calendar}
            iconBg="bg-violet-50 dark:bg-violet-950/60"
            iconColor="text-violet-600 dark:text-violet-400"
            title="View Timeline"
            description="Check real-time availability grid"
            onClick={() => onNavigate('timeline')}
          />
          <QuickActionCard
            icon={Bookmark}
            iconBg="bg-emerald-50 dark:bg-emerald-950/60"
            iconColor="text-emerald-600 dark:text-emerald-400"
            title="My Bookings"
            description="Manage active check-ins & passes"
            onClick={() => onNavigate('bookings')}
          />
          {isAdmin && (
            <QuickActionCard
              icon={ShieldCheck}
              iconBg="bg-slate-100 dark:bg-slate-800"
              iconColor="text-slate-700 dark:text-slate-300"
              title="Resource Registry"
              description="Admin console to edit & manage assets"
              onClick={() => onNavigate('admin')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
