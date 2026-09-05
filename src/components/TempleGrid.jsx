import { useState, useMemo } from 'react';
import { ExternalLink, Search, Filter, X } from 'lucide-react';
import temples from '../data/temples';
import ganeshTemples from '../data/ganeshTemples';
import muruganTemples from '../data/muruganTemples';
import { states, categories, localizedStates, localizedCategories } from '../data/categories';
import TempleCard from './TempleCard';
import { useLanguage } from '../context/LanguageContext';

const templeCatalog = [...new Map(
  [...temples, ...ganeshTemples, ...muruganTemples].map((temple) => [temple.id, temple])
).values()];

export default function TempleGrid({ onSelectTemple }) {
  const { t, language, getLocalizedTemple } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

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

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedState('All States');
    setSelectedCategory('All Categories');
  };

  const hasActiveFilters =
    searchQuery || selectedState !== 'All States' || selectedCategory !== 'All Categories';

  return (
    <section id="explore" className="py-16 md:py-24 bg-sandstone border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone font-semibold">
            {t('archive.badge')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mt-2">
            {t('archive.title')}
          </h2>
          <p className="text-stone mt-4 max-w-xl mx-auto text-sm sm:text-base">
            {t('archive.subtitle')}
          </p>
          <a
            href="https://temple.dinamalar.com/searchresult.php"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-maroon hover:text-maroon-dark transition-colors"
          >
            {t('archive.dinamalarLink')}
            <ExternalLink size={15} />
          </a>
        </div>

        {/* Search & Filters Card */}
        <div className="bg-warm-white rounded-2xl shadow-card p-4 sm:p-6 mb-10 border border-border/60">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-stone"
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder={t('archive.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-sandstone/50 text-charcoal placeholder:text-stone/60 focus:outline-none focus:ring-2 focus:ring-maroon/30 focus:border-maroon transition-all"
              aria-label="Search temples"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex items-center gap-2 text-stone text-sm">
              <Filter size={16} strokeWidth={1.5} />
              <span className="font-medium">Filter:</span>
            </div>

            <div className="flex flex-wrap gap-3 flex-1">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-border bg-sandstone/70 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-maroon/30 focus:border-maroon transition-all cursor-pointer font-medium"
                aria-label="Filter by state"
              >
                {states.map((stateKey) => (
                  <option key={stateKey} value={stateKey}>
                    {localizedStates[stateKey]?.[language] || stateKey}
                  </option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-border bg-sandstone/70 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-maroon/30 focus:border-maroon transition-all cursor-pointer font-medium"
                aria-label="Filter by category"
              >
                {categories.map((catKey) => (
                  <option key={catKey} value={catKey}>
                    {localizedCategories[catKey]?.[language] || catKey}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-maroon hover:bg-cream transition-colors cursor-pointer"
                aria-label="Clear all filters"
              >
                <X size={14} />
                {t('archive.clearFilters')}
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-stone mb-6">
          {t('archive.resultsCount', { count: filteredTemples.length })}
        </p>

        {/* Grid */}
        {filteredTemples.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemples.map((temple) => (
              <TempleCard
                key={temple.id}
                temple={temple}
                onClick={onSelectTemple}
              />
            ))}
          </div>
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
