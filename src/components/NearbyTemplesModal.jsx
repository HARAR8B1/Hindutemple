import { useState, useEffect, useMemo } from 'react';
import {
  X, MapPin, Navigation, Clock, ExternalLink, AlertCircle,
  Loader2, Map as MapIcon, ChevronRight, Search, Compass, Sparkles,
  SlidersHorizontal, ArrowUpDown, Filter, Check,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { filterTemplesByRadius } from '../utils/haversine';
import { lookupLocationOrTemple, POPULAR_PINCODES } from '../utils/pincodeLookup';

// ─── Import ALL temple datasets that have lat/lng coordinates ─────────────
import chennaiTemples from '../data/chennaiTemples';
import tiruvallurTemples from '../data/tiruvallurTemples';
import kanchipuramTemples from '../data/kanchipuramTemples';
import kumbakonamTemples from '../data/kumbakonamTemples';
import tamilnaduTemples from '../data/tamilnaduTemples';
import rasiNakshatraTemples from '../data/rasiNakshatraTemples';

// Combine all temples with coordinates and deduplicate by id
const allGeofencedTemples = [
  ...new Map(
    [
      ...chennaiTemples,
      ...tiruvallurTemples,
      ...kanchipuramTemples,
      ...kumbakonamTemples,
      ...tamilnaduTemples,
      ...rasiNakshatraTemples,
    ]
      .filter((t) => t.lat != null && t.lng != null)
      .map((t) => [t.id, t])
  ).values(),
];

// ─── Category colour chips ─────────────────────────────────────────────────
const categoryColour = {
  Shiva: 'bg-blue-100 text-blue-800 border-blue-200',
  Vishnu: 'bg-purple-100 text-purple-800 border-purple-200',
  Shakti: 'bg-pink-100 text-pink-800 border-pink-200',
  Murugan: 'bg-orange-100 text-orange-800 border-orange-200',
  Ganesh: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Other: 'bg-stone-100 text-stone-700 border-stone-200',
};

// ─── Quick Presets: Popular Cities & Sacred Temples ───────────────────────
const PLACE_PRESETS = [
  { label: 'Pallikaranai', query: 'Pallikaranai', type: 'city' },
  { label: 'Madurai', query: 'Madurai', type: 'city' },
  { label: 'Trichy / Srirangam', query: 'Srirangam', type: 'city' },
  { label: 'Thanjavur', query: 'Thanjavur', type: 'city' },
  { label: 'Kumbakonam', query: 'Kumbakonam', type: 'city' },
  { label: 'Kanchipuram', query: 'Kanchipuram', type: 'city' },
  { label: 'Tiruvallur', query: 'Tiruvallur', type: 'city' },
  { label: 'Mylapore', query: 'Mylapore', type: 'city' },
];

const TEMPLE_PRESETS = [
  { label: 'Vedagiriswarar (Tirukalukundram)', query: 'Vedagiriswarar', type: 'temple' },
  { label: 'Garbarakshambigai', query: 'Garbarakshambigai', type: 'temple' },
  { label: 'Brahmapureeswarar', query: 'Brahmapureeswarar', type: 'temple' },
  { label: 'Jambukeswarar', query: 'Jambukeswarar', type: 'temple' },
  { label: 'Rockfort Ucchi Pillayar', query: 'Rockfort', type: 'temple' },
  { label: 'Sri Lakshmi Vinayagar', query: 'Sri Lakshmi Vinayagar', type: 'temple' },
  { label: 'Patteeswaram Durga', query: 'Patteeswaram', type: 'temple' },
  { label: 'Othandeeswarar', query: 'Othandeeswarar', type: 'temple' },
  { label: 'Meenakshi Amman', query: 'Meenakshi', type: 'temple' },
];

// ─── Translations ──────────────────────────────────────────────────────────
const i18n = {
  title: { en: 'Temples Near You', ta: 'அருகில் உள்ள திருக்கோயில்கள்', hi: 'निकटवर्ती मंदिर' },
  subtitle: {
    en: (r, loc) => `Discovering sacred temples within ${r} km ${loc ? `of ${loc}` : 'of your location'}`,
    ta: (r, loc) => `${loc ? `${loc} பகுதியிலிருந்து` : 'உங்கள் இருப்பிடத்திலிருந்து'} ${r} கி.மீ. வரையில் உள்ள கோயில்கள்`,
    hi: (r, loc) => `${loc ? `${loc} से` : 'आपके स्थान से'} ${r} किमी के भीतर पवित्र मंदिर`,
  },
  tabSearch: { en: 'Search Place, Temple or PIN', ta: 'ஊர், கோயில் அல்லது பின்கோடு', hi: 'स्थान, मंदिर या पिनकोड' },
  tabGps: { en: 'Use GPS Location', ta: 'இருப்பிடம் (GPS)', hi: 'GPS लोकेशन' },
  searchPlaceholder: {
    en: 'Enter temple name, city, place, or PIN (e.g. Garbarakshambigai, Madurai, 600100)',
    ta: 'கோயில், ஊர், பகுதி அல்லது பின்கோடு (எ.கா. கர்ப்பரட்சாம்பிகை, மதுரை, 600100)',
    hi: 'मंदिर, नगर, स्थान या पिनकोड दर्ज करें (उदा. गर्भरक्षांबिका, मदुरै, 600100)',
  },
  searchBtn: { en: 'Search Nearby', ta: 'தேடவும்', hi: 'खोजें' },
  refinePlaceholder: {
    en: 'Filter these results by temple, deity, keyword...',
    ta: 'இப்பட்டியலில் கோயில், தெய்வம் அல்லது பெயர் மூலம் வடிகட்டவும்...',
    hi: 'इन परिणामों में मंदिर, देवता या नाम से फ़िल्टर करें...',
  },
  radiusLabel: { en: 'Search Radius:', ta: 'தேடல் தூரம்:', hi: 'खोज दायरा:' },
  searching: { en: 'Searching sacred temples nearby...', ta: 'அருகிலுள்ள திருத்தலங்களைத் தேடுகிறது...', hi: 'आसपास के पवित्र मंदिर खोज रहे हैं...' },
  noResults: {
    en: (r, loc) => `No temples found within ${r} km of ${loc}. Try expanding your search radius or search by temple name.`,
    ta: (r, loc) => `${loc} பகுதியிலிருந்து ${r} கி.மீ. சுற்றளவில் கோயில்கள் கிடைக்கவில்லை. தேடல் தூரத்தை அதிகரிக்கவும்.`,
    hi: (r, loc) => `${loc} के ${r} किमी दायरे में कोई मंदिर नहीं मिला। दायरा बढ़ाएं या मंदिर नाम से खोजें।`,
  },
  found: {
    en: (n, r) => `Found ${n} temple${n !== 1 ? 's' : ''} within ${r} km`,
    ta: (n, r) => `${r} கி.மீ. சுற்றளவில் ${n} கோயில்கள் கண்டறியப்பட்டன`,
    hi: (n, r) => `${r} किमी में ${n} मंदिर मिले`,
  },
  showingFiltered: {
    en: (shown, total) => `Showing ${shown} of ${total} temples`,
    ta: (shown, total) => `${total}-இல் ${shown} கோயில்கள் காட்டப்படுகின்றன`,
    hi: (shown, total) => `${total} में से ${shown} मंदिर प्रदर्शित`,
  },
  expandBtn: { en: (r) => `Expand to ${r} km`, ta: (r) => `${r} கி.மீ. ஆக விரிவுபடுத்து`, hi: (r) => `${r} किमी तक बढ़ाएं` },
  viewMap: { en: 'View Map', ta: 'வரைபடம்', hi: 'नक्शा' },
  directions: { en: 'Get Directions', ta: 'வழிகாட்டு', hi: 'दिशा-निर्देश' },
  timings: { en: 'Timings', ta: 'நேரம்', hi: 'समय' },
  distance: { en: 'km away', ta: 'கி.மீ.', hi: 'किमी दूर' },
  centerBadge: { en: 'Search Anchor', ta: 'மைய இடம்', hi: 'केंद्र स्थल' },
  searchedTempleBadge: { en: 'Searched Temple', ta: 'தேடப்பட்ட ஆலயம்', hi: 'खोजा गया मंदिर' },
  sortNearest: { en: 'Nearest First', ta: 'அருகில் உள்ளவை', hi: 'निकटतम पहले' },
  sortName: { en: 'Name (A–Z)', ta: 'பெயர் (அ-ஔ / A–Z)', hi: 'नाम (अ-ज्ञ)' },
  clearFilter: { en: 'Reset Filters', ta: 'வடிகட்டியை மீட்டமை', hi: 'फ़िल्टर हटाएं' },
  placesLabel: { en: 'Quick Places:', ta: 'முக்கிய இடங்கள்:', hi: 'प्रमुख स्थान:' },
  templesLabel: { en: 'Sacred Temples:', ta: 'பிரபல ஆலயங்கள்:', hi: 'पवित्र मंदिर:' },
  denied: {
    en: 'Location access was denied. You can enter a temple name, city, or 6-digit PIN code above.',
    ta: 'இருப்பிட அனுமதி நிராகரிக்கப்பட்டது. கோயில் பெயர், ஊர் அல்லது பின்கோடு உள்ளிட்டு தேடலாம்.',
    hi: 'लोकेशन अनुमति अस्वीकार कर दी गई। आप मंदिर का नाम, शहर या पिनकोड दर्ज करके खोज सकते हैं।',
  },
  openStreetMapNote: { en: 'Interactive Map powered by OpenStreetMap', ta: 'வரைபடம்: OpenStreetMap', hi: 'नक्शा: OpenStreetMap' },
};

function t(key, lang, arg1, arg2) {
  const val = i18n[key]?.[lang] || i18n[key]?.en;
  if (typeof val === 'function') return val(arg1, arg2);
  return val || '';
}

// ─── Build OpenStreetMap embed URL with multiple markers (bbox approach) ──
function buildOSMUrl(temples, userLat, userLng) {
  if (temples.length === 0) return null;
  const lats = [userLat, ...temples.map((t) => t.lat)];
  const lngs = [userLng, ...temples.map((t) => t.lng)];
  const minLat = Math.min(...lats) - 0.015;
  const maxLat = Math.max(...lats) + 0.015;
  const minLng = Math.min(...lngs) - 0.015;
  const maxLng = Math.max(...lngs) + 0.015;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${minLng},${minLat},${maxLng},${maxLat}&layer=mapnik&marker=${userLat},${userLng}`;
}

export default function NearbyTemplesModal({ onClose }) {
  const { language } = useLanguage();
  const [searchMode, setSearchMode] = useState('search'); // 'search' | 'gps'
  const [phase, setPhase] = useState('idle'); // 'idle' | 'loading' | 'results' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [radiusKm, setRadiusKm] = useState(30); // Default 30 km
  const [searchQuery, setSearchQuery] = useState('Pallikaranai');
  const [locationLabel, setLocationLabel] = useState('Pallikaranai, Chennai');
  const [userPos, setUserPos] = useState({ lat: 12.9349, lng: 80.2137 }); // Default Pallikaranai
  const [nearbyTemples, setNearbyTemples] = useState([]);
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [searchedTempleId, setSearchedTempleId] = useState(null);

  // ── Finer in-results filter state ──
  const [refineKeyword, setRefineKeyword] = useState('');
  const [deityFilter, setDeityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('distance'); // 'distance' | 'name'

  // Filter temples helper
  const executeFilter = (lat, lng, radius, label, targetTempleId = null) => {
    setUserPos({ lat, lng });
    if (label) setLocationLabel(label);
    if (targetTempleId) {
      setSearchedTempleId(targetTempleId);
    } else {
      setSearchedTempleId(null);
    }
    const results = filterTemplesByRadius(allGeofencedTemples, lat, lng, radius);
    setNearbyTemples(results);
    setPhase('results');

    // If a specific temple was searched, auto-expand it
    if (targetTempleId) {
      const target = results.find((t) => t.id === targetTempleId);
      if (target) setSelectedTemple(target);
    }
  };

  // Initial load: Pallikaranai 30 km
  useEffect(() => {
    executeFilter(12.9349, 80.2137, 30, 'Pallikaranai, Chennai');
  }, []);

  // Handle Universal Search (Temple Name, City, Locality, or Pincode)
  const handleUniversalSearch = async (queryToSearch) => {
    const q = (queryToSearch != null ? queryToSearch : searchQuery).trim();
    if (!q) return;
    setPhase('loading');
    setErrorMsg('');
    try {
      const res = await lookupLocationOrTemple(q, allGeofencedTemples);
      if (res.found) {
        executeFilter(res.lat, res.lng, radiusKm, res.name, res.templeId);
      } else {
        setErrorMsg(res.error || `No match found for "${q}". Please try a city, temple name, or PIN code.`);
        setPhase('error');
      }
    } catch (err) {
      setErrorMsg(`Search error: ${err.message}`);
      setPhase('error');
    }
  };

  // Handle GPS location request
  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser. Please search by temple, city, or PIN code.');
      setPhase('error');
      return;
    }
    setPhase('loading');
    setErrorMsg('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        executeFilter(lat, lng, radiusKm, 'Current Device Location');
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setErrorMsg(t('denied', language));
        } else {
          setErrorMsg(`Location error: ${err.message}. Please search by city, temple, or PIN code.`);
        }
        setPhase('error');
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  };

  // Handle radius change dynamically
  const handleRadiusChange = (newRadius) => {
    setRadiusKm(newRadius);
    if (userPos) {
      executeFilter(userPos.lat, userPos.lng, newRadius, locationLabel, searchedTempleId);
    }
  };

  // Handle Quick preset click
  const handlePresetClick = (preset) => {
    setSearchQuery(preset.query);
    handleUniversalSearch(preset.query);
  };

  // ── Compute Finer Filtered & Sorted Temples ──
  const filteredAndSortedTemples = useMemo(() => {
    let list = [...nearbyTemples];

    // 1. Category / Deity filter
    if (deityFilter !== 'All') {
      list = list.filter((t) => t.category === deityFilter);
    }

    // 2. Refine keyword search
    if (refineKeyword.trim()) {
      const kw = refineKeyword.trim().toLowerCase();
      list = list.filter((t) => {
        const nameEn = (t.name || '').toLowerCase();
        const nameTa = (t.translations?.ta?.name || '').toLowerCase();
        const nameHi = (t.translations?.hi?.name || '').toLowerCase();
        const cityEn = (t.city || '').toLowerCase();
        const cityTa = (t.translations?.ta?.city || '').toLowerCase();
        const cat = (t.category || '').toLowerCase();
        const desig = (t.designation || '').toLowerCase();
        const hist = (t.history || '').toLowerCase();
        return (
          nameEn.includes(kw) ||
          nameTa.includes(kw) ||
          nameHi.includes(kw) ||
          cityEn.includes(kw) ||
          cityTa.includes(kw) ||
          cat.includes(kw) ||
          desig.includes(kw) ||
          hist.includes(kw)
        );
      });
    }

    // 3. Sort
    if (sortBy === 'name') {
      list.sort((a, b) => {
        const nameA = a.translations?.[language]?.name || a.name;
        const nameB = b.translations?.[language]?.name || b.name;
        return nameA.localeCompare(nameB);
      });
    } else {
      // Distance sort (default)
      list.sort((a, b) => (parseFloat(a.distance) || 0) - (parseFloat(b.distance) || 0));
    }

    return list;
  }, [nearbyTemples, deityFilter, refineKeyword, sortBy, language]);

  // Deity counts for pill badges
  const deityCounts = useMemo(() => {
    const counts = { All: nearbyTemples.length };
    for (const item of nearbyTemples) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, [nearbyTemples]);

  const availableDeities = useMemo(() => {
    const order = ['All', 'Shiva', 'Vishnu', 'Shakti', 'Murugan', 'Ganesh', 'Other'];
    return order.filter((d) => d === 'All' || (deityCounts[d] && deityCounts[d] > 0));
  }, [deityCounts]);

  const osmUrl = useMemo(() => {
    if (!userPos || filteredAndSortedTemples.length === 0) return null;
    return buildOSMUrl(filteredAndSortedTemples, userPos.lat, userPos.lng);
  }, [userPos, filteredAndSortedTemples]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const isFilteringActive = refineKeyword.trim() !== '' || deityFilter !== 'All';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Nearby temples search"
    >
      <div className="bg-warm-white w-full sm:max-w-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[96dvh] overflow-hidden rounded-t-3xl animate-fade-in border border-stone-200/40">
        
        {/* ── Header ── */}
        <div className="bg-gradient-to-r from-maroon to-maroon-dark px-5 sm:px-6 pt-5 pb-4 flex-shrink-0 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/15 rounded-xl shadow-inner flex-shrink-0">
                <Compass size={22} className="text-yellow-300" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold font-display truncate">
                  {t('title', language)}
                </h2>
                <p className="text-white/80 text-xs mt-0.5 truncate">
                  {t('subtitle', language, radiusKm, locationLabel)}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/15 transition-colors cursor-pointer flex-shrink-0"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* ── Search Mode Tabs ── */}
          <div className="flex gap-2 mt-3.5 bg-black/25 p-1 rounded-xl">
            <button
              onClick={() => setSearchMode('search')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                searchMode === 'search'
                  ? 'bg-white text-maroon shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Search size={13} />
              {t('tabSearch', language)}
            </button>
            <button
              onClick={() => {
                setSearchMode('gps');
                handleRequestLocation();
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                searchMode === 'gps'
                  ? 'bg-white text-maroon shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Navigation size={13} />
              {t('tabGps', language)}
            </button>
          </div>

          {/* ── Multi-Modal Search Bar (Temple, City, Place, or PIN) ── */}
          {searchMode === 'search' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUniversalSearch();
              }}
              className="mt-3 flex gap-2"
            >
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/50" />
                <input
                  id="universal-location-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder', language)}
                  className="w-full pl-9 pr-8 py-2 bg-white text-charcoal rounded-xl text-xs sm:text-sm font-medium
                    placeholder:text-stone/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="px-3.5 sm:px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-maroon font-bold text-xs sm:text-sm
                  rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1 flex-shrink-0"
              >
                {t('searchBtn', language)}
              </button>
            </form>
          )}

          {/* ── Radius Selector Pills ── */}
          <div className="mt-3 flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="text-white/80 text-[11px] font-medium">{t('radiusLabel', language)}</span>
            <div className="flex items-center gap-1.5">
              {[10, 20, 30, 50, 100].map((r) => (
                <button
                  key={r}
                  onClick={() => handleRadiusChange(r)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    radiusKm === r
                      ? 'bg-yellow-400 text-maroon shadow-sm ring-1 ring-white/50'
                      : 'bg-white/15 text-white hover:bg-white/25'
                  }`}
                >
                  {r} km
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Quick Exploration Preset Chips (Places & Temples) ── */}
        <div className="px-4 py-2 bg-sandstone/50 border-b border-border/50 flex-shrink-0 space-y-1.5 overflow-x-auto text-[11px]">
          {/* Quick Places */}
          <div className="flex items-center gap-1.5 min-w-max">
            <span className="text-stone/80 font-bold flex items-center gap-1">
              <MapPin size={11} className="text-maroon" />
              {t('placesLabel', language)}
            </span>
            {PLACE_PRESETS.map((p) => (
              <button
                key={p.query}
                onClick={() => handlePresetClick(p)}
                className={`px-2.5 py-0.5 rounded-full font-medium transition-all cursor-pointer border ${
                  searchQuery.toLowerCase() === p.query.toLowerCase()
                    ? 'bg-maroon text-white border-maroon'
                    : 'bg-white text-charcoal/80 border-border hover:border-maroon/40 hover:text-maroon'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Quick Sacred Temples */}
          <div className="flex items-center gap-1.5 min-w-max">
            <span className="text-stone/80 font-bold flex items-center gap-1">
              <Sparkles size={11} className="text-amber-600" />
              {t('templesLabel', language)}
            </span>
            {TEMPLE_PRESETS.map((tp) => (
              <button
                key={tp.query}
                onClick={() => handlePresetClick(tp)}
                className={`px-2.5 py-0.5 rounded-full font-medium transition-all cursor-pointer border ${
                  searchQuery.toLowerCase() === tp.query.toLowerCase()
                    ? 'bg-amber-700 text-white border-amber-700'
                    : 'bg-white text-charcoal/80 border-border hover:border-amber-600 hover:text-amber-700'
                }`}
              >
                {tp.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          
          {/* LOADING STATE */}
          {phase === 'loading' && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 size={40} className="text-maroon animate-spin" />
              <p className="text-stone font-medium text-sm">{t('searching', language)}</p>
            </div>
          )}

          {/* ERROR STATE */}
          {phase === 'error' && (
            <div className="flex flex-col items-center text-center px-6 py-10 gap-5">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                <AlertCircle size={32} />
              </div>
              <div>
                <h3 className="font-bold text-charcoal text-base mb-1">Search Notice</h3>
                <p className="text-stone text-xs leading-relaxed max-w-md">{errorMsg}</p>
              </div>

              {/* Quick Fallback Options */}
              <div className="w-full max-w-md bg-white p-4 rounded-2xl border border-border shadow-sm text-left space-y-2">
                <p className="text-xs font-bold text-charcoal">Suggested Quick Searches:</p>
                <div className="flex flex-wrap gap-1.5">
                  {PLACE_PRESETS.slice(0, 6).map((p) => (
                    <button
                      key={p.query}
                      onClick={() => handlePresetClick(p)}
                      className="px-2.5 py-1 bg-sandstone hover:bg-maroon hover:text-white text-xs rounded-lg font-medium text-charcoal transition-colors cursor-pointer border border-border/60"
                    >
                      {p.label}
                    </button>
                  ))}
                  {TEMPLE_PRESETS.slice(0, 4).map((tp) => (
                    <button
                      key={tp.query}
                      onClick={() => handlePresetClick(tp)}
                      className="px-2.5 py-1 bg-sandstone hover:bg-amber-700 hover:text-white text-xs rounded-lg font-medium text-charcoal transition-colors cursor-pointer border border-border/60"
                    >
                      {tp.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSearchQuery('Pallikaranai');
                  handleUniversalSearch('Pallikaranai');
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-maroon text-white text-xs font-semibold cursor-pointer shadow-md"
              >
                Search Pallikaranai (Default)
              </button>
            </div>
          )}

          {/* RESULTS STATE */}
          {phase === 'results' && (
            <div className="px-4 py-3.5 space-y-3">
              
              {/* ── Refinement & Finer Search Bar ── */}
              {nearbyTemples.length > 0 && (
                <div className="bg-white p-3 rounded-2xl border border-border/70 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2">
                    {/* Finer keyword search input */}
                    <div className="relative flex-1">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
                      <input
                        type="text"
                        value={refineKeyword}
                        onChange={(e) => setRefineKeyword(e.target.value)}
                        placeholder={t('refinePlaceholder', language)}
                        className="w-full pl-8 pr-7 py-1.5 bg-sandstone/40 text-charcoal rounded-xl text-xs
                          placeholder:text-stone/60 focus:outline-none focus:ring-1 focus:ring-maroon border border-border/60"
                      />
                      {refineKeyword && (
                        <button
                          type="button"
                          onClick={() => setRefineKeyword('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal cursor-pointer"
                        >
                          <X size={13} />
                        </button>
                      )}
                    </div>

                    {/* Sort selector */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSortBy((s) => (s === 'distance' ? 'name' : 'distance'))}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold
                          bg-sandstone/60 text-charcoal hover:bg-sandstone transition-colors cursor-pointer border border-border/60"
                        title={sortBy === 'distance' ? 'Sorting by distance (nearest first)' : 'Sorting alphabetically'}
                      >
                        <ArrowUpDown size={12} className="text-maroon" />
                        <span className="hidden sm:inline">
                          {sortBy === 'distance' ? t('sortNearest', language) : t('sortName', language)}
                        </span>
                      </button>

                      {/* Map Toggle */}
                      <button
                        onClick={() => setShowMap((p) => !p)}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
                          showMap
                            ? 'bg-maroon text-white border-maroon'
                            : 'bg-sandstone/60 text-charcoal border-border/60 hover:bg-sandstone'
                        }`}
                      >
                        <MapIcon size={12} />
                        <span className="hidden sm:inline">{t('viewMap', language)}</span>
                      </button>
                    </div>
                  </div>

                  {/* Deity / Category Filter Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                    <span className="text-[10px] font-bold text-stone/80 uppercase tracking-wide mr-1 flex items-center gap-1">
                      <Filter size={10} /> Deity:
                    </span>
                    {availableDeities.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setDeityFilter(cat)}
                        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer border ${
                          deityFilter === cat
                            ? 'bg-maroon text-white border-maroon shadow-xs'
                            : 'bg-sandstone/40 text-charcoal/80 border-border hover:bg-sandstone hover:text-charcoal'
                        }`}
                      >
                        {cat} {deityCounts[cat] ? `(${deityCounts[cat]})` : ''}
                      </button>
                    ))}

                    {isFilteringActive && (
                      <button
                        onClick={() => {
                          setRefineKeyword('');
                          setDeityFilter('All');
                        }}
                        className="ml-auto text-[11px] text-maroon hover:underline font-semibold cursor-pointer"
                      >
                        {t('clearFilter', language)}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Stats Bar */}
              <div className="flex items-center justify-between px-1 text-xs">
                <div className="inline-flex items-center gap-1.5 bg-maroon/10 text-maroon rounded-full px-3 py-1 font-bold">
                  <MapPin size={13} className="text-maroon" />
                  <span>{t('found', language, nearbyTemples.length, radiusKm)}</span>
                </div>

                {isFilteringActive && (
                  <span className="text-[11px] text-stone font-medium">
                    {t('showingFiltered', language, filteredAndSortedTemples.length, nearbyTemples.length)}
                  </span>
                )}
              </div>

              {/* ZERO RESULTS FALLBACK */}
              {nearbyTemples.length === 0 ? (
                <div className="text-center py-10 px-6 bg-white rounded-2xl border border-dashed border-stone-300">
                  <MapIcon size={44} className="text-stone/30 mx-auto mb-3" />
                  <h3 className="font-bold text-charcoal text-sm mb-1">
                    Found 0 temples near {locationLabel}
                  </h3>
                  <p className="text-stone text-xs leading-relaxed max-w-md mx-auto mb-5">
                    {t('noResults', language, radiusKm, locationLabel)}
                  </p>

                  {/* Radius Expanders */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                    {radiusKm < 50 && (
                      <button
                        onClick={() => handleRadiusChange(50)}
                        className="px-4 py-2 rounded-xl bg-gradient-maroon text-white text-xs font-semibold shadow-sm hover:opacity-95 cursor-pointer"
                      >
                        {t('expandBtn', language, 50)}
                      </button>
                    )}
                    {radiusKm < 100 && (
                      <button
                        onClick={() => handleRadiusChange(100)}
                        className="px-4 py-2 rounded-xl bg-stone-800 text-white text-xs font-semibold hover:bg-black cursor-pointer"
                      >
                        {t('expandBtn', language, 100)}
                      </button>
                    )}
                  </div>

                  {/* Explore famous temple hubs */}
                  <div className="pt-4 border-t border-border text-left">
                    <p className="text-xs font-bold text-charcoal mb-2.5">Try popular destinations:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {PLACE_PRESETS.slice(0, 4).map((p) => (
                        <button
                          key={p.query}
                          onClick={() => handlePresetClick(p)}
                          className="px-3 py-2 bg-sandstone/70 hover:bg-maroon hover:text-white rounded-xl text-left text-xs font-medium text-charcoal transition-all cursor-pointer border border-border/50"
                        >
                          <div className="font-bold truncate">{p.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : filteredAndSortedTemples.length === 0 ? (
                /* Zero results after finer filter */
                <div className="text-center py-8 px-4 bg-white rounded-2xl border border-border text-xs">
                  <p className="font-bold text-charcoal mb-1">No temples match your refinement criteria.</p>
                  <p className="text-stone mb-3">Try adjusting your keyword or deity filter.</p>
                  <button
                    onClick={() => {
                      setRefineKeyword('');
                      setDeityFilter('All');
                    }}
                    className="px-4 py-1.5 rounded-lg bg-maroon text-white text-xs font-semibold cursor-pointer"
                  >
                    {t('clearFilter', language)}
                  </button>
                </div>
              ) : (
                <>
                  {/* Embedded OSM Map */}
                  {showMap && osmUrl && (
                    <div className="rounded-2xl overflow-hidden border border-border shadow-sm mb-3">
                      <iframe
                        title="Temples near you"
                        src={osmUrl}
                        width="100%"
                        height="260"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  )}

                  {/* Temple list */}
                  <div className="space-y-2.5">
                    {filteredAndSortedTemples.map((temple) => {
                      const isTarget = searchedTempleId === temple.id;
                      const isExpanded = selectedTemple?.id === temple.id;

                      return (
                        <div
                          key={temple.id}
                          className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs ${
                            isTarget
                              ? 'border-amber-400 ring-2 ring-amber-300/40 bg-amber-50/20'
                              : 'border-border/60 hover:border-maroon/30 hover:shadow-md'
                          }`}
                        >
                          {/* Temple row header */}
                          <button
                            className="w-full text-left p-3.5 sm:p-4 cursor-pointer"
                            onClick={() => setSelectedTemple(isExpanded ? null : temple)}
                          >
                            <div className="flex items-start gap-3">
                              {/* Distance badge */}
                              <div
                                className={`flex-shrink-0 w-14 h-14 rounded-xl border flex flex-col items-center justify-center ${
                                  isTarget
                                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                                    : 'bg-maroon/10 text-maroon border-maroon/20'
                                }`}
                              >
                                <span className="text-lg font-bold leading-none">{temple.distance}</span>
                                <span className="text-[10px] font-medium">{t('distance', language)}</span>
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                  <h3 className="font-bold text-charcoal text-sm leading-snug">
                                    {temple.translations?.[language]?.name || temple.name}
                                  </h3>
                                  {isTarget && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500 text-white shadow-xs">
                                      {t('searchedTempleBadge', language)}
                                    </span>
                                  )}
                                </div>
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span
                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                                      categoryColour[temple.category] || categoryColour.Other
                                    }`}
                                  >
                                    {temple.category}
                                  </span>
                                  <span className="flex items-center gap-1 text-xs text-stone">
                                    <MapPin size={11} className="text-maroon" />
                                    {temple.translations?.[language]?.city || temple.city}
                                  </span>
                                  {temple.designation && (
                                    <span className="text-[10px] text-stone/80 bg-sandstone px-2 py-0.5 rounded-md truncate max-w-[180px]">
                                      {temple.designation}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <ChevronRight
                                size={16}
                                className={`text-stone/40 flex-shrink-0 transition-transform duration-200 mt-1 ${
                                  isExpanded ? 'rotate-90' : ''
                                }`}
                              />
                            </div>
                          </button>

                          {/* Expanded details */}
                          {isExpanded && (
                            <div className="border-t border-border/50 px-4 pb-4 pt-3 space-y-3 bg-sandstone/30 animate-fade-in">
                              {temple.timings && (
                                <div className="flex items-start gap-2">
                                  <Clock size={14} className="text-maroon mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wide text-stone mb-0.5">
                                      {t('timings', language)}
                                    </p>
                                    <p className="text-xs text-charcoal">
                                      {temple.translations?.[language]?.timings || temple.timings}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {(temple.history || temple.significance) && (
                                <p className="text-xs text-stone leading-relaxed">
                                  {temple.translations?.[language]?.history ||
                                    temple.translations?.[language]?.significance ||
                                    temple.significance ||
                                    temple.history}
                                </p>
                              )}

                              <div className="flex flex-wrap gap-2 pt-1">
                                {temple.mapsUrl && (
                                  <a
                                    href={temple.mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold
                                      bg-gradient-maroon text-white hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                                  >
                                    <Navigation size={13} />
                                    {t('directions', language)}
                                  </a>
                                )}
                                {temple.sourceUrl && (
                                  <a
                                    href={temple.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold
                                      bg-white text-stone border border-border hover:bg-cream hover:text-charcoal transition-colors cursor-pointer"
                                  >
                                    <ExternalLink size={13} />
                                    Details
                                  </a>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="flex-shrink-0 border-t border-border/50 px-6 py-2.5 bg-sandstone/40 flex items-center justify-between text-[11px] text-stone/70">
          <span>{t('openStreetMapNote', language)}</span>
          <span>
            {language === 'ta'
              ? 'இருப்பிட தகவல் பாதுகாப்பானது'
              : language === 'hi'
              ? 'लोकेशन डेटा सुरक्षित है'
              : 'Location processed locally'}
          </span>
        </div>
      </div>
    </div>
  );
}
