import React, { useState } from 'react';
import { MapPin, ArrowRight, Building2, Mic, Laptop, Monitor, Package } from 'lucide-react';

function CategoryFallbackIcon({ category }) {
  switch (category) {
    case 'SPACE':
      return <Building2 className="w-8 h-8 text-indigo-400 stroke-[1.8]" />;
    case 'AUDIO':
      return <Mic className="w-8 h-8 text-purple-400 stroke-[1.8]" />;
    case 'TESTING_HARDWARE':
      return <Laptop className="w-8 h-8 text-teal-400 stroke-[1.8]" />;
    case 'DISPLAY':
      return <Monitor className="w-8 h-8 text-sky-400 stroke-[1.8]" />;
    default:
      return <Package className="w-8 h-8 text-slate-400 stroke-[1.8]" />;
  }
}

export function ResourceCard({ resource, onNavigate }) {
  const [imgError, setImgError] = useState(false);

  const statusBadge =
    resource.status === 'AVAILABLE' ? (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/95 text-white shadow-xs backdrop-blur-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        AVAILABLE
      </span>
    ) : resource.status === 'IN_USE' ? (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-600/95 text-white shadow-xs backdrop-blur-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-200" />
        IN USE
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/95 text-white shadow-xs backdrop-blur-xs">
        MAINTENANCE
      </span>
    );

  const categoryLabel = resource.category ? resource.category.replace('_', ' ') : 'RESOURCE';

  return (
    <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-1 transition-all duration-200 flex flex-col group h-full">
      {/* 16:9 Image Container */}
      <div className="relative aspect-video w-full bg-slate-900 overflow-hidden flex items-center justify-center shrink-0">
        {resource.image && !imgError ? (
          <img
            src={resource.image}
            alt={resource.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1.5 p-4 text-center">
            <CategoryFallbackIcon category={resource.category} />
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              {categoryLabel}
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">{statusBadge}</div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex flex-col justify-between flex-1 gap-3">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-900">
              {categoryLabel}
            </span>
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
              {resource.resourceCode}
            </span>
          </div>

          <h3
            title={resource.name}
            className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2"
          >
            {resource.name}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
            <MapPin className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
            <span className="truncate">{resource.location}</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('resource-details')}
          className="w-full mt-2 py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700 text-slate-700 dark:text-slate-200 hover:text-indigo-700 dark:hover:text-indigo-300 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 group-hover:shadow-2xs"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
