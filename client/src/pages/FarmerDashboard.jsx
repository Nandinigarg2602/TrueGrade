import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Sprout, Wheat, AlertCircle, CheckCircle, TrendingUp, TrendingDown,
  Droplets, Dna, Bug, MapPin, QrCode, RefreshCw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FarmerDashboard() {
  const { t } = useLanguage();
  const [certificates, setCertificates] = useState([]);
  const [trends, setTrends] = useState({
    Rice: { recommendation: 'HOLD', predicted_change: 4.88, volatility: 0.25, confidence: 0.85 },
    Wheat: { recommendation: 'HOLD', predicted_change: 1.20, volatility: 0.13, confidence: 0.90 },
    Maize: { recommendation: 'HOLD', predicted_change: 0.67, volatility: 0.35, confidence: 0.82 }
  });
  const [loading, setLoading] = useState(true);
  const [showGradeForm, setShowGradeForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    grain_type: 'Wheat',
    batch_id: 'WHT-PB-2025-01',
    farmer_name: 'Gurpreet Singh',
    location: 'Khanna Mandi, Punjab'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [certsRes, trendsResRice, trendsResWheat, trendsResMaize] = await Promise.all([
        axios.get('/api/certificates'),
        axios.get('/api/market-trends/Rice').catch(() => null),
        axios.get('/api/market-trends/Wheat').catch(() => null),
        axios.get('/api/market-trends/Maize').catch(() => null)
      ]);

      if (certsRes.data) {
        setCertificates(certsRes.data);
      }

      setTrends({
        Rice: trendsResRice?.data || { recommendation: 'HOLD', predicted_change: 4.88, volatility: 0.25, confidence: 0.85 },
        Wheat: trendsResWheat?.data || { recommendation: 'HOLD', predicted_change: 1.20, volatility: 0.13, confidence: 0.90 },
        Maize: trendsResMaize?.data || { recommendation: 'HOLD', predicted_change: 0.67, volatility: 0.35, confidence: 0.82 }
      });
    } catch (err) {
      console.error('Error fetching farmer dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await axios.post('/api/certificates', formData);
      setShowGradeForm(false);
      fetchData();
      setFormData({
        grain_type: 'Wheat',
        batch_id: `WHT-${Math.floor(100 + Math.random() * 900)}`,
        farmer_name: formData.farmer_name,
        location: formData.location
      });
    } catch (err) {
      alert('Failed to generate certificate: ' + (err.response?.data?.error || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION EXACTLY AS IN SCREENSHOT */}
        <div className="mb-10">
          <h1 
            className="text-4xl lg:text-5xl font-bold text-[#1A4D2E] mb-3 tracking-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {t('gradeHarvest')}
          </h1>
          <p className="text-xl text-gray-600 mb-6 font-sans">
            {t('gradeSubtitle')}
          </p>
          
          <button
            data-testid="grade-harvest-btn"
            onClick={() => setShowGradeForm(!showGradeForm)}
            className="inline-flex items-center gap-2 bg-[#1A4D2E] hover:bg-[#2D7A4F] text-white rounded-full px-8 py-3.5 text-base font-semibold shadow-md transition-all hover:-translate-y-0.5"
          >
            <Sprout className="w-5 h-5 text-emerald-300" />
            <span>{t('createCertificate')}</span>
          </button>
        </div>

        {/* CREATE NEW CERTIFICATE FORM */}
        {showGradeForm && (
          <div className="bg-white rounded-2xl p-8 mb-12 shadow-md border border-gray-200/80 transition-all duration-300">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <h3 
                className="text-2xl font-bold text-[#1A4D2E]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                New Quality Certificate
              </h3>
              <button 
                onClick={() => setShowGradeForm(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                    Grain Type
                  </label>
                  <select
                    data-testid="grain-type-select"
                    value={formData.grain_type}
                    onChange={(e) => setFormData({ ...formData, grain_type: e.target.value })}
                    className="w-full p-3.5 border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-[#1A4D2E] focus:outline-none bg-white text-sm"
                  >
                    <option>Wheat</option>
                    <option>Rice</option>
                    <option>Maize</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                    Batch ID
                  </label>
                  <input
                    type="text"
                    data-testid="batch-id-input"
                    value={formData.batch_id}
                    onChange={(e) => setFormData({ ...formData, batch_id: e.target.value })}
                    placeholder="e.g., BATCH-2025-001"
                    required
                    className="w-full p-3.5 border border-gray-300 rounded-xl font-mono focus:ring-2 focus:ring-[#1A4D2E] focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                    Farmer Name
                  </label>
                  <input
                    type="text"
                    data-testid="farmer-name-input"
                    value={formData.farmer_name}
                    onChange={(e) => setFormData({ ...formData, farmer_name: e.target.value })}
                    placeholder="Enter your name"
                    required
                    className="w-full p-3.5 border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-[#1A4D2E] focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    data-testid="location-input"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Punjab Mandi"
                    required
                    className="w-full p-3.5 border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-[#1A4D2E] focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="submit-certificate-btn"
                  className="bg-[#1A4D2E] hover:bg-[#2D7A4F] text-white rounded-full px-8 py-3.5 font-semibold text-sm shadow-md transition-all"
                >
                  {submitting ? 'Minting Certificate...' : 'Generate Certificate'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* MARKET INTELLIGENCE SECTION EXACTLY AS IN SCREENSHOT */}
        <div className="mb-12">
          <h2 
            className="text-3xl font-bold text-[#1A4D2E] mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Market Intelligence
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Rice', 'Wheat', 'Maize'].map((grain) => {
              const trend = trends[grain] || { recommendation: 'HOLD', predicted_change: 2.1, volatility: 0.2, confidence: 0.85 };
              const isHold = trend.recommendation === 'HOLD';

              return (
                <div 
                  key={grain}
                  className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm transition-all hover:shadow-md"
                  data-testid={`market-trend-${grain.toLowerCase()}`}
                >
                  {/* Top: Grain Name + Status Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 
                      className="text-2xl font-bold text-[#1A4D2E]"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {grain}
                    </h3>
                    {isHold ? (
                      <AlertCircle className="w-6 h-6 text-amber-500" />
                    ) : (
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    )}
                  </div>

                  {/* Recommendation: HOLD / SELL in Amber or Green */}
                  <div className={`text-4xl font-extrabold mb-3 font-sans tracking-tight ${
                    isHold ? 'text-[#D4A373]' : 'text-emerald-600'
                  }`}>
                    {trend.recommendation}
                  </div>

                  {/* Metrics: Predicted Change and Volatility */}
                  <div className="space-y-2 text-sm text-gray-600 font-sans">
                    <div className="flex items-center justify-between">
                      <span>Predicted Change:</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1 font-mono">
                        {trend.predicted_change >= 0 ? (
                          <TrendingUp className="w-4 h-4 text-emerald-600 inline" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500 inline" />
                        )}
                        {trend.predicted_change}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Volatility:</span>
                      <span className="font-semibold text-slate-800 font-mono">
                        {(trend.volatility * 100).toFixed(0)}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Confidence:</span>
                      <span className="font-semibold text-slate-800 font-mono">
                        {(trend.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MY CERTIFICATES SECTION */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 
              className="text-3xl font-bold text-[#1A4D2E]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              My Certificates
            </h2>
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-semibold text-[#1A4D2E] hover:bg-gray-50 flex items-center gap-1.5 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {certificates.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80 shadow-sm">
              <p className="text-gray-500 text-base font-medium">
                No certificates yet. Click "Create New Certificate" above to test your first harvest!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <div 
                  key={cert.id} 
                  className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-lg transition-all"
                  data-testid={`certificate-${cert.id}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-500">{cert.grain_type}</span>
                    <span 
                      className="text-2xl font-bold text-[#1A4D2E]"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Grade {cert.grade}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div><span className="text-gray-400">Batch:</span> <span className="font-mono text-slate-800">{cert.batch_id}</span></div>
                    <div><span className="text-gray-400">Farmer:</span> <span className="text-slate-800 font-medium">{cert.farmer_name}</span></div>
                    <div><span className="text-gray-400">Location:</span> <span className="text-slate-800">{cert.location}</span></div>
                    <div><span className="text-gray-400">Trust Score:</span> <span className="font-bold text-[#1A4D2E] font-mono">{cert.trust_score}</span></div>
                    
                    <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-400 mb-0.5">QR Code</div>
                        <div className="font-mono text-sm text-[#1A4D2E] font-bold">{cert.qr_code}</div>
                      </div>
                      <div className="w-10 h-10 bg-[#E6F0EB] rounded-lg flex items-center justify-center text-[#1A4D2E]">
                        <QrCode className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
