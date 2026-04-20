import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersDao } from '../dao/user.dao';
import { User } from '../entities/user.entity';
import { Role } from '../../../common/enums/roles.enum';

@Injectable()
export class UsersService {
  constructor(private readonly usersDao: UsersDao) {}

  async findAll(): Promise<User[]> {
    return await this.usersDao.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersDao.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
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
}