import React, { useState } from 'react';
import { Eye, Shield, Radio, Layers, Search, Cpu, CheckCircle } from 'lucide-react';

export default function OpticalMoat() {
  const [isScanning, setIsScanning] = useState(true);

  return (
    <section className="py-20 bg-white border-y border-[#E2E8F0] relative overflow-hidden" data-testid="optical-moat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F0EB] text-[#1A4D2E] text-xs font-mono font-semibold mb-3">
            <Eye className="w-3.5 h-3.5" />
            SUB-MILLIMETER GRAIN DIAGNOSTICS
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A4D2E] tracking-tight">
            The Optical Moat
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans">
            Human visual inspection fails to see inside the kernel. TrueGrade combines 50-micron macro-photometry with micro-spectral reflectance to detect covert internal weevil hollows and moisture pockets before grains spoil.
          </p>
        </div>

        {/* Visual Inspection Demonstration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: The Interactive Macro Scanner Visual */}
          <div className="lg:col-span-6">
            <div 
              className="relative rounded-2xl overflow-hidden border-2 border-[#1A4D2E]/30 shadow-2xl bg-slate-900 group cursor-crosshair"
              onMouseEnter={() => setIsScanning(true)}
            >
              {/* Macro Grain Image */}
              <img
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80"
                alt="Macro Wheat Grain Kernel Analysis"
                className="w-full h-[420px] object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Scanning Laser Beam */}
              {isScanning && (
                <div className="scanning-beam"></div>
              )}

              {/* HUD Diagnostic Overlays */}
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[11px] font-mono p-3 rounded-lg space-y-1">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Search className="w-3.5 h-3.5 text-emerald-400" />
                  SPECTRAL RESOLUTION: 450-980nm
                </div>
                <div>SURFACE VITREOUSNESS: 98.4%</div>
                <div>INTERNAL WEEVIL BOREHOLE: 0.00% (CLEAN)</div>
                <div>KERNEL INTEGRITY INDEX: 99.1 / 100</div>
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md border border-white/20 p-3 rounded-xl flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-mono text-emerald-300">HW SENSOR ID: TG-OPT-CAM-04</span>
                </div>
                <div className="font-mono text-[11px] text-slate-400">
                  LAT: 30.7046° N | LON: 76.2163° E
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-slate-500 font-mono mt-3">
              Hover over the inspection viewport to trigger laser optical resonance scan.
            </p>
          </div>

          {/* Right: Technical Pillar Cards */}
          <div className="lg:col-span-6 space-y-5">
            
            <div className="p-6 rounded-xl bg-[#F9F9F7] border border-[#E2E8F0] interactive-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1A4D2E] text-white flex items-center justify-center flex-shrink-0">
                  <Layers className="w-6 h-6 text-[#D4A373]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1A4D2E]">
                    Sub-Millimeter Surface Topography
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Analyzes microscopic fissures, fungal micro-spores, and discolored kernels at 0.05mm fidelity, classifying grain hardness according to Codex Alimentarius benchmarks.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#F9F9F7] border border-[#E2E8F0] interactive-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1A4D2E] text-white flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-6 h-6 text-[#D4A373]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1A4D2E]">
                    Near-Infrared (NIR) Molecular Signature
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Light wavelength absorption penetrates kernel coats, quantifying gluten proteins, amylose ratios, and lipid breakdown in under 4 seconds without crushing samples.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#E6F0EB] border border-[#1A4D2E]/20 interactive-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1A4D2E] text-white flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-[#D4A373]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg font-bold text-[#1A4D2E]">
                      Anti-Tamper Hardware Geofencing
                    </h3>
                    <span className="text-[10px] font-mono font-bold bg-[#1A4D2E] text-white px-2 py-0.5 rounded">
                      PATENTED
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 mt-1">
                    Every grain assessment unit is secured with tamper-proof cryptographic silicon, 3-axis vibration telemetry, and GPS locking to ensure tests occur physically inside certified Mandis.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
