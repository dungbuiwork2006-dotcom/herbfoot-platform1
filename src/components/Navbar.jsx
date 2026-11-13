import React, { useState } from 'react';
import { Menu, X, QrCode, ShieldCheck, Leaf, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar({ onNavigate, currentSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Câu chuyện', href: '#story' },
    { label: 'HERBFOOT WARM', href: '#product' },
    { label: 'Thảo mộc nghiên cứu', href: '#ingredients' },
    { label: 'Cấu tạo sản phẩm', href: '#structure' },
    { label: 'Công nghệ Chitosan', href: '#chitosan' },
    { label: 'Quy trình', href: '#process' },
    { label: 'Kiểm soát chất lượng', href: '#qa' },
    { label: 'Cam kết ESG', href: '#esg' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E8E1D5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#2D4A3E] flex items-center justify-center text-[#F3EFE6] shadow-sm group-hover:bg-[#1E332B] transition-colors">
              <Leaf className="w-5 h-5 text-[#C8D6AF]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-wider text-xl font-bold text-[#1F332A] uppercase">
                HERBFOOT
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#6B7C6E] font-medium -mt-1">
                Botanical Foot Care
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs uppercase tracking-wider text-[#4A5D4E] hover:text-[#1F332A] font-medium transition-colors hover:underline underline-offset-8 decoration-[#8EA885]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Quick CTA to Traceability */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#passport-quick"
              onClick={(e) => handleLinkClick(e, '#passport-quick')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1F332A] bg-[#EAE3D2]/80 hover:bg-[#DDD3BE] rounded-full border border-[#D5C9B1] transition-all hover:shadow-xs"
            >
              <QrCode className="w-3.5 h-3.5 text-[#2D4A3E]" />
              <span>Tra cứu tem QR</span>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[#2D4A3E] hover:bg-[#EFE9DC] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[#E8E1D5] bg-[#FBF9F5] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-fadeIn">
          <div className="grid grid-cols-1 gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block px-3 py-2 text-sm font-medium text-[#2D4A3E] hover:bg-[#EFE9DC] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8E1D5]">
            <a
              href="#passport-quick"
              onClick={(e) => handleLinkClick(e, '#passport-quick')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs uppercase tracking-widest font-semibold bg-[#2D4A3E] text-[#F3EFE6] rounded-xl hover:bg-[#1E332B] transition-colors shadow-sm"
            >
              <QrCode className="w-4 h-4 text-[#C8D6AF]" />
              <span>Tra cứu nguồn gốc sản phẩm</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
