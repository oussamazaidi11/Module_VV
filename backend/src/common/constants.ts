export const INDUSTRY = {
  VFX: 'Visual Effects (VFX) Services',
  ANIMATION_2D: '2D Animation',
  ANIMATION_3D: '3D Animation',
  VIRTUAL_PRODUCTION: 'Virtual Production',
  VR: 'Virtual Reality (VR)',
  AR: 'Augmented Reality (AR)',
  GAME_DEV: 'Real-Time / Game Development',
  MOTION_DESIGN: 'Motion Design / Broadcast Graphics',
  AUDIO_POST: 'Music & Audio Post-production',
  LIDAR: 'LiDAR / Photogrammetry',
  GENERATIVE_AI: 'Generative AI / Machine Learning for Media',
  PIPELINE: 'Pipeline & Software Development',
} as const;

export const INDUSTRIES = Object.values(INDUSTRY);

export type IndustryName = (typeof INDUSTRIES)[number];
