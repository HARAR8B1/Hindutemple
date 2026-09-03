import { useState } from 'react';
import {
  Menu,
  X,
  Compass,
  Landmark,
  Flame,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

export default function Navbar({ onAdminClick, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { label: t('nav.explore'), icon: Compass, section: 'explore' },
    { label: t('nav.divyaDesam'), icon: Landmark, section: 'divya-desam' },
    { label: t('nav.shivaTemples'), icon: Flame, section: 'shiva-temples' },
    { label: t('nav.about'), icon: Info, section: 'about' },
  ];

  const handleNav = (section) => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <button
            onClick={() => handleNav('hero')}
            className="flex items-center gap-2 group cursor-pointer text-left"
            aria-label="Go to home"
          >
            <div>
              <span className="text-xl md:text-2xl font-display font-bold text-maroon tracking-tight group-hover:text-maroon-light transition-colors block">
                {t('brand.title')}
              </span>
              <span className="text-[10px] md:text-xs text-stone tracking-wide font-medium block">
                {t('brand.subtitle')}
              </span>
            </div>
          </button>

          {/* Desktop Nav & Language Switcher */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map(({ label, icon: Icon, section }) => (
              <button
                key={section}
                onClick={() => handleNav(section)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-charcoal-light hover:text-maroon hover:bg-cream transition-all duration-200 cursor-pointer"
                aria-label={`Navigate to ${label}`}
              >
                <Icon size={16} strokeWidth={1.5} />
                {label}
              </button>
            ))}

            {/* Language Selector Dropdown */}
            <LanguageSelector variant="dropdown" className="ml-1" />

            {/* Admin Portal Button */}
            <button
              onClick={onAdminClick}
              className="flex items-center gap-1.5 ml-1 px-3.5 py-2 rounded-lg text-sm font-medium bg-gradient-maroon text-warm-white hover:opacity-90 transition-opacity duration-200 cursor-pointer shadow-sm"
              aria-label="Open admin login"
            >
              <ShieldCheck size={16} strokeWidth={1.5} />
              {t('nav.adminPortal')}
            </button>
          </div>

          {/* Mobile Right Controls: Language Selector + Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSelector variant="dropdown" />
            <button
              className="p-2 rounded-lg text-charcoal hover:bg-cream transition-colors cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-warm-white animate-fade-in shadow-xl">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ label, icon: Icon, section }) => (
              <button
                key={section}
                onClick={() => handleNav(section)}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium text-charcoal-light hover:text-maroon hover:bg-cream transition-all duration-200 cursor-pointer"
                aria-label={`Navigate to ${label}`}
              >
                <Icon size={20} strokeWidth={1.5} />
                {label}
              </button>
            ))}

            <div className="pt-2 border-t border-border/50">
              <button
                onClick={() => {
                  onAdminClick();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium bg-gradient-maroon text-warm-white hover:opacity-90 transition-opacity duration-200 cursor-pointer"
                aria-label="Open admin login"
              >
                <ShieldCheck size={20} strokeWidth={1.5} />
                {t('nav.adminPortal')}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
