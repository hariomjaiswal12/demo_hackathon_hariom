import React from 'react';
import { AppShell } from '../components/AppShell';
import { ArrowLeft, CheckCircle2, Calendar, Clock, MapPin, FileText, Hash, Key } from 'lucide-react';

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-slate-500" strokeWidth={1.8} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-[14px] font-medium text-slate-800 break-words">{value}</p>
      </div>
    </div>
  );
}

export function BookingSuccessPage({
  bookingData,
  onNavigateToBookings,
  onNavigateToDashboard,
  onNavTabChange,
  currentUser,
  onLogout
}) {
  const resourceObj = bookingData?.resource || {};

  const formatted = {
    bookingId: bookingData?._id
      ? `BOOK-${bookingData._id.slice(-6).toUpperCase()}`
      : 'BOOK-9042',
    resourceName: resourceObj?.name || bookingData?.resourceName || 'Studio Resource',
    category: resourceObj?.category || bookingData?.category || 'Resource',
    location: resourceObj?.location || bookingData?.location || 'Office',
    date: bookingData?.startTime
      ? new Date(bookingData.startTime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      : 'Today',
    startTime: bookingData?.startTime
      ? new Date(bookingData.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      : '3:00 PM',
    endTime: bookingData?.endTime
      ? new Date(bookingData.endTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      : '4:30 PM',
    purpose: bookingData?.purpose || 'General use',
    passcode: bookingData?.passcode || '9042-888',
    status: bookingData?.status || 'CONFIRMED',
  };

  return (
    <AppShell
      activeTab="Bookings"
      onTabChange={(tab) => onNavTabChange && onNavTabChange(tab)}
      currentUser={currentUser}
      onLogout={onLogout}
    >
      <div className="w-full">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-5 pt-4 pb-4 flex items-center gap-3">
          <button
            onClick={onNavigateToBookings}
            aria-label="Back to bookings"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2} />
          </button>
          <div>
            <h1 className="text-[16px] font-bold text-slate-900">Booking Confirmed</h1>
            <p className="text-[12px] text-slate-400">Reservation successfully created</p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Success Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="font-bold text-[17px] text-emerald-900">Booking Confirmed!</h2>
              <p className="text-[13px] text-emerald-700 mt-0.5">
                Your resource has been successfully reserved.
              </p>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 pt-4 pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-[15px] text-slate-900">{formatted.resourceName}</h3>
                  <span className="text-[11px] font-medium text-slate-500">{formatted.category}</span>
                </div>
                <span className="badge badge-confirmed">{formatted.status}</span>
              </div>
            </div>

            <div className="px-5 py-1">
              <DetailRow icon={Hash} label="Booking ID" value={formatted.bookingId} />
              <DetailRow icon={Calendar} label="Date" value={formatted.date} />
              <DetailRow icon={Clock} label="Time" value={`${formatted.startTime} – ${formatted.endTime}`} />
              <DetailRow icon={MapPin} label="Location" value={formatted.location} />
              {formatted.purpose && formatted.purpose !== 'General use' && (
                <DetailRow icon={FileText} label="Purpose" value={formatted.purpose} />
              )}
            </div>
          </div>

          {/* Passcode */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Key className="w-4 h-4 text-indigo-600" strokeWidth={2} />
              <h3 className="text-[14px] font-semibold text-slate-900">Access Passcode</h3>
            </div>
            <div className="bg-slate-900 rounded-xl px-5 py-4 flex items-center justify-center">
              <span className="text-2xl font-mono font-bold text-white tracking-[0.2em] select-all">
                {formatted.passcode}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Present this code at the resource location to check in
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={onNavigateToBookings}
              className="btn btn-primary w-full btn-lg"
            >
              View My Bookings
            </button>
            <button
              onClick={onNavigateToDashboard || onNavigateToBookings}
              className="btn btn-secondary w-full btn-lg"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
