import temples from '../data/temples';
import TempleCard from './TempleCard';
import { Flame } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ShivaTemplesSection({ onSelectTemple }) {
  const { t } = useLanguage();
  const shivaTemples = temples.filter((item) => item.category === 'Shiva');

  return (
    <section id="shiva-temples" className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Flame size={20} className="text-amber-600 fill-amber-500/20" strokeWidth={1.5} />
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone font-semibold">
              {t('shivaTemples.badge')}
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
            {t('shivaTemples.title')}
          </h2>
          <p className="text-stone mt-4 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            {t('shivaTemples.subtitle')}
          </p>
        </div>

        {/* Cards */}
        {shivaTemples.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shivaTemples.map((temple) => (
              <TempleCard
                key={temple.id}
                temple={temple}
                onClick={onSelectTemple}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-stone">
              Shiva temples are being added to the archive. Check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
