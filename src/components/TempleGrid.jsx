import { useState, useMemo } from 'react';
import { ExternalLink, Search, Filter, X, ChevronDown } from 'lucide-react';
import temples from '../data/temples';
import divyaDesams from '../data/divyaDesams';
import ganeshTemples from '../data/ganeshTemples';
import muruganTemples from '../data/muruganTemples';
import chennaiTemples from '../data/chennaiTemples';
import indiaTemples from '../data/indiaTemples';
import navagrahaTemples from '../data/navagrahaTemples';
import unescoHeritageTemples from '../data/unescoHeritageTemples';
import tamilnaduTemples from '../data/tamilnaduTemples';
import { states, categories, localizedStates, localizedCategories } from '../data/categories';
import TempleCard from './TempleCard';
import { useLanguage } from '../context/LanguageContext';

const INITIAL_VISIBLE_COUNT = 32;

const templeCatalog = [...new Map(
  [...temples, ...divyaDesams, ...ganeshTemples, ...muruganTemples, ...navagrahaTemples, ...unescoHeritageTemples, ...chennaiTemples, ...tamilnaduTemples, ...indiaTemples].map((temple) => [temple.id, temple])
).values()];

export default function TempleGrid({ onSelectTemple }) {
  const { t, language, getLocalizedTemple } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleStateChange = (val) => {
    setSelectedState(val);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleCategoryChange = (val) => {
    setSelectedCategory(val);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedState('All States');
    setSelectedCategory('All Categories');
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const hasActiveFilters =
    Boolean(searchQuery) || selectedState !== 'All States' || selectedCategory !== 'All Categories';

  const filteredTemples = useMemo(() => {
    return templeCatalog.filter((temple) => {
      const loc = getLocalizedTemple(temple);
      const query = searchQuery.trim().toLowerCase();

      const matchesSearch =
        !query ||
        temple.name.toLowerCase().includes(query) ||
        temple.city.toLowerCase().includes(query) ||
        temple.state.toLowerCase().includes(query) ||
        (temple.category && temple.category.toLowerCase().includes(query)) ||
        (temple.designation && temple.designation.toLowerCase().includes(query)) ||
        (loc.name && loc.name.toLowerCase().includes(query)) ||
        (loc.city && loc.city.toLowerCase().includes(query)) ||
        (loc.state && loc.state.toLowerCase().includes(query)) ||
        (loc.category && loc.category.toLowerCase().includes(query)) ||
        (loc.designation && loc.designation.toLowerCase().includes(query));

      const matchesState =
        selectedState === 'All States' || temple.state === selectedState;

      const matchesCategory =
        selectedCategory === 'All Categories' ||
        temple.category === selectedCategory;

      return matchesSearch && matchesState && matchesCategory;
    });
  }, [searchQuery, selectedState, selectedCategory, getLocalizedTemple]);

  const displayedTemples = useMemo(() => {
    return filteredTemples.slice(0, visibleCount);
  }, [filteredTemples, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 32);
  };

  return (
    <section id="explore" className="py-16 md:py-24 bg-sandstone border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Filter size={18} className="text-maroon" strokeWidth={1.5} />
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone font-semibold">
              {t('archive.badge')}
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
            {t('archive.title')}
          </h2>
          <p className="text-stone mt-4 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            {t('archive.subtitle')}
          </p>
          <div className="mt-4">
            <a
              href="https://temple.dinamalar.com/en/default.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-maroon hover:text-maroon-dark font-medium underline transition-colors"
            >
              <span>{t('archive.dinamalarLink')}</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-warm-white rounded-2xl p-4 sm:p-6 shadow-card mb-8 border border-border">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={t('archive.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-sandstone/70 text-sm text-charcoal placeholder:text-stone/60 focus:outline-none focus:ring-2 focus:ring-maroon/30 focus:border-maroon transition-all"
                aria-label="Search temples"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-charcoal cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3">
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-border bg-sandstone/70 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-maroon/30 focus:border-maroon transition-all cursor-pointer font-medium"
                aria-label="Filter by state"
              >
                {states.map((st) => (
                  <option key={st} value={st}>
                    {localizedStates[st]?.[language] || st}
                  </option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-border bg-sandstone/70 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-maroon/30 focus:border-maroon transition-all cursor-pointer font-medium"
                aria-label="Filter by category"
              >
                {categories.map((catKey) => (
                  <option key={catKey} value={catKey}>
                    {localizedCategories[catKey]?.[language] || catKey}
                  </option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-maroon hover:bg-cream transition-colors cursor-pointer shrink-0"
                  aria-label="Clear all filters"
                >
                  <X size={14} />
                  {t('archive.clearFilters')}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-stone mb-6">
          {t('archive.resultsCount', { count: filteredTemples.length })}
          {filteredTemples.length > visibleCount && (
            <span className="text-xs text-stone/80 ml-2">
              (showing first {visibleCount})
            </span>
          )}
        </p>

        {/* Grid */}
        {filteredTemples.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedTemples.map((temple) => (
                <TempleCard
                  key={temple.id}
                  temple={temple}
                  onClick={onSelectTemple}
                />
              ))}
            </div>

            {/* Load More Button */}
            {filteredTemples.length > visibleCount && (
              <div className="text-center mt-10">
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-maroon text-warm-white font-medium hover:shadow-lg transition-all cursor-pointer shadow-md text-sm sm:text-base hover:opacity-95"
                >
                  <span>
                    {language === 'ta'
                      ? `மேலும் கோயில்களைக் காணவும் (${filteredTemples.length - visibleCount} மீதம்)`
                      : language === 'hi'
                      ? `और मंदिर देखें (${filteredTemples.length - visibleCount} शेष)`
                      : `Load More Temples (${filteredTemples.length - visibleCount} remaining)`}
                  </span>
                  <ChevronDown size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-warm-white/70 rounded-2xl border border-dashed border-stone/30 p-8">
            <p className="text-charcoal font-display text-xl mb-2 font-bold">
              {t('archive.noResultsTitle')}
            </p>
            <p className="text-stone text-sm">
              {t('archive.noResultsDesc')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
