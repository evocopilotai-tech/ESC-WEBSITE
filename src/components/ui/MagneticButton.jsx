import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * MagneticButton
 * Subtle, restrained pointer attraction effect on desktop.
 * Automatically disabled on mobile touch devices and when prefers-reduced-motion is active.
 */
export const MagneticButton = ({
  children,
  className = '',
  strength = 0.2, // restrained subtle pull
  onClick,
  href,
  target,
  rel,
  id,
}) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const checkSupport = () => {
      setIsFinePointer(media.matches && !reducedMotion.matches);
    };

    checkSupport();
    media.addEventListener('change', checkSupport);
    reducedMotion.addEventListener('change', checkSupport);

    return () => {
      media.removeEventListener('change', checkSupport);
      reducedMotion.removeEventListener('change', checkSupport);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!isFinePointer || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const hasDisplayClass = /\b(hidden|block|flex|inline-flex|inline-block)\b/.test(className);
  const baseDisplay = hasDisplayClass ? '' : 'inline-flex';

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref}
      id={id}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 280, damping: 22, mass: 0.1 }}
      className={`relative items-center justify-center ${baseDisplay} ${className}`}
    >
      {children}
    </Tag>
  );
};

export default MagneticButton;
