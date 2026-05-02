import { Module } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { JwtAuthService } from './services/jwt.service';

@Module({
  imports: [],
  controllers: [],
  providers: [JwtAuthService, EmailService],
  exports: [JwtAuthService, EmailService],
})
export class SharedModule {}
