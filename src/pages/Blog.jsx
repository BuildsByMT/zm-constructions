import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Blog({ onNavigate }) {
  const posts = [
    {
      id: 1,
      title: 'The Evolution of Ultra-Luxury Structural Concrete',
      category: 'Materials Science',
      date: 'June 01, 2026',
      readTime: '6 Min Read',
      summary: 'Exploring how carbon-injected mixes are doubling the structural lifecycle of coastal estates while reducing carbon output by up to 30%.',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'Seismic Cantilever Design: Suspending Pools Safely',
      category: 'Structural Engineering',
      date: 'May 20, 2026',
      readTime: '8 Min Read',
      summary: 'An engineering review of caisson drill configurations and steel space-frames required to suspend high-load pools over steep grades.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'Designing Invisible Infrastructure in Smart Homes',
      category: 'Interior Architecture',
      date: 'May 05, 2026',
      readTime: '5 Min Read',
      summary: 'How hidden linear diffusers, flush pivot doors, and concealed speaker arrays preserve clean architectural lines without affecting performance.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div style={{ paddingTop: '100px' }}>
      
      {/* Header */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <span className="section-subtitle">THE ZM CHRONICLE</span>
        <h1 className="hero-title" style={{ fontSize: '4.5rem' }}>
          Architectural <span className="shiny-text">Insights</span>
        </h1>
        <p className="hero-desc" style={{ maxWidth: '650px' }}>
          Explore the engineering methods, materials research, and architectural styling trends driving the construction of premium estates.
        </p>
      </section>

      {/* Featured Article (Editorial Hero) */}
      <section style={{ width: '90%', maxWidth: '1200px', margin: '0 auto 5rem auto' }}>
        <div 
          onClick={() => onNavigate('blog-details', { articleId: 1 })}
          className="interactive-hover"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '3rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)'
          }}
          className="blog-featured-card"
        >
          <div style={{ height: '400px', overflow: 'hidden' }}>
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200" 
              alt="Featured Article" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
              className="blog-zoom-img"
            />
          </div>
          <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-bronze)', fontWeight: 600, letterSpacing: '0.1em' }}>
              June 04, 2026 • Design Trends
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', margin: '0.75rem 0 1.25rem 0', lineHeight: '1.2', fontWeight: 400 }}>
              The Fusion of Tesla Minimalism and Timeless Travertine
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              How luxury general contractors are blending automated clean energy systems with classic Roman travertine columns to build off-grid, high-fidelity sanctuary estates.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600, color: 'var(--accent-gold)' }}>
              Read Case Study <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Articles */}
      <section style={{ width: '90%', maxWidth: '1200px', margin: '0 auto 6rem auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {posts.map((post) => (
            <div 
              key={post.id}
              onClick={() => onNavigate('blog-details', { articleId: post.id })}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
              className="blog-item-card"
            >
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
                  className="blog-zoom-img"
                />
              </div>
              <div style={{ padding: '2rem' }}>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent-bronze)', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                  {post.date} • {post.category}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', marginBottom: '0.75rem', fontWeight: 500, lineHeight: 1.3 }}>
                  {post.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {post.summary}
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 600, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {post.readTime} <ArrowUpRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .blog-featured-card, .blog-item-card {
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
        }
        .blog-featured-card:hover, .blog-item-card:hover {
          transform: translateY(-4px);
          border-color: var(--border-hover);
          box-shadow: 0 15px 35px var(--glow-color);
        }
        .blog-featured-card:hover .blog-zoom-img, .blog-item-card:hover .blog-zoom-img {
          transform: scale(1.04);
        }
      `}</style>

    </div>
  );
}
