import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const cursorRingRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let dotX = 0;
    let dotY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsHidden(false);
    };

    const onMouseLeave = () => {
      setIsHidden(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      // Lerp (Linear Interpolation) for smooth tracking
      // Ring moves slower (0.15 speed) for a premium lag effect
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      
      // Dot moves faster (0.35 speed)
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(render);
    };

    const requestRef = requestAnimationFrame(render);

    // Event listener to scale cursor on hover
    const addHoverEvents = () => {
      const interactives = document.querySelectorAll('a, button, input, select, textarea, [role="button"], .interactive-hover');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    // Set up observer to track dynamically added elements
    const observer = new MutationObserver(addHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });
    
    addHoverEvents();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(requestRef);
      observer.disconnect();
    };
  }, []);

  if (isHidden) return null;

  return (
    <div className={`cursor-wrapper ${isHovered ? 'cursor-hover' : ''}`}>
      <div ref={cursorRingRef} className="custom-cursor" />
      <div ref={cursorDotRef} className="custom-cursor-dot" />
    </div>
  );
}
