import React from 'react';
import { ResourceCard } from './ResourceCard';
import { Sparkles, ArrowRight, Package } from 'lucide-react';

export function FeaturedResources({ resources = [], isLoading = false, onNavigate }) {
  const featuredList = resources.slice(0, 4);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Featured Resources
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
            Popular resources available for your workspace
          </p>
        </div>
        <button
          onClick={() => onNavigate('resource-details')}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton h-64 rounded-2xl" />
          ))}
        </div>
      ) : featuredList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredList.map((r) => (
            <ResourceCard key={r._id || r.resourceCode} resource={r} onNavigate={onNavigate} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8 text-center text-slate-500 dark:text-slate-400 text-xs">
          <Package className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <p className="font-semibold text-slate-700 dark:text-slate-300">No resources available</p>
        </div>
      )}
    </div>
  );
}
