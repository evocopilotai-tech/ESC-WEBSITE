/**
 * Central Team Dataset for EvoCopilot Student Chapter
 * Term: 2026–2027
 * High-Resolution Native Portrait Assets
 */

import yashiImg from '../assets/team/yashi_hq.jpg';
import abhiImg from '../assets/team/abhi_hq.jpg';
import kushagraImg from '../assets/team/kushagra dayal srivastava.jpg';
import tushitaImg from '../assets/team/tushita_hq.jpg';
import shashwatImg from '../assets/team/shashwat_hq.jpg';
import ayushImg from '../assets/team/ayush_hq.jpg';
import anushkaImg from '../assets/team/anushka_hq.jpg';
import ashmitImg from '../assets/team/ashmit_hq.jpg';

export const TEAM_CATEGORIES = [
  { id: 'all', label: 'All Members (8)' },
  { id: 'executive', label: 'Executive Council' },
  { id: 'technical', label: 'Technical' },
  { id: 'design', label: 'Design' },
  { id: 'events', label: 'Events' },
  { id: 'pr-marketing', label: 'PR & Marketing' },
];

export const CORE_MEMBERS = [
  // 1. CAMPUS PRESIDENT: Yashi Gupta
  {
    id: 'lead-yashi-gupta',
    category: 'executive',
    categoryLabel: 'Executive Council',
    role: 'CAMPUS PRESIDENT',
    roleTag: 'CAMPUS PRESIDENT',
    name: 'Yashi Gupta',
    isPlaceholder: false,
    bio: 'Directing chapter vision, institutional alignment, and cross-disciplinary technical initiatives across the chapter.',
    image: yashiImg,
    socials: {
      linkedin: 'https://www.linkedin.com/in/yashiiiguptaaa',
      github: null,
      email: null,
    },
  },

  // 2. VICE PRESIDENT: Abhi Chaudhary
  {
    id: 'lead-abhi-chaudhary',
    category: 'executive',
    categoryLabel: 'Executive Council',
    role: 'VICE PRESIDENT',
    roleTag: 'VICE PRESIDENT',
    name: 'Abhi Chaudhary',
    isPlaceholder: false,
    bio: 'Overseeing chapter operations, inter-departmental synergies, and strategic partnerships for student developers.',
    image: abhiImg,
    socials: {
      linkedin: 'https://www.linkedin.com/in/abhi-chaudhary-206987328',
      github: null,
      email: null,
    },
  },

  // 3. TECHNICAL HEAD: Kushagra Dayal Srivastava
  {
    id: 'tech-kushagra',
    category: 'technical',
    categoryLabel: 'Technical Team',
    role: 'TECHNICAL HEAD',
    roleTag: 'TECH HEAD',
    name: 'Kushagra Dayal Srivastava',
    isPlaceholder: false,
    bio: 'Spearheading hands-on code labs, AI agent architectures, and developer hackathon projects for members.',
    image: kushagraImg,
    socials: {
      linkedin: 'https://www.linkedin.com/in/kushagra-ds-924423376',
      github: null,
      email: null,
    },
  },

  // 4. EVENT MANAGEMENT HEAD: Tushita Baghel
  {
    id: 'event-tushita-baghel',
    category: 'events',
    categoryLabel: 'Events Team',
    role: 'EVENT MANAGEMENT HEAD',
    roleTag: 'EVENTS HEAD',
    name: 'Tushita Baghel',
    isPlaceholder: false,
    bio: 'Curating technical symposiums, hackathons, and immersive campus buildathon experiences.',
    image: tushitaImg,
    socials: {
      linkedin: 'https://www.linkedin.com/in/tushita-baghel-285755195',
      github: null,
      email: null,
    },
  },

  // 5. DESIGN HEAD: Shashwat Koul
  {
    id: 'design-shashwat',
    category: 'design',
    categoryLabel: 'Design Team',
    role: 'DESIGN HEAD',
    roleTag: 'DESIGN HEAD',
    name: 'Shashwat Koul',
    isPlaceholder: false,
    bio: 'Crafting brand visual languages, design systems, editorial aesthetics, and interactive user experiences.',
    image: shashwatImg,
    socials: {
      linkedin: 'https://www.linkedin.com/in/shashwat-koul-7525a3321',
      github: null,
      email: null,
    },
  },

  // 6. PUBLIC RELATION HEAD: Ayush Deore
  {
    id: 'pr-ayush-deore',
    category: 'pr-marketing',
    categoryLabel: 'PR & Marketing',
    role: 'PUBLIC RELATION HEAD',
    roleTag: 'PUBLIC RELATION HEAD',
    name: 'Ayush Deore',
    isPlaceholder: false,
    bio: 'Leading external relations, student outreach, and institutional communications for EvoCopilot.',
    image: ayushImg,
    socials: {
      linkedin: 'https://www.linkedin.com/in/ayush-deore-73926922a',
      github: null,
      email: null,
    },
  },

  // 7. SOCIAL MEDIA HEAD: Anushka
  {
    id: 'social-anushka',
    category: 'pr-marketing',
    categoryLabel: 'PR & Marketing',
    role: 'SOCIAL MEDIA HEAD',
    roleTag: 'SOCIAL MEDIA',
    name: 'Anushka',
    isPlaceholder: false,
    bio: 'Driving chapter storytelling, digital awareness, and engagement campaigns across developer channels.',
    image: anushkaImg,
    objectPosition: 'center 60%',
    socials: {
      linkedin: 'https://www.linkedin.com/in/anushka-987995324',
      github: null,
      email: null,
    },
  },

  // 8. MARKETING HEAD: Ashmit Vyawhare
  {
    id: 'marketing-ashmit-vyawhare',
    category: 'pr-marketing',
    categoryLabel: 'PR & Marketing',
    role: 'MARKETING HEAD',
    roleTag: 'MARKETING HEAD',
    name: 'Ashmit Vyawhare',
    isPlaceholder: false,
    bio: 'Strategizing chapter growth, campaign dissemination, and community branding initiatives.',
    image: ashmitImg,
    socials: {
      linkedin: 'https://www.linkedin.com/in/ashmit-vyawhare-644320316',
      github: null,
      email: null,
    },
  },
];

export default {
  TEAM_CATEGORIES,
  CORE_MEMBERS,
};
