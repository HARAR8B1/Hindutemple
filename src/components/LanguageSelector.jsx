import { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSelector({ variant = 'dropdown', className = '' }) {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const currentLang = availableLanguages.find((l) => l.code === language) || availableLanguages[0];

  // Pill variant for Hero / Landing banner
  if (variant === 'pills') {
    return (
      <div className={`inline-flex flex-wrap items-center gap-1.5 p-1 bg-black/40 backdrop-blur-md rounded-full border border-gold/30 shadow-lg ${className}`}>
        <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-gold tracking-wide uppercase">
          <Globe size={14} className="animate-pulse text-gold" />
          <span className="hidden sm:inline">Language</span>
        </div>
        {availableLanguages.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-gold to-amber-500 text-charcoal font-bold shadow-md scale-105'
                  : 'text-stone-light/90 hover:text-warm-white hover:bg-white/10'
              }`}
              aria-pressed={isActive}
            >
              {lang.nativeLabel}
            </button>
          );
        })}
      </div>
    );
  }

  // Dropdown variant for Navbar
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-light/20 bg-charcoal-light/40 hover:bg-charcoal-light/70 text-stone-light hover:text-warm-white text-xs sm:text-sm font-medium transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select Language"
      >
        <Globe size={15} className="text-gold" />
        <span className="font-medium">{currentLang.nativeLabel}</span>
        <ChevronDown size={14} className={`text-stone-light/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-44 rounded-xl bg-charcoal border border-gold/30 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 backdrop-blur-lg"
        >
          <div className="px-3 py-1 text-[11px] font-semibold text-stone-light/50 uppercase tracking-wider border-b border-white/5">
            Select Language
          </div>
          {availableLanguages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm text-left transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-maroon/40 text-gold font-semibold'
                    : 'text-stone-light hover:bg-white/5 hover:text-warm-white'
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-medium text-warm-white">{lang.nativeLabel}</span>
                  <span className="text-[11px] text-stone-light/60">{lang.label}</span>
                </div>
                {isSelected && <Check size={14} className="text-gold shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
