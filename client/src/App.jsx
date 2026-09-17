import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MandiTicker from './components/MandiTicker';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FarmerDashboard from './pages/FarmerDashboard';
import LenderDashboard from './pages/LenderDashboard';
import TransparencyStats from './pages/TransparencyStats';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        {/* Fixed top Navbar */}
        <Navbar />
        
        {/* Mandi ticker directly beneath the fixed navbar */}
        <div className="mt-[61px]">
          <MandiTicker />
        </div>

        {/* Main Pages */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/farmer" element={<FarmerDashboard />} />
            <Route path="/lender" element={<LenderDashboard />} />
            <Route path="/transparency" element={<TransparencyStats />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}
