import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Landmark } from 'lucide-react';

export default function Navigation({ activePage, onNavigate }) {
  const [theme, setTheme] = useState('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Set default theme to dark
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'team', label: 'Team' },
    { id: 'careers', label: 'Careers' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (pageId) => {
    setMobileMenuOpen(false);
    onNavigate(pageId);
  };

  return (
    <>
      <nav className="nav-floating">
        {/* Logo */}
        <a 
          href="#home" 
          className="nav-logo" 
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
        >
          <Landmark size={20} strokeWidth={1.5} style={{ color: 'var(--accent-bronze)' }} />
          <span>ZM</span>
        </a>

        {/* Desktop Links */}
        <div className="nav-links" style={{ display: 'none' }}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
              className={`nav-link ${activePage === item.id || (item.id === 'blog' && activePage === 'blog-details') || (item.id === 'projects' && activePage === 'project-details') ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Actions (Theme Toggle & CTA) */}
        <div className="nav-actions">
          {/* Theme Switcher */}
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
          </button>

          {/* Quote Button (Desktop) */}
          <button 
            className="border-beam-btn" 
            onClick={() => handleNavClick('quote-request')}
            style={{ 
              padding: '0.65rem 1.5rem', 
              fontSize: '0.7rem', 
              display: 'none',
              borderRadius: '30px'
            }}
          >
            Request Quote
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="theme-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'flex', border: 'none', background: 'transparent' }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Styles to override floating menu layout (CSS triggers show/hide on screens) */}
      <style>{`
        @media (min-width: 1024px) {
          .nav-links { display: flex !important; }
          .nav-actions button.border-beam-btn { display: inline-flex !important; }
          .nav-actions button:last-child { display: none !important; }
        }
      `}</style>

      {/* Mobile Slide-over Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'var(--bg-base)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            padding: '2rem',
            transition: 'var(--transition-smooth)'
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                color: activePage === item.id ? 'var(--accent-gold)' : 'var(--text-primary)',
                letterSpacing: '0.05em'
              }}
            >
              {item.label}
            </a>
          ))}
          <button
            className="border-beam-btn"
            onClick={() => handleNavClick('quote-request')}
            style={{ width: '220px', padding: '1rem 0', marginTop: '1rem' }}
          >
            Request Quote
          </button>
        </div>
      )}
    </>
  );
}
