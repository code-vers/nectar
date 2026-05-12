import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (!value || value === '') {
      return [Role.USER];
    }
    if (typeof value === 'string') {
      return [value as Role];
    }
    if (Array.isArray(value) && value.length === 0) {
      return [Role.USER];
    }
    if (Array.isArray(value) && value.length > 0) {
      return value;
    }
    return [Role.USER];
  })
  @IsArray()
  @IsEnum(Role, { each: true, message: 'Each role must be a valid Role value' })
  roles?: Role[];
}
