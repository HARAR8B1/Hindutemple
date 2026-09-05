import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext(null);

const STORAGE_KEY = 'iraivanai_admin_settings';

const defaultSettings = {
  heroImageUrl: '/images/hero-temple.jpg',
  youtubeUrl: 'https://www.youtube.com/watch?v=4ZmNhljyYzU&t=845s',
  facebookUrl: 'https://www.facebook.com',
  instagramUrl: 'https://www.instagram.com',
  youtubeChannelUrl: 'https://www.youtube.com',
};

function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Migrate old broken URLs or older defaults to new sacred artwork
      if (
        !parsed.heroImageUrl ||
        parsed.heroImageUrl.includes('wikimedia.org') ||
        parsed.heroImageUrl.includes('Brihadeshwara_Temple') ||
        parsed.heroImageUrl === '/images/hero-bg.png'
      ) {
        parsed.heroImageUrl = defaultSettings.heroImageUrl;
      }
      if (!parsed.youtubeUrl || parsed.youtubeUrl === 'https://www.youtube.com/watch?v=kYJyb8hO0QY') {
        parsed.youtubeUrl = defaultSettings.youtubeUrl;
      }
      return { ...defaultSettings, ...parsed };
    }
  } catch {
    // localStorage not available or corrupted
  }
  return defaultSettings;
}

function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // localStorage not available
  }
}

export function AdminProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const login = (username, password) => {
    if (username === 'admin' && password === 'H@ri9831') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AdminContext.Provider
      value={{
        settings,
        isLoggedIn,
        updateSetting,
        updateSettings,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
