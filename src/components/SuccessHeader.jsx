import React from 'react';
import { Check } from 'lucide-react';

export function SuccessHeader({ status = "CONFIRMED", title = "Booking Confirmed", subtitle = "Your reservation has been locked into the system schedule." }) {
  return (
    <div className="w-full text-center pt-2 pb-6 px-4">
      {/* Large Green Success Icon */}
      <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-600/20 ring-8 ring-emerald-100">
        <Check className="w-8 h-8 stroke-[3]" />
      </div>

      {/* Confirmed Status Pill */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
        <span>{status}</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
        {title}
      </h1>

      {/* Subtitle */}
      <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
