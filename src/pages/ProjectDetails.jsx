import React, { useEffect } from 'react';
import { Calendar, MapPin, Ruler, ShieldAlert, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ProjectDetails({ onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '80px' }}>
      
      {/* Back to Projects */}
      <div style={{ width: '90%', maxWidth: '1200px', margin: '2rem auto 0 auto' }}>
        <button 
          onClick={() => onNavigate('projects')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} /> Back to portfolio
        </button>
      </div>

      {/* Hero Section */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        <span className="section-subtitle">PROJECT CASE STUDY</span>
        <h1 className="hero-title" style={{ fontSize: '4.5rem' }}>
          Villa <span className="shiny-text">Obsidian</span>
        </h1>
        <p className="hero-desc" style={{ maxWidth: '700px' }}>
          A bespoke 14,000 square-foot residential estate carved into the cliffs of Beverly Hills, merging structural steel framework with expansive travertine columns.
        </p>

        {/* Project Metadata */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginTop: '3rem',
          padding: '2rem 0',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}><MapPin size={12} style={{ marginRight: '4px' }} /> Location</span>
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Beverly Hills, California</span>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}><Ruler size={12} style={{ marginRight: '4px' }} /> Scale</span>
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>14,000 SQ. FT.</span>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}><Calendar size={12} style={{ marginRight: '4px' }} /> Timeline</span>
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>18 Months (Handoff 2025)</span>
          </div>
        </div>
      </section>

      {/* Flagship Hero Image */}
      <section style={{ width: '90%', maxWidth: '1200px', margin: '0 auto', borderRadius: '32px', overflow: 'hidden', height: '600px' }}>
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600" 
          alt="Villa Obsidian Exterior" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </section>

      {/* Case Study Content */}
      <section className="section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
        
        {/* Challenge & Solution */}
        <div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldAlert size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: 500 }}>The Structural Challenge</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>
                The estate had to be anchored into a 45-degree granite hillside with strict seismic zoning criteria. Additionally, the architectural design called for a 35-foot cantilevered infinity pool suspended over the valley.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CheckCircle size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: 500 }}>The Engineering Solution</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>
                We drilled 24 structural concrete caissons 60 feet deep into the granite bedrock. We then fabricated a custom structural grade steel space-frame to support the cantilever, reinforcing it with carbon-fiber wrapping.
              </p>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 500 }}>Overview</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
            Villa Obsidian represents the pinnacle of modern luxury residential engineering. Built in collaboration with Architectura Studio, the house blends raw obsidian stone finishes, custom-welded structural steel, and expansive floor-to-ceiling glass panel sliders.
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.75' }}>
            Every detailing choice—from the concealed climate vents to the custom-made bronze door pivots—was executed in-house by ZM Constructions' dedicated finishing team.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 4rem auto' }}>
          <span className="section-subtitle">VISUAL WALKTHROUGH</span>
          <h2 className="section-title">Interior & Exterior <span>Gallery</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
          <div style={{ borderRadius: '20px', overflow: 'hidden', height: '400px' }}>
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800" 
              alt="Villa Obsidian Kitchen" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ borderRadius: '20px', overflow: 'hidden', height: '400px' }}>
            <img 
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800" 
              alt="Villa Obsidian Living Room" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .section div[style*="repeat(2"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* Results & Testimonial */}
      <section className="section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 500 }}>The Results</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '2.5rem', color: 'var(--accent-gold)', fontWeight: 700, fontFamily: 'var(--font-serif)', display: 'block' }}>100%</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Design Fidelity Handoff</span>
              </div>
              <div>
                <span style={{ fontSize: '2.5rem', color: 'var(--accent-gold)', fontWeight: 700, fontFamily: 'var(--font-serif)', display: 'block' }}>LEED Gold</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Environmental certification achieved</span>
              </div>
            </div>
          </div>
          <div style={{ padding: '3rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
            <span style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-bronze)', display: 'block', height: '30px', transform: 'translateY(-10px)' }}>“</span>
            <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem' }}>
              "ZM Constructions delivered a masterpiece. Their engineering team solved the cantilever pool complexity without forcing us to compromise on our architectural design. A flawless experience."
            </p>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600 }}>Marcus Vance</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-bronze)', textTransform: 'uppercase' }}>Owner, Villa Obsidian</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
