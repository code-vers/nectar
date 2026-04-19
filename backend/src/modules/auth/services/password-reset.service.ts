import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordReset } from '../entities/password-reset.entity';
import { EmailService } from '../../shared/services/email.service';
import { UsersService } from '../../users/services/users.service';
import { forgotPasswordTemplate } from '../../../common/email-templates/forgot-password.template';
import * as crypto from 'crypto';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepo: Repository<PasswordReset>,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  /**
   * Generate 6-digit OTP
   */
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Generate reset token for secure link
   */
  private generateResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Forgot password: Send OTP to email
   */
  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    // Check if email exists using UsersService
    const user = await this.usersService.findByEmail(email);
console.log("user=========>", user)
    if (!user) {
      // For security, don't reveal if email exists
      return {
        success: true,
        message: 'If this email exists, a password reset link will be sent shortly.',
      };
    }

    try {
      // Generate OTP and reset token
      const otp = this.generateOtp();
      const resetToken = this.generateResetToken();
      const expiryTime = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
console.log("otp=========>", otp)
console.log("rest token=========>", resetToken)
console.log("expiretime=========>", expiryTime)
      // Delete any existing password reset records for this email
      await this.passwordResetRepo.delete({ email });

      // Save new password reset request
      const createdOTP = await this.passwordResetRepo.save({
        email,
        otp,
        resetToken,
        isUsed: false,
        expiresAt: expiryTime,
      });
console.log("created Otp=========>", createdOTP)
      // Create reset link
      const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}&otp=${otp}`;

      // Send email
      const emailTemplate = forgotPasswordTemplate(
        user.firstName,
        user.lastName,
        otp,
        resetLink,
        30,
      );

      const emailSent = await this.emailService.sendEmail({
        to: email,
        subject: '🔐 Password Reset Request - Nectar LMS',
        html: emailTemplate,
      });

      console.log("email sent=========>", emailSent)
      if (!emailSent) {
        throw new Error('Failed to send email');
      }

      return {
        success: true,
        message: 'Password reset link and OTP sent to your email. Please check your inbox.',
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to process password reset request. Please try again later.',
      );
    }
  }

  /**
   * Verify OTP
   */
  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const passwordReset = await this.passwordResetRepo.findOneBy({
      email,
      otp,
      isUsed: false,
    });

    if (!passwordReset) {
      throw new BadRequestException('Invalid OTP');
    }

    // Check if OTP has expired
    if (new Date() > passwordReset.expiresAt) {
      throw new BadRequestException('OTP has expired. Please request a new one.');
    }

    return true;
  }

  /**
   * Get password reset record by token
   */
  async getPasswordResetByToken(token: string): Promise<PasswordReset | null> {
    const passwordReset = await this.passwordResetRepo.findOneBy({
      resetToken: token,
      isUsed: false,
    });

    if (!passwordReset) {
      return null;
    }

    // Check if token has expired
    if (new Date() > passwordReset.expiresAt) {
      return null;
    }

    return passwordReset;
  }

  /**
   * Mark password reset as used
   */
  async markAsUsed(email: string): Promise<void> {
    await this.passwordResetRepo.update(
      { email, isUsed: false },
      { isUsed: true },
    );
  }
}
