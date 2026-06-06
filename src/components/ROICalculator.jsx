import React, { useState } from 'react';

export default function ROICalculator() {
  const [investment, setInvestment] = useState(1500000); // $1.5M default
  const [sector, setSector] = useState('residential');
  const [holdingYears, setHoldingYears] = useState(5);

  const sectors = {
    residential: { appreciation: 0.085, yield: 0.045, premiumUplift: 0.22, label: 'Luxury Residential Estate' },
    commercial: { appreciation: 0.065, yield: 0.07, premiumUplift: 0.15, label: 'Bespoke Retail/Office' },
    multifamily: { appreciation: 0.075, yield: 0.055, premiumUplift: 0.18, label: 'Premium Multi-Family' }
  };

  const selectedSector = sectors[sector];

  // Calculations
  // Premium Uplift is the instant value added just by building a high-end architectural masterpiece (e.g. built for $1.5M, instantly valued at $1.8M due to design premium)
  const initialValue = investment * (1 + selectedSector.premiumUplift);
  
  // Future value compounded by appreciation
  const futureValue = initialValue * Math.pow(1 + selectedSector.appreciation, holdingYears);
  
  // Cumulative rental yield income over the holding years
  let totalYieldIncome = 0;
  let currentValue = initialValue;
  for (let i = 0; i < holdingYears; i++) {
    totalYieldIncome += currentValue * selectedSector.yield;
    currentValue *= (1 + selectedSector.appreciation);
  }

  const totalReturn = futureValue + totalYieldIncome;
  const netProfit = totalReturn - investment;
  const roiPercentage = (netProfit / investment) * 100;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="glowing-card" style={{ padding: '2.5rem', background: 'var(--bg-surface)' }}>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '1.5rem' }}>
        Estimate Your <span style={{ color: 'var(--accent-bronze)' }}>Investment ROI</span>
      </h3>

      {/* Sector Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.75rem' }}>
          Real Estate Sector
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {Object.keys(sectors).map((s) => (
            <button
              key={s}
              onClick={() => setSector(s)}
              style={{
                padding: '0.75rem',
                borderRadius: '12px',
                border: '1px solid ' + (sector === s ? 'var(--accent-bronze)' : 'var(--border-color)'),
                background: sector === s ? 'rgba(197, 168, 128, 0.1)' : 'transparent',
                color: sector === s ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                fontWeight: 600,
                letterSpacing: '0.05em',
                transition: 'var(--transition-fast)',
                textAlign: 'center'
              }}
            >
              {s === 'multifamily' ? 'Multi-Family' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Capital Investment Slider */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>
          <span>Capital Allocation</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{formatCurrency(investment)}</span>
        </div>
        <input
          type="range"
          min="500000"
          max="10000000"
          step="250000"
          value={investment}
          onChange={(e) => setInvestment(Number(e.target.value))}
          style={{
            width: '100%',
            accentColor: 'var(--accent-bronze)',
            background: 'var(--border-color)',
            height: '4px',
            borderRadius: '2px',
            outline: 'none'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
          <span>$500K</span>
          <span>$10M+</span>
        </div>
      </div>

      {/* Holding Period Slider */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>
          <span>Holding Period</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{holdingYears} Years</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={holdingYears}
          onChange={(e) => setHoldingYears(Number(e.target.value))}
          style={{
            width: '100%',
            accentColor: 'var(--accent-bronze)',
            background: 'var(--border-color)',
            height: '4px',
            borderRadius: '2px',
            outline: 'none'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
          <span>1 Year</span>
          <span>10 Years</span>
        </div>
      </div>

      {/* Return Metrics Dashboard */}
      <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
              Design Uplift (Value Added)
            </span>
            <span style={{ fontSize: '1rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
              +{formatCurrency(investment * selectedSector.premiumUplift)}
            </span>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
              Cumulative Yield Income
            </span>
            <span style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>
              {formatCurrency(totalYieldIncome)}
            </span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block' }}>
              Projected Net Profit
            </span>
            <span style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)', fontWeight: 600 }}>
              {formatCurrency(netProfit)}
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block' }}>
              Compounded Return
            </span>
            <span style={{ fontSize: '1.25rem', color: '#10B981', fontWeight: 700 }}>
              +{roiPercentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
