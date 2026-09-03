import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { ChevronDown } from 'lucide-react';

export default function Hero({ onExplore }) {
  const { settings } = useAdmin();
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={settings.heroImageUrl}
          alt="Ancient Hindu temple architecture"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto animate-slide-up py-12">
        {/* Landing Page Quick Language Switcher Banner */}
        <div className="flex justify-center mb-8">
          <LanguageSelector variant="pills" />
        </div>

        {/* Decorative badge */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
          <span className="block w-8 sm:w-12 h-px bg-gold" />
          <span className="text-gold text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold">
            {t('hero.badge')}
          </span>
          <span className="block w-8 sm:w-12 h-px bg-gold" />
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-warm-white leading-tight mb-6 tracking-tight">
          <span className="text-gradient-gold">
            {t('hero.title')}
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-stone-light max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExplore}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-maroon text-warm-white text-base sm:text-lg font-medium rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group shadow-lg"
            aria-label={t('hero.exploreCta')}
          >
            {t('hero.exploreCta')}
            <ChevronDown
              size={20}
              className="group-hover:translate-y-1 transition-transform duration-300"
            />
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sandstone to-transparent pointer-events-none" />
    </section>
  );
}
