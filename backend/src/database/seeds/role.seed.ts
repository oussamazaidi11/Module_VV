import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const roles = [
  'SUPER_ADMINISTRATOR',
  'WORKSPACE_OWNER',
  'WORKSPACE_OWNER_DELEGATE',
  'ADMINISTRATOR',
  'USER',
];

export async function seedRoles() {
  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { roleName },
      update: {},
      create: { roleName },
    });
  }
  console.log('✅ Roles seeded');
}
