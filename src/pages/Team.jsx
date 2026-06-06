import React, { useState } from 'react';
import { Mail, ArrowUpRight, Globe, Briefcase } from 'lucide-react';

export default function Team() {
  const [activeBio, setActiveBio] = useState(null);

  const team = [
    {
      id: 1,
      name: 'Zakaria M. Al-Husseini',
      role: 'Founder & Principal Engineer',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
      creds: 'M.S. Structural Engineering (Stanford)',
      bio: 'Zakaria has spent over 20 years managing complex structural builds. He founded ZM Constructions to bridge the gap between architectural art and rigid engineering safety parameters. He personally oversees all site caisson drills and foundation pours.'
    },
    {
      id: 2,
      name: 'Elena Rostova',
      role: 'Principal Design Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      creds: 'B.Arch (Cornell University)',
      bio: 'Elena directs the spatial styling, custom joinery blueprints, and interior coordinates. Before joining ZM, she designed boutique hotels in Milan and Tokyo. She is obsessive about concealed vents and seamless door alignments.'
    },
    {
      id: 3,
      name: 'Marcus Vance',
      role: 'Finishing Master & Craft Lead',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
      creds: '25+ Years Master Joinery',
      bio: 'Marcus leads our team of finishing carpenters, stone masons, and iron smiths. He ensures that every joint, pivot, and seal meets our zero-tolerance luxury requirements. If a alignment is off by even 1mm, Marcus orders it redone.'
    }
  ];

  return (
    <div style={{ paddingTop: '100px' }}>
      
      {/* Header */}
      <section className="section" style={{ paddingBottom: '3rem' }}>
        <span className="section-subtitle">THE CRAFTSMEN</span>
        <h1 className="hero-title" style={{ fontSize: '4.5rem' }}>
          Mastery in <span className="shiny-text">Every Discipline</span>
        </h1>
        <p className="hero-desc" style={{ maxWidth: '650px' }}>
          Meet the builders, engineers, and detail-obsessed directors coordinating ZM Constructions' structural developments.
        </p>
      </section>

      {/* Editorial Team Presentation */}
      <section style={{ width: '90%', maxWidth: '1200px', margin: '0 auto 6rem auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {team.map((member) => (
            <div 
              key={member.id}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '3rem',
                alignItems: 'center',
                paddingBottom: '4rem',
                borderBottom: '1px solid var(--border-color)'
              }}
            >
              {/* Image Column */}
              <div 
                className="interactive-hover"
                style={{
                  height: '450px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid var(--border-color)'
                }}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Bio Column */}
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-bronze)', fontWeight: 600, letterSpacing: '0.1em' }}>
                  {member.role}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', marginTop: '0.5rem', marginBottom: '1rem', fontWeight: 500 }}>
                  {member.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  <Briefcase size={14} /> {member.creds}
                </div>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.75', marginBottom: '2rem' }}>
                  {member.bio}
                </p>

                {/* Social links */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a 
                    href="#portfolio"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'var(--transition-fast)'
                    }}
                    className="team-social-btn"
                  >
                    <Globe size={16} />
                  </a>
                  <a 
                    href="#email"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'var(--transition-fast)'
                    }}
                    className="team-social-btn"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      <style>{`
        .team-social-btn:hover {
          background: var(--accent-bronze) !important;
          color: #ffffff !important;
          border-color: transparent !important;
          transform: translateY(-2px);
        }
      `}</style>

    </div>
  );
}
