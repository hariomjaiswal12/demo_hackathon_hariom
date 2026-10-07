import React from 'react';
import { MapPin, Clock, Tag, MoreVertical } from 'lucide-react';
import { BookingStatusBadge } from './BookingStatusBadge';
import { BookingActionButton } from './BookingActionButton';

function ThumbnailIcon({ type }) {
  const icons = {
    mic: (
      <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
      </svg>
    ),
    monitor: (
      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    vr: (
      <svg className="w-5 h-5 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8z"/>
        <circle cx="9" cy="12" r="2"/><circle cx="15" cy="12" r="2"/>
      </svg>
    ),
  };
  const bgMap = { mic: 'bg-indigo-50', monitor: 'bg-blue-50', vr: 'bg-violet-50' };
  const bg = bgMap[type] || 'bg-slate-100';
  return (
    <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
      {icons[type] || (
        <svg className="w-5 h-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
        </svg>
      )}
    </div>
  );
}

export function BookingCard({ booking, onCheckIn, onExtend, onCancel, onEndEarly, onBoothInfo }) {
  const {
    bookingId,
    title,
    location,
    time,
    duration,
    remainingTime,
    purpose,
    status,
    thumbnailType,
    progress,
  } = booking;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 mb-3 overflow-hidden hover:border-slate-300 hover:shadow-sm transition-all duration-150">
      {/* Status top-bar for active */}
      {status === 'active' && (
        <div className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />
      )}
      {status === 'confirmed' && (
        <div className="h-1 bg-gradient-to-r from-indigo-400 to-indigo-600" />
      )}

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3 min-w-0">
            <ThumbnailIcon type={thumbnailType} />
            <div className="min-w-0">
              <h3 className="font-semibold text-[14px] text-slate-900 leading-tight truncate">{title}</h3>
              {location && (
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="text-[12px] text-slate-500 truncate">{location}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <BookingStatusBadge status={status} />
          </div>
        </div>

        {/* Details row */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Clock className={`w-3.5 h-3.5 ${status === 'active' ? 'text-emerald-500' : 'text-slate-400'}`} strokeWidth={2} />
              <span className="text-[13px] font-semibold text-slate-800">{time}</span>
            </div>
            <div className="flex items-center gap-2">
              {duration && (
                <span className="text-[11px] text-slate-500 font-medium">{duration}</span>
              )}
              {bookingId && (
                <span className="text-[10px] font-mono text-slate-400">#{bookingId}</span>
              )}
            </div>
          </div>

          {/* Progress bar for active */}
          {status === 'active' && (
            <div className="mt-2 h-1.5 bg-emerald-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progress || 50, 100)}%` }}
              />
            </div>
          )}

          {/* Purpose */}
          {purpose && (
            <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-slate-200/60">
              <Tag className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="text-[11px] text-slate-500 truncate">{purpose}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        {(status === 'confirmed' || status === 'active') && (
          <div className="flex items-center gap-2 mt-3">
            {status === 'confirmed' && (
              <>
                <BookingActionButton
                  variant="primary"
                  label="Check In"
                  onClick={() => onCheckIn && onCheckIn(booking)}
                />
                <BookingActionButton
                  variant="secondary"
                  label="Extend"
                  onClick={() => onExtend && onExtend(booking)}
                />
                <BookingActionButton
                  variant="cancel"
                  label="Cancel"
                  onClick={() => onCancel && onCancel(booking)}
                />
                {onBoothInfo && (
                  <BookingActionButton
                    variant="ghost"
                    label="Details"
                    onClick={() => onBoothInfo(booking)}
                  />
                )}
              </>
            )}
            {status === 'active' && (
              <>
                <BookingActionButton
                  variant="secondary"
                  label="Extend +15m"
                  onClick={() => onExtend && onExtend(booking)}
                />
                <BookingActionButton
                  variant="cancel"
                  label="End Early"
                  onClick={() => onEndEarly && onEndEarly(booking)}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
