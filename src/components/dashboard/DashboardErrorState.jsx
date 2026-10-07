import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export function DashboardErrorState({ onRetry }) {
  return (
    <div className="bg-white rounded-2xl border border-rose-200/80 p-8 sm:p-10 text-center max-w-lg mx-auto shadow-xs my-8">
      <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-slate-900">Unable to load dashboard</h3>
      <p className="text-xs text-slate-500 mt-1">
        We couldn't connect to your workspace API to fetch live resources and bookings.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors inline-flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry Connection
        </button>
      )}
    </div>
  );
}
