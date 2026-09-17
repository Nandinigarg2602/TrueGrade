import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MandiTicker() {
  const defaultPrices = [
    { grain_type: 'Wheat', mandi: 'Punjab Mandi', price: 2355.86, change_percent: 3.68 },
    { grain_type: 'Rice', mandi: 'Bihar Mandi', price: 2605.31, change_percent: 4.85 },
    { grain_type: 'Wheat', mandi: 'UP Mandi', price: 2129.12, change_percent: -2.11 },
    { grain_type: 'Wheat', mandi: 'Bihar Mandi', price: 2131.09, change_percent: -3.33 },
    { grain_type: 'Maize', mandi: 'Bihar Mandi', price: 1845.50, change_percent: 1.42 },
    { grain_type: 'Rice', mandi: 'Punjab Mandi', price: 2710.20, change_percent: -0.85 },
    { grain_type: 'Maize', mandi: 'UP Mandi', price: 1912.40, change_percent: 2.15 },
    { grain_type: 'Wheat', mandi: 'Delhi Mandi', price: 2280.00, change_percent: 1.12 }
  ];

  const [prices, setPrices] = useState(defaultPrices);

  useEffect(() => {
    let isMounted = true;
    const fetchPrices = async () => {
      try {
        const res = await axios.get('/api/market-prices');
        if (isMounted && Array.isArray(res.data) && res.data.length > 0) {
          setPrices(res.data);
        }
      } catch (err) {
        console.warn('Using default ticker feed:', err.message);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 12000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const safePrices = Array.isArray(prices) && prices.length > 0 ? prices : defaultPrices;
  const tickerItems = [...safePrices, ...safePrices, ...safePrices];

  return (
    <div 
      className="w-full bg-[#E6F0EB] border-y border-[#1A4D2E]/20 py-2.5 overflow-hidden select-none"
      data-testid="mandi-ticker"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {tickerItems.map((item, index) => {
          if (!item || typeof item !== 'object') return null;
          const price = Number(item.price) || 2200;
          const change = Number(item.change_percent) || 0;
          const isPositive = change >= 0;

          return (
            <div key={index} className="flex items-center text-xs sm:text-sm font-medium text-slate-800 px-6">
              <span className="font-semibold mr-1">{item.grain_type || 'Wheat'}</span>
              <span className="text-gray-500 text-xs mr-2">@{item.mandi || 'Mandi'}</span>
              <span className="font-bold mr-2 text-slate-900 font-mono">
                ₹{price.toFixed(2)}/qtl
              </span>
              <span className={`flex items-center text-xs font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                {isPositive ? (
                  <TrendingUp className="w-3.5 h-3.5 mr-0.5 inline" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 mr-0.5 inline" />
                )}
                {Math.abs(change)}%
              </span>
              <span className="text-gray-400 ml-6">|</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
