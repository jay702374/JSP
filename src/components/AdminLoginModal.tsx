import React, { useState } from 'react';
import { Shield, Key, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import { loginWithGoogle } from '../services/firebase';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email?: string) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isLoggingInGoogle, setIsLoggingInGoogle] = useState(false);

  if (!isOpen) return null;

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Acceptable admin codes: jsp2026, admin, 7023746632
    const validCodes = ['jsp2026', 'admin', '7023746632', 'jspforgecore'];
    if (validCodes.includes(passcode.trim().toLowerCase())) {
      onSuccess('admin@jspforgecore.com');
    } else {
      setError('Invalid admin passcode. Hint: Use "jsp2026" or Google Sign-In.');
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoggingInGoogle(true);
    setError('');
    try {
      const user = await loginWithGoogle();
      if (user) {
        onSuccess(user.email || undefined);
      }
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError('Google Sign-in could not complete. You can use master passcode: jsp2026');
    } finally {
      setIsLoggingInGoogle(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="max-w-md w-full bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          aria-label="Close login dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-500 mx-auto flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Admin Authentication
          </h3>
          <p className="text-xs text-stone-400 max-w-xs mx-auto">
            Authorized access for JSP ForgeCore management: update products, view customer enquiries, and manage quotations.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Method 1: Google Sign In */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoggingInGoogle}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-stone-100 text-stone-900 text-xs font-semibold flex items-center justify-center gap-2.5 transition-all shadow-md disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{isLoggingInGoogle ? 'Signing In...' : 'Sign In with Google (Admin)'}</span>
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-stone-800" />
            <span className="flex-shrink mx-3 text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
              Or Master Passcode
            </span>
            <div className="flex-grow border-t border-stone-800" />
          </div>

          {/* Method 2: Master Passcode */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePasscodeSubmit(e);
            }}
            className="space-y-3"
          >
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Admin Security Passcode
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handlePasscodeSubmit(e);
                    }
                  }}
                  placeholder="Enter passcode (e.g. jsp2026)"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handlePasscodeSubmit}
              className="w-full py-2.5 px-4 rounded-lg bg-metallic-orange hover:brightness-110 text-stone-950 text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Verify Passcode & Enter
            </button>
          </form>

          <p className="text-[11px] text-stone-500 text-center pt-1">
            Standard Admin Passcode: <span className="font-mono text-amber-500">jsp2026</span>
          </p>
        </div>
      </div>
    </div>
  );
};
