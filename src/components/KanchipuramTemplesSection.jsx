import { useState, useMemo } from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import kanchipuramTemples from '../data/kanchipuramTemples';
import TempleCard from './TempleCard';

export default function KanchipuramTemplesSection({ onSelectTemple }) {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(kanchipuramTemples.map((t) => t.category).filter(Boolean));
    return ['All', ...Array.from(cats).sort()];
  }, []);

  const filteredTemples = useMemo(() => {
    if (selectedCategory === 'All') return kanchipuramTemples;
    return kanchipuramTemples.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  const categoryLabel = {
    All: { en: 'All', ta: 'அனைத்தும்', hi: 'सभी' },
    Shiva: { en: 'Shiva', ta: 'சிவன்', hi: 'शिव' },
    Shakti: { en: 'Shakti', ta: 'சக்தி', hi: 'शक्ति' },
    Vishnu: { en: 'Vishnu', ta: 'விஷ்ணு', hi: 'विष्णु' },
    Murugan: { en: 'Murugan', ta: 'முருகன்', hi: 'मुरुगन' },
    Ganesh: { en: 'Ganesh', ta: 'விநாயகர்', hi: 'गणेश' },
  };

  return (
    <section id="kanchipuram-temples" className="py-16 md:py-24 bg-sandstone border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="p-1.5 rounded-lg bg-maroon/10 text-maroon">
              <MapPin size={18} strokeWidth={2} />
            </span>
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone font-semibold">
              {language === 'ta'
                ? 'காஞ்சிபுரம் புண்ணிய தலங்கள்'
                : language === 'hi'
                ? 'कांचीपुरम के पावन मंदिर'
                : 'Kanchipuram Sacred Temples'}
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
            {language === 'ta'
              ? 'ஆயிரம் கோயில்களின் நகர் — காஞ்சிபுரம்'
              : language === 'hi'
              ? 'सहस्र मंदिरों का नगर — कांचीपुरम'
              : 'City of a Thousand Temples — Kanchipuram'}
          </h2>

          <p className="text-stone mt-4 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            {language === 'ta'
              ? 'பல்லவர், சோழர், விஜயநகர மன்னர்கள் கட்டிய கோயில்களின் நகரம். ஏகாம்பரேசுவரர், கைலாசநாதர், காமாட்சியம்மன், வரதராஜ பெருமாள் உட்பட 1,000+ கோயில்கள் கொண்ட புண்ணிய தலம்.'
              : language === 'hi'
              ? 'पल्लव, चोल और विजयनगर राजाओं द्वारा निर्मित मंदिरों का नगर। एकाम्बरेश्वर, कैलासनाथर, कामाक्षी और वरदराज सहित 1,000+ मंदिरों वाला पवित्र नगर।'
              : 'A city built by Pallava, Chola and Vijayanagara kings. Home to over 1,000 temples including Ekambareswarar, Kailasanathar, Kamakshi Amman, and Varadharaja Perumal — one of the seven holiest cities in Hinduism.'}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count =
              cat === 'All'
                ? kanchipuramTemples.length
                : kanchipuramTemples.filter((t) => t.category === cat).length;
            const label = categoryLabel[cat]?.[language] ?? cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-maroon text-warm-white shadow-sm'
                    : 'bg-warm-white text-stone hover:text-charcoal border border-border hover:border-maroon/30'
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        {/* Temple Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemples.map((temple) => (
            <TempleCard key={temple.id} temple={temple} onClick={onSelectTemple} />
          ))}
        </div>
      </div>
    </section>
  );
}
