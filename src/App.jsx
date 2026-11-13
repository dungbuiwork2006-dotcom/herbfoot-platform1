import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BrandStory from './components/BrandStory';
import ProductIntroduction from './components/ProductIntroduction';
import BotanicalIngredients from './components/BotanicalIngredients';
import ProductStructure from './components/ProductStructure';
import ChitosanTechnology from './components/ChitosanTechnology';
import ProductionJourney from './components/ProductionJourney';
import QualityAssurance from './components/QualityAssurance';
import ESGSection from './components/ESGSection';
import Footer from './components/Footer';
import ProductPassportView from './components/ProductPassportView';
import AdminPortal from './components/AdminPortal';
import AdminLogin from './components/AdminLogin';
import { AuthService } from './services/traceabilityService';
import { Lock } from 'lucide-react';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home'); // 'home', 'passport', 'admin'
  const [activeSerial, setActiveSerial] = useState('HF-000001');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập Admin
    setIsAdminAuthenticated(AuthService.isAuthenticated());

    const handleUrlChange = () => {
      const path = window.location.pathname;
      const productMatch = path.match(/^\/product\/(.+)$/i);
      if (productMatch) {
        setCurrentRoute('passport');
        setActiveSerial(productMatch[1]);
      } else if (path === '/admin') {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('home');
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const navigateTo = (route, serial = null) => {
    setCurrentRoute(route);
    if (route === 'passport' && serial) {
      setActiveSerial(serial);
      window.history.pushState({}, '', `/product/${serial}`);
    } else if (route === 'admin') {
      window.history.pushState({}, '', `/admin`);
    } else {
      window.history.pushState({}, '', `/`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setCurrentRoute('admin');
  };

  const handleAdminLogout = async () => {
    await AuthService.logout();
    setIsAdminAuthenticated(false);
    navigateTo('home');
  };

  // 1. Tuyến đường xem Product Passport
  if (currentRoute === 'passport') {
    return (
      <ProductPassportView
        serialNumber={activeSerial}
        onBackToHome={() => navigateTo('home')}
      />
    );
  }

  // 2. Tuyến đường Quản trị (Admin Portal) - YÊU CẦU ĐĂNG NHẬP BẢO MẬT
  if (currentRoute === 'admin') {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={handleAdminLoginSuccess}
          onBackToPublic={() => navigateTo('home')}
        />
      );
    }

    return (
      <AdminPortal
        onBackToPublic={() => navigateTo('home')}
        onViewPassport={(serial) => navigateTo('passport', serial)}
        onLogout={handleAdminLogout}
      />
    );
  }

  // 3. Website Công khai & Storytelling
  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#243324] font-sans">
      
      {/* Top Banner Lối vào Admin */}
      <div className="bg-[#1C2C24] text-[#E0D7C6] py-1.5 px-4 text-[11px] flex items-center justify-between border-b border-[#2D4537]">
        <span className="font-mono text-[#A4C4A0]">
          Hệ sinh thái truy xuất nguồn gốc HERBFOOT Traceability v1.0
        </span>
        <button
          onClick={() => navigateTo('admin')}
          className="flex items-center gap-1.5 text-[#C6DAC4] hover:text-white transition-colors underline font-medium"
        >
          <Lock className="w-3 h-3 text-[#8CB589]" />
          <span>{isAdminAuthenticated ? 'Bảng Điều Khiển Admin' : 'Đăng Nhập Quản Trị /admin'}</span>
        </button>
      </div>

      {/* 1. Header Navigation */}
      <Navbar />

      <main>
        {/* 1. Hero Section */}
        <HeroSection onSearchSerial={(serial) => navigateTo('passport', serial)} />

        {/* 2. Brand Story & Mission */}
        <BrandStory />

        {/* 3. Product Introduction: HERBFOOT WARM */}
        <ProductIntroduction />

        {/* 4. 8 Botanical Research Ingredients */}
        <BotanicalIngredients />

        {/* 5. 6-Layer Exploded View Product Structure */}
        <ProductStructure />

        {/* 6. Chitosan Bio-membrane Technology */}
        <ChitosanTechnology />

        {/* 7. 5-Stage Production Journey */}
        <ProductionJourney />

        {/* 8. Quality Assurance & Lab Integrity */}
        <QualityAssurance />

        {/* 9. ESG & Circular Economy Commitments */}
        <ESGSection />
      </main>

      {/* 10. Footer */}
      <Footer onOpenPassportDemo={(serial) => navigateTo('passport', serial || 'HF-000001')} />

    </div>
  );
}
