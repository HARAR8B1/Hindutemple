import { Circle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ganeshTemples from '../data/ganeshTemples';
import TempleCard from './TempleCard';

export default function GaneshTemplesSection({ onSelectTemple }) {
  const { t } = useLanguage();

  return (
    <section id="ganesh-temples" className="py-16 md:py-24 bg-sandstone border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Circle size={18} className="text-orange-600 fill-orange-500/20" strokeWidth={1.5} />
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone font-semibold">
              {t('ganeshTemples.badge')}
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
            {t('ganeshTemples.title')}
          </h2>
          <p className="text-stone mt-4 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            {t('ganeshTemples.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {ganeshTemples.map((temple) => (
            <TempleCard key={temple.id} temple={temple} onClick={onSelectTemple} />
          ))}
        </div>
      </div>
    </section>
  );
}