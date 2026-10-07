import React from 'react';
import { Mic, Calendar, Clock, MapPin, FileText } from 'lucide-react';
import { PasscodeToken } from './PasscodeToken';

export function BookingSummaryCard({ bookingData }) {
  const {
    bookingId = "BOOK-9042",
    resourceName = "Podcast Mic A",
    category = "AUDIO GEAR",
    resourceModel = "Shure SM7B • Pro Broadcast Kit",
    location = "Hardware Hub, Desk Bay 12, Locker 08",
    boothLocation = "Studio Booth 04 • 4th Floor Tech Wing",
    date = "Wed, Oct 23",
    startTime = "3:00 PM",
    endTime = "4:30 PM",
    duration = "1h 30m",
    purpose = "Sprint 24 Audio Recording & Voiceover",
    passcode = "9042-888",
    imageUrl = "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80",
  } = bookingData || {};

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-sm mb-5 relative overflow-hidden border-t-4 border-t-indigo-600">
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-xs uppercase tracking-wider">
          <Mic className="w-3.5 h-3.5" />
          <span>{category}</span>
        </div>
        <span className="bg-indigo-600 text-white font-bold text-xs px-2.5 py-1 rounded-lg shadow-2xs">
          #{bookingId}
        </span>
      </div>

      {/* Resource Title & Model Subtitle */}
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
        {resourceName}
      </h2>
      <p className="text-xs sm:text-sm font-medium text-slate-500 mb-4">
        {resourceModel}
      </p>

      {/* Resource Image Container with Location Badge */}
      <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden bg-slate-900 mb-4 border border-slate-200/80">
        <img
          src={imageUrl}
          alt={resourceName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-950/80 text-white backdrop-blur-xs border border-white/10">
          <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="truncate">{boothLocation}</span>
        </div>
      </div>

      {/* Embedded Details Box (Date & Slot Row) */}
      <div className="bg-slate-50/90 rounded-2xl p-3.5 border border-slate-100 mb-4 grid grid-cols-2 gap-3">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Date
          </span>
          <div className="flex items-center gap-1.5 mt-0.5 text-xs sm:text-sm font-bold text-slate-900">
            <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>{date}</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Slot & Duration
          </span>
          <div className="flex items-center gap-1.5 mt-0.5 text-xs sm:text-sm font-bold text-slate-900">
            <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>{startTime} – {endTime}</span>
            <span className="text-xs font-medium text-slate-500">({duration})</span>
          </div>
        </div>
      </div>

      {/* Purpose & Location Rows */}
      <div className="space-y-2.5 text-xs sm:text-sm px-1">
        <div className="flex items-start gap-2.5">
          <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-bold text-slate-400 block uppercase">Purpose</span>
            <span className="font-semibold text-slate-800">{purpose}</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 pt-2 border-t border-slate-100">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-bold text-slate-400 block uppercase">Pickup Location</span>
            <span className="font-semibold text-slate-800">{location}</span>
          </div>
        </div>
      </div>

      {/* Passcode Token Box */}
      <PasscodeToken passcode={passcode} />
    </div>
  );
}
