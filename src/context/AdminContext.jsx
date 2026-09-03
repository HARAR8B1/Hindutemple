import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext(null);

const STORAGE_KEY = 'iraivanai_admin_settings';

const defaultSettings = {
  heroImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Brihadeshwara_Temple%2C_Thanjavur%2C_Tamil_Nadu.jpg/1920px-Brihadeshwara_Temple%2C_Thanjavur%2C_Tamil_Nadu.jpg',
  youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  facebookUrl: 'https://www.facebook.com',
  instagramUrl: 'https://www.instagram.com',
  youtubeChannelUrl: 'https://www.youtube.com',
};

function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
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
