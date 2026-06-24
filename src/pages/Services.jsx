import React, { useState } from 'react';
import CostCalculator from '../components/CostCalculator';
import ROICalculator from '../components/ROICalculator';
import { Shield, Hammer, Compass, Landmark, HardHat, Sparkles, MapPin, DollarSign, Activity } from 'lucide-react';
import { safeMerge } from '../utils/security';

export default function Services({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('residential');

  // Customizer state
  const [customizer, setCustomizer] = useState({ marbleRatio: 40, woodRatio: 30, steelRatio: 30 });
  const [amortization, setAmortization] = useState(false);

  const servicesData = {
    residential: {
      title: 'Residential Estates',
      desc: 'We design and engineer bespoke luxury residences, coastal mansions, and private compounds. From seismic-resistant structural foundations to custom glass curtain walls, we deliver estates built to stand for centuries.',
      specs: ['Custom steel-reinforced foundations', 'Imported luxury stone facades', 'Integrated off-grid solar arrays', 'High-performance thermal glass systems'],
      icon: Landmark,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
    },
    commercial: {
      title: 'Commercial Horizons',
      desc: 'Flagship commercial buildings, boutique creative offices, and high-end retail hubs. We focus on LEED Platinum credentials, modern structural framing systems, and striking geometric facades.',
      specs: ['LEED certified concrete mixes', 'Integrated smart climate monitoring', 'Architectural steel geometric bracing', 'Dynamic tinting exterior glass walls'],
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
    },
    renovation: {
      title: 'Luxury Renovations',
      desc: 'Restoring historical structures or transforming mid-century properties into modern architectural marvels. We execute complete layout overrides, structural enforcement, and mechanical upgrades.',
      specs: ['Historic mortar replication', 'Complete structural layout alterations', 'Hidden HVAC linear diffusers', 'Integrated high-fidelity acoustic layers'],
      icon: Hammer,
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800'
    },
    interior: {
      title: 'Interior Fit-Out',
      desc: 'Custom-tailored architectural millwork, bespoke lighting rigs, hidden panels, and integrated sound systems. We treat interiors with the exact same engineering detail as the external skeleton.',
      specs: ['Concealed hinge premium millwork', 'DALI automated lighting grids', 'Acoustically isolated ceiling systems', 'Luxury metalwork and trim joins'],
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800'
    },
    project: {
      title: 'Project Management',
      desc: 'Absolute general contracting oversight. Our certified construction managers coordinate all trades, handle material verification, audit ledgers, and manage schedules via digital coordinate models.',
      specs: ['Daily ledger updates via client app', 'Continuous material audits on-site', 'BIM coordinate mapping', 'Strict sub-trade certification gating'],
      icon: HardHat,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'
    },
    design: {
      title: 'Design Consultation',
      desc: 'Coordinating blueprints with elite architects globally. We provide structural feasibility reports, detailing optimization, and mock material testing inside our verification chambers.',
      specs: ['3D digital structural loading checks', 'Custom stone chemical analysis', 'Window wind-load wind tunnel audits', 'Value-engineering cost modeling'],
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800'
    }
  };

  const currentService = servicesData[activeTab];
  const IconC = currentService.icon;

  // Materials Map coordinates
  const sourcingCoordinates = [
    { name: 'Carrara Marble', location: 'Carrara, Italy', type: 'Stone quarry', coords: '44.0792° N, 10.0984° E' },
    { name: 'Weathering Alloy', location: 'Luleå, Sweden', type: 'Smelting works', coords: '65.5848° N, 22.1567° E' },
    { name: 'German Oak', location: 'Schwarzwald, Germany', type: 'Timber reserves', coords: '48.0645° N, 8.2198° E' }
  ];

  // Customizer calculations - secure merging demonstration
  const handleRatioChange = (key, value) => {
    // Prevent Prototype Pollution by merging config cleanly
    const updatedRatio = safeMerge({}, customizer);
    updatedRatio[key] = Math.max(0, Math.min(100, Number(value)));
    setCustomizer(updatedRatio);
  };

  const calculatedPremium = (customizer.marbleRatio * 150) + (customizer.woodRatio * 90) + (customizer.steelRatio * 120);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div style={{ paddingTop: '100px' }}>
      
      {/* Header */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <span className="section-subtitle">SERVICES & CAPABILITIES</span>
        <h1 className="hero-title" style={{ fontSize: '4.5rem' }}>
          Uncompromising <span className="shiny-text">Building Sciences</span>
        </h1>
        <p className="hero-desc" style={{ maxWidth: '650px' }}>
          From initial structural design consults to delivery handoff, ZM Constructions manages general contracting with absolute precision and luxury finishes.
        </p>
      </section>

      {/* Interactive Tabs Showcase */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        
        {/* Tab Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '4rem' }}>
          {Object.keys(servicesData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '1rem',
                borderRadius: '16px',
                border: '1px solid ' + (activeTab === tab ? 'var(--accent-bronze)' : 'var(--border-color)'),
                background: activeTab === tab ? 'rgba(197, 168, 128, 0.1)' : 'transparent',
                color: activeTab === tab ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                fontWeight: 600,
                letterSpacing: '0.05em',
                transition: 'var(--transition-fast)'
              }}
            >
              {servicesData[tab].title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div className="parallax-container" style={{ height: '400px' }}>
            <img 
              src={currentService.image} 
              alt={currentService.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(197, 168, 128, 0.1)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconC size={20} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', fontWeight: 500 }}>
                {currentService.title}
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.75', marginBottom: '2rem' }}>
              {currentService.desc}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)' }}>Specifications include:</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {currentService.specs.map((spec, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-bronze)' }} />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* NEW FEATURE: MATERIAL CUSTOMIZER & SOURCING COORDINATES MAP */}
      <section ref={addToRefs} className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* Customizer */}
          <div className="client-portal-card glowing-card" style={{ padding: '2.5rem' }}>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent-gold)' }}>Configurator Widget</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', margin: '0.5rem 0 1.5rem 0' }}>Bespoke Material Mix</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <span>Stone / Marble Ratio</span>
                  <span>{customizer.marbleRatio}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={customizer.marbleRatio}
                  onChange={(e) => handleRatioChange('marbleRatio', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--accent-bronze)', height: '4px', background: 'var(--border-color)', borderRadius: '2px', outline: 'none' }}
                />
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <span>Oak Wood Ratio</span>
                  <span>{customizer.woodRatio}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={customizer.woodRatio}
                  onChange={(e) => handleRatioChange('woodRatio', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--accent-bronze)', height: '4px', background: 'var(--border-color)', borderRadius: '2px', outline: 'none' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <span>Alloy Steel Ratio</span>
                  <span>{customizer.steelRatio}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={customizer.steelRatio}
                  onChange={(e) => handleRatioChange('steelRatio', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--accent-bronze)', height: '4px', background: 'var(--border-color)', borderRadius: '2px', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Calculated Material Premium</span>
              <span style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)', fontWeight: 600 }}>
                {formatCurrency(calculatedPremium)}
              </span>
            </div>
          </div>

          {/* Sourcing Map Coordinates */}
          <div>
            <span className="section-subtitle">GLOBAL AUDITING</span>
            <h2 className="section-title">Quarry-to-Site <span>Tracing</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.75', margin: '1.5rem 0' }}>
              We track the origin coordinates of all primary structural elements. Our logistical pipeline guarantees authentic material handoffs.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {sourcingCoordinates.map((coord, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                  <MapPin size={18} style={{ color: 'var(--accent-bronze)' }} />
                  <div>
                    <h5 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{coord.name}</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{coord.location} ({coord.coords})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Calculators Section */}
      <section className="section">
        <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 4rem auto' }}>
          <span className="section-subtitle">INVESTMENT MODELING</span>
          <h2 className="section-title">Analyze Your <span>Investment</span></h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '600px', margin: '1rem auto 0 auto' }}>
            We provide absolute financial transparency. Estimate construction schedules and budgets, and analyze the projected asset valuation appreciation over time.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          <CostCalculator onNavigate={onNavigate} />
          <div>
            <ROICalculator />
            
            {/* NEW FEATURE: AMORTIZATION RETURNS SCHEDULE */}
            <div style={{ marginTop: '2rem' }}>
              <button
                onClick={() => setAmortization(!amortization)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-surface)',
                  color: 'var(--accent-gold)',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Activity size={16} /> {amortization ? 'Hide Amortization Table' : 'Inspect Amortization returns schedule'}
              </button>
              
              {amortization && (
                <div style={{
                  marginTop: '1rem',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  overflowX: 'auto'
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                        <th style={{ padding: '8px' }}>Year</th>
                        <th style={{ padding: '8px' }}>Appreciation Value</th>
                        <th style={{ padding: '8px' }}>Rental Yield</th>
                        <th style={{ padding: '8px' }}>Cumulative Return</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map((year) => (
                        <tr key={year} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                          <td style={{ padding: '8px', color: 'var(--text-primary)', fontWeight: 600 }}>Year {year}</td>
                          <td style={{ padding: '8px' }}>+{formatCurrency(1500000 * 0.085 * year)}</td>
                          <td style={{ padding: '8px' }}>{formatCurrency(1500000 * 0.045 * year)}</td>
                          <td style={{ padding: '8px', color: '#10B981' }}>{formatCurrency(1500000 * 0.13 * year)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        </div>

        <style>{`
          @media (max-width: 480px) {
            .section div[style*="minmax(400px"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

    </div>
  );
}
