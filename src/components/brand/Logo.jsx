import React from 'react';
import emblemImg from '../../assets/brand/evocopilot-emblem.png';
import fullLogoImg from '../../assets/brand/evocopilot-full.png';

/**
 * Official EvoCopilot Brand Logo Component
 * Strictly preserves the authentic emblem, red-orange gradient, and aspect ratio.
 */
export const Logo = ({
  variant = 'compact', // 'compact' | 'emblem' | 'full'
  size = 'md',
  subtitle = 'Student Chapter',
  dark = false,
  inline = false,
  className = '',
}) => {
  const sizeMap = {
    sm: { img: 'h-7 w-7', title: 'text-sm', sub: 'text-[10px]' },
    md: { img: 'h-8.5 w-8.5', title: 'text-base', sub: 'text-[10px]' },
    lg: { img: 'h-11 w-11', title: 'text-lg', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  if (variant === 'full') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img
          src={fullLogoImg}
          alt="EvoCopilot Student Chapter Logo"
          className="h-10 w-auto object-contain"
          loading="eager"
        />
      </div>
    );
  }

  if (variant === 'emblem') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <img
          src={emblemImg}
          alt="EvoCopilot Emblem"
          className={`${currentSize.img} object-contain transition-transform duration-300 hover:scale-105`}
          loading="eager"
        />
      </div>
    );
  }

  // Authentic transparent emblem + EvoCopilot wordmark + Student Chapter descriptor
  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      <div className="relative flex items-center justify-center shrink-0">
        <img
          src={emblemImg}
          alt="EvoCopilot Official Emblem"
          className={`${currentSize.img} object-contain transition-transform duration-300 group-hover:scale-105`}
          loading="eager"
        />
      </div>

      <div className="flex items-center gap-2 text-left leading-none whitespace-nowrap">
        <span className={`font-semibold tracking-tight font-editorial-sans ${currentSize.title} text-white`}>
          EvoCopilot Student Chapter
        </span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EE4326] shrink-0" />
      </div>
    </div>
  );
};

export default Logo;
