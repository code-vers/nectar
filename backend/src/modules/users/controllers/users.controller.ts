import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { AllowedRoles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/roles.enum';
import { AuthGuard } from '../../../common/gurds/auth.guard';
import { RolesGuard } from '../../../common/gurds/roles.guard';
import type { AuthUser } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @AllowedRoles(Role.SUPER_ADMIN)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get('/profile')
  async getProfile(@CurrentUser() user: AuthUser) {
    return this.usersService.findOne(Number(user.id));
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }
}
