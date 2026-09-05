import { MapPin, Clock, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TempleCard({ temple, onClick }) {
  const { getLocalizedTemple, t } = useLanguage();
  const localized = getLocalizedTemple(temple);

  const categoryColors = {
    Shiva: 'bg-amber-100 text-amber-800',
    Vishnu: 'bg-blue-100 text-blue-800',
    Shakti: 'bg-rose-100 text-rose-800',
    Ganesh: 'bg-orange-100 text-orange-800',
    Murugan: 'bg-violet-100 text-violet-800',
    Other: 'bg-gray-100 text-gray-700',
  };

  return (
    <article
      className="group bg-warm-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer transform hover:-translate-y-1 border border-border/50"
      onClick={() => onClick(temple)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(temple);
        }
      }}
      aria-label={`${t('card.viewDetails')}: ${localized.name}`}
    >
      {/* Image */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-sandstone">
        <img
          src={localized.image || '/images/temple-fallback.jpg'}
          alt={localized.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/images/temple-fallback.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Designation Badge */}
        {localized.designation && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gold/90 text-charcoal backdrop-blur-sm shadow-sm max-w-[180px] truncate">
              <Tag size={12} className="shrink-0" />
              <span className="truncate">{localized.designation}</span>
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-sm ${
              categoryColors[temple.category] || categoryColors.Other
            }`}
          >
            {localized.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-charcoal mb-2 group-hover:text-maroon transition-colors duration-300 line-clamp-2">
          {localized.name}
        </h3>

        <div className="flex items-center gap-1.5 text-stone text-sm mb-2">
          <MapPin size={14} strokeWidth={1.5} className="text-maroon shrink-0" />
          <span className="truncate">
            {localized.city}, {localized.state}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-stone text-sm">
          <Clock size={14} strokeWidth={1.5} className="text-gold-dark shrink-0" />
          <span className="truncate">{localized.period}</span>
        </div>
      </div>
    </article>
  );
}
