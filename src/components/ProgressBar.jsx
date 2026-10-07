import React from 'react';

export function ProgressBar({ progress = 65, color = "emerald" }) {
  const getBarColor = () => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-700';
      case 'indigo':
        return 'bg-indigo-600';
      default:
        return 'bg-emerald-700';
    }
  };

  return (
    <div className="w-full bg-emerald-100/70 h-1.5 rounded-full overflow-hidden mt-2">
      <div 
        className={`h-full ${getBarColor()} rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}
