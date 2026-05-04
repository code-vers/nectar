import { Controller, Post, Body } from '@nestjs/common';
import { PasswordResetService } from '../services/password-reset.service';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { Public } from '../../../common/decorators/public.decorator';

@Controller('auth/password')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.passwordResetService.forgotPassword(
      forgotPasswordDto.email,
    );
  }

  @Public()
  @Post('otp-verify')
  async otpVerify(@Body() verifyOtpDto: VerifyOtpDto) {
    return await this.passwordResetService.verifyOtp(
      verifyOtpDto.token,
      verifyOtpDto.otp,
    );
  }

  @Public()
  @Post('reset')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.passwordResetService.resetPassword(
      resetPasswordDto.resetToken,
      resetPasswordDto.newPassword,
    );
  }
}
