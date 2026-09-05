import { useState } from 'react';
import divyaDesams from '../data/divyaDesams';
import TempleCard from './TempleCard';
import { Landmark, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DivyaDesamSection({ onSelectTemple }) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const divyaDesamTemples = divyaDesams;
  const visibleTemples = isExpanded ? divyaDesamTemples : [];

  return (
    <section id="divya-desam" className="py-16 md:py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Landmark size={20} className="text-blue-700" strokeWidth={1.5} />
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone font-semibold">
              {t('divyaDesam.badge')}
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
            {t('divyaDesam.title')}
          </h2>
          <p className="text-stone mt-4 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            {t('divyaDesam.subtitle')}
          </p>
        </div>

        {divyaDesamTemples.length > 0 ? (
          <>
            <div className="mb-6 flex justify-center">
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-maroon/20 bg-cream px-4 py-2 text-sm font-semibold text-maroon transition-colors hover:bg-maroon hover:text-white"
              >
                {isExpanded ? 'Collapse 108 Divya Desams' : 'Expand 108 Divya Desams'}
                <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {isExpanded && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleTemples.map((temple) => (
                  <TempleCard
                    key={temple.id}
                    temple={temple}
                    onClick={onSelectTemple}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-stone">
              Divya Desam temples are being added to the archive. Check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
