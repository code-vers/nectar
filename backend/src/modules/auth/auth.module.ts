import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { User } from '../users/entity/user.entity';
import { AuthGuard } from '../../common/gurds/auth.guard';
import { AuthController } from './controllers/auth.controller';
// import { UsersModule } from '../users/users.module';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'fallback_secret',
      signOptions: { expiresIn: Number(process.env.JWT_EXPIRES_IN) || 604800 },
    }),
    SharedModule,
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard, AuthService], 
})
export class AuthModule {}