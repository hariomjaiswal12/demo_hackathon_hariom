import React from 'react';
import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary: 'btn btn-primary text-[12px] h-8 px-3',
  secondary: 'btn btn-secondary text-[12px] h-8 px-3',
  ghost: 'btn btn-ghost text-[12px] h-8 px-3',
  cancel: 'btn btn-danger text-[12px] h-8 px-3',
};

export function BookingActionButton({ variant = 'secondary', label, onClick, className = '', loading = false, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${VARIANTS[variant] || VARIANTS.secondary} ${className}`}
    >
      {loading && <Loader2 className="w-3 h-3 animate-spin" />}
      {label}
    </button>
  );
}
