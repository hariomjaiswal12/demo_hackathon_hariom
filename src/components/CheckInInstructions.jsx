import React from 'react';
import { Clock, Bell, Shield, Cable } from 'lucide-react';

export function CheckInInstructions({ passcode = "9042-888" }) {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-sm mb-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-5 h-5 text-indigo-600 stroke-[2.2]" />
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Next Steps & Check-in
        </h3>
      </div>

      {/* Check-in Window Highlight Box */}
      <div className="bg-slate-50/90 rounded-2xl p-3.5 border border-slate-100 mb-3">
        <div className="flex items-center gap-2 mb-1">
          <Bell className="w-4 h-4 text-amber-600" />
          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
            Check-in Window
          </h4>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed pl-6">
          Opens 10 minutes prior to your start time at <strong>2:50 PM</strong>. Auto-releases if unclaimed by <strong>3:15 PM</strong>.
        </p>
      </div>

      {/* Access & Accessories Instructions */}
      <div className="space-y-3 pt-1">
        {/* Item 1: Badge Access */}
        <div className="flex items-start gap-2.5 text-xs text-slate-600">
          <Shield className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 font-bold">Badge Access: </strong>
            <span>
              Tap your physical staff badge on the Floor 4 smart card reader or input code <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono font-bold text-slate-800">{passcode}</code> at Locker 08.
            </span>
          </div>
        </div>

        {/* Item 2: Included Accessories */}
        <div className="flex items-start gap-2.5 text-xs text-slate-600">
          <Cable className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 font-bold">Included Accessories: </strong>
            <span>
              XLR-to-USB-C cable, foam pop shield, and desktop clamp stand pre-staged in Studio Booth 04.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
