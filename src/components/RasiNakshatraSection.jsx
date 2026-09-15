import { useState } from 'react';
import { rasiTemples } from '../data/rasiNakshatraTemples';
import TempleCard from './TempleCard';
import { Star, Sparkles } from 'lucide-react';

const RASI_NAMES = [
  'Mesha (Aries)',
  'Vrishabha (Taurus)',
  'Mithuna (Gemini)',
  'Kataka (Cancer)',
  'Simha (Leo)',
  'Kanya (Virgo)',
  'Tula (Libra)',
  'Vrischika (Scorpio)',
  'Dhanus (Sagittarius)',
  'Makara (Capricorn)',
  'Kumbha (Aquarius)',
  'Meena (Pisces)',
];

const RASI_SYMBOLS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

export default function RasiNakshatraSection({ onSelectTemple }) {
  const [activeRasi, setActiveRasi] = useState(null);

  const displayTemples = activeRasi
    ? rasiTemples.filter((t) => t.rasi === activeRasi)
    : rasiTemples;

  return (
    <section id="rasi-nakshatra" className="py-16 md:py-24 bg-gradient-to-b from-[#1a0a2e] to-[#2d1052]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Star size={20} className="text-yellow-400 fill-yellow-400/30" strokeWidth={1.5} />
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-yellow-300/80 font-semibold">
              Astrological Pilgrimage Circuit
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            ராசி & நட்சத்திர கோயில்கள்
          </h2>
          <p className="text-purple-200/80 mt-4 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            In Tamil Nadu's ancient astrological tradition, each of the 12 Rasi (zodiac signs)
            has a presiding temple. Visiting your Rasi temple is believed to bring planetary
            harmony, spiritual peace, and relief from astrological doshas.
          </p>
        </div>

        {/* Rasi selector grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 mb-8">
          {RASI_NAMES.map((rasi, i) => {
            const short = rasi.split(' ')[0];
            const isActive = activeRasi === rasi;
            return (
              <button
                key={rasi}
                onClick={() => setActiveRasi(isActive ? null : rasi)}
                title={rasi}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-center transition-all duration-200 ${
                  isActive
                    ? 'bg-yellow-400 border-yellow-300 text-purple-900 shadow-lg shadow-yellow-400/30 scale-105'
                    : 'bg-white/5 border-white/10 text-purple-200 hover:bg-white/10 hover:border-yellow-400/50'
                }`}
              >
                <span className="text-xl">{RASI_SYMBOLS[i]}</span>
                <span className="text-[10px] font-semibold leading-tight">{short}</span>
              </button>
            );
          })}
        </div>

        {/* Active Rasi badge */}
        {activeRasi && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles size={14} className="text-yellow-400" />
            <span className="text-yellow-300 text-sm font-medium">
              Showing temple for: <strong>{activeRasi}</strong>
            </span>
            <button
              onClick={() => setActiveRasi(null)}
              className="text-purple-300 hover:text-white text-xs underline ml-2"
            >
              Show all
            </button>
          </div>
        )}

        {/* Temple cards */}
        {displayTemples.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayTemples.map((temple) => (
              <div key={temple.id} className="relative">
                {/* Rasi badge overlay */}
                <div className="absolute -top-2 -right-2 z-10 bg-yellow-400 text-purple-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                  {RASI_SYMBOLS[RASI_NAMES.indexOf(temple.rasi)]} {temple.rasi?.split(' ')[0]}
                </div>
                <TempleCard temple={temple} onClick={onSelectTemple} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-purple-200">No temples found for this Rasi.</p>
          </div>
        )}

        {/* Info footer */}
        <div className="mt-10 text-center">
          <p className="text-purple-300/60 text-xs max-w-xl mx-auto">
            The 12 Rasi temples are distributed across Tamil Nadu. Most are also celebrated as
            Arupadai Veedu, Navagraha Sthalams, Paadal Petra Sthalams, or Pancha Bhoota Sthalams.
          </p>
        </div>
      </div>
    </section>
  );
}
