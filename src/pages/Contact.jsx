import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Landmark, Calendar, Upload, FileText } from 'lucide-react';
import { sanitizeString, validateEmail } from '../utils/security';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [activeOffice, setActiveOffice] = useState('bh');

  // Scheduler state
  const [scheduleDay, setScheduleDay] = useState(null);
  const [scheduleStatus, setScheduleStatus] = useState('');

  // File Upload state
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const offices = {
    bh: { city: 'Beverly Hills', coords: '34.0736° N, 118.4004° W', addr: '9440 Santa Monica Blvd, Beverly Hills, CA 90210', phone: '+1 (800) 962-7782', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600' },
    aspen: { city: 'Aspen Co.', coords: '39.1911° N, 106.8175° W', addr: '205 S Mill St, Aspen, CO 81611', phone: '+1 (800) 962-7783', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600' },
    ny: { city: 'New York City', coords: '40.7128° N, 74.0060° W', addr: '55 Hudson Yards, New York, NY 10001', phone: '+1 (800) 962-7784', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600' }
  };

  const handleFormChange = (key, value) => {
    // Escape XSS payloads instantly during state update
    const sanitizedVal = sanitizeString(value);
    setFormData(prev => ({ ...prev, [key]: sanitizedVal }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mitigate ReDoS by validating email securely
    if (!validateEmail(formData.email)) {
      setFormError('Invalid email format detected. Security shield blocked submission.');
      return;
    }

    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setFormError('');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setUploadedFile(null);
    }
  };

  // Drag and Drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // File type/size validation mockup
      if (file.size > 10 * 1024 * 1024) {
        setFormError('Security threshold: Blueprint upload exceeds 10MB limit.');
      } else {
        setUploadedFile({ name: file.name, size: (file.size / 1024 / 1024).toFixed(2) });
        setFormError('');
      }
    }
  };

  // Schedule site audit
  const selectDay = (day) => {
    setScheduleDay(day);
    setScheduleStatus(`Scheduling feasibility audit for June ${day}, 2026. Coordinates locked.`);
    setTimeout(() => {
      setScheduleStatus(`Feasibility audit scheduled successfully for June ${day}, 2026. Check your portal.`);
      setTimeout(() => setScheduleStatus(''), 3000);
    }, 1200);
  };

  return (
    <div style={{ paddingTop: '100px' }}>
      
      {/* Header */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <span className="section-subtitle">ESTABLISH COORDINATES</span>
        <h1 className="hero-title" style={{ fontSize: '4.5rem' }}>
          Connect with Our <span className="shiny-text">Concierge</span>
        </h1>
        <p className="hero-desc" style={{ maxWidth: '650px' }}>
          Consult with our general contracting coordinators or arrange a private conference at one of our office locations.
        </p>
      </section>

      {/* NEW FEATURE: SITE AUDIT SCHEDULER & SECURE UPLOAD */}
      <section ref={e => e && e.classList.add('section')} className="section" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* Site Audit Scheduler */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Calendar size={18} style={{ color: 'var(--accent-bronze)' }} />
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Logistics Coordinator</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 500 }}>
              Feasibility <span style={{ color: 'var(--accent-bronze)' }}>Audit Scheduler</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Schedule an on-site structural audit. Select available days in June 2026 below.
            </p>
            
            <div className="audit-calendar-grid" style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
              {/* Calendar weekdays header */}
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <span key={i} style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{d}</span>
              ))}
              {/* Padding for empty calendar slots */}
              {Array.from({ length: 1 }).map((_, i) => <span key={i} />)}
              {/* June days */}
              {[15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28].map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => selectDay(day)}
                  style={{
                    padding: '8px 0',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    border: '1px solid ' + (scheduleDay === day ? 'var(--accent-bronze)' : 'transparent'),
                    background: scheduleDay === day ? 'rgba(197, 168, 128, 0.08)' : 'transparent',
                    color: scheduleDay === day ? 'var(--accent-gold)' : 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  {day}
                </button>
              ))}
            </div>

            {scheduleStatus && (
              <div style={{ padding: '0.75rem', background: 'rgba(197,168,128,0.1)', color: 'var(--accent-gold)', fontSize: '0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} /> {scheduleStatus}
              </div>
            )}
          </div>

          {/* Secure File Upload console */}
          <div 
            className="file-drag-zone"
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            style={{
              borderColor: dragActive ? 'var(--accent-bronze)' : 'var(--border-color)',
              background: dragActive ? 'rgba(255,255,255,0.02)' : 'transparent'
            }}
          >
            <Upload size={32} style={{ color: 'var(--accent-bronze)', marginBottom: '1rem' }} />
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Upload Blueprints</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.4 }}>
              Drag and drop your engineering blueprints or architectural models here (MAX 10MB).
            </p>
            {uploadedFile ? (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.75rem' }}>
                <FileText size={14} style={{ color: 'var(--accent-gold)' }} />
                <span>{uploadedFile.name} ({uploadedFile.size}MB)</span>
              </div>
            ) : (
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--accent-gold)' }}>Secure Transport Active</span>
            )}
          </div>

        </div>
      </section>

      {/* Main Layout */}
      <section className="section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', paddingTop: '2rem' }}>
        
        {/* Contact Form Pane */}
        <div className="glowing-card" style={{ padding: '3rem', background: 'var(--bg-surface)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '2rem', fontWeight: 500 }}>
            Send a <span style={{ color: 'var(--accent-bronze)' }}>Message</span>
          </h2>
          
          {formSubmitted ? (
            <div style={{ padding: '2rem 0', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <CheckCircle2 size={28} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Message Dispatched</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                Thank you. ZM concierge coordinators will verify coordinates and get in touch in 24 hours.
              </p>
              <button 
                className="border-beam-btn" 
                onClick={() => setFormSubmitted(false)}
                style={{ marginTop: '2rem', padding: '0.75rem 2rem', fontSize: '0.75rem' }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {formError && <span style={{ color: '#EF4444', fontSize: '0.75rem' }}>{formError}</span>}
              <div>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Your Name</label>
                <input
                  type="text"
                  required
                  maxLength={128} // Long Password / string DoS protection
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.02)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
                <input
                  type="email"
                  required
                  maxLength={128} // ReDoS limit
                  value={formData.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.02)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Subject</label>
                <input
                  type="text"
                  required
                  maxLength={128}
                  value={formData.subject}
                  onChange={(e) => handleFormChange('subject', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.02)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Commission Details</label>
                <textarea
                  rows={4}
                  required
                  maxLength={500}
                  value={formData.message}
                  onChange={(e) => handleFormChange('message', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.02)',
                    color: 'var(--text-primary)',
                    resize: 'none'
                  }}
                />
              </div>
              <button 
                type="submit" 
                className="border-beam-btn" 
                style={{ width: '100%', padding: '1rem 0', marginTop: '1rem' }}
              >
                Send Message <Send size={12} style={{ marginLeft: '0.5rem' }} />
              </button>
            </form>
          )}
        </div>

        {/* Office details & Animated Map */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Office Select tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {Object.keys(offices).map((key) => (
              <button
                key={key}
                onClick={() => setActiveOffice(key)}
                style={{
                  padding: '0.75rem 0',
                  borderRadius: '12px',
                  border: '1px solid ' + (activeOffice === key ? 'var(--accent-bronze)' : 'var(--border-color)'),
                  background: activeOffice === key ? 'rgba(197, 168, 128, 0.08)' : 'transparent',
                  color: activeOffice === key ? 'var(--accent-gold)' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  transition: 'var(--transition-fast)'
                }}
              >
                {offices[key].city.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Office Coordinates details */}
          <div style={{ padding: '2rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '20px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-bronze)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
              {offices[activeOffice].coords}
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 500 }}>
              {offices[activeOffice].city} Office
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={14} /> {offices[activeOffice].addr}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={14} /> {offices[activeOffice].phone}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={14} /> concierge@zmconstructions.com</span>
            </div>
          </div>

          {/* Stylized Animated Map Widget */}
          <div style={{
            height: '240px',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            background: 'var(--bg-surface)',
            position: 'relative'
          }}>
            {/* Grid pattern mimicking mapping streets */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              opacity: 0.8
            }} />
            
            {/* Diagonal streets */}
            <div style={{ position: 'absolute', top: '20%', left: 0, width: '120%', height: '2px', background: 'rgba(255,255,255,0.08)', transform: 'rotate(15deg)' }} />
            <div style={{ position: 'absolute', top: '70%', left: -10, width: '120%', height: '4px', background: 'rgba(255,255,255,0.08)', transform: 'rotate(-10deg)' }} />
            <div style={{ position: 'absolute', top: 0, left: '40%', width: '2px', height: '120%', background: 'rgba(255,255,255,0.08)', transform: 'rotate(5deg)' }} />

            {/* Glowing Pulsing Coordinate Marker */}
            <div style={{
              position: 'absolute',
              top: '55%',
              left: '52%',
              transform: 'translate(-50%, -50%)',
              zIndex: 3
            }}>
              {/* Pulsating ring */}
              <div 
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '-12px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '2px solid var(--accent-bronze)',
                  animation: 'mapPulse 2s infinite'
                }}
              />
              {/* Core Dot */}
              <div 
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--accent-gold)'
                }}
              />
            </div>
            
            {/* Map metadata watermark */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              fontSize: '0.65rem',
              color: 'var(--text-secondary)',
              letterSpacing: '0.05em'
            }}>
              ZM CORE CARTOGRAPHY • ACTIVE LINK
            </div>
          </div>

        </div>
      </section>

      <style>{`
        @keyframes mapPulse {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>

    </div>
  );
}
