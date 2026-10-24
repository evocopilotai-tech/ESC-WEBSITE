import React from 'react';
import { CHAPTER_CONFIG } from '../../data/chapterConfig';
import StarburstThanksFooter from '../ui/starburst-thanks-footer';
import { Logo } from '../brand/Logo';

export const Footer = () => {
  const thanksWords = [
    "Thank you",
    "Dhanyavad",
    "Shukran",
    "Gracias",
    "Merci",
    "Danke",
    "Arigato",
  ];

  const socialLinks = [
    {
      caption: "Follow chapter stories",
      label: "Instagram",
      href: CHAPTER_CONFIG.socials.instagram,
    },
    {
      caption: "Connect with chapter network",
      label: "LinkedIn Organization",
      href: CHAPTER_CONFIG.socials.linkedin,
    },
    {
      caption: "Join student discussions",
      label: "Community WhatsApp",
      href: CHAPTER_CONFIG.socials.whatsapp,
    },
  ];

  return (
    <footer id="footer" className="w-full bg-[#111111] text-[#FCFBF8]">
      <StarburstThanksFooter
        name="EvoCopilot"
        thanks={thanksWords}
        tagline="for exploring with us"
        signoff="Ideas into intelligence. Intelligence into impact."
        links={socialLinks}
        email={CHAPTER_CONFIG.socials.email}
        phone=""
        background="#0A0A0A"
        ink="#FCFBF8"
        accent="#EE4326"
        height="100svh"
        starPoints={12}
        logo={
          <div className="flex items-center gap-3">
            <Logo
              variant="compact"
              size="md"
              subtitle="Student Chapter"
              dark={true}
            />
          </div>
        }
      />
    </footer>
  );
};

export default Footer;
