import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../services/auth.service';
import { Public } from '../../../common/decorators/public.decorator';
import { RolesGuard } from '../../../common/gurds/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/register
  @Public()
  @Post('register')
  register(@Body() payload: RegisterDto) {
    return this.authService.register(payload);
  }

  // POST /auth/login
  @Public()
  @Post('login')
  login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }

  // GET /auth/profile  ← Protected route
  //   @Get('profile')
  //   @UseGuards(AuthGuard)
  //   getProfile(@Req() req: Request) {
  //     const user = req['user']; // auth.guard.ts এ attach করেছিলাম
  //     return this.authService.getProfile(user.sub);
  //   }
}
