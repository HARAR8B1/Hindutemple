import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useRef, useState } from 'react';
import { X, ShieldCheck, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export default function AdminLoginModal({ onClose, onLoginSuccess }) {
  const { login } = useAdmin();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const closeRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    closeRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const onSubmit = (data) => {
    setError('');
    const success = login(data.username, data.password);
    if (success) {
      onLoginSuccess();
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/70 backdrop-blur-sm animate-fade-in px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={t('admin.loginTitle')}
    >
      <div className="relative w-full max-w-md bg-warm-white rounded-2xl shadow-modal animate-slide-up overflow-hidden border border-border">
        {/* Header */}
        <div className="bg-gradient-maroon p-6 text-center">
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-warm-white/70 hover:text-warm-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close login modal"
          >
            <X size={20} />
          </button>
          <ShieldCheck size={40} className="mx-auto mb-3 text-gold" />
          <h2 className="font-display text-2xl font-bold text-warm-white">
            {t('admin.loginTitle')}
          </h2>
          <p className="text-warm-white/80 text-xs sm:text-sm mt-1">
            {t('admin.loginSubtitle')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Security Disclaimer */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <AlertTriangle
              size={16}
              className="text-amber-600 mt-0.5 shrink-0"
            />
            <p className="text-xs text-amber-800">
              <strong>{t('admin.demoNotice')}</strong> — Demo authentication.
            </p>
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="admin-username"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              {t('admin.username')}
            </label>
            <input
              id="admin-username"
              type="text"
              {...register('username')}
              className="w-full px-4 py-3 rounded-xl border border-border bg-sandstone/50 text-charcoal placeholder:text-stone/60 focus:outline-none focus:ring-2 focus:ring-maroon/30 focus:border-maroon transition-all"
              placeholder={t('admin.username')}
              autoComplete="username"
            />
            {errors.username && (
              <p className="text-red-600 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="admin-password"
              className="block text-sm font-medium text-charcoal mb-1.5"
            >
              {t('admin.password')}
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-border bg-sandstone/50 text-charcoal placeholder:text-stone/60 focus:outline-none focus:ring-2 focus:ring-maroon/30 focus:border-maroon transition-all"
                placeholder={t('admin.password')}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone hover:text-charcoal transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-maroon text-warm-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-md"
          >
            {isSubmitting ? t('admin.signingIn') : t('admin.signIn')}
          </button>
        </form>
      </div>
    </div>
  );
}
