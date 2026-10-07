import React from 'react';
import { Mic, Box, Monitor, MapPin, HardDrive, Calendar } from 'lucide-react';

export function ResourceThumbnail({ type, image, alt = "Resource thumbnail" }) {
  // If an image URL is supplied, render the image thumbnail (used in Top Card)
  if (image) {
    return (
      <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-slate-200/80 shadow-xs">
        <img src={image} alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }

  // Otherwise, render the icon badge box matching the reference image style
  const getIcon = () => {
    switch (type) {
      case 'mic':
        return {
          icon: <Mic className="w-6 h-6 text-indigo-600 stroke-[2]" />,
          bg: 'bg-indigo-50/90 border-indigo-100/60',
        };
      case 'vr':
        return {
          icon: (
            <svg className="w-6 h-6 text-emerald-600 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
              <path d="m3.3 7 8.7 5 8.7-5"/>
              <path d="M12 22V12"/>
            </svg>
          ),
          bg: 'bg-emerald-50/90 border-emerald-100/60',
        };
      case 'monitor':
        return {
          icon: <Monitor className="w-6 h-6 text-sky-600 stroke-[2]" />,
          bg: 'bg-sky-50/90 border-sky-100/60',
        };
      default:
        return {
          icon: <HardDrive className="w-6 h-6 text-indigo-600 stroke-[2]" />,
          bg: 'bg-indigo-50/90 border-indigo-100/60',
        };
    }
  };

  const { icon, bg } = getIcon();

  return (
    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${bg}`}>
      {icon}
    </div>
  );
}
