import React, { useState } from 'react';
import { Calendar, Check } from 'lucide-react';

export function PasscodeToken({ passcode = "9042-888" }) {
  const [saved, setSaved] = useState(false);

  const handleSaveToCal = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-slate-50/90 rounded-2xl p-3.5 border border-slate-100 flex items-center justify-between my-4 transition-all">
      <div>
        <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
          Passcode Token
        </span>
        <span className="text-base sm:text-lg font-bold font-mono text-slate-900 mt-0.5 block tracking-wide">
          {passcode}
        </span>
      </div>

      <button
        onClick={handleSaveToCal}
        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
          saved
            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs'
        }`}
      >
        {saved ? (
          <>
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Saved!</span>
          </>
        ) : (
          <>
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            <span>Save to Cal</span>
          </>
        )}
      </button>
    </div>
  );
}
