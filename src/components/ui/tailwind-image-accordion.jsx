"use client";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const LinkedInIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
  </svg>
);

export function TailwindImageAccordion({ items = [], className = "" }) {
  if (!items || items.length === 0) return null;

  return (
    <div
      className={cn(
        "group flex max-md:flex-col justify-center gap-2.5 w-full mx-auto my-6",
        className
      )}
    >
      {items.map((item, i) => {
        const link = item?.socials?.linkedin || item?.href || "#";
        const hasExternalLink = item?.socials?.linkedin || item?.href;

        return (
          <article
            key={item?.id || item?.name || i}
            className="group/article relative w-full md:not-[&:hover]:group-hover:w-[12%] md:[&:not(:focus-within):not(:hover)]:group-focus-within:w-[12%] transition-all duration-500 ease-[cubic-bezier(.5,.85,.25,1.15)] rounded-2xl overflow-hidden border border-white/10 hover:border-[#EE4326]/60 bg-[#121212] shadow-[0_10px_30px_rgba(0,0,0,0.6)] before:absolute before:inset-x-0 before:bottom-0 before:h-2/3 before:bg-gradient-to-t before:from-black/95 before:via-black/60 before:to-transparent before:z-10 before:transition-opacity md:before:opacity-90 after:opacity-0 md:not-[&:hover]:group-hover:after:opacity-60 md:[&:not(:focus-within):not(:hover)]:group-focus-within:after:opacity-60 after:absolute after:inset-0 after:bg-black/40 after:backdrop-blur-[1px] after:rounded-2xl after:transition-all after:z-10 focus-within:ring-2 focus-within:ring-[#EE4326]"
          >
            {/* Overlay link & text contents */}
            <div className="absolute inset-0 z-20 p-4 sm:p-5 flex flex-col justify-between pointer-events-none">
              {/* Top role badge & category */}
              <div className="flex items-center justify-between gap-1">
                <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase text-white bg-black/80 border border-white/15 rounded-full font-semibold shadow-xs">
                  {item?.roleTag || item?.role}
                </span>

                {item?.categoryLabel && (
                  <span className="text-[10px] font-mono text-[#EE4326] font-semibold uppercase tracking-wider hidden sm:inline md:opacity-0 group-hover/article:opacity-100 transition duration-300">
                    {item?.categoryLabel}
                  </span>
                )}
              </div>

              {/* Bottom detail container */}
              <div className="flex flex-col">
                {/* Role title */}
                <span className="text-[11px] font-mono tracking-widest text-[#EE4326] font-semibold uppercase mb-1 md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-100 group-focus-within/article:delay-100">
                  {item?.role || item?.description}
                </span>

                {/* Name */}
                <h3 className="text-xl sm:text-2xl font-editorial-sans font-bold text-white md:whitespace-nowrap md:truncate leading-tight">
                  {item?.name || item?.title}
                </h3>

                {/* Department or class */}
                {item?.department && (
                  <span className="text-xs text-white/60 font-mono mt-0.5 md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-200 group-focus-within/article:delay-200">
                    {item?.department}
                  </span>
                )}

                {/* Bio text */}
                {item?.bio && (
                  <p className="text-xs text-white/75 font-editorial-sans mt-2 line-clamp-2 md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-300 group-focus-within/article:delay-300">
                    {item?.bio}
                  </p>
                )}

                {/* LinkedIn Action Button */}
                {hasExternalLink && (
                  <div className="mt-3 pointer-events-auto md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-400 group-focus-within/article:delay-400">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EE4326] hover:bg-[#d63a20] text-white text-xs font-mono font-medium transition-all shadow-md group/btn"
                      aria-label={`Connect with ${item?.name || item?.title} on LinkedIn`}
                    >
                      <LinkedInIcon className="w-3.5 h-3.5" />
                      <span>LinkedIn Connect</span>
                      <ArrowUpRight className="w-3 h-3 opacity-80 group-hover/btn:opacity-100" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Portrait Image */}
            <img
              className="object-cover h-80 sm:h-[420px] lg:h-[480px] w-full transition-transform duration-700 ease-out group-hover/article:scale-105"
              src={item?.image || item?.url}
              alt={item?.name || item?.title || "Team member portrait"}
              loading="lazy"
            />
          </article>
        );
      })}
    </div>
  );
}

export default TailwindImageAccordion;
