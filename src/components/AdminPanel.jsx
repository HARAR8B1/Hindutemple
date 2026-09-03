import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  X,
  ShieldCheck,
  Save,
  RotateCcw,
  LogOut,
  Wifi,
  WifiOff,
  CheckCircle2,
  Image,
  Video,
  Share2,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import { fetchStatus } from '../services/api';

const adminSchema = z.object({
  heroImageUrl: z
    .string()
    .url('Please enter a valid URL for the hero image'),
  youtubeUrl: z
    .string()
    .url('Please enter a valid YouTube video or embed URL'),
  facebookUrl: z
    .string()
    .url('Please enter a valid Facebook URL'),
  instagramUrl: z
    .string()
    .url('Please enter a valid Instagram URL'),
});

export default function AdminPanel({ isOpen, onClose }) {
  const { settings, updateSettings, logout } = useAdmin();
  const { t } = useLanguage();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  const [isCheckingApi, setIsCheckingApi] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      heroImageUrl: settings.heroImageUrl,
      youtubeUrl: settings.youtubeUrl,
      facebookUrl: settings.facebookUrl,
      instagramUrl: settings.instagramUrl,
    },
  });

  // Keep form values synchronized if external settings change
  useEffect(() => {
    reset({
      heroImageUrl: settings.heroImageUrl,
      youtubeUrl: settings.youtubeUrl,
      facebookUrl: settings.facebookUrl,
      instagramUrl: settings.instagramUrl,
    });
  }, [settings, reset]);

  // Check API health status via Axios when panel opens
  useEffect(() => {
    let isMounted = true;
    if (isOpen) {
      Promise.resolve().then(() => {
        if (isMounted) setIsCheckingApi(true);
      });
      fetchStatus()
        .then((result) => {
          if (isMounted) setApiStatus(result);
        })
        .finally(() => {
          if (isMounted) setIsCheckingApi(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const onSubmit = (data) => {
    updateSettings(data);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleResetToDefault = () => {
    const defaultData = {
      heroImageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Brihadeshwara_Temple%2C_Thanjavur%2C_Tamil_Nadu.jpg/1920px-Brihadeshwara_Temple%2C_Thanjavur%2C_Tamil_Nadu.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=kYJyb8hO0QY',
      facebookUrl: 'https://www.facebook.com',
      instagramUrl: 'https://www.instagram.com',
    };
    reset(defaultData);
    updateSettings(defaultData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          className="w-screen max-w-md bg-warm-white shadow-panel flex flex-col border-l border-border animate-slide-in-right"
          role="dialog"
          aria-label={t('admin.panelTitle')}
        >
          {/* Header */}
          <div className="p-6 bg-gradient-maroon text-warm-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warm-white/10 text-gold">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold">{t('admin.panelTitle')}</h2>
                <p className="text-xs text-warm-white/80">{t('admin.panelSubtitle')}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-warm-white/80 hover:text-warm-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close admin control panel"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Status Check Message via Axios */}
            <div className="p-4 rounded-xl border border-border bg-sandstone text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isCheckingApi ? (
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                ) : apiStatus?.success ? (
                  <Wifi size={16} className="text-emerald-600" />
                ) : (
                  <WifiOff size={16} className="text-stone" />
                )}
                <span className="text-charcoal font-medium">
                  {isCheckingApi
                    ? 'Checking network status...'
                    : apiStatus?.message || 'Local mode active'}
                </span>
              </div>
              <span className="text-stone uppercase tracking-wider font-semibold text-[10px]">
                {apiStatus?.success ? 'Online' : 'Offline Safe'}
              </span>
            </div>

            {/* Save Success Alert */}
            {saveSuccess && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2.5 animate-fade-in shadow-xs">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                <span>{t('admin.savedSuccess')}</span>
              </div>
            )}

            {/* Form */}
            <form id="admin-settings-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Hero Image URL */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-1.5">
                  <Image size={16} className="text-maroon" />
                  {t('admin.heroImageLabel')}
                </label>
                <input
                  type="url"
                  {...register('heroImageUrl')}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-sm text-charcoal placeholder:text-stone/60 focus:outline-none focus:ring-2 focus:ring-maroon/30 focus:border-maroon transition-all"
                />
                <p className="text-xs text-stone mt-1">
                  {t('admin.heroImageHelp')}
                </p>
                {errors.heroImageUrl && (
                  <p className="text-xs text-red-600 mt-1">{errors.heroImageUrl.message}</p>
                )}
              </div>

              {/* YouTube Video URL */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-1.5">
                  <Video size={16} className="text-maroon" />
                  {t('admin.youtubeLabel')}
                </label>
                <input
                  type="url"
                  {...register('youtubeUrl')}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-sm text-charcoal placeholder:text-stone/60 focus:outline-none focus:ring-2 focus:ring-maroon/30 focus:border-maroon transition-all"
                />
                <p className="text-xs text-stone mt-1">
                  {t('admin.youtubeHelp')}
                </p>
                {errors.youtubeUrl && (
                  <p className="text-xs text-red-600 mt-1">{errors.youtubeUrl.message}</p>
                )}
              </div>

              {/* Facebook URL */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-1.5">
                  <Share2 size={16} className="text-maroon" />
                  {t('admin.facebookLabel')}
                </label>
                <input
                  type="url"
                  {...register('facebookUrl')}
                  placeholder="https://facebook.com/your-page"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-sm text-charcoal placeholder:text-stone/60 focus:outline-none focus:ring-2 focus:ring-maroon/30 focus:border-maroon transition-all"
                />
                {errors.facebookUrl && (
                  <p className="text-xs text-red-600 mt-1">{errors.facebookUrl.message}</p>
                )}
              </div>

              {/* Instagram URL */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-1.5">
                  <Share2 size={16} className="text-maroon" />
                  {t('admin.instagramLabel')}
                </label>
                <input
                  type="url"
                  {...register('instagramUrl')}
                  placeholder="https://instagram.com/your-profile"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-sm text-charcoal placeholder:text-stone/60 focus:outline-none focus:ring-2 focus:ring-maroon/30 focus:border-maroon transition-all"
                />
                {errors.instagramUrl && (
                  <p className="text-xs text-red-600 mt-1">{errors.instagramUrl.message}</p>
                )}
              </div>
            </form>

            <div className="p-4 rounded-xl bg-cream border border-border text-xs text-stone space-y-1">
              <p className="font-semibold text-charcoal">Browser Storage Persistence</p>
              <p>Updates persist in your browser's local storage and survive page refreshes.</p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-border bg-sandstone space-y-3">
            <button
              type="submit"
              form="admin-settings-form"
              disabled={isSubmitting || !isDirty}
              className="w-full py-3 px-4 rounded-xl bg-gradient-maroon text-warm-white font-medium flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-50 cursor-pointer shadow-sm"
            >
              <Save size={18} />
              <span>{t('admin.saveChanges')}</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleResetToDefault}
                className="py-2.5 px-3 rounded-xl border border-border bg-warm-white text-xs font-medium text-charcoal hover:bg-cream transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>{t('admin.resetDefaults')}</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="py-2.5 px-3 rounded-xl border border-red-200 bg-red-50 text-xs font-medium text-red-700 hover:bg-red-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut size={14} />
                <span>{t('admin.logout')}</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
