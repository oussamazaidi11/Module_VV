import { PrismaClient } from '@prisma/client';
import { INDUSTRY } from '../../common/constants';

const prisma = new PrismaClient();

export async function seedIndustries() {
  console.log('🌱 Seeding industries...');

  try {
    for (const industryName of Object.values(INDUSTRY)) {
      await prisma.industry.upsert({
        where: { industryName },
        update: {},
        create: {
          industryName,
        },
      });
    }
    console.log(
      `✅ Successfully seeded ${Object.keys(INDUSTRY).length} industries`,
    );
  } catch (error) {
    console.error('❌ Error seeding industries:', error);
    throw error;
  }
}

if (require.main === module) {
  seedIndustries()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
