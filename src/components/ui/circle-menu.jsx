'use client';

import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import React, { useState } from 'react';
import {
  Menu,
  X,
  BookOpen,
  Lightbulb,
  Zap,
  Images,
  Users,
  LogIn,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * NavItem
 * Maps a nav link to an icon. Icons are chosen to reflect the section theme.
 */
const NAV_ITEMS = [
  { label: 'About',       href: '#about',     icon: BookOpen  },
  { label: 'Motive',      href: '#motive',    icon: Lightbulb },
  { label: 'Experiences', href: '#experiences', icon: Zap      },
  { label: 'Gallery',     href: '#gallery',   icon: Images    },
  { label: 'Core Team',   href: '#core-team', icon: Users     },
  { label: 'Join Us',     href: '#join',      icon: LogIn     },
];

const CONSTANTS = {
  itemSize: 48,
  containerSize: 260,
  openStagger: 0.02,
  closeStagger: 0.07,
};

/* ── Helpers ─────────────────────────────────────────────── */
function getAngle(index, total) {
  // Distribute items in a 270° arc (top-left quadrant excluded so it doesn't
  // overlap the menu button itself).
  const start = 180;
  const arc = 270;
  return start + (arc / (total - 1)) * index;
}

function toCartesian(angleDeg, radius) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

/* ── Sub-item ────────────────────────────────────────────── */
function CircleMenuItem({ item, index, total, isOpen, onNavigate }) {
  const angle = getAngle(index, total);
  const radius = CONSTANTS.containerSize / 2 - CONSTANTS.itemSize / 2 - 4;
  const { x, y } = toCartesian(angle, radius);

  const center = CONSTANTS.containerSize / 2;
  const finalX = center + x - CONSTANTS.itemSize / 2;
  const finalY = center + y - CONSTANTS.itemSize / 2;

  const Icon = item.icon;

  return (
    <motion.div
      className="absolute"
      style={{ width: CONSTANTS.itemSize, height: CONSTANTS.itemSize }}
      initial={{ x: center - CONSTANTS.itemSize / 2, y: center - CONSTANTS.itemSize / 2, opacity: 0, scale: 0 }}
      animate={
        isOpen
          ? {
              x: finalX,
              y: finalY,
              opacity: 1,
              scale: 1,
              transition: {
                delay: index * CONSTANTS.openStagger,
                type: 'spring',
                stiffness: 380,
                damping: 24,
              },
            }
          : {
              x: center - CONSTANTS.itemSize / 2,
              y: center - CONSTANTS.itemSize / 2,
              opacity: 0,
              scale: 0,
              transition: {
                delay: (total - index - 1) * CONSTANTS.closeStagger,
                duration: 0.22,
                ease: [0.16, 1, 0.3, 1],
              },
            }
      }
    >
      <a
        href={item.href}
        onClick={onNavigate}
        aria-label={item.label}
        title={item.label}
        className={cn(
          'group relative flex flex-col items-center justify-center w-full h-full rounded-full',
          'border border-[#E9E5DF] bg-[#FCFBF8] shadow-md',
          'hover:bg-[#111111] hover:border-[#111111]',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]',
          'transition-colors duration-200',
        )}
      >
        <Icon
          className="w-4 h-4 text-[#595650] group-hover:text-white transition-colors duration-200"
          strokeWidth={1.75}
        />
        {/* Tooltip */}
        <span
          className={cn(
            'absolute -top-8 left-1/2 -translate-x-1/2',
            'whitespace-nowrap text-[10px] font-medium tracking-wide uppercase',
            'px-1.5 py-0.5 rounded bg-[#202020] text-[#FCFBF8]',
            'opacity-0 group-hover:opacity-100 pointer-events-none',
            'transition-opacity duration-150',
          )}
        >
          {item.label}
        </span>
      </a>
    </motion.div>
  );
}

/* ── Main CircleMenu ─────────────────────────────────────── */
export function CircleMenu({ className }) {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimationControls();

  const toggleOpen = async () => {
    if (isOpen) {
      await controls.start({ rotate: 0 });
    } else {
      await controls.start({ rotate: 135 });
    }
    setIsOpen((prev) => !prev);
  };

  const handleNavigate = () => {
    controls.start({ rotate: 0 });
    setIsOpen(false);
  };

  return (
    <div
      className={cn('relative', className)}
      style={{ width: CONSTANTS.containerSize, height: CONSTANTS.containerSize }}
      aria-label="Circle navigation menu"
    >
      {/* Radial items */}
      <AnimatePresence>
        {NAV_ITEMS.map((item, index) => (
          <CircleMenuItem
            key={item.href}
            item={item}
            index={index}
            total={NAV_ITEMS.length}
            isOpen={isOpen}
            onNavigate={handleNavigate}
          />
        ))}
      </AnimatePresence>

      {/* Central toggle button */}
      <motion.button
        id="circle-menu-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        onClick={toggleOpen}
        animate={controls}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className={cn(
          'absolute flex items-center justify-center rounded-full',
          'w-12 h-12',
          'bg-[#202020] border border-[#202020]',
          'shadow-lg hover:bg-[#111111] hover:border-[#111111]',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]',
          'transition-colors duration-200',
        )}
        style={{
          left: CONSTANTS.containerSize / 2 - CONSTANTS.itemSize / 2,
          top: CONSTANTS.containerSize / 2 - CONSTANTS.itemSize / 2,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
              transition={{ duration: 0.18 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 45, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -45, scale: 0.6 }}
              transition={{ duration: 0.18 }}
            >
              <Menu className="w-5 h-5 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

export default CircleMenu;
