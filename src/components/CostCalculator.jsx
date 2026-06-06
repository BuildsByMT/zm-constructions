import React, { useState } from 'react';

export default function CostCalculator({ onNavigate }) {
  const [projectType, setProjectType] = useState('residential');
  const [tier, setTier] = useState('ultra');
  const [size, setSize] = useState(3500);

  const pricingModels = {
    residential: {
      premium: { cost: 320, timeFactor: 0.003, materials: 'Italian Marble, Engineered White Oak, Smart Automation' },
      ultra: { cost: 480, timeFactor: 0.004, materials: 'Bespoke Quartzite, Sub-Zero & Wolf Appliances, Custom Glass Facades' },
      bespoke: { cost: 750, timeFactor: 0.005, materials: 'Imported Travertine, Solar Roof Tiles, Thermally Broken Steel Framed Windows' }
    },
    commercial: {
      premium: { cost: 400, timeFactor: 0.002, materials: 'Grade-A Structural Steel, High-Performance Curtain Walls' },
      ultra: { cost: 600, timeFactor: 0.003, materials: 'Leed Platinum Concrete, Smart Climate Panels, Dynamic Electrophoto Glass' },
      bespoke: { cost: 900, timeFactor: 0.004, materials: 'Carbon-Neutral Composites, Custom Geometric Bracing, Integrated Microgrids' }
    },
    renovation: {
      premium: { cost: 180, timeFactor: 0.002, materials: 'Premium Plaster finishes, Smart LED arrays, Soundproof drywall' },
      ultra: { cost: 280, timeFactor: 0.003, materials: 'Tailored joinery, Hidden architectural vents, Smart dimming hubs' },
      bespoke: { cost: 450, timeFactor: 0.004, materials: 'Historic restoration mortar, Solid bronze hardware, Structural layout alterations' }
    }
  };

  const selectedModel = pricingModels[projectType][tier];
  const totalCostMin = size * selectedModel.cost * 0.9;
  const totalCostMax = size * selectedModel.cost * 1.15;
  const estimatedMonths = Math.max(6, Math.round(10 + (size * selectedModel.timeFactor)));

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
        Estimate Your <span style={{ color: 'var(--accent-bronze)' }}>Project Cost</span>
      </h3>
      
      {/* Project Type */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.75rem' }}>
          Select Project Category
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {['residential', 'commercial', 'renovation'].map((type) => (
            <button
              key={type}
              onClick={() => setProjectType(type)}
              style={{
                padding: '0.75rem',
                borderRadius: '12px',
                border: '1px solid ' + (projectType === type ? 'var(--accent-bronze)' : 'var(--border-color)'),
                background: projectType === type ? 'rgba(197, 168, 128, 0.1)' : 'transparent',
                color: projectType === type ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                fontWeight: 600,
                letterSpacing: '0.05em',
                transition: 'var(--transition-fast)',
                textAlign: 'center'
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Luxury Quality Tier */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.75rem' }}>
          Luxury Craftsmanship Tier
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {[
            { id: 'premium', label: 'Premium Luxury' },
            { id: 'ultra', label: 'Ultra Luxury' },
            { id: 'bespoke', label: 'Bespoke Estate' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTier(t.id)}
              style={{
                padding: '0.75rem',
                borderRadius: '12px',
                border: '1px solid ' + (tier === t.id ? 'var(--accent-bronze)' : 'var(--border-color)'),
                background: tier === t.id ? 'rgba(197, 168, 128, 0.1)' : 'transparent',
                color: tier === t.id ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                fontWeight: 600,
                letterSpacing: '0.05em',
                transition: 'var(--transition-fast)',
                textAlign: 'center'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Project Size Slider */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>
          <span>Project Scope (Size)</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{size.toLocaleString()} SQ. FT.</span>
        </div>
        <input
          type="range"
          min="1000"
          max="20000"
          step="250"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
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
          <span>1,000 SQ FT</span>
          <span>20,000 SQ FT</span>
        </div>
      </div>

      {/* Calculation Display */}
      <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '16px', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Estimated Cost Range</span>
          <span style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)', fontWeight: 600 }}>
            {formatCurrency(totalCostMin)} - {formatCurrency(totalCostMax)}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Projected Timeline</span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
            ~{estimatedMonths} Months
          </span>
        </div>
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
            Featured Material Palette
          </span>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: 1.5 }}>
            {selectedModel.materials}
          </p>
        </div>
      </div>

      {/* CTA Button with Border Beam look */}
      <button 
        className="border-beam-btn" 
        onClick={() => onNavigate('quote-request', { type: projectType, tier: tier, size: size })}
        style={{ width: '100%', padding: '1.1rem 0' }}
      >
        Lock In Luxury Estimate
      </button>
    </div>
  );
}
