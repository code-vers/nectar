import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entity/user.entity';
import { AuthGuard } from '../../../common/gurds/auth.guard';
import { RolesGuard } from '../../../common/gurds/roles.guard';
import { Role } from '../../../common/enums/roles.enum';
import { AllowedRoles } from '../../../common/decorators/roles.decorator';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard,RolesGuard)
  @AllowedRoles(Role.SUPER_ADMIN)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }
}