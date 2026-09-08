import { useState, useMemo } from "react";
import { MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import tamilnaduTemples from "../data/tamilnaduTemples";
import TempleCard from "./TempleCard";

export default function TamilnaduTemplesSection({ onSelectTemple }) {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(tamilnaduTemples.map((t) => t.category).filter(Boolean));
    return ["All", ...Array.from(cats).sort()];
  }, []);

  const filteredTemples = useMemo(() => {
    if (selectedCategory === "All") return tamilnaduTemples;
    return tamilnaduTemples.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  const categoryLabel = {
    All: { en: "All", ta: "அனைத்தும்", hi: "सभी" },
    Shiva: { en: "Shiva", ta: "சிவன்", hi: "शिव" },
    Shakti: { en: "Shakti", ta: "சக்தி", hi: "शक्ति" },
    Murugan: { en: "Murugan", ta: "முருகன்", hi: "मुरुगन" },
    Vishnu: { en: "Vishnu", ta: "விஷ்ணு", hi: "विष्णु" },
  };

  return (
    <section id="tamilnadu-temples" className="py-16 md:py-24 bg-warm-white border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="p-1.5 rounded-lg bg-maroon/10 text-maroon">
              <MapPin size={18} strokeWidth={2} />
            </span>
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-stone font-semibold">
              {language === "ta"
                ? "தமிழ்நாடு புண்ணிய தலங்கள்"
                : language === "hi"
                ? "तमिलनाडु के पावन मंदिर"
                : "Tamil Nadu Sacred Temples"}
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
            {language === "ta"
              ? "தமிழ்நாட்டின் மகத்தான தலங்கள்"
              : language === "hi"
              ? "तमिलनाडु के महान मंदिर"
              : "Magnificent Temples of Tamil Nadu"}
          </h2>

          <p className="text-stone mt-4 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            {language === "ta"
              ? "சிதம்பரம் முதல் கன்னியாகுமரி வரை — மதுரை, தஞ்சாவூர், திருவண்ணாமலை, கும்பகோணம், திருநெல்வேலி ஆகிய நகரங்களில் அமைந்த புண்ணிய திருத்தலங்கள். 6 அறுபடை வீடுகள், 3 யுனெஸ்கோ தலங்கள், பஞ்சபூத தலங்கள் உட்பட."
              : language === "hi"
              ? "चिदंबरम से कन्याकुमारी तक — मदुरई, तंजावुर, तिरुवण्णामलई, कुम्भकोणम, तिरुनेलवेली के पवित्र मंदिर। 6 अरुपादई वीडु, 3 यूनेस्को विरासत स्थल और पंचभूत स्थल सहित।"
              : "From Chidambaram to Kanyakumari — sacred temples across Madurai, Thanjavur, Thiruvannamalai, Kumbakonam, and Tirunelveli. Includes all 6 Arupadai Veedu, 3 UNESCO Heritage sites, and Pancha Bhoota Sthalas."}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = cat === "All" ? tamilnaduTemples.length : tamilnaduTemples.filter((t) => t.category === cat).length;
            const label = categoryLabel[cat]?.[language] ?? cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-maroon text-warm-white shadow-sm"
                    : "bg-sandstone text-stone hover:text-charcoal border border-border hover:border-maroon/30"
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        {/* Temple Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemples.map((temple) => (
            <TempleCard key={temple.id} temple={temple} onClick={onSelectTemple} />
          ))}
        </div>
      </div>
    </section>
  );
}
