import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { PasswordResetController } from './controllers/password-reset.controller';
import { AuthService } from './services/auth.service';
import { PasswordResetService } from './services/password-reset.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'fallback_secret',
      signOptions: { expiresIn: Number(process.env.JWT_EXPIRES_IN) || 604800 },
    }),
    SharedModule,
    UsersModule,
  ],
  controllers: [AuthController, PasswordResetController],
  providers: [AuthService, PasswordResetService],
  exports: [AuthService, PasswordResetService],
})
export class AuthModule {}
