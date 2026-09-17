import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Landmark, ShieldCheck, Clock, CheckCircle2, AlertTriangle, 
  ArrowRight, Search, FileText, ExternalLink, RefreshCw,
  TrendingUp, Lock, Zap, Coins
} from 'lucide-react';

export default function LenderDashboard() {
  const [certificates, setCertificates] = useState([]);
  const [disbursements, setDisbursements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lend-Link Bridge State
  const [selectedCert, setSelectedCert] = useState(null);
  const [showBridgeModal, setShowBridgeModal] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [submittingDisbursement, setSubmittingDisbursement] = useState(false);
  const [recentApproved, setRecentApproved] = useState(null);

  // Form State for Disbursement
  const [disbursementForm, setDisbursementForm] = useState({
    bank_name: 'State Bank of India (Agri-Credit Division)',
    amount: 420000
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [certsRes, disbRes] = await Promise.all([
        axios.get('/api/certificates'),
        axios.get('/api/credit-disbursement')
      ]);

      setCertificates(certsRes.data || []);
      setDisbursements(disbRes.data || []);
    } catch (err) {
      console.error('Error fetching lender dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 60-Second Countdown timer effect
  useEffect(() => {
    let timer = null;
    if (timerActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [timerActive, countdown]);

  const handleOpenBridge = (cert) => {
    setSelectedCert(cert);
    setCountdown(60);
    setTimerActive(true);
    setShowBridgeModal(true);
    setRecentApproved(null);
  };

  const handleApproveLoan = async (e) => {
    e.preventDefault();
    if (!selectedCert) return;

    try {
      setSubmittingDisbursement(true);
      const payload = {
        bank_name: disbursementForm.bank_name,
        collateral_id: selectedCert.id,
        amount: Number(disbursementForm.amount)
      };

      const res = await axios.post('/api/credit-disbursement', payload);
      setRecentApproved(res.data);
      setTimerActive(false);
      setShowBridgeModal(false);
      fetchData();
    } catch (err) {
      alert('Disbursement failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setSubmittingDisbursement(false);
    }
  };

  return (
    <div className="noise-overlay min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-[#1A4D2E] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-mono mb-3">
              <Landmark className="w-3.5 h-3.5 text-[#D4A373]" />
              INSTITUTIONAL RISK & CREDIT ENGINE
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Banker & NBFC Portal
            </h1>
            <p className="mt-2 text-emerald-100/80 text-sm max-w-xl">
              Inspect cryptographically certified grain collateral and execute 60-second instant loan disbursements via the Lend-Link API bridge.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-2 border border-white/20"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Sync Collateral
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">

        {/* Recently Approved Callout */}
        {recentApproved && (
          <div className="mb-8 p-6 bg-emerald-50 border-2 border-emerald-500/40 rounded-2xl shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wide">
                  Collateral Pledged & Credit Disbursed!
                </span>
                <h3 className="font-serif text-xl font-bold text-emerald-950">
                  ₹{Number(recentApproved.amount).toLocaleString()} credited under {recentApproved.loan_id}
                </h3>
                <p className="text-xs text-emerald-700 mt-0.5 font-mono">
                  Bank: {recentApproved.bank_name} • Approval Latency: {recentApproved.approval_time}s • Collateral ID: {recentApproved.collateral_id}
                </p>
              </div>
            </div>
            <button
              onClick={() => setRecentApproved(null)}
              className="text-xs text-emerald-800 font-semibold px-4 py-2 bg-white rounded-lg border border-emerald-300 hover:bg-emerald-100"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* SECTION 1: VERIFY COLLATERAL CARDS */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1A4D2E]">
                Active Mandi Collateral Pool
              </h2>
              <p className="text-xs text-slate-500">
                Pre-tested grain lots with live optical telemetry ready for institutional financing
              </p>
            </div>
            <div className="text-xs font-mono text-slate-600 bg-white px-3.5 py-1.5 rounded-full border border-slate-200">
              Verified Lots Available: <strong className="text-[#1A4D2E]">{certificates.length}</strong>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16 text-slate-400 font-mono text-sm">
              Loading verified collateral pool...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => {
                const isGradeA = cert.grade.includes('A');
                return (
                  <div
                    key={cert.id}
                    className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm interactive-hover flex flex-col justify-between"
                    data-testid={`collateral-${cert.id}`}
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 block uppercase">
                            {cert.id}
                          </span>
                          <h3 className="font-serif text-xl font-bold text-slate-900 mt-0.5">
                            {cert.grain_type}
                          </h3>
                          <span className="text-xs text-slate-500 font-mono">Lot: {cert.batch_id}</span>
                        </div>
                        <div className="text-right">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                            isGradeA ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            Grade {cert.grade}
                          </span>
                          <div className="text-[11px] font-mono text-[#1A4D2E] font-bold mt-1">
                            Trust: {cert.trust_score}/100
                          </div>
                        </div>
                      </div>

                      {/* Technical Specs */}
                      <div className="bg-[#F9F9F7] p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5 font-mono">
                        <div className="flex justify-between text-slate-600">
                          <span>Farmer:</span>
                          <span className="font-sans font-semibold text-slate-900">{cert.farmer_name}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Mandi Location:</span>
                          <span className="font-sans text-slate-800">{cert.location}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Moisture / Protein:</span>
                          <span className="text-slate-900 font-bold">{cert.sensor_data?.moisture}% / {cert.sensor_data?.protein}%</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Infestation Count:</span>
                          <span className="text-emerald-700 font-bold">{cert.sensor_data?.infestation}% (Clean)</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-emerald-700 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Audit Verified
                      </span>
                      <button
                        onClick={() => handleOpenBridge(cert)}
                        className="btn-primary text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm"
                        data-testid={`verify-collateral-btn-${cert.id}`}
                      >
                        <Zap className="w-3.5 h-3.5 text-[#D4A373]" />
                        Lend-Link Bridge
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 2: CREDIT DISBURSEMENT STATUS & AUDIT LOG */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1A4D2E]">
                Credit Disbursement Status
              </h2>
              <p className="text-xs text-slate-500">
                Real-time ledger of institutional capital disbursed against TrueGrade grain collateral
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              CORE BANKING API ACTIVE
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F9F9F7] text-slate-600 uppercase font-mono tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Disbursement ID</th>
                  <th className="py-3 px-4">Financial Institution</th>
                  <th className="py-3 px-4">Collateral Ref</th>
                  <th className="py-3 px-4">Loan Principal</th>
                  <th className="py-3 px-4">Approval Latency</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {disbursements.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50 transition-colors" data-testid={`disbursement-${d.id}`}>
                    <td className="py-3 px-4 font-bold text-slate-900">{d.loan_id}</td>
                    <td className="py-3 px-4 font-sans font-medium text-slate-800">{d.bank_name}</td>
                    <td className="py-3 px-4 text-slate-500">{d.collateral_id}</td>
                    <td className="py-3 px-4 font-bold text-[#1A4D2E]">₹{Number(d.amount).toLocaleString()}</td>
                    <td className="py-3 px-4 text-emerald-700">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {d.approval_time || 45} seconds
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {d.status || 'Approved'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* LEND-LINK API BRIDGE MODAL WITH 60-SECOND COUNTDOWN */}
      {showBridgeModal && selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border-2 border-[#E2E8F0] animate-in fade-in zoom-in-95 duration-200"
            data-testid="lend-link-bridge"
          >
            {/* Modal Top Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1A4D2E] text-white flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-[#D4A373]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1A4D2E]">
                    Lend-Link API Bridge
                  </h3>
                  <span className="text-xs font-mono text-slate-500">
                    60-Second Collateral Evaluation & Disbursement
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowBridgeModal(false);
                  setTimerActive(false);
                }}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Precision Collateral Snapshot */}
            <div className="mt-5 p-4 bg-[#F9F9F7] rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">COLLATERAL BATCH:</span>
                <span className="font-bold text-slate-900">{selectedCert.batch_id} ({selectedCert.grain_type})</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">TRUST RATING:</span>
                <span className="font-bold text-emerald-700">Grade {selectedCert.grade} • {selectedCert.trust_score}/100</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">FARMER & MANDI:</span>
                <span className="text-slate-800">{selectedCert.farmer_name} • {selectedCert.location}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">OPTICAL TELEMETRY:</span>
                <span className="text-slate-800">Moisture: {selectedCert.sensor_data?.moisture}% | Protein: {selectedCert.sensor_data?.protein}%</span>
              </div>
            </div>

            {/* The 60-Second Countdown Meter */}
            <div className="my-6 p-5 bg-[#E6F0EB] rounded-2xl border border-[#1A4D2E]/20 text-center">
              <span className="text-xs font-mono font-bold text-[#1A4D2E] uppercase tracking-wider block mb-1">
                Lend-Link Real-Time Approval SLA
              </span>
              <div className="font-mono text-5xl font-extrabold tracking-tight text-[#1A4D2E]">
                <span className={countdown <= 15 ? 'text-rose-600 animate-pulse' : countdown <= 30 ? 'text-amber-600' : 'text-[#1A4D2E]'}>
                  00:{countdown < 10 ? `0${countdown}` : countdown}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-sans mt-1">
                {countdown > 0 ? 'Live bank risk decision lock active.' : 'Session timeout. Please reset verification.'}
              </p>
            </div>

            {/* Approval Form */}
            <form onSubmit={handleApproveLoan} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Bank / NBFC Name
                </label>
                <input
                  type="text"
                  required
                  value={disbursementForm.bank_name}
                  onChange={(e) => setDisbursementForm({ ...disbursementForm, bank_name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-[#1A4D2E] focus:outline-none"
                  data-testid="bank-name-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  Sanction Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  min="10000"
                  step="5000"
                  value={disbursementForm.amount}
                  onChange={(e) => setDisbursementForm({ ...disbursementForm, amount: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-mono font-bold text-[#1A4D2E] focus:ring-2 focus:ring-[#1A4D2E] focus:outline-none"
                  data-testid="loan-amount-input"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowBridgeModal(false)}
                  className="px-5 py-2.5 rounded-full border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingDisbursement || countdown === 0}
                  className="btn-primary px-6 py-2.5 rounded-full text-xs font-bold shadow-md flex items-center gap-2"
                  data-testid="approve-disbursement-btn"
                >
                  <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
                  {submittingDisbursement ? 'Executing Disbursement...' : 'Execute Instant Disbursement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
