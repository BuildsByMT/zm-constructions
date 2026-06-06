import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Projects({ onNavigate }) {
  const [filter, setFilter] = useState('all');

  const portfolio = [
    { id: 1, title: 'Villa Obsidian', category: 'residential', location: 'Beverly Hills, CA', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', height: '480px' },
    { id: 2, title: 'The Lumina Atrium', category: 'commercial', location: 'Manhattan, NY', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', height: '350px' },
    { id: 3, title: 'Aspen Peaks Estate', category: 'residential', location: 'Aspen, CO', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', height: '350px' },
    { id: 4, title: 'Obsidian Loft Restoration', category: 'renovation', location: 'Brooklyn, NY', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800', height: '480px' },
    { id: 5, title: 'Horizon Heights', category: 'commercial', location: 'Chicago, IL', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', height: '480px' },
    { id: 6, title: 'Alabaster Manor', category: 'renovation', location: 'Santa Barbara, CA', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800', height: '350px' }
  ];

  const filteredPortfolio = filter === 'all' 
    ? portfolio 
    : portfolio.filter(p => p.category === filter);

  return (
    <div style={{ paddingTop: '100px' }}>
      
      {/* Header */}
      <section className="section" style={{ paddingBottom: '2rem' }}>
        <span className="section-subtitle">OUR PORTFOLIO</span>
        <h1 className="hero-title" style={{ fontSize: '4.5rem' }}>
          Monuments of <span className="shiny-text">Structural Craft</span>
        </h1>
        <p className="hero-desc" style={{ maxWidth: '650px' }}>
          A curated selection of our completed developments, custom residential estates, and flagship commercial properties.
        </p>
      </section>

      {/* Filter Buttons */}
      <section style={{ width: '90%', maxWidth: '1200px', margin: '0 auto 3rem auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
          {['all', 'residential', 'commercial', 'renovation'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.65rem 1.5rem',
                borderRadius: '30px',
                border: '1px solid ' + (filter === cat ? 'var(--accent-bronze)' : 'var(--border-color)'),
                background: filter === cat ? 'rgba(197, 168, 128, 0.1)' : 'transparent',
                color: filter === cat ? 'var(--accent-gold)' : 'var(--text-secondary)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                fontWeight: 600,
                letterSpacing: '0.05em',
                transition: 'var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Layout Grid */}
      <section style={{ width: '90%', maxWidth: '1200px', margin: '0 auto 6rem auto' }}>
        <div className="portfolio-masonry" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          {filteredPortfolio.map((project) => (
            <div 
              key={project.id}
              onClick={() => onNavigate('project-details', { projectId: project.id })}
              className="portfolio-card interactive-hover"
              style={{
                display: 'block',
                cursor: 'pointer',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-surface)',
                transition: 'var(--transition-smooth)'
              }}
            >
              <div style={{ height: project.height, overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="portfolio-img-zoom"
                />
                <div className="portfolio-card-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 60%)',
                  opacity: 0,
                  transition: 'opacity 0.4s ease'
                }} />
              </div>
              
              <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent-bronze)', fontWeight: 600, letterSpacing: '0.05em' }}>
                    {project.location} • {project.category}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginTop: '0.25rem', fontWeight: 500 }}>
                    {project.title}
                  </h3>
                </div>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  transition: 'var(--transition-fast)'
                }}
                className="portfolio-btn"
                >
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .portfolio-card:hover {
          transform: translateY(-6px);
          border-color: var(--border-hover);
          box-shadow: 0 20px 40px var(--glow-color);
        }
        .portfolio-card:hover .portfolio-img-zoom {
          transform: scale(1.05);
        }
        .portfolio-card:hover .portfolio-card-overlay {
          opacity: 1;
        }
        .portfolio-card:hover .portfolio-btn {
          background: var(--accent-bronze) !important;
          color: #ffffff !important;
          border-color: transparent !important;
        }
      `}</style>

    </div>
  );
}
