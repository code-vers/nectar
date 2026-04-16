import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../modules/user/user.entity';
import { UserRole } from '../../common/enums/roles.enum';

const users = [
  {
    firstName: 'Super Admin',
    email: 'superadmin@fbintbd.com',
    role: UserRole.SUPER_ADMIN,
    password: '12345678',
  },
  {
    firstName: 'Owner',
    email: 'owner@fbintbd.com',
    role: UserRole.OWNER,
    password: '12345678',
  },
  {
    firstName: 'Maintenance Tech',
    email: 'maintenance@fbintbd.com',
    role: UserRole.MAINTENANCE_TECH,
    password: '12345678',
  },
  {
    firstName: 'Vendor',
    email: 'vendor@fbintbd.com',
    role: UserRole.VENDOR,
    password: '12345678',
  },
  {
    firstName: 'Property Manager',
    email: 'propertymanager@fbintbd.com',
    role: UserRole.PROPERTY_MANAGER,
    password: '12345678',
  },
];

export async function seedUsers(dataSource: DataSource): Promise<void> {
  const userRepository = dataSource.getRepository(User);

  for (const userData of users) {
    const exists = await userRepository.findOneBy({
      email: userData.email,
    });

    if (!exists) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const user = userRepository.create({
        ...userData,
        password: hashedPassword,
      });

      await userRepository.save(user);

      console.log(`✅ Created: ${userData.role} - ${userData.email}`);
    } else {
      console.log(`⏭️ Already exists: ${userData.email}`);
    }
  }
}