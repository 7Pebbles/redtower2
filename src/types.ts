export interface TowerLevel {
  id: number; // 0 for above-ground, 1 for mine/tunnels, 2 for graveyard, 3 for shadowy workshop
  name: string;
  subtitle: string;
  description: string;
  depth: string;
  features: string[];
}

export interface Chapter {
  id: number;
  title: string;
  paragraphs: string[];
}

export type ReaderTheme = 'desolation' | 'crimson' | 'phosphor' | 'abyss';

export interface ThemeConfig {
  id: ReaderTheme;
  name: string;
  className: string;
  bgClass: string;
  textClass: string;
  accentClass: string;
  description: string;
}
