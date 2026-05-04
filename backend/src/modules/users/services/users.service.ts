import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '../../../common/enums/roles.enum';
import { UsersDao } from '../dao/user.dao';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersDao: UsersDao) {}

  async findAll(): Promise<User[]> {
    return await this.usersDao.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersDao.findById(id);
    if (!user) {
      throw new NotFoundException(`User profile not found!`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersDao.findByEmail(email);
  }

  async create(data: Partial<User>): Promise<User> {
    if (!(Array.isArray(data?.roles) && data?.roles.length > 0)) {
      data.roles = [Role.USER];
    }
    return await this.usersDao.saveUser(data);
  }

  async updatePassword(userId: number, hashedPassword: string): Promise<void> {
    return await this.usersDao.updatePassword(userId, hashedPassword);
  }
}
