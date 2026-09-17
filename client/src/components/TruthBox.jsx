import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, QrCode } from 'lucide-react';

export default function TruthBox() {
  const [sensorData, setSensorData] = useState({
    moisture: 11.85,
    protein: 13.40,
    infestation: 0.15,
    spectral_signature: 'SS-9042',
    macro_optics: 'MO-7731'
  });

  const [certificate, setCertificate] = useState({
    grade: 'A+',
    trust_score: 96,
    qr_code: 'QR-TG-JOWEAP'
  });

  useEffect(() => {
    const fetchLiveSensor = async () => {
      try {
        const res = await axios.get('/api/sensor-data/live');
        if (res.data) {
          setSensorData(res.data);
          const score = 100 - (res.data.infestation * 10) - (Math.max(0, res.data.moisture - 12) * 5);
          const clamped = Math.min(100, Math.max(70, Math.round(score)));
          const grade = clamped >= 90 ? 'A+' : clamped >= 80 ? 'A' : 'B+';
          setCertificate({
            grade,
            trust_score: clamped,
            qr_code: res.data.spectral_signature ? `QR-TG-${res.data.spectral_signature.slice(-6)}` : 'QR-TG-JOWEAP'
          });
        }
      } catch (err) {
        console.warn('Sensor stream fallback active');
      }
    };

    fetchLiveSensor();
    const interval = setInterval(fetchLiveSensor, 6000);
    return () => clearInterval(interval);
  }, []);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (certificate.trust_score / 100) * circumference;

  return (
    <div
      className="glass rounded-2xl p-6 sm:p-8 lg:p-10 max-w-4xl w-full shadow-2xl border border-white/60 animate-float select-none text-left"
      data-testid="truth-box"
    >
      {/* Top row: Title + Live status, and QR Code */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h3 
              className="text-2xl sm:text-3xl font-bold text-white drop-shadow-sm"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Digital Quality Certificate
            </h3>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-[#22C55E] text-white tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              LIVE
            </span>
          </div>
          <p className="text-[#D4A373] text-sm font-sans font-medium tracking-wide">
            Real-time grain analysis
          </p>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/80 p-1.5 rounded-lg border border-gray-200 flex items-center justify-center text-[#1A4D2E] shadow-sm">
            <QrCode className="w-full h-full text-[#1A4D2E]" />
          </div>
          <span className="text-[10px] sm:text-xs font-mono text-gray-600 mt-1 font-semibold">
            {certificate.qr_code}
          </span>
        </div>
      </div>

      {/* Main Grid: Gauge on Left, Sensor readings on Right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left: Trust Score Gauge */}
        <div className="flex flex-col items-center justify-center bg-white/60 rounded-xl p-6 border border-white/80 shadow-sm">
          <div className="relative w-40 h-40 mb-3 flex items-center justify-center">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#E2E8F0"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#1A4D2E"
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold text-[#1A4D2E] font-sans">
                {certificate.trust_score}
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-wide uppercase mt-0.5">
                Trust Score
              </span>
            </div>
          </div>
          
          <div className="text-center">
            <div 
              className="text-2xl sm:text-3xl font-bold text-[#1A4D2E]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Grade {certificate.grade}
            </div>
            <div className="text-xs font-medium text-gray-600 tracking-wide mt-0.5">
              Premium Quality
            </div>
          </div>
        </div>

        {/* Right: Sensor Metric Cards */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between p-3.5 bg-green-50/90 border border-green-200/80 rounded-xl text-green-900">
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold">Moisture Content</span>
            </div>
            <span className="text-base font-bold font-mono text-slate-900">
              {sensorData.moisture}%
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-green-50/90 border border-green-200/80 rounded-xl text-green-900">
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold">Protein Level</span>
            </div>
            <span className="text-base font-bold font-mono text-slate-900">
              {sensorData.protein}%
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-green-50/90 border border-green-200/80 rounded-xl text-green-900">
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold">Infestation Index</span>
            </div>
            <span className="text-base font-bold font-mono text-slate-900">
              {sensorData.infestation}%
            </span>
          </div>

          <div className="bg-white/70 rounded-xl p-3 border border-gray-200 text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Spectral Signature:</span>
              <span className="font-mono font-bold text-[#1A4D2E]">{sensorData.spectral_signature}</span>
            </div>
            <div className="flex justify-between">
              <span>Macro-Optics ID:</span>
              <span className="font-mono font-bold text-[#1A4D2E]">{sensorData.macro_optics}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
