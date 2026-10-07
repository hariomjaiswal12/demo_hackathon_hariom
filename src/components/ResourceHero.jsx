import React, { useState } from 'react';
import { MapPin, Bookmark, Sliders, Shield, BarChart2, Mic2 } from 'lucide-react';

export function ResourceHero({
  title = "Shure SM7B Studio Mic #2",
  id = "#2",
  serialNumber = "SN: MIC-7B-094",
  status = "Available Now",
  category = "Audio & Podcast",
  location = "Studio Booth B • Floor 4 (West Wing)",
  specifications = [
    { label: 'XLR Output', icon: Sliders },
    { label: 'Cloudlifter CL-1', icon: Sliders },
    { label: 'Pop Filter', icon: Shield },
    { label: '50Hz–20kHz', icon: BarChart2 },
  ],
  imageUrl,
  initialBookmarked = false,
  onBookmarkToggle,
}) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [imgSrc, setImgSrc] = useState(
    imageUrl || "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80"
  );
  const [imgFailed, setImgFailed] = useState(false);

  const handleBookmark = () => {
    const newState = !isBookmarked;
    setIsBookmarked(newState);
    if (onBookmarkToggle) onBookmarkToggle(newState);
  };

  return (
    <div className="w-full px-4 sm:px-6 mb-5">
      <div className="bg-white dark:bg-[#111827] rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 p-3 sm:p-4">
        {/* Large Resource Image / Gradient Cover */}
        <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 mb-4 flex items-center justify-center">
          {!imgFailed ? (
            <img
              src={imgSrc}
              alt={title}
              onError={() => {
                setImgFailed(true);
              }}
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6 text-indigo-200">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 border border-indigo-400/20 flex items-center justify-center mb-3">
                <Mic2 className="w-8 h-8 text-indigo-300" />
              </div>
              <p className="text-lg font-bold text-white">{title}</p>
              <p className="text-xs text-indigo-300/80 mt-1">{category} · {location}</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>

          {/* Bottom Left Image Badges */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-white shadow-md backdrop-blur-xs border border-white/20 dark:border-slate-700/50">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {status}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 shadow-md backdrop-blur-xs border border-white/20 dark:border-slate-700/50">
              {serialNumber}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-1 pt-1 pb-2">
          {/* Category & Bookmark Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/60">
                {category}
              </span>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                • ID: {id}
              </span>
            </div>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmark}
              aria-label="Bookmark resource"
              className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                isBookmarked
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700'
              }`}
            >
              <Bookmark className={`w-4.5 h-4.5 ${isBookmarked ? 'fill-white stroke-white' : 'stroke-[2]'}`} />
            </button>
          </div>

          {/* Resource Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug mb-1">
            {title}
          </h2>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs sm:text-sm mb-4">
            <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="font-medium text-slate-600 dark:text-slate-300">{location}</span>
          </div>

          {/* Specifications Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {specifications.map((spec, idx) => {
              const Icon = spec.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
                  <span>{spec.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
