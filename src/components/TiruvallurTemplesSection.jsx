import { useState } from 'react';
import tiruvallurTemples from '../data/tiruvallurTemples';
import TempleCard from './TempleCard';
import { MapPin, ChevronRight } from 'lucide-react';

const CATEGORY_FILTERS = ['All', 'Shiva', 'Vishnu', 'Shakti', 'Murugan'];

export default function TiruvallurTemplesSection({ onSelectTemple }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? tiruvallurTemples
      : tiruvallurTemples.filter((t) => t.category === activeFilter);

  return (
    <section id="tiruvallur-temples" className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <MapPin size={20} className="text-maroon" strokeWidth={1.5} />
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone font-semibold">
              Tiruvallur District
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
            திருவள்ளூர் மாவட்ட கோயில்கள்
          </h2>
          <p className="text-stone mt-4 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            Tiruvallur district — north of Chennai — is home to ancient temples including
            Divya Desams, Paadal Petra Sthalams, and the celebrated Tiruttani Murugan temple.
          </p>
          {/* Breadcrumb hint */}
          <p className="text-xs text-stone/60 mt-2 flex items-center justify-center gap-1">
            Tamil Nadu <ChevronRight size={12} /> Tiruvallur District
            <ChevronRight size={12} /> {filtered.length} Temples
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-maroon text-white border-maroon shadow-sm'
                  : 'bg-warm-white text-stone border-border hover:border-maroon hover:text-maroon'
              }`}
            >
              {cat}
              {activeFilter === cat && cat !== 'All' && (
                <span className="ml-1.5 opacity-75">
                  ({tiruvallurTemples.filter((t) => t.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((temple) => (
              <TempleCard key={temple.id} temple={temple} onClick={onSelectTemple} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-stone">No temples found for this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
