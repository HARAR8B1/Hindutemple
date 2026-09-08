import { useState } from 'react';
import { ExternalLink, Landmark } from 'lucide-react';
import unescoHeritageTemples from '../data/unescoHeritageTemples';
import TempleCard from './TempleCard';

export default function UnescoHeritageSection({ onSelectTemple }) {
  const [selectedGroup, setSelectedGroup] = useState('All');
  const groups = ['All', 'Great Living Chola Temples', 'Mahabalipuram'];

  const filteredTemples = selectedGroup === 'All'
    ? unescoHeritageTemples
    : unescoHeritageTemples.filter((temple) => temple.designation.includes(selectedGroup));

  return (
    <section id="unesco-heritage" className="py-16 md:py-24 bg-sandstone border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="p-1.5 rounded-lg bg-gold/20 text-maroon">
              <Landmark size={18} strokeWidth={2} />
            </span>
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone font-semibold">
              Tamil Nadu World Heritage
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
            UNESCO Heritage Temples &amp; Monuments
          </h2>
          <p className="text-stone mt-4 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
            Explore the Great Living Chola Temples at Thanjavur, Gangaikonda Cholapuram, and Darasuram, along with the Pallava monuments of Mahabalipuram. Each entry includes its location, heritage story, visiting hours, festivals, and directions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <a
              href="https://www.tamilnadutourism.tn.gov.in/destinations/world-heritage-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-warm-white text-charcoal-light hover:text-maroon border border-border shadow-xs transition-colors"
            >
              Tamil Nadu Tourism heritage sites
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {groups.map((group) => (
            <button
              key={group}
              type="button"
              onClick={() => setSelectedGroup(group)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedGroup === group
                  ? 'bg-gradient-maroon text-warm-white shadow-sm'
                  : 'bg-warm-white text-stone hover:text-charcoal border border-border hover:border-maroon/30'
              }`}
            >
              {group === 'All' ? 'All Heritage Sites' : group} ({group === 'All' ? unescoHeritageTemples.length : unescoHeritageTemples.filter((temple) => temple.designation.includes(group)).length})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemples.map((temple) => (
            <TempleCard key={temple.id} temple={temple} onClick={onSelectTemple} />
          ))}
        </div>
      </div>
    </section>
  );
}
