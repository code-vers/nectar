import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../database/prisma.service';
import { JwtAuthService, UserData } from '../../shared/services/jwt.service';
import { UsersService } from '../../users/services/users.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtAuthService: JwtAuthService,
    private usersService: UsersService,
  ) {}

  // ─── REGISTER ─────
  async register(payload: RegisterDto) {
    const existing = await this.usersService.findByEmail(payload?.email);
    if (existing) {
      throw new BadRequestException('Email already exists!');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const savedUser = await this.usersService.create({
      ...payload,
      password: hashedPassword,
    });

    const { password, ...result } = savedUser;
    return result;
  }

  // ─── LOGIN ────
  async login(payload: LoginDto) {
    const { email, password } = payload;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Your account is currently disabled');
    }

    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const jwtPayload: UserData = {
      id: String(user.id),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles as any,
    };

    const accessToken = await this.jwtAuthService.generateToken(jwtPayload);

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles,
      },
    };
  }

  // ─── GET PROFILE (token থেকে) ────
  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password, ...result } = user;
    return result;
  }
}
