import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Calendar, MapPin, Tag } from 'lucide-react';
import WorksWheel from '../ui/works-wheel';
import { GALLERY_ITEMS } from '../../data/galleryData';

// Format items for WorksWheel preserving authentic images and meta
const wheelItems = GALLERY_ITEMS.map((item) => ({
  title: item.title,
  image: item.image,
  caption: item.caption,
  location: item.location,
  date: item.date,
  tag: item.tag || item.categoryLabel,
  href: `#gallery-${item.id}`,
  rawItem: item,
}));

export const Gallery = () => {
  const [activeModalItem, setActiveModalItem] = useState(null);

  return (
    <section id="gallery" className="relative w-full bg-[#0A0A0A] border-b border-white/10 overflow-hidden">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-white/10">
          <div className="flex items-center gap-4">
            <span className="font-editorial-serif text-5xl sm:text-6xl text-white/30 font-normal leading-none select-none">
              04
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#EE4326] font-semibold">
                CHAPTER VISUAL ARCHIVE // 3D RECORD
              </span>
              <span className="text-xs text-white/60 tracking-wider uppercase font-medium">
                BV(DU)COEP Pune · 21 High-Resolution Historical Records
              </span>
            </div>
          </div>

          <div className="mt-4 sm:mt-0 font-mono text-[11px] text-white/50 flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#EE4326] animate-pulse" />
            <span>INTERACTIVE WHEEL // DRAG TO TURN</span>
          </div>
        </div>

        <div className="mt-6 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif font-normal text-white tracking-tight">
            Moments forged in <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#EE4326] via-[#F48A25] to-[#EE4326]">curiosity</span> and code.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60 font-editorial-sans leading-relaxed">
            From the charter inception ceremony with college administration to student workshops, hackathons, and technical deep-dives. Turn the wheel to browse our visual journey.
          </p>
        </div>
      </div>

      {/* 3D Works Wheel Component */}
      <div className="w-full relative">
        <WorksWheel
          items={wheelItems}
          label="Visual Archive '26"
          action="Expand"
          onSelectImage={(item) => setActiveModalItem(item.rawItem || item)}
        />
      </div>

      {/* Lightbox Modal for Full Image View */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setActiveModalItem(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full max-h-[92vh] bg-[#141414] border border-white/15 rounded-xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 text-white hover:bg-[#EE4326] transition-colors border border-white/20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Frame */}
              <div className="relative w-full max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="max-h-[65vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Caption & Metadata Footer */}
              <div className="p-5 sm:p-6 bg-[#141414] border-t border-white/10 flex flex-col gap-2">
                <div className="flex items-center gap-3 font-mono text-xs text-[#EE4326]">
                  <span className="px-2 py-0.5 rounded-xs bg-white/5 border border-white/10">
                    {activeModalItem.tag || 'ARCHIVE'}
                  </span>
                  {activeModalItem.location && (
                    <span className="flex items-center gap-1 text-white/50">
                      <MapPin className="w-3.5 h-3.5" />
                      {activeModalItem.location}
                    </span>
                  )}
                  {activeModalItem.date && (
                    <span className="flex items-center gap-1 text-white/50 hidden sm:flex">
                      <Calendar className="w-3.5 h-3.5" />
                      {activeModalItem.date}
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-editorial-serif text-white font-medium">
                  {activeModalItem.title}
                </h3>
                {activeModalItem.caption && (
                  <p className="text-xs sm:text-sm text-white/70 font-editorial-sans leading-relaxed">
                    {activeModalItem.caption}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
