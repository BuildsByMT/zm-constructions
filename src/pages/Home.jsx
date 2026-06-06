import React, { useEffect, useRef } from 'react';
import AuroraBackground from '../components/AuroraBackground';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { ArrowUpRight, Award, ShieldCheck, Zap, Users, Sparkles, Building2, HardHat, Hammer, FileText, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home({ onNavigate }) {
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useEffect(() => {
    // GSAP Scroll Reveals
    revealRefs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Parallax scrolling for project images
    const images = document.querySelectorAll('.parallax-img');
    images.forEach((img) => {
      gsap.to(img, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Cursor glow effect for cards
  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const services = [
    { id: 'residential', title: 'Residential Estates', desc: 'Bespoke mega-mansions, luxury coastal villas, and high-end residential compounds.', icon: Building2, colSpan: 'col-span-8', bgImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800' },
    { id: 'commercial', title: 'Commercial Horizons', desc: 'Sleek corporate headquarters, boutique retail structures, and flagship storefronts.', icon: Landmark, colSpan: 'col-span-4', bgImg: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
    { id: 'renovation', title: 'Luxury Renovation', desc: 'Restoring historic architecture or modernizing estates to contemporary standards.', icon: Hammer, colSpan: 'col-span-4', bgImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800' },
    { id: 'interior', title: 'Interior Architecture', desc: 'Bespoke custom millwork, integrated automation, and structural space planning.', icon: Sparkles, colSpan: 'col-span-8', bgImg: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800' },
  ];

  const processSteps = [
    { num: '01', title: 'Architectural Blueprinting', desc: 'Conceptual styling, structural feasibility audits, and luxury material specifications.' },
    { num: '02', title: 'Engineering & Permits', desc: 'Precision calculations, foundation design, and local regulatory clearance coordination.' },
    { num: '03', title: 'Bespoke Sourcing', desc: 'Procuring premium Italian marbles, custom glazing units, and architectural hardware.' },
    { num: '04', title: 'Premium Execution', desc: 'On-site general contracting managed by certified structural directors and engineers.' }
  ];

  return (
    <div style={{ position: 'relative' }}>
      
      {/* 1. HERO SECTION WITH AURORA SHADER */}
      <section className="hero-sec">
        <AuroraBackground />
        <div className="hero-content">
          <div className="hero-subtitle">ZM CONSTRUCTIONS • ARTISTRY IN STEEL & STONE</div>
          <h1 className="hero-title">
            Crafting <span className="shiny-text">Structural Masterpieces</span> & Premium Estates
          </h1>
          <p className="hero-desc">
            We merge Tesla-level minimalism with timeless structural engineering to build architectural monuments that endure for generations.
          </p>
          <div className="hero-actions">
            <button className="border-beam-btn" onClick={() => onNavigate('quote-request')}>
              Begin Your Commission <ArrowUpRight size={14} style={{ marginLeft: '0.5rem' }} />
            </button>
            <button 
              onClick={() => onNavigate('projects')}
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                fontWeight: 600,
                letterSpacing: '0.1em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-primary)',
                borderBottom: '1px solid var(--accent-bronze)',
                paddingBottom: '4px',
                cursor: 'pointer'
              }}
            >
              Explore Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* 2. TRUSTED BY SECTION */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '2.5rem 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-secondary)' }}>Trusted partners</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', fontSize: '1rem', fontWeight: 600, letterSpacing: '0.15em', fontFamily: 'var(--font-serif)', color: 'var(--text-secondary)' }}>
            <span>AIA ARCHITECTS</span>
            <span>LEED CERTIFIED</span>
            <span>VERITAS REALTY</span>
            <span>NORDIC DESIGN HUB</span>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SECTION WITH PARALLAX */}
      <section ref={addToRefs} className="section">
        <div className="section-header">
          <span className="section-subtitle">Selected Work</span>
          <h2 className="section-title">Architectural <span>Beacons</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '3rem' }}>
          {/* Project 1 */}
          <div className="interactive-hover" style={{ cursor: 'pointer' }} onClick={() => onNavigate('project-details')}>
            <div className="parallax-container" style={{ height: '400px', marginBottom: '1.5rem' }}>
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" 
                alt="Villa Obsidian" 
                className="parallax-img"
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-bronze)', fontWeight: 600 }}>Beverly Hills, CA</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginTop: '0.25rem', fontWeight: 400 }}>Villa Obsidian</h3>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowUpRight size={16} />
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="interactive-hover" style={{ cursor: 'pointer' }} onClick={() => onNavigate('project-details')}>
            <div className="parallax-container" style={{ height: '400px', marginBottom: '1.5rem' }}>
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
                alt="The Lumina Tower" 
                className="parallax-img"
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-bronze)', fontWeight: 600 }}>Manhattan, NY</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginTop: '0.25rem', fontWeight: 400 }}>The Lumina Atrium</h3>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowUpRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE ZM (GLOWING CARDS) */}
      <section ref={addToRefs} className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="section-header">
          <span className="section-subtitle">Excellence Defined</span>
          <h2 className="section-title">Why Commision <span>ZM</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {[
            { title: 'Zero Compromise Quality', desc: 'Double structural enforcement, thermal barrier frames, and verified LEED rating standards.', icon: ShieldCheck },
            { title: 'Absolute Discretion & Class', desc: 'Direct, premium client portal with complete visual timelines, ledger audits, and secure communication.', icon: Award },
            { title: 'Fast-Track Smart Building', desc: 'Proprietary building materials and automated scheduling reducing standard luxury timelines by up to 25%.', icon: Zap }
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div 
                key={idx} 
                className="glowing-card" 
                onMouseMove={handleCardMouseMove}
                style={{ padding: '2.5rem', background: 'var(--bg-surface)' }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(197, 168, 128, 0.1)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <IconComp size={22} strokeWidth={1.5} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '1rem', fontWeight: 500 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. SERVICES BENTO GRID */}
      <section ref={addToRefs} className="section">
        <div className="section-header">
          <span className="section-subtitle">Scope of Work</span>
          <h2 className="section-title">Our Services <span>Bento Grid</span></h2>
        </div>

        <div className="bento-grid">
          {services.map((srv) => {
            const IconComp = srv.icon;
            return (
              <div 
                key={srv.id}
                onClick={() => onNavigate('services')}
                className={`bento-card ${srv.colSpan} interactive-hover`}
                style={{
                  minHeight: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  backgroundImage: `linear-gradient(to top, rgba(11, 11, 12, 0.9) 20%, rgba(11, 11, 12, 0.2) 100%), url(${srv.bgImg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  cursor: 'pointer'
                }}
              >
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-bronze)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <IconComp size={18} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#ffffff', marginBottom: '0.5rem', fontWeight: 500 }}>{srv.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', maxWidth: '450px', lineHeight: '1.5' }}>{srv.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Custom Styles for bento grid spans */}
      <style>{`
        .col-span-8 { grid-column: span 8; }
        .col-span-4 { grid-column: span 4; }
        @media (max-width: 1024px) {
          .col-span-8, .col-span-4 { grid-column: span 12; }
        }
      `}</style>

      {/* 6. BEFORE/AFTER SLIDER TOOL */}
      <section ref={addToRefs} className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span className="section-subtitle">Realized Vision</span>
            <h2 className="section-title">Visualizing the <span>Metamorphosis</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', margin: '1.5rem 0 2rem 0' }}>
              Drag the premium slider handle to inspect our architectural delivery. On the left, we showcase raw structural framing and columns; on the right, the completed luxury villa, highlighting our zero-tolerance detailing.
            </p>
            <button className="border-beam-btn" onClick={() => onNavigate('quote-request')}>
              Consult An Engineer
            </button>
          </div>
          <div>
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      {/* 7. PROCESS TIMELINE */}
      <section ref={addToRefs} className="section">
        <div className="section-header">
          <span className="section-subtitle">The Journey</span>
          <h2 className="section-title">Methodical <span>Execution</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', position: 'relative' }}>
          {processSteps.map((step, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              <div style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: 'rgba(197, 168, 128, 0.15)', fontWeight: 700, marginBottom: '1rem' }}>
                {step.num}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem' }}>{step.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. STATISTICS & METRICS */}
      <section ref={addToRefs} className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
          {[
            { num: '40+', label: 'Premium Estates Delivered' },
            { num: '$280M+', label: 'Total Construction Value' },
            { num: '9', label: 'AIA Design Accolades' },
            { num: '100%', label: 'On-Time Handoff Audit' }
          ].map((stat, idx) => (
            <div key={idx}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '0.5rem' }}>
                {stat.num}
              </div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        
        <style>{`
          @media (max-width: 768px) {
            .section div[style*="repeat(4"] {
              grid-template-columns: 1fr 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* 9. TESTIMONIALS (GLOWING CARDS) */}
      <section ref={addToRefs} className="section">
        <div className="section-header">
          <span className="section-subtitle">Client Endorsements</span>
          <h2 className="section-title">Words of <span>Praise</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {[
            { quote: "Building our coastal estate with ZM was a masterclass in project design and implementation. Their engineering team handles detailing at a level we have never seen before.", author: "Lord Arthur Sterling", role: "CEO, Sterling Ventures" },
            { quote: "discretion, design perfection, and strict budget compliance. ZM Constructions executed our headquarters flawlessly, delivering 3 weeks ahead of schedule.", author: "Elena Rostova", role: "Partner, Rostova Capital" }
          ].map((testi, idx) => (
            <div 
              key={idx} 
              className="glowing-card" 
              onMouseMove={handleCardMouseMove}
              style={{ padding: '3rem', background: 'var(--bg-surface)' }}
            >
              <span style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-bronze)', display: 'block', height: '30px', transform: 'translateY(-10px)' }}>“</span>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem' }}>
                {testi.quote}
              </p>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600 }}>{testi.author}</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-bronze)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {testi.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. LEAD GENERATION CTA WITH BORDER BEAM */}
      <section ref={addToRefs} className="section">
        <div style={{
          position: 'relative',
          padding: '6rem 4rem',
          borderRadius: '32px',
          background: 'radial-gradient(circle at top right, rgba(197, 168, 128, 0.12), transparent 50%), var(--bg-surface)',
          border: '1px solid var(--border-color)',
          textAlign: 'center',
          overflow: 'hidden'
        }}>
          <span className="section-subtitle">COMMISSION AN ESTATE</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', fontWeight: 300, marginBottom: '1.5rem' }}>
            Ready to Build Your <span className="shiny-text">Legacy</span>?
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2.5rem auto', lineHeight: '1.7' }}>
            Consult with our master architects and structural coordinators to review your site, discuss custom concepts, and generate a structural quote.
          </p>
          <button className="border-beam-btn" onClick={() => onNavigate('quote-request')}>
            Request Luxury Consultation
          </button>
        </div>
      </section>

    </div>
  );
}
