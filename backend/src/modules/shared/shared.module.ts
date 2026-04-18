import { Module } from '@nestjs/common';
import { JwtAuthService } from './services/jwt.service';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [],
    controllers: [],
    providers: [JwtAuthService],
    exports: [JwtAuthService],
})
export class SharedModule {}
