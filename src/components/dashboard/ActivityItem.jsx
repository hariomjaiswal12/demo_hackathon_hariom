import React from 'react';

function formatDateLabel(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const now = new Date();
  const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (d.toDateString() === now.toDateString()) return `Today · ${timeStr}`;
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return `Yesterday · ${timeStr}`;
  return `${d.toLocaleDateString([], { month: 'short', day: 'numeric' })} · ${timeStr}`;
}

export function ActivityItem({ booking, currentUser, isLast }) {
  const currentUserId = currentUser?._id || currentUser?.id;
  const bookingUserId = booking.user?._id || booking.user?.id || booking.user;
  const isSelf = currentUserId && String(bookingUserId) === String(currentUserId);
  const userName = isSelf ? 'You' : (booking.user?.name || 'A team member');

  const resName = booking.resource?.name || 'Office Resource';
  const isCheckIn = booking.status === 'ACTIVE';
  const isCancelled = booking.status === 'CANCELLED';
  const isCompleted = booking.status === 'COMPLETED';

  let dotColor = 'bg-emerald-500';
  let actionText = `booked ${resName}`;

  if (isCheckIn) {
    dotColor = 'bg-indigo-600 dark:bg-indigo-400 animate-pulse';
    actionText = `checked in to ${resName}`;
  } else if (isCompleted) {
    dotColor = 'bg-slate-400 dark:bg-slate-500';
    actionText = `completed session for ${resName}`;
  } else if (isCancelled) {
    dotColor = 'bg-rose-500';
    actionText = `cancelled reservation for ${resName}`;
  }

  return (
    <div className="relative flex items-start gap-3 pl-1 py-2.5 group">
      {!isLast && (
        <span className="absolute left-[7px] top-[18px] bottom-[-10px] w-[2px] bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors" />
      )}

      <div className={`w-3 h-3 rounded-full ${dotColor} ring-4 ring-white dark:ring-[#111827] shrink-0 mt-1 shadow-2xs z-10`} />

      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-800 dark:text-slate-200 leading-snug">
          <span className="font-bold text-slate-900 dark:text-white">{userName}</span> {actionText}
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
          {formatDateLabel(booking.startTime || booking.createdAt)}
        </p>
      </div>
    </div>
  );
}
