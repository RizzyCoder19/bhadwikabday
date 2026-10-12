export interface Slide {
  id: string;
  text: string;
  duration: number; // in seconds
  particleColor?: string;
  glowColor?: string;
}

export interface VideoConfig {
  themeName: string;
  backgroundColor: string;
  matrixColor: string;
  particleColor: string;
  glowColor: string;
  heartColor: string;
  
  // Matrix rain parameters
  matrixDensity: number; // 0.1 to 1.0
  matrixSpeed: number;   // 1 to 5
  matrixChars: 'binary' | 'standard' | 'romantic' | 'code';
  matrixCharSize: number;

  // Particle properties
  particleSize: number;
  particleCount: number; // Max active particles
  glowStrength: number;  // 5 to 30px
  interactiveForce: 'repel' | 'attract' | 'none';
  interactiveRadius: number; // Mouse reaction radius
  heartPulseRate: number; // seconds per pulse

  // Heart style & shapes
  heartShape?: 'classic' | 'doubleHeart' | 'starHeart' | 'layeredHeart';

  // Background Visual FX & Atmosphere
  bgStyle?: 'nebula' | 'aurora' | 'diamond' | 'matrix';
  enableShootingStars?: boolean;

  // Sequences
  slides: Slide[];
  heartText: string;
  heartSubText: string;
  useCursiveFont: boolean;

  // Sound settings
  enableSoundEffects: boolean;
  enableBackgroundMusic: boolean;
  enableHeartbeat: boolean;
}

export const PRESET_THEMES: Record<string, Partial<VideoConfig>> = {
  moonlitBlue: {
    themeName: 'Moonlit Blue (Serene Night)',
    backgroundColor: '#010712',
    matrixColor: 'rgba(60, 160, 255, 0.45)',
    particleColor: '#f0f8ff',
    glowColor: 'rgba(70, 170, 255, 0.95)',
    heartColor: 'rgba(30, 144, 255, 1)',
    matrixChars: 'romantic',
    heartShape: 'starHeart',
  },
  romanticPink: {
    themeName: 'Pink Magenta (Original)',
    backgroundColor: '#050206',
    matrixColor: 'rgba(255, 30, 130, 0.45)',
    particleColor: '#ffffff',
    glowColor: 'rgba(255, 50, 150, 0.95)',
    heartColor: 'rgba(255, 20, 120, 1)',
    matrixChars: 'romantic',
    heartShape: 'classic',
  },
  roseGold: {
    themeName: 'Rose Gold Elegance',
    backgroundColor: '#060205',
    matrixColor: 'rgba(255, 180, 200, 0.45)',
    particleColor: '#fff5f8',
    glowColor: 'rgba(255, 160, 190, 0.95)',
    heartColor: 'rgba(255, 120, 160, 1)',
    matrixChars: 'romantic',
    heartShape: 'layeredHeart',
  },
  cosmicViolet: {
    themeName: 'Cosmic Violet',
    backgroundColor: '#03010a',
    matrixColor: 'rgba(180, 100, 255, 0.45)',
    particleColor: '#f8f2ff',
    glowColor: 'rgba(200, 120, 255, 0.95)',
    heartColor: 'rgba(180, 80, 255, 1)',
    matrixChars: 'code',
    heartShape: 'starHeart',
  },
  electricCyan: {
    themeName: 'Electric Cyan Neon',
    backgroundColor: '#010609',
    matrixColor: 'rgba(0, 230, 255, 0.45)',
    particleColor: '#f0ffff',
    glowColor: 'rgba(0, 220, 255, 0.95)',
    heartColor: 'rgba(0, 240, 255, 1)',
    matrixChars: 'binary',
    heartShape: 'doubleHeart',
  },
  rubyRed: {
    themeName: 'Ruby Red Passion',
    backgroundColor: '#080101',
    matrixColor: 'rgba(255, 30, 60, 0.45)',
    particleColor: '#fff0f2',
    glowColor: 'rgba(255, 50, 80, 0.95)',
    heartColor: 'rgba(255, 20, 50, 1)',
    matrixChars: 'romantic',
    heartShape: 'classic',
  },
  crimsonFire: {
    themeName: 'Crimson Passion',
    backgroundColor: '#060101',
    matrixColor: 'rgba(240, 20, 20, 0.45)',
    particleColor: '#fff5f5',
    glowColor: 'rgba(255, 40, 0, 0.9)',
    heartColor: 'rgba(230, 0, 10, 1)',
    matrixChars: 'binary',
    heartShape: 'classic',
  },
  neonViolet: {
    themeName: 'Cyber Purple',
    backgroundColor: '#020108',
    matrixColor: 'rgba(150, 30, 255, 0.45)',
    particleColor: '#fcf8ff',
    glowColor: 'rgba(180, 50, 255, 0.95)',
    heartColor: 'rgba(160, 40, 255, 1)',
    matrixChars: 'code',
    heartShape: 'starHeart',
  },
  emeraldAurora: {
    themeName: 'Emerald Dream',
    backgroundColor: '#010502',
    matrixColor: 'rgba(30, 220, 110, 0.4)',
    particleColor: '#f4fff8',
    glowColor: 'rgba(40, 255, 120, 0.9)',
    heartColor: 'rgba(20, 230, 100, 1)',
    matrixChars: 'standard',
    heartShape: 'classic',
  },
  goldenGlow: {
    themeName: 'Sunset Gold',
    backgroundColor: '#050401',
    matrixColor: 'rgba(230, 180, 20, 0.4)',
    particleColor: '#fffef0',
    glowColor: 'rgba(255, 200, 40, 0.9)',
    heartColor: 'rgba(255, 170, 0, 1)',
    matrixChars: 'romantic',
    heartShape: 'layeredHeart',
  }
};
