import { Injectable, ConflictException } from '@nestjs/common';
import { UserDao } from './user.dao';
import { UserCreateDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async findAll(): Promise<User[]> {
    return this.userDao.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userDao.findById(id);
  }

  async create(payload: UserCreateDto): Promise<User> {
    const existing = await this.userDao.findByEmail(payload.email);
    if (existing) throw new ConflictException('Email already exists');
    return this.userDao.create(payload);
  }

  async update(id: number, dto: UserUpdateDto): Promise<User> {
    // Business logic — email duplicate check
    if (dto.email) {
      const existing = await this.userDao.findByEmail(dto.email);
      if (existing && existing.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }
    return this.userDao.update(id, dto);
  }

  async remove(id: number): Promise<void> {
    return this.userDao.remove(id);
  }
}