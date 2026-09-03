import { BookOpen, Heart, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-16 md:py-24 bg-warm-white border-t border-border/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <BookOpen size={20} className="text-maroon" strokeWidth={1.5} />
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone font-semibold">
              {t('about.badge')}
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
            {t('about.title')}
          </h2>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="bg-cream rounded-2xl p-6 sm:p-8 border border-border/60 shadow-sm">
            <div className="flex items-start gap-4">
              <Heart
                size={24}
                className="text-maroon mt-1 shrink-0"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="font-display text-xl font-bold text-charcoal mb-3">
                  {t('about.missionTitle')}
                </h3>
                <p className="text-charcoal-light leading-relaxed mb-4 text-sm sm:text-base">
                  {t('about.description')}
                </p>
                <div className="space-y-3 pt-2">
                  <div className="border-l-2 border-gold pl-3">
                    <h4 className="font-bold text-charcoal text-sm sm:text-base">{t('about.point1Title')}</h4>
                    <p className="text-stone text-xs sm:text-sm">{t('about.point1Desc')}</p>
                  </div>
                  <div className="border-l-2 border-maroon pl-3">
                    <h4 className="font-bold text-charcoal text-sm sm:text-base">{t('about.point2Title')}</h4>
                    <p className="text-stone text-xs sm:text-sm">{t('about.point2Desc')}</p>
                  </div>
                  <div className="border-l-2 border-blue-700 pl-3">
                    <h4 className="font-bold text-charcoal text-sm sm:text-base">{t('about.point3Title')}</h4>
                    <p className="text-stone text-xs sm:text-sm">{t('about.point3Desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-sandstone border border-border/40">
              <div className="text-3xl font-display font-bold text-maroon mb-1">
                8+
              </div>
              <p className="text-stone text-xs sm:text-sm font-medium">Temples Documented</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-sandstone border border-border/40">
              <div className="text-3xl font-display font-bold text-gold-dark mb-1">
                6
              </div>
              <p className="text-stone text-xs sm:text-sm font-medium">States Covered</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-sandstone border border-border/40">
              <div className="text-3xl font-display font-bold text-charcoal mb-1">
                ∞
              </div>
              <p className="text-stone text-xs sm:text-sm font-medium">Sacred Traditions</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 p-5 rounded-xl bg-amber-50 border border-amber-200/80">
            <AlertTriangle
              size={20}
              className="text-amber-600 mt-0.5 shrink-0"
            />
            <div>
              <p className="text-sm text-amber-800 font-semibold mb-1">
                {t('about.disclaimerHeading')}
              </p>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                {t('about.disclaimerContent')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
