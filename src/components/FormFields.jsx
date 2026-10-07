import React from 'react';
import { ChevronDown, MapPin, Check } from 'lucide-react';

export function FormInput({ label, id, placeholder, value, onChange, error, icon, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs sm:text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-slate-100/80 rounded-2xl py-3 text-xs sm:text-sm text-slate-900 font-medium placeholder:text-slate-400 border transition-all focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 ${
            icon ? 'pl-10 pr-4' : 'px-4'
          } ${error ? 'border-rose-500 bg-rose-50/50' : 'border-transparent focus:border-indigo-600'}`}
          {...props}
        />
      </div>
      {error && <span className="text-[11px] font-semibold text-rose-600 mt-0.5">{error}</span>}
    </div>
  );
}

export function FormSelect({ label, id, value, onChange, options = [], error, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs sm:text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`w-full bg-slate-100/80 rounded-2xl py-3 px-4 text-xs sm:text-sm text-slate-900 font-semibold cursor-pointer border appearance-none pr-9 transition-all focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 ${
            error ? 'border-rose-500 bg-rose-50/50' : 'border-transparent focus:border-indigo-600'
          }`}
        >
          {options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      {error && <span className="text-[11px] font-semibold text-rose-600 mt-0.5">{error}</span>}
    </div>
  );
}

export function FormTextarea({ label, id, placeholder, value, onChange, rows = 3, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs sm:text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-slate-100/80 rounded-2xl p-4 text-xs sm:text-sm text-slate-900 font-medium placeholder:text-slate-400 border border-transparent transition-all focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 resize-none"
      />
    </div>
  );
}

export function FormCheckbox({ label, subtitle, checked, onChange }) {
  return (
    <label className="bg-slate-100/70 rounded-2xl p-3.5 flex items-start gap-3 border border-slate-200/50 cursor-pointer hover:bg-slate-100 transition-colors select-none">
      <div className="relative flex items-center mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
          checked ? 'bg-indigo-600 text-white shadow-xs' : 'border-2 border-slate-300 bg-white'
        }`}>
          {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </div>
      </div>
      <div>
        <span className="text-xs sm:text-sm font-semibold text-slate-800 block leading-tight">
          {label}
        </span>
        {subtitle && (
          <span className="text-[11px] text-slate-500 block mt-0.5 leading-snug">
            {subtitle}
          </span>
        )}
      </div>
    </label>
  );
}
