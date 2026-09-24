import { useState, useMemo } from 'react';
import { Sparkles, Heart, Shield, Baby, Coins, GraduationCap, Compass, Car, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import pariharaTemples from '../data/pariharaTemples';
import TempleCard from './TempleCard';

export default function PariharaTemplesSection({ onSelectTemple }) {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');

  const filterTabs = [
    { key: 'All', icon: Sparkles, en: 'All Remedies', ta: 'அனைத்து பரிகாரங்கள்', hi: 'सभी परिहार' },
    { key: 'Wealth & Prosperity', icon: Coins, en: 'Wealth & Kubera (Arasar Koil)', ta: 'செல்வம் & குபேர சம்பத்து (அரசர்கோவில்)', hi: 'धन व कुबेर शक्ति (अरासर कोईल)' },
    { key: 'Marriage', icon: Heart, en: 'Marriage Obstacles', ta: 'திருமணத் தடை நீங்குதல்', hi: 'विवाह बाधा निवारण' },
    { key: 'Child Boon & Safe Delivery', icon: Baby, en: 'Progeny & Safe Delivery', ta: 'புத்திர பாக்கியம் & சுகப்பிரசவம்', hi: 'संतान व सुख प्रसव' },
    { key: 'Health & Healing', icon: Shield, en: 'Health & Disease Cure', ta: 'நோய் தீர்க்கும் தலங்கள்', hi: 'आरोग्य व रोग निवारण' },
    { key: 'Debt Relief', icon: Coins, en: 'Debt Relief (Runa Vimochana)', ta: 'கடன் நிவர்த்தி', hi: 'ऋण मुक्ति' },
    { key: 'Education & Wisdom', icon: GraduationCap, en: 'Education & Wisdom', ta: 'கல்வி & ஞானம்', hi: 'विद्या व ज्ञान' },
    { key: 'Mental Peace & Dosha Relief', icon: Compass, en: 'Mental Peace & Dosha Relief', ta: 'மன அமைதி & தோஷ நிவர்த்தி', hi: 'मानसिक शांति' },
    { key: 'Safe Travel', icon: Car, en: 'Safe Travel', ta: 'பயணப் பாதுகாப்பு', hi: 'सुरक्षित यात्रा' },
    { key: 'Pitru Dosha Relief', icon: Users, en: 'Pitru Dosha Relief', ta: 'பித்ரு தோஷ நிவர்த்தி', hi: 'पितृ दोष शांति' },
  ];

  const filteredTemples = useMemo(() => {
    if (activeFilter === 'All') return pariharaTemples;
    return pariharaTemples.filter((t) => t.remedyCategory === activeFilter);
  }, [activeFilter]);

  return (
    <section id="parihara-sthalams" className="py-16 md:py-24 bg-gradient-to-b from-warm-white via-amber-50/30 to-warm-white border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="p-1.5 rounded-lg bg-gold/20 text-maroon shadow-xs">
              <Sparkles size={18} strokeWidth={2} />
            </span>
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-maroon font-semibold">
              {language === 'ta'
                ? 'தோஷ நிவர்த்தி & பரிகாரத் திருத்தலங்கள்'
                : language === 'hi'
                ? 'दोष निवारण एवं सिद्ध परिहार स्थल'
                : 'Sacred Parihara Sthalams'}
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
            {language === 'ta'
              ? 'புகழ்பெற்ற பரிகாரத் தலங்கள் & வழிபாட்டு முறைகள்'
              : language === 'hi'
              ? 'प्रसिद्ध परिहार तीर्थ एवं मनोकामना पूर्ति धाम'
              : 'Divine Remedy Shrines (Parihara Sthalams)'}
          </h2>

          <p className="text-stone mt-4 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
            {language === 'ta'
              ? 'அரசர்கோவில் ஸ்ரீ சுந்தர மகாலட்சுமி (குபேர சம்பத்து, 6 விரல்கள், சுக்கிர தோஷ நிவர்த்தி) முதல் திருமணஞ்சேரி, திருக்கருகாவூர், வைத்தீஸ்வரன் கோயில், திருச்சேறை கடன் நிவர்த்தி லிங்கேஸ்வரர் உள்ளிட்ட பிரசித்தி பெற்ற பரிகாரத் திருத்தலங்கள்.'
              : language === 'hi'
              ? 'अरासर कोईल श्री सुंदरा महालक्ष्मी (धन, कुबेर शक्ति, दाहिने पैर में 6 उँगलियाँ, शुक्र शांति) से लेकर तिरुमणंचेरी, तिरुक्करुकावूर, वैथीश्वरन कोईल और ऋण विमोचन लिंगेश्वरर तक के सिद्ध चमत्कारी धाम।'
              : 'Explore celebrated shrines renowned for specific divine remedies — from Arasar Koil Sri Sundara Mahalakshmi (Aadhi Moola Lakshmi with 6 toes for Venus & Kubera blessings) to marriage, progeny, disease healing, debt clearance, education, and peace.'}
          </p>
        </div>

        {/* Remedy Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const count = tab.key === 'All' ? pariharaTemples.length : pariharaTemples.filter(t => t.remedyCategory === tab.key).length;
            if (tab.key !== 'All' && count === 0) return null;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeFilter === tab.key
                    ? 'bg-gradient-maroon text-warm-white shadow-md scale-105'
                    : 'bg-warm-white text-stone hover:text-charcoal border border-border hover:border-gold/50 shadow-xs'
                }`}
              >
                <Icon size={14} className={activeFilter === tab.key ? 'text-gold' : 'text-stone'} />
                <span>{language === 'ta' ? tab.ta : language === 'hi' ? tab.hi : tab.en}</span>
                <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${activeFilter === tab.key ? 'bg-black/20 text-warm-white' : 'bg-sandstone text-stone'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Temple Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemples.map((temple) => (
            <TempleCard
              key={temple.id}
              temple={temple}
              onClick={onSelectTemple}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
