import { forwardRef, Module } from '@nestjs/common';
import { RolesGuard } from '../../common/gurds/roles.guard';
import { SharedModule } from '../shared/shared.module';
import { UsersController } from './controllers/users.controller';
import { UsersDao } from './dao/user.dao';
import { UsersService } from './services/users.service';

@Module({
  imports: [forwardRef(() => SharedModule)],
  controllers: [UsersController],
  providers: [RolesGuard, UsersService, UsersDao],
  exports: [RolesGuard, UsersService, UsersDao],
})
export class UsersModule {}
