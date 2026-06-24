import React, { useState } from 'react';
import { ArrowUpRight, FileText, CheckCircle } from 'lucide-react';
import { sanitizeString } from '../utils/security';

export default function Projects({ onNavigate }) {
  const [filter, setFilter] = useState('all');
  
  // State for new features
  const [showBlueprints, setShowBlueprints] = useState({});
  const [compareList, setCompareList] = useState([]);
  const [exportStatus, setExportStatus] = useState('');

  const portfolio = [
    { id: 1, title: 'Villa Obsidian', category: 'residential', location: 'Beverly Hills, CA', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', height: '480px', size: '14,000 SQ FT', concrete: 'C60 Carbon-Injected', steel: '80 Tons S355' },
    { id: 2, title: 'The Lumina Atrium', category: 'commercial', location: 'Manhattan, NY', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', height: '350px', size: '45,000 SQ FT', concrete: 'C50 LEED Platinum', steel: '250 Tons Grade-A' },
    { id: 3, title: 'Aspen Peaks Estate', category: 'residential', location: 'Aspen, CO', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', height: '350px', size: '8,500 SQ FT', concrete: 'C60 Thermal Enforced', steel: '45 Tons S355' },
    { id: 4, title: 'Obsidian Loft Restoration', category: 'renovation', location: 'Brooklyn, NY', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800', height: '480px', size: '6,200 SQ FT', concrete: 'C40 Lightweight', steel: '20 Tons Custom Alloy' },
    { id: 5, title: 'Horizon Heights', category: 'commercial', location: 'Chicago, IL', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', height: '480px', size: '85,000 SQ FT', concrete: 'C80 High Performance', steel: '420 Tons Grade-A' },
    { id: 6, title: 'Alabaster Manor', category: 'renovation', location: 'Santa Barbara, CA', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800', height: '350px', size: '9,200 SQ FT', concrete: 'C50 Carbon-Injected', steel: '35 Tons Custom Alloy' }
  ];

  const filteredPortfolio = filter === 'all' 
    ? portfolio 
    : portfolio.filter(p => p.category === filter);

  // Toggle Blueprint Overlay
  const toggleBlueprint = (id, e) => {
    e.stopPropagation();
    setShowBlueprints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Toggle comparator select
  const toggleCompare = (proj, e) => {
    e.stopPropagation();
    if (compareList.find(c => c.id === proj.id)) {
      setCompareList(compareList.filter(c => c.id !== proj.id));
    } else {
      if (compareList.length >= 2) {
        // Swap first element
        setCompareList([compareList[1], proj]);
      } else {
        setCompareList([...compareList, proj]);
      }
    }
  };

  // PDF Exporter script with XSS validation
  const triggerPdfExport = (projName) => {
    const cleanName = sanitizeString(projName);
    setExportStatus(`Preparing PDF specifications for ${cleanName}...`);
    setTimeout(() => {
      setExportStatus(`PDF Specifications exported successfully for ${cleanName}. Check download coordinates.`);
      setTimeout(() => setExportStatus(''), 3000);
    }, 1200);
  };

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

      {/* NEW FEATURE: PROJECT COMPARATOR CONSOLE */}
      {compareList.length > 0 && (
        <section style={{ width: '90%', maxWidth: '1200px', margin: '0 auto 2rem auto', padding: '1.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--accent-gold)' }}>Project Comparator Console</h4>
            <button onClick={() => setCompareList([])} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Clear Compare</button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${compareList.length + 1}, 1fr)`, gap: '1.5rem', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)' }}>
              <span>Project Title:</span>
              <span>Scope Scale:</span>
              <span>Concrete Rating:</span>
              <span>Steel Weight:</span>
              <span>Actions:</span>
            </div>
            
            {compareList.map((proj) => (
              <div key={proj.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontWeight: 600 }}>
                <span>{proj.title}</span>
                <span>{proj.size}</span>
                <span>{proj.concrete}</span>
                <span>{proj.steel}</span>
                <button 
                  onClick={() => triggerPdfExport(proj.title)}
                  style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}
                >
                  <FileText size={12} /> Export Spec PDF
                </button>
              </div>
            ))}
          </div>
          {exportStatus && (
            <div style={{ marginTop: '1rem', padding: '0.5rem', background: 'rgba(197,168,128,0.1)', color: 'var(--accent-gold)', fontSize: '0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={14} /> {exportStatus}
            </div>
          )}
        </section>
      )}

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
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    filter: showBlueprints[project.id] ? 'invert(1) opacity(0.35) contrast(2)' : 'none'
                  }}
                  className="portfolio-img-zoom"
                />
                
                {/* Blueprint Grid Lines Overlay emulation */}
                {showBlueprints[project.id] && (
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    backgroundImage: 'linear-gradient(rgba(197, 168, 128, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 168, 128, 0.15) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    pointerEvents: 'none'
                  }} />
                )}

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
                
                {/* Blueprint Toggle Button */}
                <button
                  onClick={(e) => toggleBlueprint(project.id, e)}
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: 'rgba(0,0,0,0.65)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--accent-gold)',
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    zIndex: 4
                  }}
                >
                  {showBlueprints[project.id] ? 'Hide Blueprint' : 'Show Blueprint'}
                </button>
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
                
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {/* Compare toggle */}
                  <button 
                    onClick={(e) => toggleCompare(project, e)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '20px',
                      border: '1px solid ' + (compareList.find(c => c.id === project.id) ? 'var(--accent-bronze)' : 'var(--border-color)'),
                      fontSize: '0.65rem',
                      textTransform: 'uppercase',
                      color: compareList.find(c => c.id === project.id) ? 'var(--accent-gold)' : 'var(--text-secondary)',
                      fontWeight: 600
                    }}
                  >
                    {compareList.find(c => c.id === project.id) ? 'Comparing' : 'Compare'}
                  </button>

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
