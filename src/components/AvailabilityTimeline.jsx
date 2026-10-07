import React from 'react';
import { Calendar } from 'lucide-react';
import { DateSelector } from './DateSelector';
import { SelectedSlotCard } from './SelectedSlotCard';

export function AvailabilityTimeline({
  selectedDate,
  onSelectDate,
  selectedSlot,
  onSelectSlot,
  onAdjustSlot,
}) {
  // Preset time slots for demo selection
  const presetSlots = [
    { id: 'slot-1', timeRange: '3:00 PM – 4:30 PM', duration: '1h 30m', note: 'Next available open window' },
    { id: 'slot-2', timeRange: '5:00 PM – 6:30 PM', duration: '1h 30m', note: 'Evening window' },
    { id: 'slot-3', timeRange: '7:00 PM – 8:30 PM', duration: '1h 30m', note: 'Late window' },
  ];

  return (
    <div className="w-full px-4 sm:px-6 mb-8">
      <div className="bg-white dark:bg-[#111827] rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-100 dark:border-slate-800">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400 stroke-[2.2]" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Timeline Availability</h3>
          </div>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">UTC -08:00</span>
        </div>

        {/* Date Selector Tabs */}
        <DateSelector selectedDate={selectedDate} onSelectDate={onSelectDate} />

        {/* Time Scale Labels */}
        <div className="flex justify-between px-1 text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1.5">
          <span>08:00</span>
          <span>12:00</span>
          <span>16:00</span>
          <span>20:00</span>
          <span>24:00</span>
        </div>

        {/* Horizontal Timeline Bar Container with NOW indicator */}
        <div className="relative w-full h-12 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800/60 flex mb-3 border border-slate-200/60 dark:border-slate-700/60 shadow-inner">
          {/* Block 1: 08:00 - 10:30 (Booked) */}
          <div className="w-[15%] h-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold text-[11px] flex items-center justify-center border-r border-white/80 dark:border-slate-800/80">
            Booked
          </div>

          {/* Block 2: 10:30 - 12:00 (Maintenance) */}
          <div className="w-[10%] h-full bg-slate-300/90 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-[11px] flex items-center justify-center border-r border-white/80 dark:border-slate-800/80">
            Maint
          </div>

          {/* Block 3: 12:00 - 15:00 (Available) */}
          <div 
            onClick={() => onSelectSlot(presetSlots[0])}
            className="w-[20%] h-full bg-emerald-100/90 dark:bg-emerald-950/70 hover:bg-emerald-200/80 dark:hover:bg-emerald-900/80 transition-colors cursor-pointer border-r border-white/80 dark:border-slate-800/80"
            title="Available Slot"
          ></div>

          {/* Block 4: 15:00 - 16:30 (Selected / Active Slot) */}
          <div 
            onClick={() => onSelectSlot(presetSlots[0])}
            className="w-[15%] h-full bg-indigo-600 dark:bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs border-r border-white/80 dark:border-slate-800/80 cursor-pointer"
          >
            Active
          </div>

          {/* Block 5: 16:30 - 18:30 (Team / My Booking) */}
          <div className="w-[15%] h-full bg-indigo-100/90 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-semibold text-[11px] flex items-center justify-center border-r border-white/80 dark:border-slate-800/80">
            Team
          </div>

          {/* Block 6: 18:30 - 24:00 (Available) */}
          <div 
            onClick={() => onSelectSlot(presetSlots[1])}
            className="w-[25%] h-full bg-emerald-100/90 dark:bg-emerald-950/70 hover:bg-emerald-200/80 dark:hover:bg-emerald-900/80 transition-colors cursor-pointer"
            title="Available Slot"
          ></div>

          {/* Vertical RED "NOW 2:15 PM" Indicator Line */}
          <div className="absolute left-[38%] top-0 bottom-0 flex flex-col items-center pointer-events-none z-10">
            <span className="bg-rose-600 text-white text-[9px] font-bold px-1 py-0.5 rounded-xs shadow-xs tracking-tight -mt-1 whitespace-nowrap">
              NOW 2:15 PM
            </span>
            <div className="w-0.5 flex-1 bg-rose-600"></div>
          </div>
        </div>

        {/* Legend Indicator Row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-5 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 dark:bg-emerald-400"></span>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-300 dark:bg-slate-700"></span>
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600"></span>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-100 dark:bg-indigo-950 border border-indigo-300 dark:border-indigo-800"></span>
            <span>My Booking</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-400 dark:bg-slate-600"></span>
            <span>Maintenance</span>
          </div>
        </div>

        {/* Selected Slot Card */}
        <SelectedSlotCard
          selectedSlot={selectedSlot}
          onAdjustSlot={onAdjustSlot}
        />

        {/* Quick Slot Selector Buttons */}
        <div className="mt-3">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-2">Available Time Windows</p>
          <div className="grid grid-cols-2 gap-2">
            {presetSlots.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id || selectedSlot?.timeRange === slot.timeRange;
              return (
                <button
                  key={slot.id}
                  onClick={() => onSelectSlot(slot)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all text-left flex items-center justify-between ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span>{slot.timeRange}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">{slot.duration}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
