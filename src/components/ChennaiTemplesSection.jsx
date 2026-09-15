import { useState, useMemo } from 'react';
import { Landmark, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import chennaiTemples from '../data/chennaiTemples';
import TempleCard from './TempleCard';

export default function ChennaiTemplesSection({ onSelectTemple }) {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Shiva', 'Vishnu', 'Shakti', 'Murugan', 'Ganesh'];

  const filteredTemples = useMemo(() => {
    if (selectedCategory === 'All') return chennaiTemples;
    return chennaiTemples.filter((temple) => temple.category === selectedCategory);
  }, [selectedCategory]);

  const categoryLabels = {
    All: { en: 'All Chennai Temples', ta: 'அனைத்து சென்னை கோயில்கள்', hi: 'सभी चेन्नई मंदिर' },
    Shiva: { en: 'Shiva', ta: 'சிவன்', hi: 'शिव' },
    Vishnu: { en: 'Vishnu', ta: 'விஷ்ணு', hi: 'विष्णु' },
    Shakti: { en: 'Shakti / Amman', ta: 'சக்தி / அம்மன்', hi: 'शक्ति / अम्मन' },
    Murugan: { en: 'Murugan', ta: 'முருகன்', hi: 'मुरुगन' },
    Ganesh: { en: 'Ganesh / Vinayagar', ta: 'விநாயகர்', hi: 'गणेश' },
  };

  return (
    <section id="chennai-temples" className="py-16 md:py-24 bg-sandstone/60 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="p-1.5 rounded-lg bg-maroon/10 text-maroon">
              <Landmark size={18} strokeWidth={2} />
            </span>
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone font-semibold">
              {language === 'ta'
                ? 'சென்னை ஆன்மீகத் திருத்தலங்கள்'
                : language === 'hi'
                ? 'चेन्नई के ऐतिहासिक तीर्थ'
                : 'Heritage of Chennai'}
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
            {language === 'ta'
              ? 'சென்னையின் புகழ்பெற்ற திருக்கோயில்கள்'
              : language === 'hi'
              ? 'चेन्नई के प्रसिद्ध ऐतिहासिक मंदिर'
              : 'Historic Temples of Chennai'}
          </h2>

          <p className="text-stone mt-4 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            {language === 'ta'
              ? 'மயிலாப்பூர், திருவல்லிக்கேணி, வடபழனி, ஜார்ஜ் டவுன், மாங்காடு உள்ளிட்ட சென்னையின் தொன்மையான திருக்கோயில்கள் — தினமலர் மற்றும் ஹோலிடிஃபை தகவல்களுடன்.'
              : language === 'hi'
              ? 'मायलापुर, ट्रिप्लिकेन, वडपलनी, जॉर्ज टाउन, मांगाडु समेत चेन्नई के पावन मंदिर — दिनमलर और हॉलिडिफाई संकलित जानकारी सहित।'
              : 'Explore the revered centuries-old shrines of Mylapore, Triplicane, Vadapalani, George Town, Mangadu, and across Chennai — sourced from Holidify and Dinamalar archives.'}
          </p>

          {/* Reference Source Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <a
              href="https://www.holidify.com/collections/temples-in-chennai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cream text-charcoal-light hover:text-maroon border border-border shadow-xs transition-colors"
            >
              <span>Holidify: Temples in Chennai</span>
              <ExternalLink size={12} />
            </a>
            <a
              href="https://temple.dinamalar.com/en/default.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cream text-charcoal-light hover:text-maroon border border-border shadow-xs transition-colors"
            >
              <span>Dinamalar Temple Directory</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-maroon text-warm-white shadow-sm'
                  : 'bg-warm-white text-stone hover:text-charcoal border border-border hover:border-maroon/30'
              }`}
            >
              {categoryLabels[cat]?.[language] || cat}
              {cat === 'All' ? ` (${chennaiTemples.length})` : ` (${chennaiTemples.filter((t) => t.category === cat).length})`}
            </button>
          ))}
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
