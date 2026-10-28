import type { Technologie } from '../components/CarteTechnologie';

export const technologies: Technologie[] = [
  { id: 1, nom: 'React', categorie: 'Front-end', niveauPopularite: 5, couleur: '#61DAFB' },
  { id: 2, nom: 'TypeScript', categorie: 'Langage', niveauPopularite: 5, couleur: '#3178C6' },
  { id: 3, nom: 'Docker', categorie: 'Conteneurisation', niveauPopularite: 4, couleur: '#0DB7ED' },
  { id: 4, nom: 'Redis', categorie: 'Cache', niveauPopularite: 4, couleur: '#DC382D' },
  { id: 5, nom: 'PostgreSQL', categorie: 'Base de données', niveauPopularite: 4, couleur: '#336791' },
  { id: 6, nom: 'Ollama', categorie: 'IA locale', niveauPopularite: 3, couleur: '#7C3AED' },
];
