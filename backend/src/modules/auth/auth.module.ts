import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { PasswordResetService } from './services/password-reset.service';
import { User } from '../users/entities/user.entity';
import { PasswordReset } from './entities/password-reset.entity';
import { AuthGuard } from '../../common/gurds/auth.guard';
import { AuthController } from './controllers/auth.controller';
import { PasswordResetController } from './controllers/password-reset.controller';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, PasswordReset]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'fallback_secret',
      signOptions: { expiresIn: Number(process.env.JWT_EXPIRES_IN) || 604800 },
    }),
    SharedModule,
    UsersModule
  ],
  controllers: [AuthController, PasswordResetController],
  providers: [AuthService, PasswordResetService, AuthGuard],
  exports: [AuthGuard, AuthService, PasswordResetService],
})
export class AuthModule {}