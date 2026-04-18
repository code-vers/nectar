import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/register
  @Post('register')
  register(@Body() payload: RegisterDto) {
    return this.authService.register(payload);
  }

  // POST /auth/login
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