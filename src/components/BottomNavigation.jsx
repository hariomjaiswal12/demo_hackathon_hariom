import React from 'react';
import { LayoutGrid, Building2, Bookmark, Calendar, ShieldCheck } from 'lucide-react';

export function BottomNavigation({ activeTab = 'Bookings', onTabClick, userRole = 'USER' }) {
  const allNavItems = [
    { id: 'Dashboard', label: 'Home', icon: LayoutGrid },
    { id: 'Resources', label: 'Resources', icon: Building2 },
    { id: 'Bookings', label: 'Bookings', icon: Bookmark },
    { id: 'Calendar', label: 'Timeline', icon: Calendar },
    { id: 'Admin', label: 'Admin', icon: ShieldCheck, adminOnly: true },
  ];

  const navItems = allNavItems.filter((item) => !item.adminOnly || userRole === 'ADMIN');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/98 dark:bg-[#0F172A]/98 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 md:hidden transition-colors duration-200">
      <div className="flex items-stretch justify-around px-1 safe-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeTab;
          return (
            <button
              key={item.id}
              onClick={() => onTabClick && onTabClick(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors relative ${
                isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 active:text-slate-600 dark:active:text-slate-300'
              }`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active dot indicator */}
              <div className="relative">
                <Icon 
                  className={`w-[22px] h-[22px] transition-all ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`}
                  strokeWidth={isActive ? 2.2 : 1.7} 
                />
              </div>
              <span className={`text-[10px] leading-tight font-medium ${isActive ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-400 dark:text-slate-500'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 h-0.5 w-6 bg-indigo-600 dark:bg-indigo-400 rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
