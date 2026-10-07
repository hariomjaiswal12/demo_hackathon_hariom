import React from 'react';
import { LayoutGrid, Building2, Bookmark, Calendar, ShieldCheck, LogOut } from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';
import { ThemeToggle } from './ThemeToggle';

// DeskDrop SVG Logo
function DeskDropIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
    </svg>
  );
}

// Avatar initials fallback
function Avatar({ name = 'User', size = 'md' }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const sizes = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-10 h-10 text-sm',
  };
  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold shrink-0`}>
      {initials}
    </div>
  );
}

export function AppShell({ children, activeTab = 'Bookings', onTabChange, currentUser, onLogout }) {
  const allSidebarItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'Resources', label: 'Resources', icon: Building2 },
    { id: 'Bookings', label: 'My Bookings', icon: Bookmark },
    { id: 'Calendar', label: 'Timeline', icon: Calendar },
    { id: 'Admin', label: 'Resource Registry', icon: ShieldCheck, adminOnly: true },
  ];

  const userRole = currentUser?.role || 'USER';
  const sidebarItems = allSidebarItems.filter((item) => !item.adminOnly || userRole === 'ADMIN');

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside className="hidden md:flex flex-col w-60 lg:w-64 bg-white dark:bg-[#0F172A] border-r border-slate-200 dark:border-slate-800 shrink-0 sticky top-0 h-screen transition-colors duration-200">
        {/* Logo Header */}
        <div className="flex items-center justify-between px-5 pt-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
              <DeskDropIcon size={16} />
            </div>
            <div>
              <h1 className="text-[15px] font-bold text-slate-900 dark:text-white leading-tight tracking-tight">DeskDrop</h1>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Resource System</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Main Nav */}
        <nav className="flex-1 px-3 pt-6 space-y-0.5 overflow-y-auto no-scrollbar">
          <p className="px-3 mb-2 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Navigation</p>
          {sidebarItems.filter(i => i.id !== 'Admin').map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange && onTabChange(item.id)}
                className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 group ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-semibold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-indigo-600 dark:bg-indigo-500 rounded-r-full" />
                )}
                <Icon className={`w-[18px] h-[18px] shrink-0 ${
                  isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                }`} strokeWidth={isActive ? 2.2 : 1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Admin Section */}
          {sidebarItems.some(i => i.id === 'Admin') && (
            <>
              <div className="pt-4 pb-2">
                <p className="px-3 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Administration</p>
              </div>
              {sidebarItems.filter(i => i.id === 'Admin').map((item) => {
                const Icon = item.icon;
                const isActive = item.id === activeTab;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange && onTabChange(item.id)}
                    className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 group ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-semibold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-indigo-600 dark:bg-indigo-500 rounded-r-full" />
                    )}
                    <Icon className={`w-[18px] h-[18px] shrink-0 ${
                      isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                    }`} strokeWidth={isActive ? 2.2 : 1.8} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </>
          )}
        </nav>

        {/* User Profile */}
        <div className="px-3 py-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-3 px-2">
            <Avatar name={currentUser?.name || 'User'} size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 truncate leading-tight">
                {currentUser?.name || 'User'}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md uppercase ${
                  userRole === 'ADMIN'
                    ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}>
                  {userRole}
                </span>
              </div>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                title="Sign Out"
                aria-label="Sign Out"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors shrink-0"
              >
                <LogOut className="w-[15px] h-[15px]" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 min-w-0 pb-20 md:pb-8 overflow-x-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-0 md:px-0">
          {children}
        </div>
      </main>

      {/* ===== MOBILE BOTTOM NAV ===== */}
      <BottomNavigation activeTab={activeTab} onTabClick={onTabChange} userRole={userRole} />
    </div>
  );
}
