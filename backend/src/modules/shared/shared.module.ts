import { Module } from '@nestjs/common';
import { JwtAuthService } from './services/jwt.service';
import { EmailService } from './services/email.service';

@Module({
  imports: [],
  controllers: [],
  providers: [JwtAuthService, EmailService],
  exports: [JwtAuthService, EmailService],
})
export class SharedModule {}
