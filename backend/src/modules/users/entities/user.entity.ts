import { Exclude } from 'class-transformer';
import { Role } from '@prisma/client';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;

  @Exclude()
  password: string;

  roles: Role[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
