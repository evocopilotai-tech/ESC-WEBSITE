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
        /* Mobile: vertical stack | md+: horizontal accordion */
        "group flex flex-col md:flex-row justify-center gap-3 w-full mx-auto my-6",
        className
      )}
    >
      {items.map((item, i) => {
        const link = item?.socials?.linkedin || item?.href || "#";
        const hasExternalLink = item?.socials?.linkedin || item?.href;

        return (
          <article
            key={item?.id || item?.name || i}
            className="group/article relative w-full md:not-[&:hover]:group-hover:w-[12%] md:[&:not(:focus-within):not(:hover)]:group-focus-within:w-[12%] transition-all duration-500 ease-[cubic-bezier(.5,.85,.25,1.15)] rounded-2xl overflow-hidden border border-white/10 hover:border-[#EE4326]/60 bg-[#121212] shadow-[0_10px_30px_rgba(0,0,0,0.6)] before:absolute before:inset-x-0 before:bottom-0 before:h-1/3 before:bg-gradient-to-t before:from-black/98 before:via-black/70 before:to-transparent before:z-10 focus-within:ring-2 focus-within:ring-[#EE4326]"
          >
            {/* Portrait — objectPosition is per-member to crop to face */}
            <img
              className="object-cover h-72 sm:h-88 md:h-[420px] lg:h-[500px] w-full transition-transform duration-700 ease-out group-hover/article:scale-105"
              style={{ objectPosition: item?.objectPosition || 'center 25%' }}
              src={item?.image || item?.url}
              alt={item?.name || item?.title || "Team member portrait"}
              loading="lazy"
            />

            {/* Text overlay — subtle scrim only at the very bottom so face remains completely unobstructed */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 flex flex-col justify-end pointer-events-none bg-gradient-to-t from-black/95 via-black/75 to-transparent pt-12">
              <div className="flex flex-col gap-1">
                {/* Role — orange mono tag */}
                <span className="text-[10px] font-mono tracking-widest text-[#EE4326] font-semibold uppercase">
                  {item?.role || item?.description}
                </span>

                {/* Name */}
                <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  {item?.name || item?.title}
                </h3>

                {/* LinkedIn button */}
                {hasExternalLink && (
                  <div className="mt-2 pointer-events-auto">
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EE4326] hover:bg-[#d93829] active:bg-[#c0321b] text-white text-xs font-mono font-medium shadow-md transition-colors"
                      aria-label={`Connect with ${item?.name || item?.title} on LinkedIn`}
                    >
                      <LinkedInIcon className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3 h-3 opacity-80" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default TailwindImageAccordion;
