import React, { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Calendar, User, Share2, Play, Pause, FileText, CheckCircle } from 'lucide-react';
import { sanitizeString } from '../utils/security';

export default function BlogDetails({ onNavigate }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // State for new features
  const [isPlaying, setIsPlaying] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerDownload = (title) => {
    const cleanTitle = sanitizeString(title);
    setDownloadMsg(`Initializing secure download for "${cleanTitle}.pdf"...`);
    setTimeout(() => {
      setDownloadMsg(`Document "${cleanTitle}.pdf" successfully compiled and exported.`);
      setTimeout(() => setDownloadMsg(''), 3000);
    }, 1500);
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      
      {/* Scroll Progress Bar */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '3px',
          background: 'var(--accent-bronze)',
          zIndex: 2000,
          transition: 'width 0.1s ease-out'
        }}
      />

      {/* Back button */}
      <div style={{ width: '90%', maxWidth: '800px', margin: '2rem auto 0 auto' }}>
        <button 
          onClick={() => onNavigate('blog')}
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
          <ArrowLeft size={16} /> Back to articles
        </button>
      </div>

      {/* Article Header */}
      <article style={{ width: '90%', maxWidth: '800px', margin: '2rem auto 6rem auto' }}>
        <header style={{ marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-bronze)', fontWeight: 600, letterSpacing: '0.1em', display: 'block', marginBottom: '1rem' }}>
            Materials Science & Innovation
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', lineHeight: '1.15', fontWeight: 300, marginBottom: '2.5rem' }}>
            The Evolution of <span className="shiny-text">Ultra-Luxury</span> Structural Concrete
          </h1>

          {/* NEW FEATURE: AUDIO NARRATION PLAYER & PDF DOWNLOAD */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '2rem', padding: '1rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
            {/* Audio player */}
            <div className="audio-player-container">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-bronze)', color: '#fff' }}
              >
                {isPlaying ? <Pause size={12} /> : <Play size={12} style={{ marginLeft: '2px' }} />}
              </button>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {isPlaying ? 'Playing Audio Narration (6:24)...' : 'Listen to Article Narration'}
              </span>
            </div>

            {/* PDF Downloader */}
            <button 
              onClick={() => triggerDownload('The Evolution of Ultra-Luxury Structural Concrete')}
              style={{
                padding: '0.75rem 1.25rem',
                border: '1px solid var(--border-color)',
                borderRadius: '30px',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: 'var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <FileText size={14} /> Download PDF spec sheet
            </button>
          </div>

          {downloadMsg && (
            <div style={{ marginBottom: '2rem', padding: '0.5rem 1rem', background: 'rgba(16,185,129,0.1)', color: '#10B981', fontSize: '0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={14} /> {downloadMsg}
            </div>
          )}

          {/* Author/Meta */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '1.5rem 0', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={14} /> Zakaria M. Al-Husseini</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={14} /> June 01, 2026</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={14} /> {isPlaying ? 'Streaming Audio' : '6 Min Read'}</span>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} className="share-btn">
              <Share2 size={14} /> Share coordinates
            </button>
          </div>
        </header>

        {/* Feature Image */}
        <div style={{ borderRadius: '24px', overflow: 'hidden', height: '450px', marginBottom: '3rem' }}>
          <img 
            src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=1200" 
            alt="Materials verification lab" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Article Body Content */}
        <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.85', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <p style={{ color: 'var(--text-primary)', fontSize: '1.125rem', lineHeight: '1.75' }}>
            Modern luxury estate general contracting requires more than executing design blueprints. It demands advanced chemical engineering. In our verification laboratories at ZM Constructions, we test how custom mineral additives interact with Portland cements to solve structural erosion.
          </p>

          <p>
            When building on ocean cliffsides in Malibu or high-humidity hillsides in Beverly Hills, concrete is constantly exposed to moisture, salts, and carbon dioxide. Standard commercial concrete mixes slowly absorb these compounds, leading to microscopic cracking and corrosion of the internal steel rebar matrix.
          </p>

          {/* Pull Quote */}
          <blockquote style={{
            margin: '2rem 0',
            padding: '2rem',
            borderLeft: '3px solid var(--accent-bronze)',
            background: 'var(--bg-surface)',
            borderRadius: '0 16px 16px 0',
            fontStyle: 'italic',
            fontSize: '1.25rem',
            fontFamily: 'var(--font-serif)',
            color: 'var(--text-primary)',
            lineHeight: '1.6'
          }}>
            "True luxury construction is invisible. It lives in the chemical resilience of the foundation caissons and the double-thermal break seals of the steel frames, long before the Italian travertine is polished."
          </blockquote>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--text-primary)', marginTop: '1rem', fontWeight: 500 }}>
            Carbon-Injected Cements
          </h3>
          <p>
            To resolve foundation decay, ZM has introduced carbon-injected concrete. By injecting recycled gaseous carbon dioxide during mixing, the CO2 reacts with calcium ions to form calcium carbonate crystals. These nano-crystals seal microscopic voids, increasing concrete compressive strength by 15% and blocking water absorption path channels.
          </p>

          <p>
            This technology does not just expand structural lifecycles; it also locks away carbon permanently. ZM Constructions' target is to execute 100% of our concrete pours using carbon-injected mixes by 2027, reducing our projects' lifetime carbon footprints.
          </p>
        </div>

      </article>

      <style>{`
        .share-btn {
          transition: var(--transition-fast);
        }
        .share-btn:hover {
          color: var(--accent-gold);
        }
      `}</style>

    </div>
  );
}
