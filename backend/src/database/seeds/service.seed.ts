import { PrismaClient } from '@prisma/client';
import { INDUSTRY } from '../../common/constants';

const prisma = new PrismaClient();

const services = [
  {
    serviceName: "Full Service - VFX",
    defaultDescription: null,
    industryName:INDUSTRY.VFX,
  },
  {
    serviceName: "Full Service - Animation 2D",
    defaultDescription: null,
    industryName:INDUSTRY.ANIMATION_2D,
  },
  {
    serviceName: "Full Service - Animation 3D",
    defaultDescription: null,
    industryName:INDUSTRY.ANIMATION_3D,
  },
  {
    serviceName: "Full Service - Virtual Production",
    defaultDescription: null,
    industryName:INDUSTRY.VIRTUAL_PRODUCTION,
  },
  {
    serviceName: "Full Service - VR",
    defaultDescription: null,
    industryName:INDUSTRY.VR,
  },
  {
    serviceName: "Full Service - AR",
    defaultDescription: null,
    industryName:INDUSTRY.AR,
  },
  {
    serviceName: "Full Service - Game Development",
    defaultDescription: null,
    industryName:INDUSTRY.GAME_DEV,
  },
  {
    serviceName: "Full Service - Motion Design",
    defaultDescription: null,
    industryName:INDUSTRY.MOTION_DESIGN,
  },
  {
    serviceName: "Full Service - Audio Post Production",
    defaultDescription: null,
    industryName:INDUSTRY.AUDIO_POST,
  },
  {
    serviceName: "Full Service - LIDAR",
    defaultDescription: null,
    industryName:INDUSTRY.LIDAR,
  },
  {
    serviceName: "Full Service - Generative AI",
    defaultDescription: null,
    industryName:INDUSTRY.GENERATIVE_AI,
  },
  {
    serviceName: "Full Service - Pipeline",
    defaultDescription: null,
    industryName:INDUSTRY.PIPELINE,
  },
  {
    serviceName: 'Compositing',
    defaultDescription: null,
    industryName: INDUSTRY.VFX,
  },
  {
    serviceName: 'Rotoscoping',
    defaultDescription: null,
    industryName: INDUSTRY.VFX,
  },
  {
    serviceName: 'Cleanup & Paint',
    defaultDescription: null,
    industryName: INDUSTRY.VFX,
  },
  {
    serviceName: '3D Modeling & Texturing',
    defaultDescription: null,
    industryName: INDUSTRY.VFX,
  },
  {
    serviceName: 'Matchmove & Tracking',
    defaultDescription: null,
    industryName: INDUSTRY.VFX,
  },
  {
    serviceName: 'Keying',
    defaultDescription: 'Keying (Greenscreen/Bluescreen)',
    industryName: INDUSTRY.VFX,
  },
  {
    serviceName: 'FX Simulation',
    defaultDescription: null,
    industryName: INDUSTRY.VFX,
  },
  {
    serviceName: 'Lighting & Rendering',
    defaultDescription: null,
    industryName: INDUSTRY.VFX,
  },
  {
    serviceName: 'Matte Painting',
    defaultDescription: null,
    industryName: INDUSTRY.VFX,
  },
  {
    serviceName: 'Environment Creation',
    defaultDescription: null,
    industryName: INDUSTRY.VFX,
  },
  {
    serviceName: 'VFX Animation',
    defaultDescription: null,
    industryName: INDUSTRY.VFX,
  },
  {
    serviceName: 'Crowd Simulation',
    defaultDescription: null,
    industryName: INDUSTRY.VFX,
  },
  {
    serviceName: 'Keyframe & Inbetween Animation',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_2D,
  },
  {
    serviceName: 'Cleanup & Coloring',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_2D,
  },
  {
    serviceName: 'Storyboarding & Animatics',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_2D,
  },
  {
    serviceName: 'Character & Background Design',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_2D,
  },
  {
    serviceName: '2D Layout',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_2D,
  },
  {
    serviceName: '2D Rigging',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_2D,
  },
  {
    serviceName: '2D FX Animation',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_2D,
  },
  {
    serviceName: '2D Compositing',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_2D,
  },
  {
    serviceName: 'Modeling, UV Mapping & Texturing',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_3D,
  },
  {
    serviceName: 'Rigging',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_3D,
  },
  {
    serviceName: 'Character Animation',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_3D,
  },
  {
    serviceName: 'Look Development',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_3D,
  },
  {
    serviceName: 'Motion Capture Processing & Cleanup',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_3D,
  },
  {
    serviceName: 'Prop & Object Animation',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_3D,
  },
  {
    serviceName: '3D Layout',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_3D,
  },
  {
    serviceName: 'Lighting & Rendering',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_3D,
  },
  {
    serviceName: 'Compositing',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_3D,
  },
  {
    serviceName: 'Facial & Creature Animation',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_3D,
  },
  {
    serviceName: 'Simulation',
    defaultDescription: 'Simulation (Cloth, Hair, Physics)',
    industryName: INDUSTRY.ANIMATION_3D,
  },
  {
    serviceName: 'Crowd Animation',
    defaultDescription: null,
    industryName: INDUSTRY.ANIMATION_3D,
  },
  {
    serviceName: 'Virtual Set & Environment Design',
    defaultDescription: null,
    industryName: INDUSTRY.VIRTUAL_PRODUCTION,
  },
  {
    serviceName: '3D Asset Creation',
    defaultDescription: null,
    industryName: INDUSTRY.VIRTUAL_PRODUCTION,
  },
  {
    serviceName: 'Previsualization & Technical Visualization',
    defaultDescription: null,
    industryName: INDUSTRY.VIRTUAL_PRODUCTION,
  },
  {
    serviceName: 'Scene Assembly & Optimization',
    defaultDescription: null,
    industryName: INDUSTRY.VIRTUAL_PRODUCTION,
  },
  {
    serviceName: 'Real-Time Lighting & FX',
    defaultDescription: null,
    industryName: INDUSTRY.VIRTUAL_PRODUCTION,
  },
  {
    serviceName: 'Virtual Camera Operation & Animation',
    defaultDescription: null,
    industryName: INDUSTRY.VIRTUAL_PRODUCTION,
  },
  {
    serviceName: 'In-Camera VFX Support & Calibration',
    defaultDescription: null,
    industryName: INDUSTRY.VIRTUAL_PRODUCTION,
  },
  {
    serviceName: 'Set Extension & Background Plate Creation',
    defaultDescription: null,
    industryName: INDUSTRY.VIRTUAL_PRODUCTION,
  },
  {
    serviceName: 'Look Development',
    defaultDescription: null,
    industryName: INDUSTRY.VIRTUAL_PRODUCTION,
  },
  {
    serviceName: 'HDRI & Environment Capture',
    defaultDescription: null,
    industryName: INDUSTRY.VIRTUAL_PRODUCTION,
  },
  {
    serviceName: '3D Asset Creation & Optimization',
    defaultDescription: null,
    industryName: INDUSTRY.VR,
  },
  {
    serviceName: 'UI/UX Design & Interaction Flows',
    defaultDescription: null,
    industryName: INDUSTRY.VR,
  },
  {
    serviceName: 'Real-Time Engine Integration',
    defaultDescription: null,
    industryName: INDUSTRY.VR,
  },
  {
    serviceName: 'Level Art & Scene Dressing',
    defaultDescription: null,
    industryName: INDUSTRY.VR,
  },
  {
    serviceName: 'Concept & Environment Design',
    defaultDescription: null,
    industryName: INDUSTRY.VR,
  },
  {
    serviceName: 'VR Animation',
    defaultDescription: null,
    industryName: INDUSTRY.VR,
  },
  {
    serviceName: 'Real-Time Lighting & FX',
    defaultDescription: null,
    industryName: INDUSTRY.VR,
  },
  {
    serviceName: 'Spatial Audio Design',
    defaultDescription: null,
    industryName: INDUSTRY.VR,
  },
  {
    serviceName: 'Navigation System Design',
    defaultDescription: null,
    industryName: INDUSTRY.VR,
  },
  {
    serviceName: 'Shader Development',
    defaultDescription: null,
    industryName: INDUSTRY.VR,
  },
  {
    serviceName: '3D Asset Creation & Optimization',
    defaultDescription: null,
    industryName: INDUSTRY.AR,
  },
  {
    serviceName: 'UI/UX Design & Interaction Flows',
    defaultDescription: null,
    industryName: INDUSTRY.AR,
  },
  {
    serviceName: 'Face Filter & AR Experience Design',
    defaultDescription: null,
    industryName: INDUSTRY.AR,
  },
  {
    serviceName: 'Real-Time Engine/Platform Integration',
    defaultDescription: null,
    industryName: INDUSTRY.AR,
  },
  {
    serviceName: 'AR Animation',
    defaultDescription: null,
    industryName: INDUSTRY.AR,
  },
  {
    serviceName: 'Concept Art & Marker Design',
    defaultDescription: null,
    industryName: INDUSTRY.AR,
  },
  {
    serviceName: 'Real-Time FX',
    defaultDescription: null,
    industryName: INDUSTRY.AR,
  },
  {
    serviceName: 'Surface Tracking & Image Target Setup',
    defaultDescription: null,
    industryName: INDUSTRY.AR,
  },
  {
    serviceName: 'Environment Mapping',
    defaultDescription: null,
    industryName: INDUSTRY.AR,
  },
  {
    serviceName: 'Shader Development',
    defaultDescription: null,
    industryName: INDUSTRY.AR,
  },
  {
    serviceName: 'Localization for AR Experiences',
    defaultDescription: null,
    industryName: INDUSTRY.AR,
  },
  {
    serviceName: '3D Asset Creation',
    defaultDescription: '3D Asset Creation (Characters, Environments, Props)',
    industryName: INDUSTRY.GAME_DEV,
  },
  {
    serviceName: 'Rigging & Animation',
    defaultDescription:
      'Rigging & Animation (Character, Facial, Creature, Prop, Crowd)',
    industryName: INDUSTRY.GAME_DEV,
  },
  {
    serviceName: 'Real-Time Engine Integration',
    defaultDescription: 'Real-Time Engine Integration (Unity / Unreal)',
    industryName: INDUSTRY.GAME_DEV,
  },
  {
    serviceName: 'UI/UX Design',
    defaultDescription: null,
    industryName: INDUSTRY.GAME_DEV,
  },
  {
    serviceName: 'Quality Assurance (QA) & Testing',
    defaultDescription: null,
    industryName: INDUSTRY.GAME_DEV,
  },
  {
    serviceName: 'Game Design & Level Design',
    defaultDescription: null,
    industryName: INDUSTRY.GAME_DEV,
  },
  {
    serviceName: 'Game Programming',
    defaultDescription: 'Game Programming (Core Logic, AI, Gameplay Systems)',
    industryName: INDUSTRY.GAME_DEV,
  },
  {
    serviceName: 'Level Art & Scene Dressing',
    defaultDescription: null,
    industryName: INDUSTRY.GAME_DEV,
  },
  {
    serviceName: 'Concept Art & Character Design',
    defaultDescription: null,
    industryName: INDUSTRY.GAME_DEV,
  },
  {
    serviceName: 'Real-Time Lighting & FX',
    defaultDescription: null,
    industryName: INDUSTRY.GAME_DEV,
  },
  {
    serviceName: 'Asset Optimization',
    defaultDescription: 'Asset Optimization (LODs, performance)',
    industryName: INDUSTRY.GAME_DEV,
  },
  {
    serviceName: 'Cinematic & Cutscene Production',
    defaultDescription: null,
    industryName: INDUSTRY.GAME_DEV,
  },
  {
    serviceName: 'VFX Integration',
    defaultDescription: null,
    industryName: INDUSTRY.GAME_DEV,
  },
  {
    serviceName: 'Motion Capture Processing & Cleanup',
    defaultDescription: null,
    industryName: INDUSTRY.GAME_DEV,
  },
  {
    serviceName: 'Look Development & Shader Development',
    defaultDescription: null,
    industryName: INDUSTRY.GAME_DEV,
  },
  {
    serviceName: 'Logo & Title Animation',
    defaultDescription: null,
    industryName: INDUSTRY.MOTION_DESIGN,
  },
  {
    serviceName: '2D & 3D Motion Graphics Production',
    defaultDescription: null,
    industryName: INDUSTRY.MOTION_DESIGN,
  },
  {
    serviceName: 'Styleframes & Concept Development',
    defaultDescription: null,
    industryName: INDUSTRY.MOTION_DESIGN,
  },
  {
    serviceName: 'Storyboarding & Animatics',
    defaultDescription: null,
    industryName: INDUSTRY.MOTION_DESIGN,
  },
  {
    serviceName: 'Typography & Infographics Animation',
    defaultDescription: null,
    industryName: INDUSTRY.MOTION_DESIGN,
  },
  {
    serviceName: 'Lower Thirds & HUD/UI Motion Design',
    defaultDescription: null,
    industryName: INDUSTRY.MOTION_DESIGN,
  },
  {
    serviceName: 'Animated Backgrounds & Looping Graphics',
    defaultDescription: null,
    industryName: INDUSTRY.MOTION_DESIGN,
  },
  {
    serviceName: 'Compositing',
    defaultDescription: null,
    industryName: INDUSTRY.MOTION_DESIGN,
  },
  {
    serviceName: 'Rendering',
    defaultDescription: null,
    industryName: INDUSTRY.MOTION_DESIGN,
  },
  {
    serviceName: 'Icon & Transition Animation',
    defaultDescription: null,
    industryName: INDUSTRY.MOTION_DESIGN,
  },
  {
    serviceName: 'Broadcast Package Design & Branding',
    defaultDescription: null,
    industryName: INDUSTRY.MOTION_DESIGN,
  },
  {
    serviceName: 'Template Creation',
    defaultDescription: 'Template Creation (After Effects / Motion)',
    industryName: INDUSTRY.MOTION_DESIGN,
  },
  {
    serviceName: 'Scene Assembly',
    defaultDescription: null,
    industryName: INDUSTRY.MOTION_DESIGN,
  },
  {
    serviceName: 'Dialogue Editing & Cleanup',
    defaultDescription: null,
    industryName: INDUSTRY.AUDIO_POST,
  },
  {
    serviceName: 'Mixing & Mastering',
    defaultDescription: null,
    industryName: INDUSTRY.AUDIO_POST,
  },
  {
    serviceName: 'Voice-Over (VO) Recording & Multi-language VO',
    defaultDescription: null,
    industryName: INDUSTRY.AUDIO_POST,
  },
  {
    serviceName: 'Sound Design',
    defaultDescription: null,
    industryName: INDUSTRY.AUDIO_POST,
  },
  {
    serviceName: 'Audio Sync to Picture',
    defaultDescription: null,
    industryName: INDUSTRY.AUDIO_POST,
  },
  {
    serviceName: 'ADR',
    defaultDescription: 'ADR (Automated Dialogue Replacement)',
    industryName: INDUSTRY.AUDIO_POST,
  },
  {
    serviceName: 'Foley Recording',
    defaultDescription: null,
    industryName: INDUSTRY.AUDIO_POST,
  },
  {
    serviceName: 'Music Composition & Production',
    defaultDescription: null,
    industryName: INDUSTRY.AUDIO_POST,
  },
  {
    serviceName: 'Ambience Creation',
    defaultDescription: null,
    industryName: INDUSTRY.AUDIO_POST,
  },
  {
    serviceName: 'Music Editing & Stem Separation',
    defaultDescription: null,
    industryName: INDUSTRY.AUDIO_POST,
  },
  {
    serviceName: 'Audio Quality Control (QC)',
    defaultDescription: null,
    industryName: INDUSTRY.AUDIO_POST,
  },
  {
    serviceName: 'Audio Restoration & Noise Reduction',
    defaultDescription: null,
    industryName: INDUSTRY.AUDIO_POST,
  },
  {
    serviceName: 'Spatial Audio Mixing',
    defaultDescription: null,
    industryName: INDUSTRY.AUDIO_POST,
  },
  {
    serviceName: 'Music Licensing & Rights Management',
    defaultDescription: null,
    industryName: INDUSTRY.AUDIO_POST,
  },
  {
    serviceName: 'On-Set Data Capture',
    defaultDescription:
      'On-Set Data Capture (LiDAR, Photogrammetry, Reference Photography)',
    industryName: INDUSTRY.LIDAR,
  },
  {
    serviceName: 'Point Cloud Processing',
    defaultDescription:
      'Point Cloud Processing (Cleanup, Alignment, Registration)',
    industryName: INDUSTRY.LIDAR,
  },
  {
    serviceName: 'Mesh Reconstruction & Retopology',
    defaultDescription: null,
    industryName: INDUSTRY.LIDAR,
  },
  {
    serviceName: 'Texture Projection & Baking',
    defaultDescription: null,
    industryName: INDUSTRY.LIDAR,
  },
  {
    serviceName: 'Data Export & Integration',
    defaultDescription: 'Data Export & Integration (to DCCs, Game Engines)',
    industryName: INDUSTRY.LIDAR,
  },
  {
    serviceName: 'Scan Optimization',
    defaultDescription: null,
    industryName: INDUSTRY.LIDAR,
  },
  {
    serviceName: 'Environment & Asset Reconstruction from Scan Data',
    defaultDescription: null,
    industryName: INDUSTRY.LIDAR,
  },
  {
    serviceName: 'HDRI Capture',
    defaultDescription: null,
    industryName: INDUSTRY.LIDAR,
  },
  {
    serviceName: 'Geo-referencing & Scene Alignment',
    defaultDescription: null,
    industryName: INDUSTRY.LIDAR,
  },
  {
    serviceName: 'AI-Generated Content Creation',
    defaultDescription:
      'AI-Generated Content Creation (Environments, Characters, Textures, Backgrounds)',
    industryName: INDUSTRY.GENERATIVE_AI,
  },
  {
    serviceName: 'Prompt Engineering',
    defaultDescription: 'Prompt Engineering (Text-to-Image / Video / 3D)',
    industryName: INDUSTRY.GENERATIVE_AI,
  },
  {
    serviceName: 'AI-Driven Style Transfer',
    defaultDescription: 'AI-Driven Style Transfer (Image / Animation)',
    industryName: INDUSTRY.GENERATIVE_AI,
  },
  {
    serviceName: 'AI-Assisted Animation & Cleanup',
    defaultDescription: null,
    industryName: INDUSTRY.GENERATIVE_AI,
  },
  {
    serviceName: 'AI Face Replacement / Deepfake & Lip Syncing',
    defaultDescription: null,
    industryName: INDUSTRY.GENERATIVE_AI,
  },
  {
    serviceName: 'Generative Video Loops & Motion',
    defaultDescription: null,
    industryName: INDUSTRY.GENERATIVE_AI,
  },
  {
    serviceName: 'Synthetic Data Generation',
    defaultDescription: null,
    industryName: INDUSTRY.GENERATIVE_AI,
  },
  {
    serviceName: 'Generative Voice Design',
    defaultDescription: null,
    industryName: INDUSTRY.GENERATIVE_AI,
  },
  {
    serviceName: 'AI-Based Editing Suggestions',
    defaultDescription: null,
    industryName: INDUSTRY.GENERATIVE_AI,
  },
  {
    serviceName: 'AI Camera Motion Generation',
    defaultDescription: null,
    industryName: INDUSTRY.GENERATIVE_AI,
  },
  {
    serviceName: 'AI-Driven Content Moderation',
    defaultDescription: null,
    industryName: INDUSTRY.GENERATIVE_AI,
  },
  {
    serviceName: 'AI-Assisted Scriptwriting / Story Generation',
    defaultDescription: null,
    industryName: INDUSTRY.GENERATIVE_AI,
  },
  {
    serviceName: 'Tool & Script Development ',
    defaultDescription: 'Tool & Script Development (Python, MEL, PySide)',
    industryName: INDUSTRY.PIPELINE,
  },
  {
    serviceName: 'Pipeline Architecture & Design',
    defaultDescription: null,
    industryName: INDUSTRY.PIPELINE,
  },
  {
    serviceName: 'Integration Services',
    defaultDescription:
      'Integration Services (e.g., Shotgun/Ftrack, USD, Render Farm)',
    industryName: INDUSTRY.PIPELINE,
  },
  {
    serviceName: 'DCC Scripting & Automation',
    defaultDescription:
      'DCC Scripting & Automation (Maya, Nuke, Houdini, etc.)',
    industryName: INDUSTRY.PIPELINE,
  },
  {
    serviceName: 'Asset Management System Development',
    defaultDescription: null,
    industryName: INDUSTRY.PIPELINE,
  },
  {
    serviceName: 'Versioning System Setup',
    defaultDescription: null,
    industryName: INDUSTRY.PIPELINE,
  },
  {
    serviceName: 'Publishing Workflow Development',
    defaultDescription: null,
    industryName: INDUSTRY.PIPELINE,
  },
  {
    serviceName: 'Game Engine Pipeline Support',
    defaultDescription: 'Game Engine Pipeline Support (Unreal / Unity)',
    industryName: INDUSTRY.PIPELINE,
  },
  {
    serviceName: 'Automated QC Tools Development',
    defaultDescription: null,
    industryName: INDUSTRY.PIPELINE,
  },
  {
    serviceName: 'Shot Review Tool Integration',
    defaultDescription: null,
    industryName: INDUSTRY.PIPELINE,
  },
  {
    serviceName: 'Data I/O Automation',
    defaultDescription: null,
    industryName: INDUSTRY.PIPELINE,
  },
  {
    serviceName: 'Custom UI / UX Development for Studio Tools',
    defaultDescription: null,
    industryName: INDUSTRY.PIPELINE,
  },
  {
    serviceName: 'Cloud Pipeline Setup & Management',
    defaultDescription: null,
    industryName: INDUSTRY.PIPELINE,
  },
  {
    serviceName: 'API Development for Internal Systems',
    defaultDescription: null,
    industryName: INDUSTRY.PIPELINE,
  },
  {
    serviceName: 'Deployment & DevOps for Production Tools',
    defaultDescription: null,
    industryName: INDUSTRY.PIPELINE,
  },
  {
    serviceName: 'AI/ML Integration into Production Pipelines',
    defaultDescription: null,
    industryName: INDUSTRY.PIPELINE,
  },
  {
    serviceName: 'Security Audits & Data Security Consulting',
    defaultDescription: null,
    industryName: INDUSTRY.PIPELINE,
  },
];

export async function seedServices() {
  console.log('🌱 Seeding services...');
  try {
    for (const { serviceName, defaultDescription, industryName } of services) {
      await prisma.service.upsert({
        where: { serviceName }, // Still works with your @unique constraint
        update: {},
        create: {
          serviceName, // Now includes industry in the name
          defaultDescription,
          industryName,
        },
      });
    }
    console.log(`✅ Successfully seeded ${services.length} services`);
  } catch (error) {
    console.error('❌ Error seeding services:', error);
    throw error;
  }
}

if (require.main === module) {
  seedServices()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
