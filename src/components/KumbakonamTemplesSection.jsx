import { useState, useMemo } from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import kumbakonamTemples from '../data/kumbakonamTemples';
import TempleCard from './TempleCard';

export default function KumbakonamTemplesSection({ onSelectTemple }) {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(kumbakonamTemples.map((t) => t.category).filter(Boolean));
    return ['All', ...Array.from(cats).sort()];
  }, []);

  const filteredTemples = useMemo(() => {
    if (selectedCategory === 'All') return kumbakonamTemples;
    return kumbakonamTemples.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  const categoryLabel = {
    All: { en: 'All', ta: 'அனைத்தும்', hi: 'सभी' },
    Shiva: { en: 'Shiva', ta: 'சிவன்', hi: 'शिव' },
    Vishnu: { en: 'Vishnu', ta: 'விஷ்ணு', hi: 'विष्णु' },
    Murugan: { en: 'Murugan', ta: 'முருகன்', hi: 'मुरुगन' },
  };

  return (
    <section id="kumbakonam-temples" className="py-16 md:py-24 bg-warm-white border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="p-1.5 rounded-lg bg-maroon/10 text-maroon">
              <MapPin size={18} strokeWidth={2} />
            </span>
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone font-semibold">
              {language === 'ta'
                ? 'கும்பகோணம் புண்ணிய தலங்கள்'
                : language === 'hi'
                ? 'कुम्भकोणम के पावन मंदिर'
                : 'Kumbakonam Sacred Temples'}
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
            {language === 'ta'
              ? 'கும்பகோணம் — தென்னிந்தியாவின் கோயில் நகர்'
              : language === 'hi'
              ? 'कुम्भकोणम — दक्षिण भारत का मंदिर नगर'
              : 'Kumbakonam — The Temple City of South India'}
          </h2>

          <p className="text-stone mt-4 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            {language === 'ta'
              ? 'ஆதி கும்பேசுவரர், சாரங்கபாணி, ஐராவதேசுவரர் (யுனெஸ்கோ), சுவாமிமலை முருகன் உட்பட மகாமகம் திருவிழாவுக்கு புகழ்பெற்ற கோயில் நகர். 12 ஆண்டுகளுக்கு ஒருமுறை மகாமகம் திருவிழா நடைபெறுகிறது.'
              : language === 'hi'
              ? 'आदि कुम्बेश्वर, सारंगपाणि, ऐरावतेश्वर (यूनेस्को), स्वामिमलई मुरुगन सहित महामहम पर्व के लिए विख्यात मंदिर नगर। हर 12 वर्षों में महामहम महोत्सव।'
              : 'Home to Adi Kumbeswara, Sarangapani, Airavatesvara (UNESCO), Swamimalai Murugan and more. Famous for the grand Mahamaham festival held once every 12 years, drawing millions of pilgrims.'}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count =
              cat === 'All'
                ? kumbakonamTemples.length
                : kumbakonamTemples.filter((t) => t.category === cat).length;
            const label = categoryLabel[cat]?.[language] ?? cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-maroon text-warm-white shadow-sm'
                    : 'bg-sandstone text-stone hover:text-charcoal border border-border hover:border-maroon/30'
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
