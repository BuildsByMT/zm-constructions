import React, { useState, useRef, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import SmartChatbot from './components/SmartChatbot';
import { verifyRedirectPage } from './utils/security';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Team from './pages/Team';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';
import QuoteRequest from './pages/QuoteRequest';

import gsap from 'gsap';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeParams, setActiveParams] = useState(null);
  const transitionOverlayRef = useRef(null);
  const transitionLogoRef = useRef(null);

  // Smooth cinematic page transition wipes
  const navigateToPage = (pageId, params = null) => {
    // Open Redirect validation & sanitization
    const safePageId = verifyRedirectPage(pageId);

    const overlay = transitionOverlayRef.current;
    const logo = transitionLogoRef.current;
    if (!overlay) {
      setCurrentPage(safePageId);
      setActiveParams(params);
      window.scrollTo(0, 0);
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power4.inOut', duration: 0.7 }
    });

    // 1. Slide overlay up to cover screen
    tl.to(overlay, {
      yPercent: -100,
      force3D: true
    });

    // 2. Fade in ZM logo splash
    tl.to(logo, {
      opacity: 1,
      scale: 1,
      duration: 0.4
    }, '-=0.2');

    // 3. Switch page state & scroll to top mid-transition
    tl.add(() => {
      setCurrentPage(safePageId);
      setActiveParams(params);
      window.scrollTo(0, 0);
    });

    // 4. Fade out ZM logo
    tl.to(logo, {
      opacity: 0,
      scale: 1.05,
      duration: 0.3
    }, '+=0.2');

    // 5. Slide overlay up and away
    tl.to(overlay, {
      yPercent: -200,
      force3D: true,
      onComplete: () => {
        // Reset overlay coordinates to bottom ready for next click
        gsap.set(overlay, { yPercent: 0 });
      }
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigateToPage} />;
      case 'about':
        return <About onNavigate={navigateToPage} />;
      case 'services':
        return <Services onNavigate={navigateToPage} />;
      case 'projects':
        return <Projects onNavigate={navigateToPage} />;
      case 'project-details':
        return <ProjectDetails onNavigate={navigateToPage} />;
      case 'team':
        return <Team />;
      case 'careers':
        return <Careers />;
      case 'blog':
        return <Blog onNavigate={navigateToPage} />;
      case 'blog-details':
        return <BlogDetails onNavigate={navigateToPage} />;
      case 'contact':
        return <Contact />;
      case 'quote-request':
        return <QuoteRequest prefilledState={activeParams} onNavigate={navigateToPage} />;
      default:
        return <Home onNavigate={navigateToPage} />;
    }
  };

  return (
    <>
      {/* Awwwards Custom Cursor */}
      <CustomCursor />

      {/* Floating Glass Navigation */}
      <Navigation activePage={currentPage} onNavigate={navigateToPage} />

      {/* Main Page View Wrapper */}
      <main style={{ minHeight: 'calc(100vh - 80px)' }}>
        {renderPage()}
      </main>

      {/* Premium Footer */}
      <Footer onNavigate={navigateToPage} />

      {/* Full-Screen Page Wipe Overlay */}
      <div 
        ref={transitionOverlayRef} 
        className="page-transition-overlay"
        style={{
          position: 'fixed',
          top: '100%',
          left: 0,
          width: '100%',
          height: '100%',
          background: 'var(--bg-surface)',
          borderTop: '2px solid var(--accent-bronze)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div 
          ref={transitionLogoRef} 
          className="page-transition-logo"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '3rem',
            letterSpacing: '0.2em',
            color: 'var(--accent-gold)',
            transform: 'scale(0.95)',
            opacity: 0
          }}
        >
          ZM CONSTRUCTIONS
        </div>
      </div>
      {/* Global Concierge Chatbot Widget */}
      <SmartChatbot onNavigate={navigateToPage} />
    </>
  );
}
