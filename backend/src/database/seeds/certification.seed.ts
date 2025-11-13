import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const certifications = [
  {
    certificationName: 'Autodesk Certified Professional \u2013 Maya',
  },
  {
    certificationName: 'Autodesk Certified Professional \u2013 3ds Max',
  },
  {
    certificationName: 'Foundry Certified Nuke Artist',
  },
  {
    certificationName: 'SideFX Houdini Certification',
  },
  {
    certificationName: 'VES Membership',
  },
  {
    certificationName: 'Toon Boom Certified Professional',
  },
  {
    certificationName: 'Adobe Certified Professional \u2013 Animate',
  },
  {
    certificationName: 'Adobe Certified Professional \u2013 After Effects',
  },
  {
    certificationName: 'Animator\u2019s Guild Membership',
  },
  {
    certificationName: 'Autodesk Maya Certification',
  },
  {
    certificationName: 'Autodesk 3ds Max Certification',
  },
  {
    certificationName: 'Blender Foundation Certification',
  },
  {
    certificationName: 'Pixar RenderMan Certification',
  },
  {
    certificationName: 'Unity Certified 3D Artist',
  },
  {
    certificationName: 'Unreal Engine Virtual Production Fellowship',
  },
  {
    certificationName: 'Unreal Engine Certified Instructor',
  },
  {
    certificationName: 'ARRI Certified User',
  },
  {
    certificationName: 'Sony Venice Certification',
  },
  {
    certificationName: 'Unity Certified VR Developer',
  },
  {
    certificationName: 'Unreal Engine VR Development Certification',
  },
  {
    certificationName: 'XR Developer Certificate',
  },
  {
    certificationName: 'Oculus Developer Certification',
  },
  {
    certificationName: 'Unity Certified AR Developer',
  },
  {
    certificationName: '8th Wall WebAR Certification',
  },
  {
    certificationName: 'ARCore Certification',
  },
  {
    certificationName: 'ARKit Certification',
  },
  {
    certificationName: 'Niantic Lightship Certification',
  },
  {
    certificationName: 'Unity Certified Developer',
  },
  {
    certificationName: 'Unity Certified Programmer',
  },
  {
    certificationName: 'Unity Certified Artist',
  },
  {
    certificationName: 'Unreal Engine Blueprint Certification',
  },
  {
    certificationName: 'Unreal Engine Developer Certification',
  },
  {
    certificationName: 'IGDA Membership',
  },
  {
    certificationName: 'Certified Game Developer (CGD)',
  },
  {
    certificationName: 'Adobe Certified Professional \u2013 After Effects',
  },
  {
    certificationName: 'Adobe Certified Professional \u2013 Premiere Pro',
  },
  {
    certificationName: 'Maxon Cinema 4D Certification',
  },
  {
    certificationName: 'Motion Design School Certificate',
  },
  {
    certificationName: 'Apple Certified Pro \u2013 Final Cut Pro',
  },
  {
    certificationName: 'Avid Pro Tools User Certification',
  },
  {
    certificationName: 'Avid Pro Tools Operator Certification',
  },
  {
    certificationName: 'Avid Pro Tools Expert Certification',
  },
  {
    certificationName: 'Ableton Certified Trainer',
  },
  {
    certificationName: 'Dolby Atmos Certification',
  },
  {
    certificationName: 'Apple Logic Pro Certification',
  },
  {
    certificationName: 'Steinberg Cubase Certification',
  },
  {
    certificationName: 'Steinberg Nuendo Certification',
  },
  {
    certificationName: 'Pix4Dmapper Certification',
  },
  {
    certificationName: 'DroneDeploy Certification',
  },
  {
    certificationName: 'RealityCapture Certification',
  },
  {
    certificationName: 'Bentley ContextCapture Certification',
  },
  {
    certificationName: 'Esri ArcGIS Pro 3D Certification',
  },
  {
    certificationName: 'NVIDIA Deep Learning Institute Certificate',
  },
  {
    certificationName: 'TensorFlow Developer Certificate',
  },
  {
    certificationName: 'Hugging Face Transformers Certificate',
  },
  {
    certificationName: 'Runway ML Certification',
  },
  {
    certificationName: 'AI for Creative Professionals \u2013 Coursera',
  },
  {
    certificationName: 'DeepLearning.AI Generative AI Certificate',
  },
  {
    certificationName: 'Python Institute \u2013 PCEP',
  },
  {
    certificationName: 'Python Institute \u2013 PCAP',
  },
  {
    certificationName: 'AWS Certified Developer',
  },
  {
    certificationName: 'Azure Developer Associate',
  },
  {
    certificationName: 'Google Associate Cloud Engineer',
  },
  {
    certificationName: 'Jenkins Certification',
  },
  {
    certificationName: 'GitLab CI/CD Certification',
  },
  {
    certificationName: 'Docker Certified Associate',
  },
  {
    certificationName: 'Kubernetes Certified Associate',
  },
  {
    certificationName: 'Unity Certified Programmer',
  },
  {
    certificationName: 'Unreal Engine Scripting Certificate',
  },
  {
    certificationName: 'DevOps Foundation Certification',
  },
];

export async function seedCertifications() {
  console.log('🌱 Seeding certifications...');
  try {
    for (const { certificationName } of certifications) {
      await prisma.certification.upsert({
        where: { certificationName },
        update: {},
        create: { certificationName },
      });
    }
    console.log('✅ Successfully seeded certifications');
  } catch (error) {
    console.error('❌ Error seeding certifications:', error);
    throw error;
  }
}
