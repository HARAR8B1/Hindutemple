import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

export const LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
];

const STORAGE_KEY = 'iraivanai_language_pref';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && ['en', 'ta', 'hi'].includes(saved)) {
        return saved;
      }
    } catch {
      // Ignore storage access errors
    }
    return 'ta';
  });

  const setLanguage = (newLang) => {
    if (!['en', 'ta', 'hi'].includes(newLang)) return;
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // Ignore storage errors
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  /**
   * Translates a dot-notated key from the dictionary.
   * e.g., t('nav.explore')
   */
  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // Fallback to English
        let fallback = translations['en'];
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            fallback = key;
            break;
          }
        }
        value = fallback;
        break;
      }
    }

    if (typeof value === 'string') {
      let resolved = value;
      Object.entries(params).forEach(([paramKey, paramVal]) => {
        resolved = resolved.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
      });
      return resolved;
    }

    return value || key;
  };

  /**
   * Returns a temple object with fields localized for current language
   */
  const getLocalizedTemple = (temple) => {
    if (!temple) return null;
    if (language === 'en') return temple;

    const localized = temple.translations?.[language];
    if (!localized) return temple;

    return {
      ...temple,
      name: localized.name || temple.name,
      city: localized.city || temple.city,
      state: localized.state || temple.state,
      period: localized.period || temple.period,
      category: localized.category || temple.category,
      designation: localized.designation || temple.designation,
      history: localized.history || temple.history,
      timings: localized.timings || temple.timings,
      festivals: localized.festivals || temple.festivals,
      significance: localized.significance || temple.significance,
    };
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        getLocalizedTemple,
        availableLanguages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
