import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersDao {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

  async findById(id: number): Promise<User | null> {
    return await this.repo.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repo.findOneBy({ email });
  }

  async saveUser(data: Partial<User>): Promise<User> {
    const user = this.repo.create(data);
    return await this.repo.save(user);
  }

  async updatePassword(userId: number, hashedPassword: string): Promise<void> {
    await this.repo.update({ id: userId }, { password: hashedPassword });
  }
}
