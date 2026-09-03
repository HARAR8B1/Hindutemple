import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import { Heart } from 'lucide-react';

function YoutubeIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const { settings } = useAdmin();
  const { t } = useLanguage();

  const socialLinks = [
    {
      label: 'YouTube',
      icon: YoutubeIcon,
      url: settings.youtubeUrl || 'https://www.youtube.com',
      hoverColor: 'hover:text-red-500',
    },
    {
      label: 'Facebook',
      icon: FacebookIcon,
      url: settings.facebookUrl,
      hoverColor: 'hover:text-blue-500',
    },
    {
      label: 'Instagram',
      icon: InstagramIcon,
      url: settings.instagramUrl,
      hoverColor: 'hover:text-pink-500',
    },
  ];

  return (
    <footer className="bg-charcoal text-stone-light border-t border-gold/20">
      {/* Top decorative gradient border */}
      <div className="h-1 bg-gradient-to-r from-maroon via-gold to-maroon" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl font-bold text-warm-white mb-2">
              {t('brand.title')}
            </h3>
            <p className="text-xs sm:text-sm text-stone-light/70 leading-relaxed">
              {t('footer.summary')}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map(({ label, icon: Icon, url, hoverColor }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full bg-charcoal-light/40 text-stone-light transition-all duration-300 hover:scale-110 ${hoverColor} border border-white/5`}
                aria-label={`Visit our ${label} page`}
              >
                <Icon size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>

          {/* Copyright & Dedication */}
          <div className="text-right max-md:text-center">
            <p className="text-xs sm:text-sm text-stone-light/80">
              © {new Date().getFullYear()} {t('footer.copyright')}
            </p>
            <p className="text-xs text-stone-light/60 mt-1.5 flex items-center gap-1 justify-end max-md:justify-center">
              <span>{t('brand.dedication')}</span>
              <Heart size={12} className="text-maroon fill-maroon shrink-0" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
