import { useMemo } from 'react';
import { Flame, Mountain, Sparkles } from 'lucide-react';
import temples from '../data/temples';
import TempleCard from './TempleCard';

const panchaBhoota = [
  'nataraja-chidambaram',
  'annamalaiyar-thiruvannamalai',
  'jambukeswarar-thiruvanaikaval',
  'ekambareswarar-kanchipuram',
  'kalahasti-temple',
].map((id) => temples.find((temple) => temple.id === id)).filter(Boolean);

const panchaKedar = [
  'kedarnath-rudraprayag',
  'tungnath-chamoli',
  'madhyamaheshwar-ughamandala',
  'rudranath-trijuginarayan',
  'kalpeshwar-lamgadia',
].map((id) => temples.find((temple) => temple.id === id)).filter(Boolean);

export default function SacredCollectionsSection({ onSelectTemple }) {
  const collections = useMemo(
    () => [
      {
        key: 'pancha-bhoota',
        title: 'Pancha Bhoota Sthalas',
        subtitle: 'Five elemental Shiva abodes representing Akasha, Agni, Jala, Vayu, and Prithvi.',
        icon: Flame,
        temples: panchaBhoota,
      },
      {
        key: 'pancha-kedarnath',
        title: 'Pancha Kedarnath Temples',
        subtitle: 'The five sacred Kedarnath shrines of the Garhwal Himalayas.',
        icon: Mountain,
        temples: panchaKedar,
      },
    ],
    []
  );

  return (
    <section className="py-16 md:py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {collections.map(({ key, title, subtitle, icon: Icon, temples: groupTemples }) => (
          <div key={key} className="rounded-3xl border border-border bg-cream p-6 md:p-8 shadow-card">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Icon size={20} className="text-amber-600" strokeWidth={1.5} />
              <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone font-semibold">
                Sacred Group
              </span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-charcoal text-center">
              {title}
            </h3>
            <p className="text-stone mt-3 text-center max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
              {subtitle}
            </p>

            {groupTemples.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {groupTemples.map((temple) => (
                  <TempleCard key={temple.id} temple={temple} onClick={onSelectTemple} />
                ))}
              </div>
            ) : (
              <div className="mt-8 text-center text-stone">Temples for this collection are being added.</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
