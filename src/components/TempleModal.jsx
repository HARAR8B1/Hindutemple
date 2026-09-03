import { useEffect, useRef } from 'react';
import {
  X,
  MapPin,
  Clock,
  PartyPopper,
  Sparkles,
  ExternalLink,
  Tag,
  AlertTriangle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TempleModal({ temple, onClose }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const { t, getLocalizedTemple } = useLanguage();

  const localized = getLocalizedTemple(temple);

  // Focus management and keyboard handling
  useEffect(() => {
    closeButtonRef.current?.focus();

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

  if (!localized) return null;

  const categoryColors = {
    Shiva: 'bg-amber-100 text-amber-800 border-amber-200',
    Vishnu: 'bg-blue-100 text-blue-800 border-blue-200',
    Shakti: 'bg-rose-100 text-rose-800 border-rose-200',
    Other: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-charcoal/70 backdrop-blur-sm animate-fade-in overflow-y-auto py-8 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${t('card.viewDetails')}: ${localized.name}`}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl bg-warm-white rounded-2xl shadow-modal animate-slide-up overflow-hidden my-auto border border-border"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-charcoal/70 text-white hover:bg-charcoal transition-colors cursor-pointer backdrop-blur-md shadow-md"
          aria-label={t('modal.close')}
        >
          <X size={20} />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 md:h-96">
          <img
            src={localized.image}
            alt={localized.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex flex-wrap gap-2 mb-3">
              {localized.designation && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gold text-charcoal shadow-sm">
                  <Tag size={12} />
                  {localized.designation}
                </span>
              )}
              <span
                className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${
                  categoryColors[temple.category] || categoryColors.Other
                }`}
              >
                {localized.category}
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              {localized.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-stone-light text-sm">
              <span className="flex items-center gap-1">
                <MapPin size={15} className="text-gold" strokeWidth={1.5} />
                {localized.city}, {localized.state}
              </span>
              <span className="text-stone-light/50">·</span>
              <span>{localized.period}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* History */}
          <div>
            <h3 className="font-display text-xl font-bold text-charcoal mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-gold" />
              {t('modal.history')}
            </h3>
            <p className="text-charcoal-light leading-relaxed text-sm sm:text-base">
              {localized.history}
            </p>
          </div>

          {/* Timings */}
          <div className="bg-cream rounded-xl p-5 border border-border/50">
            <h3 className="font-display text-lg font-bold text-charcoal mb-2 flex items-center gap-2">
              <Clock size={18} className="text-maroon" />
              {t('modal.timings')}
            </h3>
            <p className="text-charcoal-light text-sm sm:text-base font-medium">
              {localized.timings}
            </p>
          </div>

          {/* Festivals */}
          {localized.festivals && localized.festivals.length > 0 && (
            <div>
              <h3 className="font-display text-lg font-bold text-charcoal mb-3 flex items-center gap-2">
                <PartyPopper size={18} className="text-gold-dark" />
                {t('modal.festivals')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {localized.festivals.map((festival, index) => (
                  <span
                    key={index}
                    className="px-3.5 py-1.5 rounded-full bg-cream text-charcoal-light text-xs sm:text-sm font-medium border border-border shadow-xs"
                  >
                    {festival}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Significance */}
          <div>
            <h3 className="font-display text-lg font-bold text-charcoal mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-maroon" />
              {t('modal.significance')}
            </h3>
            <p className="text-charcoal-light leading-relaxed text-sm sm:text-base">
              {localized.significance}
            </p>
          </div>

          {/* Google Maps Button */}
          {localized.mapsUrl && (
            <div className="pt-2">
              <a
                href={localized.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-maroon text-warm-white rounded-xl font-medium hover:shadow-lg transition-all cursor-pointer shadow-md text-sm sm:text-base"
                aria-label={`${t('modal.getDirections')}: ${localized.name}`}
              >
                <MapPin size={18} />
                {t('modal.getDirections')}
                <ExternalLink size={14} />
              </a>
            </div>
          )}

          {/* Disclaimer */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/80 border border-amber-200/80">
            <AlertTriangle
              size={20}
              className="text-amber-600 mt-0.5 shrink-0"
            />
            <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              <strong>{t('modal.disclaimerTitle')}: </strong>
              {t('modal.disclaimerText')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
