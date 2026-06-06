import React, { useState } from 'react';
import { Landmark, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-color)', padding: '6rem 0 3rem 0', position: 'relative', zIndex: 1 }}>
      <div style={{ width: '90%', maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
          
          {/* Brand Info */}
          <div>
            <div className="nav-logo" style={{ marginBottom: '1.5rem', cursor: 'pointer' }} onClick={() => onNavigate('home')}>
              <Landmark size={24} style={{ color: 'var(--accent-bronze)' }} />
              <span>ZM CONSTRUCTIONS</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              Crafting architectural masterpieces with absolute precision, structural engineering excellence, and premium luxury finishes.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={14} /> Beverly Hills | Aspen | New York</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={14} /> +1 (800) 962-7782</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={14} /> concierge@zmconstructions.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 600 }}>Explore</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {['home', 'about', 'services', 'projects', 'team', 'careers', 'blog'].map((page) => (
                <li key={page}>
                  <a 
                    href={`#${page}`} 
                    onClick={(e) => { e.preventDefault(); onNavigate(page); }}
                    style={{ transition: 'var(--transition-fast)' }}
                    className="footer-link-hover"
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 600 }}>Core Offerings</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="footer-link-hover">Residential Estates</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="footer-link-hover">Commercial Horizons</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="footer-link-hover">Luxury Renovations</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="footer-link-hover">Interior Architecture</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="footer-link-hover">Project Management</a></li>
            </ul>
          </div>

          {/* Newsletter / Smart Lead Capture */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 600 }}>Newsletter</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: '1.6' }}>
              Subscribe to receive updates on architectural trends, material innovations, and completed developments.
            </p>
            {subscribed ? (
              <div style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 600, padding: '0.5rem 0' }}>
                Thank you for subscribing.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '0.85rem 3rem 0.85rem 1rem',
                    borderRadius: '24px',
                    border: '1px solid var(--border-color)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    fontSize: '0.8rem',
                    color: 'var(--text-primary)'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    position: 'absolute',
                    right: '4px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--accent-bronze)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-secondary)', gap: '1rem' }}>
          <span>© {new Date().getFullYear()} ZM Constructions LLC. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#privacy" className="footer-link-hover">Privacy Policy</a>
            <a href="#terms" className="footer-link-hover">Terms of Service</a>
            <a href="#licensing" className="footer-link-hover">Licensing Coordinates</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link-hover {
          transition: var(--transition-fast);
        }
        .footer-link-hover:hover {
          color: var(--accent-gold) !important;
          padding-left: 3px;
        }
      `}</style>
    </footer>
  );
}
