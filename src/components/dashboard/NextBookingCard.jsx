import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, ArrowRight, Bookmark, Building2 } from 'lucide-react';

function formatTime(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDateLabel(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) return 'Today';
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function getDurationStr(startStr, endStr) {
  if (!startStr || !endStr) return '';
  const s = new Date(startStr).getTime();
  const e = new Date(endStr).getTime();
  const mins = Math.round((e - s) / (1000 * 60));
  if (mins < 60) return `${mins} mins`;
  const hrs = Math.floor(mins / 60);
  const remMins = mins % 60;
  return remMins > 0 ? `${hrs}h ${remMins}m` : `${hrs} hr${hrs > 1 ? 's' : ''}`;
}

export function NextBookingCard({ bookings = [], currentUser, onNavigate }) {
  const [imgError, setImgError] = useState(false);

  const currentUserId = currentUser?._id || currentUser?.id;
  const userBookings = bookings.filter((b) => {
    const bookingUserId = b.user?._id || b.user?.id || b.user;
    return !currentUserId || String(bookingUserId) === String(currentUserId);
  });

  const activeBooking = userBookings.find((b) => b.status === 'ACTIVE') || bookings.find((b) => b.status === 'ACTIVE');
  const upcomingBooking = userBookings.find((b) => b.status === 'CONFIRMED') || bookings.find((b) => b.status === 'CONFIRMED');

  const targetBooking = activeBooking || upcomingBooking;

  if (!targetBooking) {
    return (
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-6 flex flex-col justify-between h-full shadow-2xs">
        <div>
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              Next Reservation
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              Clear Schedule
            </span>
          </div>

          <div className="py-6 text-center">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-2.5">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No upcoming reservations</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
              You're all clear for now. Find a resource when you need one.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('resource-details')}
          className="w-full mt-3 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2"
        >
          Browse Resources
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const isActive = targetBooking.status === 'ACTIVE';
  const resName = targetBooking.resource?.name || 'Office Resource';
  const resLoc = targetBooking.resource?.location || 'Office Location';
  const resImage = targetBooking.resource?.image;
  const dateLabel = formatDateLabel(targetBooking.startTime);
  const startTime = formatTime(targetBooking.startTime);
  const endTime = formatTime(targetBooking.endTime);
  const duration = getDurationStr(targetBooking.startTime, targetBooking.endTime);

  return (
    <div className={`bg-white dark:bg-[#111827] rounded-2xl border p-5 sm:p-6 flex flex-col justify-between h-full shadow-2xs transition-all relative overflow-hidden ${
      isActive ? 'border-indigo-300 dark:border-indigo-700 ring-1 ring-indigo-500/20' : 'border-slate-200/80 dark:border-slate-800'
    }`}>
      {/* Accent Line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${isActive ? 'bg-indigo-600' : 'bg-indigo-500/40'}`} />

      <div>
        {/* Header Row */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800 pt-1">
          <span className="text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            {isActive ? 'Active Reservation' : 'Next Reservation'}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
            isActive
              ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 animate-pulse'
              : 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
          }`}>
            {isActive ? 'IN PROGRESS' : 'CONFIRMED'}
          </span>
        </div>

        {/* Content Body */}
        <div className="flex items-start gap-4">
          {resImage && !imgError ? (
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200 dark:border-slate-700">
              <img
                src={resImage}
                alt={resName}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-900">
              <Building2 className="w-6 h-6" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug line-clamp-1">{resName}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
              <span className="truncate">{resLoc}</span>
            </p>
          </div>
        </div>

        {/* Schedule Banner */}
        <div className="mt-4 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Schedule & Purpose</p>
            <p className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5">
              {dateLabel} • {startTime} – {endTime}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-xs">{targetBooking.purpose || 'Team Meeting'}</p>
          </div>
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 border border-slate-200 dark:border-slate-600 shrink-0">
            {duration}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center gap-2 pt-2">
        <button
          onClick={() => onNavigate('bookings')}
          className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <Bookmark className="w-3.5 h-3.5" />
          Manage Booking
        </button>
        {isActive && (
          <button
            onClick={() => onNavigate('bookings')}
            className="py-2.5 px-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Check In
          </button>
        )}
      </div>
    </div>
  );
}
