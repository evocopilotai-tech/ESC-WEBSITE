/**
 * Central Chapter Configuration & Destination Links
 * All links and contact details for EvoCopilot Student Chapter (BV(DU)COEP Pune).
 */

export const CHAPTER_CONFIG = {
  name: 'EvoCopilot Student Chapter',
  shortName: 'EvoCopilot BV(DU)COEP',
  institution: 'Bharati Vidyapeeth College of Engineering, Pune',
  parentUniversity: 'Bharati Vidyapeeth Deemed University / SPPU Approved',
  campusLocation: 'Katraj-Dhankawadi, Pune, Maharashtra 411043, India',
  coordinates: '18°27\'27" N, 73°51\'02" E',
  academicTerm: '2026–2027 Term Active',

  // Recruitment & Join URLs
  membership: {
    applyUrl: 'https://chat.whatsapp.com/LyPvqlTDMzsLkdMp7GUGQK?s=cl&p=a&mlu=4&ilr=4',
    isApplicationOpen: true,
    batch: 'Term 2026–2027 Cohort',
    openTo: 'All engineering disciplines (FE to BE)',
  },

  // Official Channels
  socials: {
    github: 'https://github.com/evocopilot-BV(DU)COEP',
    linkedin: 'https://www.linkedin.com/company/evocopilot-student-chapter-bvdu-coep/',
    instagram: 'https://www.instagram.com/esc_bvpcoep?dlrf=NDM4cDl3OW83OW13',
    whatsapp: 'https://chat.whatsapp.com/LyPvqlTDMzsLkdMp7GUGQK?s=cl&p=a&mlu=4&ilr=4',
    email: 'evocopilotai@gmail.com',
  },

  hqUrl: 'https://evocopilot.com',
  bvcUrl: 'https://bvdudetch.bharatividyapeeth.edu',

  // Navigation Sitemap for Footer
  navigation: [
    { label: 'Overview', href: '#hero', index: '00' },
    { label: 'About Chapter', href: '#about', index: '01' },
    { label: 'Our Motive', href: '#motive', index: '02' },
    { label: 'Experiences & Activities', href: '#experiences', index: '03' },
    { label: 'Visual Archive', href: '#gallery', index: '04' },
    { label: 'Core Team', href: '#core-team', index: '05' },
    { label: 'Join Chapter', href: '#join-us', index: '06' },
  ],

  resources: [
    { label: 'Chapter Charter & Constitution', href: '#about' },
    { label: 'Core Team Directory', href: '#core-team' },
    { label: 'Experiences & Hackathons', href: '#experiences' },
    { label: 'Join Community WhatsApp', href: 'https://chat.whatsapp.com/LyPvqlTDMzsLkdMp7GUGQK?s=cl&p=a&mlu=4&ilr=4' },
  ],
};

export default CHAPTER_CONFIG;
