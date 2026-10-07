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
  imageUrl = "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80",
  initialBookmarked = false,
  onBookmarkToggle,
}) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const handleBookmark = () => {
    const newState = !isBookmarked;
    setIsBookmarked(newState);
    if (onBookmarkToggle) onBookmarkToggle(newState);
  };

  return (
    <div className="w-full px-4 sm:px-6 mb-5">
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 p-3 sm:p-4">
        {/* Large Resource Image with Overlay Badges */}
        <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden bg-slate-900 mb-4">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover opacity-95 hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

          {/* Bottom Left Image Badges */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-900 shadow-md backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {status}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-slate-700 shadow-md backdrop-blur-xs">
              {serialNumber}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-1 pt-1 pb-2">
          {/* Category & Bookmark Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100/50">
                {category}
              </span>
              <span className="text-xs font-semibold text-slate-400">
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
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <Bookmark className={`w-4.5 h-4.5 ${isBookmarked ? 'fill-white stroke-white' : 'stroke-[2]'}`} />
            </button>
          </div>

          {/* Resource Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug mb-1">
            {title}
          </h2>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-slate-500 text-xs sm:text-sm mb-4">
            <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="font-medium text-slate-600">{location}</span>
          </div>

          {/* Specifications Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {specifications.map((spec, idx) => {
              const Icon = spec.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/80 border border-slate-200/50 text-slate-700 text-xs font-semibold"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
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
