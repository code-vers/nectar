import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersDao } from './dao/user.dao';
import { RolesGuard } from '../../common/gurds/roles.guard';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => SharedModule)],
  controllers: [UsersController],
  providers: [RolesGuard, UsersService, UsersDao],
  exports: [RolesGuard, UsersService, UsersDao],
})
export class UsersModule {}
