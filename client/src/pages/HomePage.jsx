import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Scale, Landmark, Activity, Shield, QrCode, TrendingUp,
  Wheat, Sprout
} from 'lucide-react';
import TruthBox from '../components/TruthBox';
import OpticalMoat from '../components/OpticalMoat';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    total_value_facilitated: 84750000,
    collateral_velocity: 0.91,
    active_certificates: 3
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/transparency-stats');
        if (res.data) setStats(res.data);
      } catch (err) {
        console.warn('Using default transparency metrics');
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen noise-bg">
      
      {/* HERO SECTION WITH AUTHENTIC FARMER BACKGROUND EXACTLY LIKE SCREENSHOT */}
      <section className="relative min-h-[88vh] flex flex-col justify-start items-center pt-10 sm:pt-14 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
        
        {/* Background image of farmer in field */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1628272107134-c66c4b580952?auto=format&fit=crop&w=2000&q=85')",
            backgroundPosition: 'center 28%'
          }}
        />

        {/* Green forest atmospheric overlay matching screenshot */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(26, 77, 46, 0.82) 0%, rgba(34, 102, 60, 0.72) 50%, rgba(45, 122, 79, 0.65) 100%)'
          }}
        />

        {/* Hero Title and Subtitle */}
        <div className="relative z-20 max-w-4xl mx-auto mb-10 sm:mb-12 mt-0">
          <h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.15] mb-3 drop-shadow-md"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            TrueGrade
          </h1>
          <p 
            className="text-base sm:text-xl text-white/95 max-w-2xl mx-auto font-sans leading-relaxed drop-shadow-sm font-medium"
          >
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Centered Floating TruthBox Glass Card */}
        <div className="relative z-20 flex justify-center w-full px-2 sm:px-4 pt-2">
          <TruthBox />
        </div>

      </section>

      {/* QUICK STATS STRIP */}
      <section className="py-14 px-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-4">
            <div 
              className="text-4xl lg:text-5xl font-bold text-[#1A4D2E] mb-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              ₹{(stats.total_value_facilitated / 10000000).toFixed(1)}Cr
            </div>
            <div className="text-gray-600 font-sans text-sm font-semibold tracking-wide">
              Total Value Facilitated
            </div>
          </div>

          <div className="p-4 border-y md:border-y-0 md:border-x border-gray-200">
            <div 
              className="text-4xl lg:text-5xl font-bold text-[#1A4D2E] mb-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {(stats.collateral_velocity * 100).toFixed(0)}%
            </div>
            <div className="text-gray-600 font-sans text-sm font-semibold tracking-wide">
              Collateral Velocity
            </div>
          </div>

          <div className="p-4">
            <div 
              className="text-4xl lg:text-5xl font-bold text-[#1A4D2E] mb-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {stats.active_certificates}
            </div>
            <div className="text-gray-600 font-sans text-sm font-semibold tracking-wide">
              Active Certificates
            </div>
          </div>
        </div>
      </section>

      {/* THE OPTICAL MOAT SUB-MILLIMETER SECTION */}
      <OpticalMoat />

      {/* BUILT FOR TRUST FEATURES GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl lg:text-5xl font-bold text-[#1A4D2E]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Built for Trust
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-base max-w-xl mx-auto font-sans">
            End-to-end transparency connecting farmers, mandis, and banks with unalterable physical grain intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div 
            onClick={() => navigate('/farmer')}
            className="bg-white rounded-2xl p-8 shadow-sm border border-[#E2E8F0] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            data-testid="feature-card-grade-harvest"
          >
            <div className="w-14 h-14 bg-[#E6F0EB] rounded-full flex items-center justify-center text-[#1A4D2E] mb-6 group-hover:bg-[#1A4D2E] group-hover:text-white transition-colors">
              <Scale className="w-7 h-7" />
            </div>
            <h3 
              className="text-xl font-bold text-[#1A4D2E] mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Grade Your Harvest
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Instant quality certification with sub-millimeter macro-optics and spectral sensing for fair Mandi valuation.
            </p>
          </div>

          <div 
            onClick={() => navigate('/lender')}
            className="bg-white rounded-2xl p-8 shadow-sm border border-[#E2E8F0] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            data-testid="feature-card-verify-collateral"
          >
            <div className="w-14 h-14 bg-[#E6F0EB] rounded-full flex items-center justify-center text-[#1A4D2E] mb-6 group-hover:bg-[#1A4D2E] group-hover:text-white transition-colors">
              <Landmark className="w-7 h-7" />
            </div>
            <h3 
              className="text-xl font-bold text-[#1A4D2E] mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Verify Collateral
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Real-time access to verified grain quality for instant 60-second credit disbursement by banks and NBFCs.
            </p>
          </div>

          <div 
            onClick={() => navigate('/farmer')}
            className="bg-white rounded-2xl p-8 shadow-sm border border-[#E2E8F0] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            data-testid="feature-card-live-market"
          >
            <div className="w-14 h-14 bg-[#E6F0EB] rounded-full flex items-center justify-center text-[#1A4D2E] mb-6 group-hover:bg-[#1A4D2E] group-hover:text-white transition-colors">
              <Activity className="w-7 h-7" />
            </div>
            <h3 
              className="text-xl font-bold text-[#1A4D2E] mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Live Market Intelligence
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Real-time Mandi price feeds mirroring AGMARKNET with AI-powered Hold vs Sell recommendations.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E2E8F0] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-[#E6F0EB] rounded-full flex items-center justify-center text-[#1A4D2E] mb-6">
              <Shield className="w-7 h-7" />
            </div>
            <h3 
              className="text-xl font-bold text-[#1A4D2E] mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Anti-Tamper Security
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Hardware-level GPS geofencing and vibration telemetry for complete physical collateral protection.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E2E8F0] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-[#E6F0EB] rounded-full flex items-center justify-center text-[#1A4D2E] mb-6">
              <QrCode className="w-7 h-7" />
            </div>
            <h3 
              className="text-xl font-bold text-[#1A4D2E] mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Digital Birth Certificate
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Immutable cryptographic quality records tracked from farm harvest to Mandi warehouse delivery.
            </p>
          </div>

          <div 
            onClick={() => navigate('/transparency')}
            className="bg-white rounded-2xl p-8 shadow-sm border border-[#E2E8F0] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            data-testid="feature-card-transparency-stats"
          >
            <div className="w-14 h-14 bg-[#E6F0EB] rounded-full flex items-center justify-center text-[#1A4D2E] mb-6 group-hover:bg-[#1A4D2E] group-hover:text-white transition-colors">
              <TrendingUp className="w-7 h-7" />
            </div>
            <h3 
              className="text-xl font-bold text-[#1A4D2E] mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Transparency Stats
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Complete open visibility into network metrics, loan velocity, and average ecosystem trust ratings.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
