import { useMemo, useState } from 'react';
import { ChevronDown, MapPin, Sparkles, Landmark, Building2 } from 'lucide-react';
import temples from '../data/temples';
import ganeshTemples from '../data/ganeshTemples';
import divyaDesams from '../data/divyaDesams';

const templeCatalog = [...new Map(
  [...temples, ...ganeshTemples, ...divyaDesams].map((temple) => [temple.id, temple])
).values()];

const deityGroups = [
  { key: 'Shiva', label: 'Shiva', icon: Sparkles },
  { key: 'Vishnu', label: 'Vishnu', icon: Landmark },
  { key: 'Shakti', label: 'Shakti', icon: Sparkles },
  { key: 'Ganesh', label: 'Ganesh', icon: Landmark },
];

const goddessGroups = [
  { key: 'Shakti', label: 'Shakti / Devi', icon: Sparkles },
  { key: 'Other', label: 'Other Sacred Forms', icon: Landmark },
];

export default function TempleCollectionsSection() {
  const [expanded, setExpanded] = useState({
    deities: true,
    goddesses: true,
    cities: true,
    states: true,
  });

  const groupedData = useMemo(() => {
    const cityMap = new Map();
    const stateMap = new Map();

    templeCatalog.forEach((temple) => {
      cityMap.set(temple.city, (cityMap.get(temple.city) || 0) + 1);
      stateMap.set(temple.state, (stateMap.get(temple.state) || 0) + 1);
    });

    return {
      deities: deityGroups.map((group) => ({
        ...group,
        count: templeCatalog.filter((temple) => temple.category === group.key).length,
      })),
      goddesses: goddessGroups.map((group) => ({
        ...group,
        count: templeCatalog.filter((temple) => temple.category === group.key).length,
      })),
      cities: [...cityMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([city, count]) => ({ label: city, count })),
      states: [...stateMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([state, count]) => ({ label: state, count })),
    };
  }, []);

  const toggleGroup = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderCollectionCard = (item) => (
    <div
      key={item.label || item.key}
      className="rounded-2xl border border-border bg-warm-white p-4 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-stone">Collection</p>
          <h3 className="font-display text-xl font-bold text-charcoal mt-1">{item.label || item.key}</h3>
        </div>
        <span className="inline-flex min-w-[44px] items-center justify-center rounded-full bg-gold/20 px-2.5 py-1 text-sm font-semibold text-charcoal">
          {item.count}
        </span>
      </div>
    </div>
  );

  return (
    <section id="temple-collections" className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Building2 size={20} className="text-maroon" strokeWidth={1.5} />
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone font-semibold">
              Temple Collections
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
            Sacred Classifications
          </h2>
          <p className="text-stone mt-4 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
            Browse temple heritage by deity, goddess traditions, prominent cities, and regional states.
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-warm-white p-4 shadow-card">
            <button
              type="button"
              onClick={() => toggleGroup('deities')}
              className="flex w-full items-center justify-between gap-3 text-left"
            >
              <span className="font-display text-2xl font-bold text-charcoal">Gods</span>
              <ChevronDown className={`h-5 w-5 text-stone transition-transform ${expanded.deities ? 'rotate-180' : ''}`} />
            </button>
            {expanded.deities && (
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {groupedData.deities.map((item) => renderCollectionCard(item))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-warm-white p-4 shadow-card">
            <button
              type="button"
              onClick={() => toggleGroup('goddesses')}
              className="flex w-full items-center justify-between gap-3 text-left"
            >
              <span className="font-display text-2xl font-bold text-charcoal">Goddesses</span>
              <ChevronDown className={`h-5 w-5 text-stone transition-transform ${expanded.goddesses ? 'rotate-180' : ''}`} />
            </button>
            {expanded.goddesses && (
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {groupedData.goddesses.map((item) => renderCollectionCard(item))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-warm-white p-4 shadow-card">
            <button
              type="button"
              onClick={() => toggleGroup('cities')}
              className="flex w-full items-center justify-between gap-3 text-left"
            >
              <span className="font-display text-2xl font-bold text-charcoal">Cities</span>
              <ChevronDown className={`h-5 w-5 text-stone transition-transform ${expanded.cities ? 'rotate-180' : ''}`} />
            </button>
            {expanded.cities && (
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {groupedData.cities.map((item) => renderCollectionCard(item))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-warm-white p-4 shadow-card">
            <button
              type="button"
              onClick={() => toggleGroup('states')}
              className="flex w-full items-center justify-between gap-3 text-left"
            >
              <span className="font-display text-2xl font-bold text-charcoal">States</span>
              <ChevronDown className={`h-5 w-5 text-stone transition-transform ${expanded.states ? 'rotate-180' : ''}`} />
            </button>
            {expanded.states && (
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {groupedData.states.map((item) => renderCollectionCard(item))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
