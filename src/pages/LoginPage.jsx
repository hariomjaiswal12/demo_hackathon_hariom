import React, { useState } from 'react';
import { Mail, Lock, Loader2, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

function DeskDropIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
    </svg>
  );
}

export function LoginPage({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState('user@deskdrop.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setIsLoading(true);
    try {
      await onLoginSuccess({ email, password });
    } catch (err) {
      const msg = err.message || '';
      if (msg.includes('401') || msg.toLowerCase().includes('invalid')) {
        setError('Invalid email or password. Please try again.');
      } else if (msg.includes('network') || msg.includes('fetch')) {
        setError('Cannot connect to server. Please check your connection.');
      } else {
        setError(msg || 'Sign in failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const setDemoUser = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative transition-colors duration-200">
      {/* Top Right Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-indigo-500/25 mb-4">
          <DeskDropIcon size={22} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Sign in to DeskDrop
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Internal Office Resource & Asset Booking System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white dark:bg-[#111827] py-8 px-6 sm:px-10 shadow-sm dark:shadow-2xs border border-slate-200/80 dark:border-slate-800 rounded-3xl">
          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Work Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="input-base pl-10 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-base pl-10 pr-10 text-xs sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-center mb-2.5">
              Quick Demo Accounts
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDemoUser('user@deskdrop.com', 'password123')}
                className="py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-semibold transition-colors text-center"
              >
                Sarah (User)
              </button>
              <button
                type="button"
                onClick={() => setDemoUser('admin@deskdrop.com', 'admin123')}
                className="py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-semibold transition-colors text-center"
              >
                Admin (Admin)
              </button>
            </div>
          </div>

          {/* Register switch link */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
