import { useState } from 'react';
import { MapPin, Navigation, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import NearbyTemplesModal from './NearbyTemplesModal';

export default function NearbyTemplesButton() {
  const { language } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  const label = {
    en: 'Find Temples Near You',
    ta: 'அருகில் உள்ள கோயில்கள்',
    hi: 'पास के मंदिर खोजें',
  };

  const sublabel = {
    en: 'Search Temple, City, Place or PIN (30 km)',
    ta: 'கோயில், ஊர், இடம் அல்லது பின்கோடு (30 கி.மீ.)',
    hi: 'मंदिर, नगर, स्थान या पिनकोड (30 किमी)',
  };

  return (
    <>
      {/* Floating suggestion banner */}
      <div className="fixed bottom-6 right-6 z-40 group">
        <button
          id="nearby-temples-btn"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-3 pl-4 pr-5 py-3.5 rounded-2xl shadow-2xl cursor-pointer
            bg-gradient-to-r from-maroon to-maroon-dark text-warm-white
            hover:from-maroon-dark hover:to-maroon
            transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_32px_rgba(139,0,0,0.45)]
            border border-white/10 backdrop-blur-sm"
          aria-label="Find nearby temples"
        >
          {/* Pulsing location icon */}
          <span className="relative flex-shrink-0">
            <span className="absolute inset-0 rounded-full bg-white/25 animate-ping opacity-75" />
            <Navigation size={20} strokeWidth={2} className="relative" />
          </span>

          <span className="flex flex-col items-start leading-tight">
            <span className="text-sm font-bold tracking-wide">{label[language] || label.en}</span>
            <span className="text-[11px] text-white/75 font-medium">{sublabel[language] || sublabel.en}</span>
          </span>

          <Sparkles size={16} className="text-yellow-300 opacity-80 animate-pulse flex-shrink-0" />
        </button>
      </div>

      {/* The full search modal */}
      {showModal && (
        <NearbyTemplesModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
