import type { Project } from '../types/project';
import kasaCover from '../assets/kasa.png';
import kasaVideo from '../assets/videos/kasa.mp4';
import grimoireCover from '../assets/mon-vieux-grimoire.png';
import grimoireVideo from '../assets/videos/grimoire.mp4';
import sophieBluelCover from '../assets/sophie-bluel.png';
import sophieBluelVideo from '../assets/videos/sophiebluel.mp4';
import noitamapCover from '../assets/noitamap.png';
import pokemonFarmerCover from '../assets/pokemonFarmer.png';
import projectmCover from '../assets/projectm.png';
import aimTrainingCover from '../assets/aim-training.jpg';
import inputPerSecondCover from '../assets/input-per-second.jpg';

// All text lives in src/i18n/en.json and fr.json; these are the keys.
// The role bullets are drafts: rewrite them with what you actually did.
export const projects: Project[] = [
  {
    id: 'noitamap',
    category: 'personal',
    era: 'ai-first',
    title: 'PROJECT_NOITAMAP_TITLE',
    summary: 'PROJECT_NOITAMAP_SUMMARY',
    role: [
      'PROJECT_NOITAMAP_ROLE_1',
      'PROJECT_NOITAMAP_ROLE_2',
      'PROJECT_NOITAMAP_ROLE_3',
      'PROJECT_NOITAMAP_ROLE_4',
    ],
    stack: ['JavaScript', 'Vite', 'WebSocket', 'Lua'],
    cover: { src: noitamapCover, alt: 'PROJECT_NOITAMAP_COVER_ALT' },
    repoUrl: 'https://github.com/MarronFrui/noita-livemap',
    status: 'in-progress',
  },
  {
    id: 'kasa',
    category: 'openclassrooms',
    title: 'PROJECT_KASA_TITLE',
    summary: 'PROJECT_KASA_SUMMARY',
    role: [
      'PROJECT_KASA_ROLE_1',
      'PROJECT_KASA_ROLE_2',
      'PROJECT_KASA_ROLE_3',
      'PROJECT_KASA_ROLE_4',
    ],
    stack: ['React', 'Sass', 'React Router', 'Vite'],
    cover: { src: kasaCover, alt: 'PROJECT_KASA_COVER_ALT' },
    video: kasaVideo,
    repoUrl: 'https://github.com/MarronFrui/kasa-openclassroom',
    status: 'done',
  },
  {
    id: 'mon-vieux-grimoire',
    category: 'openclassrooms',
    title: 'PROJECT_MON_VIEUX_GRIMOIRE_TITLE',
    summary: 'PROJECT_MON_VIEUX_GRIMOIRE_SUMMARY',
    role: [
      'PROJECT_MON_VIEUX_GRIMOIRE_ROLE_1',
      'PROJECT_MON_VIEUX_GRIMOIRE_ROLE_2',
      'PROJECT_MON_VIEUX_GRIMOIRE_ROLE_3',
      'PROJECT_MON_VIEUX_GRIMOIRE_ROLE_4',
    ],
    stack: ['Express', 'Node.js', 'MongoDB'],
    cover: { src: grimoireCover, alt: 'PROJECT_MON_VIEUX_GRIMOIRE_COVER_ALT' },
    video: grimoireVideo,
    repoUrl: 'https://github.com/MarronFrui/mon-vieux-grimoire',
    status: 'done',
  },
  {
    id: 'site-sophie-bluel',
    category: 'openclassrooms',
    title: 'PROJECT_SITE_SOPHIE_BLUEL_TITLE',
    summary: 'PROJECT_SITE_SOPHIE_BLUEL_SUMMARY',
    role: [
      'PROJECT_SITE_SOPHIE_BLUEL_ROLE_1',
      'PROJECT_SITE_SOPHIE_BLUEL_ROLE_2',
      'PROJECT_SITE_SOPHIE_BLUEL_ROLE_3',
      'PROJECT_SITE_SOPHIE_BLUEL_ROLE_4',
    ],
    stack: ['JavaScript', 'Sass', 'HTML', 'Fetch API'],
    cover: { src: sophieBluelCover, alt: 'PROJECT_SITE_SOPHIE_BLUEL_COVER_ALT' },
    video: sophieBluelVideo,
    repoUrl: 'https://github.com/MarronFrui/Site-sophie-bluel-educational',
    status: 'done',
  },
  {
    id: 'pokemon-farmer',
    category: 'personal',
    era: 'pre-ai',
    title: 'PROJECT_POKEMON_FARMER_TITLE',
    summary: 'PROJECT_POKEMON_FARMER_SUMMARY',
    role: [
      'PROJECT_POKEMON_FARMER_ROLE_1',
      'PROJECT_POKEMON_FARMER_ROLE_2',
      'PROJECT_POKEMON_FARMER_ROLE_3',
    ],
    stack: ['Python', 'OpenCV', 'Win32 API', 'mGBA'],
    cover: { src: pokemonFarmerCover, alt: 'PROJECT_POKEMON_FARMER_COVER_ALT' },
    repoUrl: 'https://github.com/MarronFrui/pokemon-farmer',
    status: 'in-progress',
  },
  {
    id: 'projectm',
    category: 'personal',
    era: 'pre-ai',
    title: 'PROJECT_PROJECTM_TITLE',
    summary: 'PROJECT_PROJECTM_SUMMARY',
    role: [
      'PROJECT_PROJECTM_ROLE_1',
      'PROJECT_PROJECTM_ROLE_2',
      'PROJECT_PROJECTM_ROLE_3',
      'PROJECT_PROJECTM_ROLE_4',
    ],
    stack: ['React', 'Express', 'TypeScript', 'Vite'],
    cover: { src: projectmCover, alt: 'PROJECT_PROJECTM_COVER_ALT' },
    repoUrl: 'https://github.com/MarronFrui/ProjectM',
    status: 'in-progress',
  },
  {
    id: 'aim-training',
    category: 'personal',
    era: 'pre-ai',
    title: 'PROJECT_AIM_TRAINING_TITLE',
    summary: 'PROJECT_AIM_TRAINING_SUMMARY',
    role: [
      'PROJECT_AIM_TRAINING_ROLE_1',
      'PROJECT_AIM_TRAINING_ROLE_2',
      'PROJECT_AIM_TRAINING_ROLE_3',
      'PROJECT_AIM_TRAINING_ROLE_4',
      'PROJECT_AIM_TRAINING_ROLE_5',
    ],
    stack: ['JavaScript', 'D3', 'CSS', 'Vite'],
    cover: { src: aimTrainingCover, alt: 'PROJECT_AIM_TRAINING_COVER_ALT' },
    repoUrl: 'https://github.com/MarronFrui/Aim-Training',
    liveUrl: 'https://marronfrui.github.io/Aim-Training/',
    status: 'done',
  },
  {
    id: 'input-per-second',
    category: 'personal',
    era: 'pre-ai',
    title: 'PROJECT_INPUT_PER_SECOND_TITLE',
    summary: 'PROJECT_INPUT_PER_SECOND_SUMMARY',
    role: [
      'PROJECT_INPUT_PER_SECOND_ROLE_1',
      'PROJECT_INPUT_PER_SECOND_ROLE_2',
      'PROJECT_INPUT_PER_SECOND_ROLE_3',
      'PROJECT_INPUT_PER_SECOND_ROLE_4',
    ],
    stack: ['JavaScript', 'HTML', 'CSS', 'Vite'],
    cover: { src: inputPerSecondCover, alt: 'PROJECT_INPUT_PER_SECOND_COVER_ALT' },
    repoUrl: 'https://github.com/MarronFrui/input-per-second',
    liveUrl: 'https://marronfrui.github.io/input-per-second/',
    status: 'done',
  },
];
