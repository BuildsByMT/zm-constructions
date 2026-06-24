import React, { useEffect, useRef, useState } from 'react';
import { Target, Eye, ShieldCheck, Compass, Ruler, HelpCircle, ChevronDown, ChevronUp, UserCheck, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About({ onNavigate }) {
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  // State for new features
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeSpotlight, setActiveSpotlight] = useState(1);

  useEffect(() => {
    revealRefs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, []);

  const values = [
    { title: 'Absolute Quality', desc: 'No concessions. We use materials engineered to double the lifecycle of standard structures.', icon: Ruler },
    { title: 'Client Discretion', desc: 'Secure communication portals, audited accounts, and complete corporate confidentiality.', icon: Compass },
    { title: 'Architectural Craft', desc: 'Every line serves a purpose. We combine structure with fine art to craft masterpieces.', icon: ShieldCheck }
  ];

  const milestones = [
    { year: '2012', title: 'The Genesis', desc: 'Founded by senior structural engineer Zakaria M. to challenge template construction.' },
    { year: '2016', title: 'Going Bespoke', desc: 'Transitioned exclusively to high-end architectural estates and custom developments.' },
    { year: '2020', title: 'Green Horizon', desc: 'Integrated proprietary carbon-neutral concrete mixes and off-grid solar frameworks.' },
    { year: '2024', title: 'Lumina Handoff', desc: 'Completed the flagship Lumina Atrium project, gaining international acclaim.' }
  ];

  const spotlights = [
    { id: 1, name: 'Sora Tanaka', role: 'Concrete Chemist', focus: 'Nano-calcite crystal injection mixes', quote: 'Cement is a living chemical structure. By seeding it with carbon dioxide, we turn dynamic foundations into fossilized rock that blocks corrosion natively.' },
    { id: 2, name: 'David Vance', role: 'Iron Architect', focus: 'Seismic frame layouts and joint physics', quote: 'We do not build simple steel boxes. We weld structural art that distributes horizontal shifting without buckling the exterior envelope.' }
  ];

  const faqs = [
    { q: 'How does ZM guarantee structural lifecycles?', a: 'We construct deep rock concrete caissons and wrap load joins in carbon-fiber. Third-party testing chambers audit our material densities and wind load capacities before handoff.' },
    { q: 'Are ZM materials verified carbon-neutral?', a: 'Yes, our concrete contains carbon-injected aggregates. We source marble exclusively from certified Italian quarries and fumed oak from monitored German ecological zones.' },
    { q: 'What zoning and regulatory approvals do you handle?', a: 'We manage complete environmental clearances, seismic reviews, and civil zoning permits across California, Colorado, and New York.' }
  ];

  return (
    <div style={{ paddingTop: '100px' }}>
      
      {/* Hero Header */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <span className="section-subtitle">WHO WE ARE</span>
        <h1 className="hero-title" style={{ fontSize: '4.5rem' }}>
          Crafting Legacies through <span className="shiny-text">Architectural Precision</span>
        </h1>
        <p className="hero-desc" style={{ maxWidth: '650px' }}>
          ZM Constructions was founded on a simple truth: construction is not just about putting up walls; it is the physical realization of art, design, and structural longevity.
        </p>
      </section>

      {/* Story Section */}
      <section ref={addToRefs} className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div className="parallax-container" style={{ height: '450px' }}>
            <img 
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200" 
              alt="Architectural drawing desk" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>
              The Story of <span style={{ color: 'var(--accent-bronze)' }}>ZM Constructions</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
              What began as a boutique engineering firm in Southern California has evolved into a nationally acclaimed luxury design-build group. We are a family of engineers, designers, project directors, and detail-obsessed craftsmen.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.75' }}>
              We partner with elite architects globally to deliver residential estates and commercial horizons that refuse to blend in. Our focus is absolute quality, custom materials sourcing, and a stress-free client collaboration cycle.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section ref={addToRefs} className="section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <div style={{ padding: '3rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(197, 168, 128, 0.1)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Eye size={20} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 500 }}>Our Vision</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>
              To redefine the luxury construction horizon by merging sustainable engineering, carbon-neutral building sciences, and absolute architectural clarity.
            </p>
          </div>

          <div style={{ padding: '3rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(197, 168, 128, 0.1)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Target size={20} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 500 }}>Our Mission</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>
              To construct high-fidelity spaces that serve as sanctuary for our clients. We execute with absolute transparency, on-time schedules, and zero design compromise.
            </p>
          </div>
        </div>
      </section>

      {/* NEW FEATURE: TEAM SPOTLIGHTS */}
      <section ref={addToRefs} className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span className="section-subtitle">Specialist Roster</span>
            <h2 className="section-title">Team <span>Spotlights</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7', margin: '1.5rem 0' }}>
              We hire world-class scientists and iron builders. Click a specialist profile to read their specific engineering focus.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {spotlights.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setActiveSpotlight(spot.id)}
                  style={{
                    padding: '1rem 1.5rem',
                    borderRadius: '12px',
                    border: '1px solid ' + (activeSpotlight === spot.id ? 'var(--accent-bronze)' : 'var(--border-color)'),
                    background: activeSpotlight === spot.id ? 'rgba(197, 168, 128, 0.08)' : 'transparent',
                    color: activeSpotlight === spot.id ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  {spot.name} • {spot.role}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: '3rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-gold)', display: 'block', marginBottom: '0.5rem' }}>
              FOCUS: {spotlights.find(s => s.id === activeSpotlight).focus}
            </span>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              {spotlights.find(s => s.id === activeSpotlight).name}
            </h4>
            <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              "{spotlights.find(s => s.id === activeSpotlight).quote}"
            </p>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section ref={addToRefs} className="section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span className="section-subtitle">OUR METHODOLOGY</span>
            <h2 className="section-title">Zero-Tolerance <span>Engineering</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.75', margin: '1.5rem 0' }}>
              Every ZM build undergoes a multi-layer design verification program before breaking ground. We coordinate digital models, conduct mockups of critical structural joins, and double check load pathways to guarantee extreme rigidity.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.75', marginBottom: '2rem' }}>
              From concrete chemistry to glass window thermal sealants, our projects are tested by third-party auditors to ensure they outperform standard building codes.
            </p>
            <button className="border-beam-btn" onClick={() => onNavigate('contact')}>
              Discuss Our Methodology
            </button>
          </div>
          <div className="parallax-container" style={{ height: '450px' }}>
            <img 
              src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1200" 
              alt="Engineering inspection" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section ref={addToRefs} className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 4rem auto' }}>
          <span className="section-subtitle">HOW WE WORK</span>
          <h2 className="section-title">ZM Core <span>Principles</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {values.map((v, idx) => {
            const IconC = v.icon;
            return (
              <div 
                key={idx}
                style={{ padding: '2.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '20px', textAlign: 'center' }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(197, 168, 128, 0.1)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                  <IconC size={22} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '1rem', fontWeight: 500 }}>{v.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Historical Timeline */}
      <section ref={addToRefs} className="section">
        <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 4rem auto' }}>
          <span className="section-subtitle">THE CHRONOLOGY</span>
          <h2 className="section-title">ZM <span>Timeline</span></h2>
        </div>

        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0, width: '1px', height: '100%', background: 'var(--border-color)', zIndex: 1 }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {milestones.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: idx % 2 === 0 ? 'flex-start' : 'flex-end', width: '100%', position: 'relative', zIndex: 2 }}>
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '10px',
                  transform: 'translateX(-50%)',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'var(--accent-bronze)',
                  border: '3px solid var(--bg-base)'
                }} />
                
                <div style={{
                  width: '45%',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '2rem',
                  textAlign: idx % 2 === 0 ? 'right' : 'left'
                }}>
                  <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {m.year}
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{m.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW FEATURE: RECRUITMENT TIMELINE PIPELINE */}
      <section ref={addToRefs} className="section" style={{ background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span className="section-subtitle">Recruiting Coordinates</span>
            <h2 className="section-title">ZM Interview <span>Pipeline</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7', margin: '1.5rem 0' }}>
              We maintain a rigorous 4-phase recruiting pipeline for candidates applying to ZM coordinates.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { phase: 'Phase 1: Portfolio Feasibility', desc: 'Evaluating credentials and architectural portfolios.' },
                { phase: 'Phase 2: Technical Structural Assessment', desc: 'Live calculations testing loads and safety tolerances.' },
                { phase: 'Phase 3: Craftsmanship Mockup', desc: 'On-site execution mockup reviewed by Marcus Vance.' },
                { phase: 'Phase 4: Handoff Decision', desc: 'Final review by Principal Zakaria M.' }
              ].map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(197,168,128,0.1)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', fontWeight: 600 }}>
                    {idx + 1}
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{step.phase}</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* FAQ Accordion */}
          <div>
            <span className="section-subtitle">Audited Inquiry</span>
            <h2 className="section-title">Bespoke <span>FAQ</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7', margin: '1.5rem 0' }}>
              Review coordinates on our building methodologies, certifications, and structural regulations.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {faqs.map((faq, idx) => (
                <div key={idx} className="faq-accordion-item">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                      fontSize: '0.95rem',
                      fontFamily: 'var(--font-serif)',
                      color: activeFaq === idx ? 'var(--accent-gold)' : 'var(--text-primary)',
                      padding: '0.5rem 0'
                    }}
                  >
                    <span>{faq.q}</span>
                    {activeFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {activeFaq === idx && (
                    <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .section div[style*="absolute; left: 50%"] { left: '20px' !important; }
            .section div[style*="translateX(-50%)"] { left: '20px' !important; transform: none !important; }
            .section div[style*="flexDirection: column"] > div { justifyContent: flex-end !important; }
            .section div[style*="width: 45%"] { width: '85%' !important; textAlign: left !important; margin-left: 40px !important; }
          }
        `}</style>
      </section>

    </div>
  );
}
