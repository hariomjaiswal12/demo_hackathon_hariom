import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle({ className = '' }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={label}
      aria-label={label}
      className={`relative w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors border border-slate-200/80 dark:border-slate-700/80 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 scale-100" />
      ) : (
        <Moon className="w-4 h-4 text-slate-600 transition-transform duration-300 rotate-0 scale-100" />
      )}
    </button>
  );
}
