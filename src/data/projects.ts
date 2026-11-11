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

export const projects: Project[] = [
  {
    id: 'kasa',
    category: 'professional',
    title: { en: 'Kasa', fr: 'Kasa' },
    summary: {
      en: 'A rental-listing web app built as an educational project with React.',
      fr: 'Une application web de locations immobilières, projet pédagogique en React.',
    },
    description: {
      en: 'Kasa is an OpenClassrooms project: a rental marketplace in the spirit of Airbnb. Housing listings with galleries, detail pages and a router-based navigation, structured as reusable React components with Sass styling.',
      fr: "Kasa est un projet OpenClassrooms : un site de locations immobilières dans l'esprit d'Airbnb. Des annonces de logement avec galeries, des pages de détail et une navigation par routeur, structurés en composants React réutilisables stylés en Sass.",
    },
    stack: ['React', 'Sass', 'React Router', 'Vite'],
    cover: {
      src: kasaCover,
      alt: {
        en: 'Preview of the Kasa rental listing app',
        fr: "Aperçu de l'application de locations Kasa",
      },
    },
    video: kasaVideo,
    repoUrl: 'https://github.com/MarronFrui/kasa-openclassroom',
    status: 'done',
  },
  {
    id: 'mon-vieux-grimoire',
    category: 'professional',
    title: { en: 'Mon Vieux Grimoire', fr: 'Mon Vieux Grimoire' },
    summary: {
      en: 'A book-rating platform backed by an Express REST API — shows full-stack range.',
      fr: 'Une plateforme de notation de livres adossée à une API REST Express — montre la range full-stack.',
    },
    description: {
      en: 'Mon Vieux Grimoire is an OpenClassrooms project focused on the back end: an Express + MongoDB REST API powering a book-rating site. Authentication with hashed passwords and JSON Web Tokens, CRUD on books, a rating system with user-unique votes, and image optimization with Sharp. The provided React front end consumes the API.',
      fr: "Mon Vieux Grimoire est un projet OpenClassrooms centré sur le back end : une API REST Express + MongoDB qui alimente un site de notation de livres. Authentification avec mots de passe hachés et JSON Web Tokens, CRUD sur les livres, système de notation avec votes uniques par utilisateur, et optimisation des images avec Sharp. Le front end React fourni consomme l'API.",
    },
    stack: ['Express', 'Node.js', 'MongoDB', 'JWT'],
    cover: {
      src: grimoireCover,
      alt: {
        en: 'Preview of the Mon Vieux Grimoire book rating app',
        fr: "Aperçu de l'application de notation de livres Mon Vieux Grimoire",
      },
    },
    video: grimoireVideo,
    repoUrl: 'https://github.com/MarronFrui/mon-vieux-grimoire',
    status: 'done',
  },
  {
    id: 'site-sophie-bluel',
    category: 'professional',
    title: { en: 'Sophie Bluel', fr: 'Sophie Bluel' },
    summary: {
      en: "An architect's portfolio website in vanilla JavaScript — a classic OC front-end project.",
      fr: "Le site portfolio d'une architecte en JavaScript vanilla — un projet front-end OC classique.",
    },
    description: {
      en: 'Sophie Bluel is an OpenClassrooms project: the portfolio website of an architect, built with vanilla JavaScript. A dynamic works gallery with category filters, an admin login that unlocks an edit mode with modals to add or delete projects, and communication with a REST API through fetch. HTML, Sass and JavaScript only — no framework.',
      fr: "Sophie Bluel est un projet OpenClassrooms : le site portfolio d'une architecte, réalisé en JavaScript vanilla. Une galerie dynamique des travaux avec filtres par catégorie, une connexion admin qui débloque un mode édition avec modales pour ajouter ou supprimer des projets, et la communication avec une API REST via fetch. HTML, Sass et JavaScript uniquement — sans framework.",
    },
    stack: ['JavaScript', 'Sass', 'HTML', 'Fetch API'],
    cover: {
      src: sophieBluelCover,
      alt: {
        en: 'Preview of the Sophie Bluel architect portfolio website',
        fr: "Aperçu du site portfolio de l'architecte Sophie Bluel",
      },
    },
    video: sophieBluelVideo,
    repoUrl: 'https://github.com/MarronFrui/Site-sophie-bluel-educational',
    status: 'done',
  },
  {
    id: 'noitamap',
    category: 'personal',
    title: { en: 'Noita Livemap', fr: 'Noita Livemap' },
    summary: {
      en: 'Originally a fork of a live interactive map for Noita that tracks your player position in real time. It grew as a reverse engineering project that can currently replicate the Noita map on anyseed, giving to the player a live map when starting a game',
      fr: "À l'origine, il s'agissait d'un fork d'une carte interactive en temps réel pour Noita, permettant de suivre la position du joueur. Le projet a évolué grâce à des travaux de reverse engineering ; il est désormais capable de reproduire la carte de Noita pour n'importe quelle seed, offrant ainsi au joueur une carte en temps réel dès le début de la partie.",
    },
    description: {
      en: 'Noita Livemap is a fork of the community noitamap viewer, extended with a live position tracker: a Noita Lua mod streams seed, biome and coordinates over WebSocket to the map, driving a red player marker that stays centered on your run. Placeholder entry — more screenshots and a full write-up are coming.',
      fr: "Noita Livemap est un fork du visualiseur communautaire noitamap, étendu avec un suiveur de position en temps réel : un mod Lua de Noita transmet la seed, le biome et les coordonnées en WebSocket vers la carte, pour un marqueur rouge qui reste centré sur votre partie. Entrée provisoire — d'autres captures et un descriptif complet arrivent.",
    },
    stack: ['JavaScript', 'Vite', 'WebSocket', 'Lua'],
    cover: {
      src: noitamapCover,
      alt: {
        en: 'Screenshot of the Noita Livemap viewer showing the world map and seed panel',
        fr: "Capture d'écran de Noita Livemap montrant la carte du monde et le panneau de seed",
      },
    },
    repoUrl: 'https://github.com/MarronFrui/noita-livemap',
    status: 'in-progress',
  },
  {
    id: 'pokemon-farmer',
    category: 'personal',
    title: { en: 'Pokémon Farmer', fr: 'Pokémon Farmer' },
    summary: {
      en: 'A program that will spam encounter to find a shiny pokemons on GBA versions',
      fr: 'Un programme qui cherche des pokémon shiny sur les versions GBA',
    },
    description: {
      en: 'Pokémon Farmer is a shiny hunting bot: it runs Pokémon Emerald in the mGBA emulator, captures the game window on Windows with Win32 APIs, and uses OpenCV-based battle detection to automate the hunts. Placeholder entry — the full write-up and a screenshot are coming.',
      fr: "Pokémon Farmer est un bot de chasse aux shiny : il fait tourner Pokémon Émeraude dans l'émulateur mGBA, capture la fenêtre du jeu via les API Win32 sous Windows et s'appuie sur une détection de combat avec OpenCV pour automatiser les chasses. Entrée provisoire — le descriptif complet et une capture arrivent.",
    },
    stack: ['Python', 'OpenCV', 'Win32 API', 'mGBA'],
    cover: {
      src: pokemonFarmerCover,
      alt: {
        en: 'Placeholder preview for the Pokémon Farmer project',
        fr: 'Aperçu provisoire du projet Pokémon Farmer',
      },
    },
    repoUrl: 'https://github.com/MarronFrui/pokemon-farmer',
    status: 'in-progress',
  },
  {
    id: 'projectm',
    category: 'personal',
    title: { en: 'MaxFlix', fr: 'MaxFlix' },
    summary: {
      en: 'A self-made Netflix-style streaming app that plays your NAS media library.',
      fr: 'Une application de streaming maison dans le style Netflix, qui lit la médiathèque de son NAS.',
    },
    description: {
      en: 'MaxFlix is a self-made Jellyfin-style app: a React front end with a Netflix-like catalog of 1600+ titles, posters and metadata scraped from TMDB, a user login with a wishlist, captions, and an Express server that streams the actual videos from a NAS. Placeholder entry — the full write-up is coming.',
      fr: 'MaxFlix est une app maison à la Jellyfin : un front React avec un catalogue de plus de 1600 œuvres style Netflix, affiches et métadonnées extraites de TMDB, une connexion utilisateur avec wishlist, les sous-titres, et un serveur Express qui diffuse les vidéos réelles depuis un NAS. Entrée provisoire — le descriptif complet arrive.',
    },
    stack: ['React', 'Express', 'TypeScript', 'Vite'],
    cover: {
      src: projectmCover,
      alt: {
        en: 'Screenshot of the MaxFlix catalog grid with movie and show posters',
        fr: "Capture d'écran de la grille de catalogue MaxFlix avec les affiches de films et séries",
      },
    },
    repoUrl: 'https://github.com/MarronFrui/ProjectM',
    status: 'in-progress',
  },
];
