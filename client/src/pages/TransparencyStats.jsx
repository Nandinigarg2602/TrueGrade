import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  BarChart3, TrendingUp, Users, ShieldCheck, Landmark, 
  Activity, CheckCircle2, ArrowRight, Shield, Layers, RefreshCw
} from 'lucide-react';

export default function TransparencyStats() {
  const [stats, setStats] = useState({
    total_value_facilitated: 84750000,
    collateral_velocity: 0.91,
    active_certificates: 3,
    total_farmers: 7420,
    total_lenders: 128,
    avg_trust_score: 92.4
  });

  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/transparency-stats');
      if (res.data) setStats(res.data);
    } catch (err) {
      console.warn('Using default transparency metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="noise-overlay min-h-screen pb-20">
      
      {/* Top Banner */}
      <div className="bg-[#1A4D2E] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-mono mb-3">
              <BarChart3 className="w-3.5 h-3.5 text-[#D4A373]" />
              OPEN GOVERNANCE & METRICS
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Transparency Statistics
            </h1>
            <p className="mt-2 text-emerald-100/80 text-sm max-w-xl">
              Public telemetry showing aggregate collateral volumes, utilization rates, and default mitigation benchmarks across India.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchStats}
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-2 border border-white/20"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh Metrics
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        
        {/* Core KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm interactive-hover" data-testid="stat-total-value">
            <div className="w-12 h-12 rounded-xl bg-[#E6F0EB] text-[#1A4D2E] flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-semibold text-slate-500 uppercase">
              Total Value Facilitated
            </span>
            <div className="font-serif text-3xl font-bold text-[#1A4D2E] mt-1">
              ₹{(stats.total_value_facilitated / 10000000).toFixed(2)} Crore
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Cumulative grain loan principal disbursed through Lend-Link partner banks.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm interactive-hover" data-testid="stat-collateral-velocity">
            <div className="w-12 h-12 rounded-xl bg-[#E6F0EB] text-[#1A4D2E] flex items-center justify-center mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-semibold text-slate-500 uppercase">
              Collateral Velocity
            </span>
            <div className="font-serif text-3xl font-bold text-[#1A4D2E] mt-1">
              {(stats.collateral_velocity * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Efficiency ratio of tested grain lots successfully pledged into working credit.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm interactive-hover" data-testid="stat-active-certificates">
            <div className="w-12 h-12 rounded-xl bg-[#E6F0EB] text-[#1A4D2E] flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-[#1A4D2E]" />
            </div>
            <span className="text-xs font-mono font-semibold text-slate-500 uppercase">
              Active Digital Certificates
            </span>
            <div className="font-serif text-3xl font-bold text-[#1A4D2E] mt-1">
              {stats.active_certificates.toLocaleString()} Lots
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Live grain lots actively circulating in the TrueGrade verification ecosystem.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm interactive-hover" data-testid="stat-total-farmers">
            <div className="w-12 h-12 rounded-xl bg-[#E6F0EB] text-[#1A4D2E] flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-semibold text-slate-500 uppercase">
              Registered Farmers & FPOs
            </span>
            <div className="font-serif text-3xl font-bold text-[#1A4D2E] mt-1">
              {stats.total_farmers.toLocaleString()}+
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Empowered producers across Punjab, Haryana, MP, and UP.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm interactive-hover" data-testid="stat-total-lenders">
            <div className="w-12 h-12 rounded-xl bg-[#E6F0EB] text-[#1A4D2E] flex items-center justify-center mb-4">
              <Landmark className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-semibold text-slate-500 uppercase">
              Integrated Lenders
            </span>
            <div className="font-serif text-3xl font-bold text-[#1A4D2E] mt-1">
              {stats.total_lenders} Institutions
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Public sector banks, rural regional banks, and RBI-regulated NBFCs.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm interactive-hover" data-testid="stat-avg-trust-score">
            <div className="w-12 h-12 rounded-xl bg-[#E6F0EB] text-[#1A4D2E] flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-[#1A4D2E]" />
            </div>
            <span className="text-xs font-mono font-semibold text-slate-500 uppercase">
              Network Average Trust Score
            </span>
            <div className="font-serif text-3xl font-bold text-[#1A4D2E] mt-1">
              {stats.avg_trust_score} / 100
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Reflects high adherence to Codex standards with sub-0.2% defect rates.
            </p>
          </div>

        </div>

        {/* Technical Architecture Overview */}
        <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#1A4D2E] mb-6">
            Institutional Trust Architecture
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Zero-Haircut Collateral Valuation
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Traditional warehouse receipt loans apply up to 40% haircut due to unknown moisture degradation. TrueGrade's sub-millimeter optical scanning proves grain purity down to 0.05mm, allowing banks to finance up to 85% LTV safely.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Sub-60s Loan Processing Time
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                By replacing 14-day manual assayer lab visits with instantaneous digital certificates, TrueGrade eliminates distress selling at mandis and prevents predatory local moneylenders from capturing crop margins.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Tamper-Evident Geofencing
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every hardware assessment unit incorporates GPS location locks and 3-axis gyro sensors. If an inspection pod is moved outside approved Mandi geofences, automated tripwires flag certificates for institutional review.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                AGMARKNET & Mandi Benchmark Mirroring
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Price signals continuously reflect arrivals across 20+ key mandis, ensuring farmers negotiate with full transparency on today's actual spot rates rather than trader bids.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-[#E6F0EB] rounded-3xl p-8 sm:p-12 border border-[#1A4D2E]/20 text-center">
          <h3 className="font-serif text-3xl font-bold text-[#1A4D2E]">
            Empower Your Agricultural Financing Workflow
          </h3>
          <p className="mt-3 text-slate-700 text-sm max-w-xl mx-auto">
            Ready to grade your harvest or deploy capital safely into India's verified grain reserves?
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/farmer"
              className="btn-primary px-6 py-3 rounded-full text-xs font-bold shadow-md flex items-center gap-2"
              data-testid="cta-farmer-btn"
            >
              Grade Your Harvest
              <ArrowRight className="w-3.5 h-3.5 text-[#D4A373]" />
            </Link>
            <Link
              to="/lender"
              className="bg-white text-[#1A4D2E] hover:bg-slate-50 border border-[#1A4D2E]/30 px-6 py-3 rounded-full text-xs font-bold shadow-sm"
              data-testid="cta-lender-btn"
            >
              Verify Collateral
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
