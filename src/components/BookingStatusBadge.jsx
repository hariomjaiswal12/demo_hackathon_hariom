import React from 'react';
import { Clock, CheckCircle2, XCircle, AlertTriangle, RefreshCw, Zap } from 'lucide-react';

const STATUS_MAP = {
  confirmed: {
    label: 'Confirmed',
    className: 'badge badge-confirmed',
    Icon: CheckCircle2,
  },
  active: {
    label: 'Active',
    className: 'badge badge-active',
    Icon: Zap,
  },
  completed: {
    label: 'Completed',
    className: 'badge badge-completed',
    Icon: CheckCircle2,
  },
  cancelled: {
    label: 'Cancelled',
    className: 'badge badge-cancelled',
    Icon: XCircle,
  },
  auto_released: {
    label: 'Auto Released',
    className: 'badge badge-auto_released',
    Icon: RefreshCw,
  },
  starts_soon: {
    label: 'Starting Soon',
    className: 'badge badge-confirmed',
    Icon: Clock,
  },
};

export function BookingStatusBadge({ status, bookingId, timeText }) {
  const key = (status || '').toLowerCase().replace(/ /g, '_');
  const config = STATUS_MAP[key] || {
    label: status || 'Unknown',
    className: 'badge badge-completed',
    Icon: AlertTriangle,
  };
  const { label, className, Icon } = config;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className={className}>
        <Icon className="w-3 h-3" strokeWidth={2} />
        {label}
      </span>
      {bookingId && (
        <span className="text-[11px] font-mono text-slate-400">#{bookingId}</span>
      )}
      {timeText && (
        <span className="text-[11px] font-medium text-slate-500">{timeText}</span>
      )}
    </div>
  );
}
