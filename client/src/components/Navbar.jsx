import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Wheat, Sprout, Landmark, Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, languages, t } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isFarmer = location.pathname === '/farmer';
  const isLender = location.pathname === '/lender';

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
        
        {/* Brand */}
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          data-testid="brand-logo"
        >
          <div className="w-8 h-8 rounded-full bg-[#1A4D2E] flex items-center justify-center text-white">
            <Wheat className="w-5 h-5 text-[#D4A373]" />
          </div>
          <span 
            className="text-2xl font-bold text-[#1A4D2E] tracking-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            TrueGrade
          </span>
        </div>

        {/* Right side navigation actions & Language Selector */}
        <div className="flex items-center gap-3">
          
          {/* Language Change Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              data-testid="language-dropdown-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 hover:border-gray-300 bg-[#F9F9F7] text-xs font-semibold text-slate-700 transition-all hover:bg-gray-100 shadow-sm"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#1A4D2E]" />
              <span>{currentLangObj.native}</span>
              <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-gray-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                data-testid="language-dropdown-menu"
              >
                <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold border-b border-gray-100 mb-1">
                  Select Language
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors hover:bg-[#E6F0EB] ${
                      language === lang.code ? 'font-bold text-[#1A4D2E] bg-[#E6F0EB]/60' : 'text-slate-700'
                    }`}
                    data-testid={`lang-option-${lang.code}`}
                  >
                    <span>{lang.native} <span className="text-gray-400 font-normal text-[11px]">({lang.label})</span></span>
                    {language === lang.code && (
                      <Check className="w-3.5 h-3.5 text-[#1A4D2E]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Role Navigation Buttons */}
          {isFarmer ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs sm:text-sm font-medium text-gray-500">
                {t('farmerDashboard')}
              </span>
              <button
                data-testid="back-to-home-btn"
                onClick={() => navigate('/')}
                className="bg-white hover:bg-gray-50 text-slate-800 border border-gray-300 text-xs sm:text-sm font-semibold rounded-full px-4 sm:px-5 py-2 transition-all hover:-translate-y-0.5 shadow-sm whitespace-nowrap"
              >
                {t('backToHome')}
              </button>
            </div>
          ) : isLender ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs sm:text-sm font-medium text-gray-500">
                {t('lenderDashboard')}
              </span>
              <button
                data-testid="back-to-home-btn"
                onClick={() => navigate('/')}
                className="bg-white hover:bg-gray-50 text-slate-800 border border-gray-300 text-xs sm:text-sm font-semibold rounded-full px-4 sm:px-5 py-2 transition-all hover:-translate-y-0.5 shadow-sm whitespace-nowrap"
              >
                {t('backToHome')}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                data-testid="farmer-nav-btn"
                onClick={() => navigate('/farmer')}
                className="flex items-center gap-1.5 sm:gap-2 bg-[#1A4D2E] hover:bg-[#2D7A4F] text-white text-xs sm:text-sm font-semibold rounded-full px-3.5 sm:px-5 py-2 transition-all hover:-translate-y-0.5 shadow-sm whitespace-nowrap"
              >
                <Sprout className="w-4 h-4 text-emerald-300" />
                <span>{t('forFarmers')}</span>
              </button>
              
              <button
                data-testid="lender-nav-btn"
                onClick={() => navigate('/lender')}
                className="flex items-center gap-1.5 sm:gap-2 bg-white hover:bg-gray-50 text-[#1A4D2E] border border-[#1A4D2E] text-xs sm:text-sm font-semibold rounded-full px-3.5 sm:px-5 py-2 transition-all hover:-translate-y-0.5 shadow-sm whitespace-nowrap"
              >
                <Landmark className="w-4 h-4 text-[#1A4D2E]" />
                <span>{t('forLenders')}</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </nav>
  );
}
