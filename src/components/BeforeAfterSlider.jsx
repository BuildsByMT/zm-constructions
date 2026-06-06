import React, { useState, useRef, useEffect } from 'react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) { // Left mouse button clicked
      handleMove(e.clientX);
    }
  };

  const handleClick = (e) => {
    handleMove(e.clientX);
  };

  return (
    <div 
      ref={containerRef} 
      className="interactive-slider-container"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
      style={{
        position: 'relative',
        width: '100%',
        height: '550px',
        overflow: 'hidden',
        borderRadius: '24px',
        border: '1px solid var(--border-color)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        cursor: 'ew-resize',
        userSelect: 'none'
      }}
    >
      {/* Before Image (Framing / Construction) */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}
      >
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '8px 16px',
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          color: '#ffffff',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 600
        }}>
          Phase 1: Structure & Framing
        </div>
      </div>

      {/* After Image (Completed Luxury Villa) */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          zIndex: 2,
          transition: 'clip-path 0.05s ease-out'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '8px 16px',
          background: 'var(--accent-bronze)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '20px',
          color: '#ffffff',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 600
        }}>
          Phase 5: Luxury Delivery
        </div>
      </div>

      {/* Slider Bar Separator */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: `${sliderPosition}%`,
          width: '2px',
          height: '100%',
          backgroundColor: 'var(--accent-bronze)',
          zIndex: 3,
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          pointerEvents: 'none',
          transition: 'left 0.05s ease-out'
        }}
      >
        {/* Handle */}
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-surface)',
            border: '2px solid var(--accent-bronze)',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
            cursor: 'ew-resize'
          }}
        >
          <svg 
            width="18" 
            height="12" 
            viewBox="0 0 18 12" 
            fill="none" 
            stroke="var(--accent-bronze)" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M6 2L2 6l4 4M12 2l4 4-4 4" />
          </svg>
        </div>
      </div>
    </div>
  );
}
