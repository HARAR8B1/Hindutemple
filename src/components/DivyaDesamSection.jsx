import temples from '../data/temples';
import TempleCard from './TempleCard';
import { Landmark } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DivyaDesamSection({ onSelectTemple }) {
  const { t } = useLanguage();

  const divyaDesamTemples = temples.filter(
    (item) =>
      item.category === 'Vishnu' &&
      (item.designation?.includes('Divya Desam') ||
        item.designation?.includes('Char Dham'))
  );

  return (
    <section id="divya-desam" className="py-16 md:py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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

        {/* Cards */}
        {divyaDesamTemples.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {divyaDesamTemples.map((temple) => (
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
              Divya Desam temples are being added to the archive. Check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
