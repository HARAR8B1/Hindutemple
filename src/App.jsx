import { useState } from 'react';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import YouTubePlayer from './components/YouTubePlayer';
import DivyaDesamSection from './components/DivyaDesamSection';
import ShivaTemplesSection from './components/ShivaTemplesSection';
import GaneshTemplesSection from './components/GaneshTemplesSection';
import MuruganTemplesSection from './components/MuruganTemplesSection';
import TempleCollectionsSection from './components/TempleCollectionsSection';
import SacredCollectionsSection from './components/SacredCollectionsSection';
import TempleGrid from './components/TempleGrid';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import TempleModal from './components/TempleModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminPanel from './components/AdminPanel';

function MainLayout() {
  const { isLoggedIn } = useAdmin();
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const handleAdminButtonClick = () => {
    if (isLoggedIn) {
      setShowAdminPanel(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setShowAdminPanel(true);
  };

  const scrollToSection = (sectionId) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-sandstone text-charcoal selection:bg-gold/30 selection:text-maroon-dark">
      {/* Top Navbar */}
      <Navbar
        onAdminClick={handleAdminButtonClick}
        onNavigate={scrollToSection}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Hero Banner with Language Switcher */}
        <Hero onExplore={() => scrollToSection('explore')} />

        {/* Embedded YouTube Feature */}
        <YouTubePlayer />

        {/* 108 Divya Desams Section */}
        <DivyaDesamSection onSelectTemple={setSelectedTemple} />

        {/* Famous Shiva Temples / Jyotirlingas */}
        <ShivaTemplesSection onSelectTemple={setSelectedTemple} />

        {/* Sacred Ganesh Temples */}
        <GaneshTemplesSection onSelectTemple={setSelectedTemple} />

        {/* Sacred Murugan Temples */}
        <MuruganTemplesSection onSelectTemple={setSelectedTemple} />

        {/* Temple Collections by deity, goddess, city, and state */}
        <TempleCollectionsSection onSelectTemple={setSelectedTemple} />

        {/* Pancha Bhoota and Pancha Kedar sacred collections */}
        <SacredCollectionsSection onSelectTemple={setSelectedTemple} />

        {/* Searchable and Filterable Temple Archive Grid */}
        <TempleGrid onSelectTemple={setSelectedTemple} />

        {/* About Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Temple Details Modal */}
      {selectedTemple && (
        <TempleModal
          temple={selectedTemple}
          onClose={() => setSelectedTemple(null)}
        />
      )}

      {/* Admin Login Modal */}
      {showLoginModal && (
        <AdminLoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Slide-in Admin Control Panel */}
      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AdminProvider>
        <MainLayout />
      </AdminProvider>
    </LanguageProvider>
  );
}
