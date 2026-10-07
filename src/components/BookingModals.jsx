import React, { useState, useEffect, useCallback } from 'react';
import { X, Clock, AlertTriangle, CheckCircle2, Navigation, Loader2 } from 'lucide-react';

// Shared modal backdrop + panel
function ModalWrapper({ isOpen, onClose, children }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKey]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-panel animate-scale-in">
        {children}
      </div>
    </div>
  );
}

function ModalHeader({ icon: Icon, iconBg, iconColor, title, subtitle, onClose }) {
  return (
    <div className="flex items-start justify-between p-5 border-b border-slate-100">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
            <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={2} />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-[16px] text-slate-900">{title}</h3>
          {subtitle && <p className="text-[12px] text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <button
        onClick={onClose}
        aria-label="Close dialog"
        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0 ml-2"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function ModalFooter({ cancelLabel = 'Cancel', confirmLabel, onCancel, onConfirm, confirmVariant = 'primary', isLoading }) {
  const confirmClass = confirmVariant === 'danger'
    ? 'flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-[13px] transition-colors flex items-center justify-center gap-2'
    : 'flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[13px] transition-colors flex items-center justify-center gap-2';

  return (
    <div className="flex items-center gap-3 p-5 pt-3">
      <button
        onClick={onCancel}
        className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[13px] transition-colors"
      >
        {cancelLabel}
      </button>
      {confirmLabel && (
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className={confirmClass}
        >
          {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {confirmLabel}
        </button>
      )}
    </div>
  );
}

export function ExtendModal({ booking, isOpen, onClose, onConfirm }) {
  const [selectedDuration, setSelectedDuration] = useState('15');
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm(booking, selectedDuration);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        icon={Clock}
        iconBg="bg-indigo-50"
        iconColor="text-indigo-600"
        title="Extend Reservation"
        subtitle={booking?.title}
        onClose={onClose}
      />
      <div className="p-5">
        <p className="text-[13px] text-slate-600 mb-4">
          How much additional time would you like to add?
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { label: '+15 mins', value: '15' },
            { label: '+30 mins', value: '30' },
            { label: '+1 hour', value: '60' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedDuration(option.value)}
              className={`py-3 rounded-xl border text-[13px] font-semibold transition-all ${
                selectedDuration === option.value
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <ModalFooter
        cancelLabel="Cancel"
        confirmLabel="Confirm Extension"
        onCancel={onClose}
        onConfirm={handleConfirm}
        isLoading={isLoading}
      />
    </ModalWrapper>
  );
}

export function CancelModal({ booking, isOpen, onClose, onConfirm }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm(booking);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-5 pb-3">
        <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" strokeWidth={2} />
        </div>
        <h3 className="font-semibold text-[17px] text-slate-900 mb-2">Cancel Reservation?</h3>
        <p className="text-[13px] text-slate-500 leading-relaxed">
          Are you sure you want to cancel{' '}
          <strong className="text-slate-700 font-semibold">{booking?.title}</strong>?
          This will free up the resource for others.
        </p>
      </div>
      <ModalFooter
        cancelLabel="Keep Reservation"
        confirmLabel="Yes, Cancel"
        onCancel={onClose}
        onConfirm={handleConfirm}
        confirmVariant="danger"
        isLoading={isLoading}
      />
    </ModalWrapper>
  );
}

export function EndEarlyModal({ booking, isOpen, onClose, onConfirm }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm(booking);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-5 pb-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-6 h-6 text-emerald-600" strokeWidth={2} />
        </div>
        <h3 className="font-semibold text-[17px] text-slate-900 mb-2">End Session Early?</h3>
        <p className="text-[13px] text-slate-500 leading-relaxed">
          Ending your session with{' '}
          <strong className="text-slate-700 font-semibold">{booking?.title}</strong>{' '}
          early will make it available for others to book immediately.
        </p>
      </div>
      <ModalFooter
        cancelLabel="Continue Session"
        confirmLabel="End Early"
        onCancel={onClose}
        onConfirm={handleConfirm}
        isLoading={isLoading}
      />
    </ModalWrapper>
  );
}

export function InfoModal({ booking, isOpen, onClose }) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        icon={Navigation}
        iconBg="bg-indigo-50"
        iconColor="text-indigo-600"
        title="Resource Details"
        subtitle={booking?.title}
        onClose={onClose}
      />
      <div className="p-5 space-y-2.5">
        {[
          { label: 'Location', value: booking?.location },
          { label: 'Time', value: booking?.time },
          booking?.purpose && { label: 'Purpose', value: booking?.purpose },
        ].filter(Boolean).map((item) => (
          <div key={item.label} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide block mb-1">{item.label}</span>
            <p className="text-[13px] font-medium text-slate-800">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="px-5 pb-5">
        <button
          onClick={onClose}
          className="btn btn-primary w-full"
        >
          Close
        </button>
      </div>
    </ModalWrapper>
  );
}
