import { useState, useMemo } from 'react';
import { Globe, ExternalLink, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import visitTemplesData from '../data/visitTemplesData';

const PAGE_SIZE = 30;

export default function VisitTemplesSection({ onSelectTemple }) {
  const { language } = useLanguage();
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  // Available states
  const availableStates = useMemo(() => {
    const statesSet = new Set(visitTemplesData.map((t) => t.state).filter(Boolean));
    return ['All', ...Array.from(statesSet).sort()];
  }, []);

  // Available categories
  const availableCategories = useMemo(() => {
    const cats = new Set(visitTemplesData.map((t) => t.category).filter(Boolean));
    return ['All', ...Array.from(cats).sort()];
  }, []);

  const filteredTemples = useMemo(() => {
    let list = visitTemplesData;
    if (selectedState !== 'All') list = list.filter((t) => t.state === selectedState);
    if (selectedCategory !== 'All') list = list.filter((t) => t.category === selectedCategory);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.city.toLowerCase().includes(q) ||
          t.state.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedState, selectedCategory, search]);

  const totalPages = Math.ceil(filteredTemples.length / PAGE_SIZE);
  const pagedTemples = filteredTemples.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (setter) => (val) => {
    setter(val);
    setPage(1);
  };

  return (
    <section
      id="visit-temples-section"
      className="py-16 md:py-24 bg-cream border-t border-border/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="p-1.5 rounded-lg bg-gold/20 text-maroon">
              <Globe size={18} strokeWidth={2} />
            </span>
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone font-semibold">
              {language === 'ta'
                ? 'விசிட் டெம்பிள்ஸ் — இந்திய ஆலயகள்'
                : language === 'hi'
                ? 'विज़िट टेम्पल्स — भारत के मंदिर'
                : 'VisitTemples.com — Hindu Temples of India'}
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
            {language === 'ta'
              ? 'அனைத்திந்திய இந்து ஆலயங்கள்'
              : language === 'hi'
              ? 'भारत के हिन्दू मंदिर — सम्पूर्ण सूची'
              : 'India's Hindu Temple Heritage'}
          </h2>

          <p className="text-stone mt-3 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            {language === 'ta'
              ? `VisitTemples.com இலிருந்து பெறப்பட்ட ${visitTemplesData.length.toLocaleString()} இந்திய ஆலயங்கள் — மாநிலம், வகை, மற்றும் பெயர் வாரியாக தேடுங்கள்.`
              : language === 'hi'
              ? `VisitTemples.com से संकलित ${visitTemplesData.length.toLocaleString()} हिन्दू मंदिर — राज्य, श्रेणी और नाम से खोजें।`
              : `${visitTemplesData.length.toLocaleString()} Hindu temples sourced from VisitTemples.com — explore by state, category, or name.`}
          </p>

          <p className="text-xs text-stone/60 mt-1">
            Source:{' '}
            <a
              href="https://www.visittemples.com/hindu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-maroon hover:underline"
            >
              www.visittemples.com/hindu
            </a>
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-6">
          <input
            type="text"
            placeholder={
              language === 'ta'
                ? 'ஆலயம், நகரம் அல்லது மாநிலம் தேடுங்கள்...'
                : language === 'hi'
                ? 'मंदिर, शहर या राज्य खोजें...'
                : 'Search by temple name, city or state...'
            }
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-warm-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-maroon/30 focus:border-maroon transition-all"
          />
        </div>

        {/* State Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {availableStates.map((st) => {
            const count = st === 'All' ? visitTemplesData.length : visitTemplesData.filter((t) => t.state === st).length;
            return (
              <button
                key={st}
                onClick={handleFilter(setSelectedState)(st)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  selectedState === st
                    ? 'bg-gradient-maroon text-warm-white shadow-sm'
                    : 'bg-warm-white text-stone hover:text-charcoal border border-border hover:border-maroon/30'
                }`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={handleFilter(setSelectedCategory)(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gold text-charcoal-dark shadow-sm'
                  : 'bg-warm-white/60 text-stone/80 hover:text-charcoal border border-border/60 hover:border-gold/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-center text-sm text-stone mb-6">
          {language === 'ta'
            ? `${filteredTemples.length} ஆலயங்கள் காட்டப்படுகின்றன (பக்கம் ${page}/${totalPages || 1})`
            : language === 'hi'
            ? `${filteredTemples.length} मंदिर दिखाए जा रहे हैं (पृष्ठ ${page}/${totalPages || 1})`
            : `Showing ${filteredTemples.length} temples — Page ${page} of ${totalPages || 1}`}
        </p>

        {/* Temple Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pagedTemples.map((temple) => (
            <div
              key={temple.id}
              className="bg-warm-white rounded-xl border border-border/60 hover:border-maroon/40 shadow-sm hover:shadow-md transition-all duration-200 p-4 flex flex-col gap-2 cursor-pointer group"
              onClick={() => onSelectTemple(temple)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectTemple(temple)}
            >
              {/* Category badge */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/15 text-maroon font-semibold uppercase tracking-wide">
                  {temple.category}
                </span>
                <a
                  href={temple.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone/40 hover:text-maroon transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View on VisitTemples.com"
                >
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Temple name */}
              <h3 className="font-display text-sm font-semibold text-charcoal group-hover:text-maroon transition-colors leading-snug line-clamp-3">
                {temple.name}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-1 text-xs text-stone mt-auto">
                <MapPin size={11} className="shrink-0 text-maroon/60" />
                <span className="truncate">
                  {temple.city && temple.city !== temple.state ? `${temple.city}, ` : ''}
                  {temple.state}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-border bg-warm-white text-stone disabled:opacity-40 hover:border-maroon/40 hover:text-maroon transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            <span className="text-sm text-stone font-medium px-3">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-border bg-warm-white text-stone disabled:opacity-40 hover:border-maroon/40 hover:text-maroon transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
