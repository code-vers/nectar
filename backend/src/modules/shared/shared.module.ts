import { Module } from '@nestjs/common';
import { JwtAuthService } from './services/jwt.service';
import { EmailService } from './services/email.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [],
  controllers: [],
  providers: [JwtAuthService, EmailService],
  exports: [JwtAuthService, EmailService],
})
export class SharedModule {}
