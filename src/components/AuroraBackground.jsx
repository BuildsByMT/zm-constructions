import React, { useEffect, useRef } from 'react';

export default function AuroraBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class representing slowly moving color blobs
    class GlowBlob {
      constructor(x, y, radius, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.baseRadius = radius;
        this.radius = radius;
        this.color = color;
        this.vx = speedX;
        this.vy = speedY;
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off bounds with buffer
        if (this.x < -this.radius || this.x > width + this.radius) this.vx *= -1;
        if (this.y < -this.radius || this.y > height + this.radius) this.vy *= -1;

        // Pulse radius slightly
        this.angle += 0.002;
        this.radius = this.baseRadius + Math.sin(this.angle) * (this.baseRadius * 0.15);
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Set colors depending on dark/light mode
    const isLightMode = document.body.parentElement.getAttribute('data-theme') === 'light';
    
    // Luxury color palette blobs (gold, copper, warm bronze, deep slate)
    const blobs = [
      new GlowBlob(
        width * 0.2,
        height * 0.3,
        Math.min(width, height) * 0.45,
        'rgba(197, 168, 128, 0.09)', // accent bronze
        0.3,
        0.2
      ),
      new GlowBlob(
        width * 0.7,
        height * 0.4,
        Math.min(width, height) * 0.5,
        'rgba(229, 197, 149, 0.07)', // gold
        -0.2,
        0.3
      ),
      new GlowBlob(
        width * 0.5,
        height * 0.8,
        Math.min(width, height) * 0.4,
        'rgba(163, 134, 91, 0.08)', // copper/bronze
        0.25,
        -0.15
      ),
    ];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Watch for theme changes to adapt colors dynamically
    const observer = new MutationObserver(() => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const light = activeTheme === 'light';
      blobs[0].color = light ? 'rgba(163, 134, 91, 0.05)' : 'rgba(197, 168, 128, 0.09)';
      blobs[1].color = light ? 'rgba(197, 168, 128, 0.04)' : 'rgba(229, 197, 149, 0.07)';
      blobs[2].color = light ? 'rgba(163, 134, 91, 0.06)' : 'rgba(163, 134, 91, 0.08)';
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Create composite blending for a premium shader-like mix
      ctx.globalCompositeOperation = 'screen';
      blobs.forEach((blob) => {
        blob.update();
        blob.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="aurora-container">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
