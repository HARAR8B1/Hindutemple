import { useMemo, useState } from 'react';
import { Compass, ExternalLink, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import navagrahaTemples from '../data/navagrahaTemples';
import TempleCard from './TempleCard';

const regions = ['All', 'Chennai', 'Tamil Nadu'];

export default function NavagrahaTemplesSection({ onSelectTemple }) {
  const { language } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState('All');

  const filteredTemples = useMemo(() => {
    if (selectedRegion === 'All') return navagrahaTemples;
    if (selectedRegion === 'Chennai') {
      return navagrahaTemples.filter((temple) => temple.city.includes('Chennai'));
    }
    return navagrahaTemples.filter((temple) => !temple.city.includes('Chennai'));
  }, [selectedRegion]);

  const labels = {
    All: { en: 'All Navagraha Temples', ta: 'அனைத்து நவக்கிரகத் தலங்கள்', hi: 'सभी नवग्रह मंदिर' },
    Chennai: { en: 'Chennai Area', ta: 'சென்னை பகுதி', hi: 'चेन्नई क्षेत्र' },
    'Tamil Nadu': { en: 'Tamil Nadu Circuit', ta: 'தமிழ்நாடு நவக்கிரகச் சுற்றுப்பயணம்', hi: 'तमिलनाडु नवग्रह यात्रा' },
  };

  return (
    <section id="navagraha-temples" className="py-16 md:py-24 bg-cream border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="p-1.5 rounded-lg bg-gold/20 text-maroon">
              <Compass size={18} strokeWidth={2} />
            </span>
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone font-semibold">
              {language === 'ta' ? 'நவக்கிரகப் புனிதத் தலங்கள்' : language === 'hi' ? 'नवग्रह पवित्र धाम' : 'Navagraha Pilgrimage'}
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
            {language === 'ta' ? 'சென்னை மற்றும் தமிழ்நாடு நவக்கிரகக் கோயில்கள்' : language === 'hi' ? 'चेन्नई और तमिलनाडु के नवग्रह मंदिर' : 'Navagraha Temples of Chennai & Tamil Nadu'}
          </h2>

          <p className="text-stone mt-4 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
            {language === 'ta'
              ? 'சூரியன் முதல் கேது வரை ஒன்பது கிரகத் திருத்தலங்களின் இருப்பிடம், வழிபாட்டு நேரம், திருவிழாக்கள் மற்றும் ஆன்மீக முக்கியத்துவத்தை அறிந்திடுங்கள்.'
              : language === 'hi'
              ? 'सूर्य से केतु तक नौ ग्रहों के पवित्र स्थलों के स्थान, दर्शन समय, उत्सव और आध्यात्मिक महत्व को जानें।'
              : 'Explore the nine-shrine Chennai Navagraha route and the traditional nine-shrine circuit near Kumbakonam, with locations, timings, festivals, and pilgrimage details.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <a
              href="https://www.chennaistartravels.com/Chennai-Navagraha-Temples-Tour"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-warm-white text-charcoal-light hover:text-maroon border border-border shadow-xs transition-colors"
            >
              Chennai Navagraha route
              <ExternalLink size={12} />
            </a>
            <a
              href="https://www.southindiatoursandtravels.com/Navagraha-Temple"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-warm-white text-charcoal-light hover:text-maroon border border-border shadow-xs transition-colors"
            >
              Tamil Nadu Navagraha reference
              <ExternalLink size={12} />
            </a>
            <a
              href="https://www.tamilnadutourism.tn.gov.in/destinations/world-heritage-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-warm-white text-charcoal-light hover:text-maroon border border-border shadow-xs transition-colors"
            >
              Tamil Nadu heritage context
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {regions.map((region) => {
            const count = region === 'All'
              ? navagrahaTemples.length
              : region === 'Chennai'
              ? navagrahaTemples.filter((temple) => temple.city.includes('Chennai')).length
              : navagrahaTemples.filter((temple) => !temple.city.includes('Chennai')).length;

            return (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  selectedRegion === region
                    ? 'bg-gradient-maroon text-warm-white shadow-sm'
                    : 'bg-warm-white text-stone hover:text-charcoal border border-border hover:border-maroon/30'
                }`}
              >
                {labels[region][language] || labels[region].en} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 mb-6 text-sm text-stone">
          <MapPin size={16} className="text-maroon" />
          <span>
            {selectedRegion === 'Chennai'
              ? 'Chennai metropolitan area'
              : selectedRegion === 'Tamil Nadu'
              ? 'Traditional Kumbakonam Navagraha circuit'
              : 'Chennai and the traditional Tamil Nadu circuit'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemples.map((temple) => (
            <TempleCard key={temple.id} temple={temple} onClick={onSelectTemple} />
          ))}
        </div>
      </div>
    </section>
  );
}
