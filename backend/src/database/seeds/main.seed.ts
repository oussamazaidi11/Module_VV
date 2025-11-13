import { seedIndustries } from './industry.seed';
import { seedServices } from './service.seed';
import { seedTools } from './tool.seed';
import { seedRoles } from './role.seed';
import { seedCertifications } from './certification.seed';

async function main() {
  await seedRoles();
  await seedIndustries();
  await seedServices();
  await seedTools();
  await seedCertifications();
  // Add more seeders here as needed
}

main()
  .then(() => {
    console.log('🌱 All seeds completed!');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
