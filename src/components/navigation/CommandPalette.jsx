import React, { useEffect, useState, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen, Calendar, Users, Cpu, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const COMMAND_ITEMS = [
  {
    category: 'Sections',
    items: [
      { id: 'sec-overview', label: 'Chapter Overview & Mission', icon: BookOpen, href: '#overview', tag: 'About' },
      { id: 'sec-initiatives', label: 'AI & Developer Intelligence Initiatives', icon: Cpu, href: '#initiatives', tag: 'Programs' },
      { id: 'sec-research', label: 'EvoCopilot Research & Open Source Labs', icon: FileText, href: '#research', tag: 'Research' },
      { id: 'sec-events', label: 'Upcoming Hackathons & Tech Symposia', icon: Calendar, href: '#events', tag: 'Events' },
      { id: 'sec-council', label: 'Executive Board & Faculty Advisory', icon: Users, href: '#council', tag: 'People' },
    ],
  },
  {
    category: 'Institutional Resources',
    items: [
      { id: 'doc-charter', label: 'Chapter Constitution & Bylaws', icon: FileText, href: '#charter', tag: 'Bylaws' },
      { id: 'doc-membership', label: 'Membership Application Form', icon: ArrowRight, href: '#membership', tag: 'Apply' },
      { id: 'doc-BV(DU)COEP', label: 'BV(DU)COEP Pune Engineering Portal', icon: ArrowRight, href: 'https://bvdudetch.bharatividyapeeth.edu', tag: 'Campus' },
    ],
  },
];

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Will be handled by parent if state controlled
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredCategories = COMMAND_ITEMS.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.tag.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#202020]/40 backdrop-blur-xs">
        {/* Backdrop dismiss */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-[#FCFBF8] border border-[#DCD7CE] shadow-2xl rounded-xs overflow-hidden z-10"
        >
          {/* Search Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-[#E9E5DF] bg-[#FFFFFF]">
            <Search className="w-4 h-4 text-[#111111] mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chapter directories, initiatives, council..."
              className="w-full bg-transparent text-sm text-[#202020] placeholder-[#8E8A82] focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-xs text-[#8E8A82] hover:text-[#202020] px-1 mr-1"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#8E8A82] hover:text-[#202020] rounded-xs"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[#F2EFEB]">
            {filteredCategories.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#8E8A82]">
                No matching chapter resources found for "{query}".
              </div>
            ) : (
              filteredCategories.map((group) => (
                <div key={group.category} className="py-2 first:pt-0 last:pb-0">
                  <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#8E8A82]">
                    {group.category}
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.id}
                          href={item.href}
                          onClick={onClose}
                          className="flex items-center justify-between px-3 py-2 text-xs text-[#202020] hover:bg-[#F6F4EF] hover:text-black rounded-xs transition-colors group"
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-3.5 h-3.5 text-[#8E8A82] group-hover:text-black" />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#EFECE5] text-[#595650] rounded-xs border border-[#E9E5DF]">
                            {item.tag}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Command Footer */}
          <div className="px-4 py-2 border-t border-[#E9E5DF] bg-[#F6F4EF] flex items-center justify-between text-[11px] text-[#8E8A82]">
            <div className="flex items-center gap-3">
              <span>Navigation shortcut: <kbd className="font-mono bg-white px-1 border border-[#E9E5DF]">↑</kbd> <kbd className="font-mono bg-white px-1 border border-[#E9E5DF]">↓</kbd></span>
              <span>Select: <kbd className="font-mono bg-white px-1 border border-[#E9E5DF]">↵</kbd></span>
            </div>
            <span>Press <kbd className="font-mono bg-white px-1 border border-[#E9E5DF]">ESC</kbd> to exit</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
