import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from '../../common/gurds/roles.guard';
import { SharedModule } from '../shared/shared.module';
import { UsersController } from './controllers/users.controller';
import { UsersDao } from './dao/user.dao';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => SharedModule)],
  controllers: [UsersController],
  providers: [RolesGuard, UsersService, UsersDao],
  exports: [RolesGuard, UsersService, UsersDao],
})
export class UsersModule {}
