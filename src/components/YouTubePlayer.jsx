import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import { Play } from 'lucide-react';

export default function YouTubePlayer() {
  const { settings } = useAdmin();
  const { t } = useLanguage();

  // Extract embed URL - handle both full URLs and embed URLs
  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('/embed/')) return url;
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
    );
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
    return url;
  };

  const embedUrl = getEmbedUrl(settings.youtubeUrl);

  return (
    <section className="py-16 md:py-24 bg-warm-white border-b border-border/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Play size={18} className="text-maroon fill-maroon/20" strokeWidth={1.5} />
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone font-semibold">
              {t('youtube.badge')}
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-3">
            {t('youtube.title')}
          </h2>
          <p className="text-sm sm:text-base text-stone max-w-xl mx-auto">
            {t('youtube.subtitle')}
          </p>
        </div>

        {/* Video Player */}
        <div className="relative rounded-2xl overflow-hidden shadow-card bg-charcoal aspect-video border border-gold/20">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={t('youtube.title')}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-stone-light p-6 text-center">
              <p>Video not available. Configure the YouTube URL in the Admin panel.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
