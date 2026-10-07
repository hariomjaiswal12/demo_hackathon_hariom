import React from 'react';
import { Mic, MapPin, Cable, Bookmark, AlertCircle } from 'lucide-react';

export function ResourceSummaryCard({ selectedSlot, onReserveSlot }) {
  const isEnabled = Boolean(selectedSlot);

  if (!selectedSlot) {
    return (
      <div className="bg-slate-50/90 rounded-3xl p-5 border border-slate-100 text-center mb-6">
        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2">
          <AlertCircle className="w-5 h-5" />
        </div>
        <h4 className="font-bold text-slate-800 text-sm">Select an Available Slot</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          Click any green available time block on the timeline above to view details and reserve the resource.
        </p>
        <button
          disabled
          className="w-full mt-4 py-3.5 rounded-2xl bg-slate-200 text-slate-400 font-bold text-sm cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Bookmark className="w-4 h-4" />
          <span>Reserve Slot</span>
        </button>
      </div>
    );
  }

  const {
    resourceName = "Podcast Mic B",
    location = "Booth 01",
    timeRange = "3:00 PM – 4:30 PM",
    duration = "1h 30m",
    zone = "Audio Booth 01",
    interface: interfaceType = "USB-C / XLR Dual",
    status = "Available",
  } = selectedSlot;

  return (
    <div className="bg-slate-50/90 rounded-3xl p-4 sm:p-5 border border-slate-100 mb-6 shadow-xs transition-all">
      {/* Resource Title & Status Badge Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <Mic className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                {resourceName}
              </h3>
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {location} • {timeRange} ({duration})
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 shrink-0">
          {status}
        </span>
      </div>

      {/* Specifications Row */}
      <div className="grid grid-cols-2 gap-2.5 my-3 pt-1">
        <div className="bg-white rounded-2xl p-3 border border-slate-100 flex items-center gap-2.5">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              ZONE
            </span>
            <span className="text-xs font-bold text-slate-800 leading-tight block truncate">
              {zone}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3 border border-slate-100 flex items-center gap-2.5">
          <Cable className="w-4 h-4 text-slate-400 shrink-0" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              INTERFACE
            </span>
            <span className="text-xs font-bold text-slate-800 leading-tight block truncate">
              {interfaceType}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Action Button: Reserve Slot */}
      <button
        onClick={() => onReserveSlot(selectedSlot)}
        className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <Bookmark className="w-4 h-4 fill-white" />
        <span>Reserve Slot</span>
      </button>
    </div>
  );
}
