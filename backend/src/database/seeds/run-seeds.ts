import AppDataSource from '../../config/typeorm.config';
import { seedUsers } from './user.seeder';

async function runSeeders() {
  try {
    await AppDataSource.initialize();
    console.log('📦 Database connected...');

    await seedUsers(AppDataSource);

    console.log('🎉 Seeding completed!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

runSeeders();