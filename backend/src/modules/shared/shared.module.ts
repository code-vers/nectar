import { Module } from '@nestjs/common';
import { JwtAuthService } from './services/jwt.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Module({
  controllers: [],
  providers: [AuthGuard, RolesGuard, JwtAuthService],
  exports: [AuthGuard, RolesGuard, JwtAuthService],
})
export class SharedModule {}
