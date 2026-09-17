import React from 'react';
import { Link } from 'react-router-dom';
import { Wheat, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A4D2E] text-white border-t border-[#1A4D2E]/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-emerald-800/60">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Wheat className="w-6 h-6 text-[#D4A373]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                TrueGrade
              </span>
            </div>
            <p className="text-sm text-emerald-100/80 max-w-sm leading-relaxed">
              The Moody’s for Agri-Commodities. Bridging rural farmers and institutional credit providers with unforgeable optical quality certification.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D4A373] font-mono">
              <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
              <span>Institutional Authority • Rural Warmth</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm tracking-wide text-white uppercase">
              For Farmers
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/70">
              <li><Link to="/farmer" className="hover:text-white transition-colors">Grade Your Harvest</Link></li>
              <li><Link to="/farmer" className="hover:text-white transition-colors">Live Mandi Scenarios</Link></li>
              <li><Link to="/farmer" className="hover:text-white transition-colors">Hold or Sell Signals</Link></li>
              <li><Link to="/farmer" className="hover:text-white transition-colors">Digital Birth Certificate</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm tracking-wide text-white uppercase">
              For Banks & NBFCs
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/70">
              <li><Link to="/lender" className="hover:text-white transition-colors">Verify Collateral</Link></li>
              <li><Link to="/lender" className="hover:text-white transition-colors">Lend-Link API Bridge</Link></li>
              <li><Link to="/lender" className="hover:text-white transition-colors">60-Sec Disbursement Status</Link></li>
              <li><Link to="/transparency" className="hover:text-white transition-colors">Collateral Velocity Engine</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm tracking-wide text-white uppercase">
              Trust & Standards
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/70">
              <li><Link to="/transparency" className="hover:text-white transition-colors">Transparency Stats</Link></li>
              <li><span className="text-emerald-300">AGMARKNET Mirror</span></li>
              <li><span className="text-emerald-300">Codex Standards</span></li>
              <li><span className="text-emerald-300">ISO 22000 Grading</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/60 gap-4">
          <div>
            © {new Date().getFullYear()} TrueGrade Technologies Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            Built with precision for India's grain heartlands.
          </div>
        </div>

      </div>
    </footer>
  );
}
