import { useState, useMemo } from 'react';
import { Compass, MapPin, Sparkles, Landmark } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import indiaTemples from '../data/indiaTemples';
import { localizedStates } from '../data/categories';
import TempleCard from './TempleCard';

export default function IndiaTemplesSection({ onSelectTemple }) {
  const { t, language } = useLanguage();
  const [selectedState, setSelectedState] = useState('All');

  // Available states present in indiaTemples
  const availableStates = useMemo(() => {
    const statesSet = new Set(indiaTemples.map((t) => t.state).filter(Boolean));
    return ['All', ...Array.from(statesSet).sort()];
  }, []);

  const filteredTemples = useMemo(() => {
    if (selectedState === 'All') return indiaTemples;
    return indiaTemples.filter((temple) => temple.state === selectedState);
  }, [selectedState]);

  return (
    <section id="all-india-temples" className="py-16 md:py-24 bg-sandstone border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="p-1.5 rounded-lg bg-gold/20 text-maroon">
              <Compass size={18} strokeWidth={2} />
            </span>
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone font-semibold">
              {language === 'ta'
                ? 'அகில இந்திய திருத்தலங்கள்'
                : language === 'hi'
                ? 'अखिल भारतीय पावन धाम'
                : 'Sacred Temples Across Bharat'}
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
            {language === 'ta'
              ? 'பாரதத்தின் புண்ணிய திருத்தலங்கள்'
              : language === 'hi'
              ? 'भारत के प्रमुख ऐतिहासिक मंदिर'
              : 'Pan-India Sacred Sanctuaries'}
          </h2>

          <p className="text-stone mt-4 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            {language === 'ta'
              ? 'காஷ்மீர் முதல் கன்னியாகுமரி வரை, துவாரகை முதல் காமாக்யா வரை — பாரதத்தின் அனைத்து மாநிலங்களின் வரலாற்றுப் புகழ்பெற்ற ஆலயங்கள்.'
              : language === 'hi'
              ? 'कश्मीर से कन्याकुमारी तक और द्वारका से कामाख्या तक — भारत के सभी राज्यों के प्रसिद्ध ऐतिहासिक और पौराणिक मंदिर।'
              : 'Journey across every state of India — from the snow-capped Himalayas to coastal shores, exploring ancient sanctums with detailed locations, architecture, and timings.'}
          </p>
        </div>

        {/* State Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {availableStates.map((st) => {
            const isSelected = selectedState === st;
            const count = st === 'All' ? indiaTemples.length : indiaTemples.filter((t) => t.state === st).length;
            const label = st === 'All'
              ? (language === 'ta' ? 'அனைத்து மாநிலங்கள்' : language === 'hi' ? 'सभी राज्य' : 'All States')
              : (localizedStates[st]?.[language] || st);

            return (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
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
