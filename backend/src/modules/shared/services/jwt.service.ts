import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Role } from '../../../common/enums/roles.enum';

export interface JwtPayload {
  id: string;
  name: string;
  email: string;
  roles: Role[];
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  roles: Role[];
}

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: NestJwtService) {}

  /**
   * Generate a JWT token for a user
   */
  generateToken(user: UserData): string {
    const payload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    };

    return this.jwtService.sign(payload);
  }

  /**
   * Verify and decode a JWT token
   */
  async verifyToken(token: string): Promise<UserData | null> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        roles: payload.roles,
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Mock user validation - in a real app, this would check against a database
   */
  // async validateUser(username: string, password: string): Promise<UserData | null> {
  //   // Mock users - in a real app, you'd query your database and verify password hash
  //   const users: UserData[] = [
  //     // {
  //     //   id: '1',
  //     //   username: 'john_admin',
  //     //   email: 'john@example.com',
  //     //   roles: [Role.ADMIN, Role.READ],
  //     // },
  //     // {
  //     //   id: '2',
  //     //   username: 'jane_manager',
  //     //   email: 'jane@example.com',
  //     //   roles: [Role.MANAGER, Role.READ],
  //     // },
  //     {
  //       id: '3',
  //       name: 'super_admin',
  //       email: 'super@example.com',
  //       roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.USER],
  //     },
  //     // {
  //     //   id: '4',
  //     //   username: 'reader',
  //     //   email: 'reader@example.com',
  //     //   roles: [Role.READ],
  //     // },
  //   ];

  //   // Find user by username
  //   const user = users.find((u) => u.email === email);

  //   // In a real app, you would verify the password hash here
  //   // For demo purposes, we just check if user exists
  //   if (user) {
  //     return user;
  //   }

  //   return null;
  // }
}
