import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersDao } from '../dao/user.dao';
import { User } from '../entities/user.entity';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly usersDao: UsersDao) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersDao.findAll();
    return users.map((user) => new User(user as any));
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersDao.findById(id);
    if (!user) {
      throw new NotFoundException(`User profile not found!`);
    }
    return new User(user as any);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersDao.findByEmail(email);
    return user ? new User(user as any) : null;
  }

  async create(data: any): Promise<User> {
    if (!(Array.isArray(data?.roles) && data?.roles.length > 0)) {
      data.roles = [Role.USER];
    }
    const user = await this.usersDao.saveUser(data);
    return new User(user as any);
  }

  async updatePassword(userId: number, hashedPassword: string): Promise<void> {
    return await this.usersDao.updatePassword(userId, hashedPassword);
  }
}
