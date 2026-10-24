import React, { useEffect, useRef } from 'react';

/**
 * ComputationalOrbital
 * An original, restrained mathematical orbital visual.
 * Features nested coordinate rings, orbital vectors, telemetry coordinates,
 * and delicate pointer parallax without generic glowing spheres.
 */
export const ComputationalOrbital = ({ mousePos = { x: 0, y: 0 } }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let angle = 0;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Handle high DPI
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Nodes orbiting in the vector system
    const orbitalNodes = [
      { radius: 70, speed: 0.012, offset: 0, size: 3.5, color: '#FFFFFF', label: 'GEN.AI' },
      { radius: 110, speed: -0.008, offset: Math.PI / 3, size: 2.5, color: '#CCCCCC', label: 'AGENT' },
      { radius: 155, speed: 0.006, offset: Math.PI, size: 3, color: '#888888', label: 'KERNEL' },
      { radius: 195, speed: -0.004, offset: (4 * Math.PI) / 3, size: 2, color: '#666666', label: 'EVAL' },
    ];

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Parallax offset based on mouse position
      const px = mousePos.x * 12;
      const py = mousePos.y * 12;
      const centerX = cx + px;
      const centerY = cy + py;

      if (!prefersReducedMotion) {
        angle += 0.008;
      }

      // Outer bounding quadrant frame
      ctx.strokeStyle = '#E9E5DF';
      ctx.lineWidth = 1;

      // Coordinate Crosshairs
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(centerX - 210, centerY);
      ctx.lineTo(centerX + 210, centerY);
      ctx.moveTo(centerX, centerY - 210);
      ctx.lineTo(centerX, centerY + 210);
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash

      // Concentric Rings
      const rings = [45, 70, 110, 155, 195];
      rings.forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = idx === 1 ? '#DCD7CE' : '#E9E5DF';
        ctx.lineWidth = idx === 1 ? 1.2 : 0.8;
        ctx.stroke();

        // Subtle tick marks along ring
        const tickCount = 12;
        for (let i = 0; i < tickCount; i++) {
          const tickAngle = (i / tickCount) * Math.PI * 2 + angle * (idx % 2 === 0 ? 0.3 : -0.3);
          const tx1 = centerX + Math.cos(tickAngle) * (r - 2);
          const ty1 = centerY + Math.sin(tickAngle) * (r - 2);
          const tx2 = centerX + Math.cos(tickAngle) * (r + 2);
          const ty2 = centerY + Math.sin(tickAngle) * (r + 2);
          ctx.beginPath();
          ctx.moveTo(tx1, ty1);
          ctx.lineTo(tx2, ty2);
          ctx.strokeStyle = '#DCD7CE';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Rotating Trigonometric Sweep Arc
      ctx.beginPath();
      ctx.arc(centerX, centerY, 155, angle * 0.7, angle * 0.7 + Math.PI / 4);
      ctx.strokeStyle = 'rgba(238, 67, 38, 0.45)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Orbiting Nodes & Vector Trails
      orbitalNodes.forEach((node) => {
        const currentAngle = angle * (node.speed / 0.008) + node.offset;
        const nx = centerX + Math.cos(currentAngle) * node.radius;
        const ny = centerY + Math.sin(currentAngle) * node.radius;

        // Vector line from center
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = 'rgba(233, 229, 223, 0.5)';
        ctx.lineWidth = 0.6;
        ctx.stroke();

        // Node circle
        ctx.beginPath();
        ctx.arc(nx, ny, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Node label
        ctx.font = '9px "Space Grotesk", monospace';
        ctx.fillStyle = '#8E8A82';
        ctx.fillText(node.label, nx + 6, ny + 3);
      });

      // Core Geometric Glyph: Precision Central Reticle
      ctx.beginPath();
      ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#202020';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Telemetry Coordinates readout (adjusted to prevent overlapping corner brackets)
      ctx.font = '10px ui-monospace, monospace';
      ctx.fillStyle = '#8E8A82';
      ctx.fillText('COORD · 18°27\'27"N 73°51\'02"E', centerX - 85, centerY + 175);
      ctx.fillText('CAMPUS · PUNE LABS', centerX - 55, centerY - 170);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePos]);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] flex items-center justify-center select-none overflow-hidden">
      {/* Background Architectural Corner Brackets */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-[#8E8A82]/80">
        + SYS.VECTOR // ORBITAL MATRIX
      </div>
      <div className="absolute top-4 right-4 font-mono text-[10px] text-[#8E8A82]/80">
        [TERM: 26-27]
      </div>
      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#8E8A82]/80">
        LAT: 18.4575° N
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[#8E8A82]/80">
        STATUS: ONLINE
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[500px] max-h-[500px]"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default ComputationalOrbital;
