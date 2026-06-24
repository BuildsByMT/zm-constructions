import React, { useState } from 'react';
import { ShieldCheck, GraduationCap, Heart, Clock, X, ArrowUpRight, Landmark } from 'lucide-react';
import { sanitizeString, validateEmail } from '../utils/security';

export default function Careers() {
  const [activeJob, setActiveJob] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', portfolio: '', resume: '' });

  const jobs = [
    { id: 1, title: 'Senior Project Director', dept: 'Operations', loc: 'Beverly Hills, CA', desc: 'Overriding on-site contractor scheduling, managing material quality verification checks, and maintaining architectural client reporting. Requires 8+ years luxury residential experience.' },
    { id: 2, title: 'Lead Structural Coordinator', dept: 'Engineering', loc: 'New York, NY', desc: 'Coordinating caisson drilling, foundation pours, loading calculations, and wind/seismic zoning clearances. Experience with high-rise or cliffside structures is mandatory.' },
    { id: 3, title: 'Bespoke Finishing Joiner', dept: 'Craftsmanship', loc: 'Aspen, CO', desc: 'Handcrafting luxury millwork, pivoting door fittings, and conceallable structural cabinets. Requires absolute zero-tolerance precision and extensive woodcraft background.' }
  ];

  const handleFormChange = (key, value) => {
    const clean = sanitizeString(value);
    setFormData(prev => ({ ...prev, [key]: clean }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setFormError('Invalid email coordinates format. Submission blocked.');
      return;
    }
    if (formData.name && formData.email) {
      setFormSubmitted(true);
      setFormError('');
      setFormData({ name: '', email: '', portfolio: '', resume: '' });
    }
  };

  return (
    <div style={{ paddingTop: '100px' }}>
      
      {/* Header */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <span className="section-subtitle">JOIN THE MASTER BUILDERS</span>
        <h1 className="hero-title" style={{ fontSize: '4.5rem' }}>
          Crafting the Future of <span className="shiny-text">Architecture</span>
        </h1>
        <p className="hero-desc" style={{ maxWidth: '650px' }}>
          At ZM Constructions, we hire detail-obsessed engineers, designers, and artisans who believe construction is an art form.
        </p>
      </section>

      {/* Benefits / Culture */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 4rem auto' }}>
          <span className="section-subtitle">THE ZM STANDARD</span>
          <h2 className="section-title">Why Build <span>With Us</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {[
            { title: 'Top-tier Compensation', desc: 'Industry-leading salary structures, performance bonuses, and complete health coverage.', icon: ShieldCheck },
            { title: 'Bespoke Tooling', desc: 'Work with state-of-the-art coordinate models, virtual simulations, and high-fidelity testing labs.', icon: GraduationCap },
            { title: 'Artistic Freedom', desc: 'We execute custom bespoke designs. No cookie-cutter commercial strips or template builds.', icon: Heart },
            { title: 'Flexible Lifestyle', desc: 'Generous paid leave, project milestone bonuses, and wellness allowances.', icon: Clock }
          ].map((benefit, idx) => {
            const IconC = benefit.icon;
            return (
              <div key={idx} style={{ padding: '2rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '20px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(197, 168, 128, 0.1)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <IconC size={18} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', marginBottom: '0.75rem', fontWeight: 600 }}>{benefit.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>{benefit.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Open Positions List */}
      <section className="section">
        <div className="section-header">
          <span className="section-subtitle">AVAILABLE COMMISSIONS</span>
          <h2 className="section-title">Open <span>Positions</span></h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {jobs.map((job) => (
            <div 
              key={job.id}
              style={{
                padding: '2.5rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '2rem'
              }}
            >
              <div style={{ maxWidth: '700px' }}>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent-bronze)', fontWeight: 600, letterSpacing: '0.05em' }}>
                  {job.dept} • {job.loc}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginTop: '0.25rem', marginBottom: '0.75rem', fontWeight: 500 }}>
                  {job.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {job.desc}
                </p>
              </div>
              <button 
                className="border-beam-btn"
                onClick={() => setActiveJob(job)}
                style={{ padding: '0.75rem 1.75rem', fontSize: '0.7rem' }}
              >
                Apply Now <ArrowUpRight size={12} style={{ marginLeft: '0.4rem' }} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Application Drawer Modal */}
      {activeJob && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '550px',
            height: '100%',
            background: 'var(--bg-base)',
            borderLeft: '1px solid var(--border-color)',
            padding: '3rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
              <div className="nav-logo">
                <Landmark size={20} style={{ color: 'var(--accent-bronze)' }} />
                <span>ZM JOINERY</span>
              </div>
              <button 
                onClick={() => { setActiveJob(null); setFormSubmitted(false); }}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              Apply for {activeJob.title}
            </h3>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-bronze)', display: 'block', marginBottom: '2rem' }}>
              {activeJob.dept} • {activeJob.loc}
            </span>

            {formSubmitted ? (
              <div style={{ textAlign: 'center', margin: 'auto 0', padding: '2rem 0' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                  <ShieldCheck size={32} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Submission Received</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', maxWidth: '320px', margin: '0 auto' }}>
                  Thank you for applying. Our engineering directors will review your coordinates and contact you shortly.
                </p>
                <button 
                  className="border-beam-btn" 
                  onClick={() => { setActiveJob(null); setFormSubmitted(false); }}
                  style={{ marginTop: '2rem', padding: '0.75rem 2rem', fontSize: '0.75rem' }}
                >
                  Close Drawer
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {formError && <span style={{ color: '#EF4444', fontSize: '0.75rem' }}>{formError}</span>}
                <div>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
                  <input
                    type="text"
                    required
                    maxLength={128}
                    value={formData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Email Coordinates</label>
                  <input
                    type="email"
                    required
                    maxLength={128}
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Portfolio Link (GitHub, Behance, etc.)</label>
                  <input
                    type="url"
                    maxLength={128}
                    value={formData.portfolio}
                    onChange={(e) => handleFormChange('portfolio', e.target.value)}
                    style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Resume/CV Coordinates (Text Paste / Link)</label>
                  <textarea
                    rows={4}
                    required
                    maxLength={500}
                    placeholder="Describe your engineering credentials or paste a link..."
                    value={formData.resume}
                    onChange={(e) => handleFormChange('resume', e.target.value)}
                    style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)', resize: 'none' }}
                  />
                </div>
                <button 
                  type="submit" 
                  className="border-beam-btn" 
                  style={{ width: '100%', padding: '1rem 0', marginTop: '1.5rem' }}
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
