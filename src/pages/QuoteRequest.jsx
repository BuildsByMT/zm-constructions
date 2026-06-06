import React, { useState, useEffect } from 'react';
import { Landmark, ArrowRight, ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function QuoteRequest({ prefilledState, onNavigate }) {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('residential');
  const [budget, setBudget] = useState(2500000); // $2.5M default
  const [timeline, setTimeline] = useState('standard');
  const [contactData, setContactData] = useState({ name: '', email: '', phone: '', location: '' });
  const [submitted, setSubmitted] = useState(false);

  // Prefill state if coming from CostCalculator
  useEffect(() => {
    if (prefilledState) {
      if (prefilledState.type) setProjectType(prefilledState.type);
      if (prefilledState.size && prefilledState.tier) {
        // Calculate prefilled budget
        const pricing = { residential: 480, commercial: 600, renovation: 280 };
        const rate = pricing[prefilledState.type] || 400;
        setBudget(prefilledState.size * rate);
      }
    }
  }, [prefilledState]);

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contactData.name && contactData.email && contactData.location) {
      setSubmitted(true);
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      <div 
        className="glowing-card" 
        style={{
          width: '90%',
          maxWidth: '650px',
          background: 'var(--bg-surface)',
          padding: '3rem',
          margin: '2rem 0',
          position: 'relative'
        }}
      >
        {/* Step Indicator */}
        {!submitted && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <span>Step {step} of 4</span>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {[1, 2, 3, 4].map((s) => (
                <div 
                  key={s} 
                  style={{
                    width: '30px',
                    height: '3px',
                    background: s <= step ? 'var(--accent-bronze)' : 'var(--border-color)',
                    transition: 'var(--transition-fast)'
                  }} 
                />
              ))}
            </div>
          </div>
        )}

        {submitted ? (
          /* Submission Completed Screen */
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', marginBottom: '0.75rem' }}>
              Commission Initiated
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', maxWidth: '450px', margin: '0 auto 2.5rem auto' }}>
              Thank you, {contactData.name}. ZM Constructions' structural directors have registered your build coordinates for {contactData.location}. A formal feasibility audit will begin within 24 hours.
            </p>
            <button 
              className="border-beam-btn" 
              onClick={() => onNavigate('home')}
              style={{ padding: '0.85rem 2.5rem', fontSize: '0.8rem' }}
            >
              Return Home
            </button>
          </div>
        ) : (
          /* Multi-step Form Wizard */
          <form onSubmit={handleSubmit}>
            
            {/* STEP 1: Project Type */}
            {step === 1 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Select Project <span style={{ color: 'var(--accent-bronze)' }}>Category</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '2.5rem' }}>
                  What structural class of building do you intend to commission?
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  {[
                    { id: 'residential', label: 'Residential Estate', desc: 'Bespoke mega-estates and coastal villas' },
                    { id: 'commercial', label: 'Commercial Horizon', desc: 'Sleek corporate offices and landmarks' },
                    { id: 'renovation', label: 'Luxury Renovation', desc: 'Complete layout restoration work' },
                    { id: 'interior', label: 'Interior Fit-Out', desc: 'Custom joinery and space systems' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setProjectType(p.id)}
                      style={{
                        padding: '1.5rem',
                        borderRadius: '16px',
                        border: '1px solid ' + (projectType === p.id ? 'var(--accent-bronze)' : 'var(--border-color)'),
                        background: projectType === p.id ? 'rgba(197, 168, 128, 0.08)' : 'transparent',
                        textAlign: 'left',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      <h3 style={{ fontSize: '1rem', color: projectType === p.id ? 'var(--accent-gold)' : 'var(--text-primary)', fontWeight: 600, marginBottom: '0.25rem' }}>{p.label}</h3>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{p.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Budget selection */}
            {step === 2 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Target Capital <span style={{ color: 'var(--accent-bronze)' }}>Allocation</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '2.5rem' }}>
                  Slide to select your projected investment budget for this build.
                </p>
                
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <span style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)', fontWeight: 600 }}>
                    {formatCurrency(budget)}
                  </span>
                </div>

                <input
                  type="range"
                  min="500000"
                  max="15000000"
                  step="250000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: 'var(--accent-bronze)',
                    background: 'var(--border-color)',
                    height: '4px',
                    borderRadius: '2px',
                    outline: 'none',
                    marginBottom: '1rem'
                  }}
                />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <span>$500K</span>
                  <span>$15M+</span>
                </div>
              </div>
            )}

            {/* STEP 3: Timeline selector */}
            {step === 3 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Construction <span style={{ color: 'var(--accent-bronze)' }}>Schedule</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '2.5rem' }}>
                  Which engineering handoff target aligns with your goals?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { id: 'fast', label: 'Fast-Track Smart Schedule', desc: 'Pre-fabricated structural grids and double shifts to reduce standard luxury timelines by 25%.' },
                    { id: 'standard', label: 'Standard Luxury Timeline', desc: 'Methodical execution, materials curing periods, and standard architectural checkpoints.' },
                    { id: 'stage', label: 'Multi-stage Development', desc: 'Multi-phase construction (structural foundation first, interior styling spaced out over years).' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTimeline(t.id)}
                      style={{
                        padding: '1.5rem',
                        borderRadius: '16px',
                        border: '1px solid ' + (timeline === t.id ? 'var(--accent-bronze)' : 'var(--border-color)'),
                        background: timeline === t.id ? 'rgba(197, 168, 128, 0.08)' : 'transparent',
                        textAlign: 'left',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      <h3 style={{ fontSize: '1rem', color: timeline === t.id ? 'var(--accent-gold)' : 'var(--text-primary)', fontWeight: 600, marginBottom: '0.4rem' }}>{t.label}</h3>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Contact details */}
            {step === 4 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Commission <span style={{ color: 'var(--accent-bronze)' }}>Credentials</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '2rem' }}>
                  Review your quote and enter your site details to submit the commission.
                </p>

                {/* Live pricing estimation card */}
                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '16px', marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Estimate Summary</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    <span>Project Type:</span>
                    <span style={{ textTransform: 'uppercase', fontWeight: 600 }}>{projectType}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    <span>Target Budget:</span>
                    <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{formatCurrency(budget)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span>Timeline Strategy:</span>
                    <span style={{ textTransform: 'uppercase', fontWeight: 600 }}>{timeline}</span>
                  </div>
                </div>

                {/* Form fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>Full Name</label>
                      <input
                        type="text"
                        required
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>Email</label>
                      <input
                        type="email"
                        required
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>Phone</label>
                      <input
                        type="tel"
                        required
                        value={contactData.phone}
                        onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>Site Coordinates / Zip Code</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aspen, CO 81611"
                        value={contactData.location}
                        onChange={(e) => setContactData({ ...contactData, location: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <ArrowLeft size={14} /> Back
                </button>
              ) : (
                <div />
              )}
              
              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="border-beam-btn"
                  style={{ padding: '0.75rem 2rem', fontSize: '0.75rem' }}
                >
                  Continue <ArrowRight size={12} style={{ marginLeft: '0.4rem' }} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="border-beam-btn"
                  style={{ padding: '0.85rem 2.5rem', fontSize: '0.75rem' }}
                >
                  Submit Commission
                </button>
              )}
            </div>

          </form>
        )}
      </div>

    </div>
  );
}
