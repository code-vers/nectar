import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';

@Injectable()
export class UserDao {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async create(payload: UserCreateDto): Promise<User> {
    const user = this.userRepository.create(payload);
    return this.userRepository.save(user);
  }

  async update(id: number, dto: UserUpdateDto): Promise<User> {
    await this.findById(id); // exist check
    await this.userRepository.update(id, dto);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.findById(id); // exist check
    await this.userRepository.delete(id);
  }
}