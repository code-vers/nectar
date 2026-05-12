import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordReset } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { forgotPasswordTemplate } from '../../../common/email-templates/forgot-password.template';
import { PrismaService } from '../../../database/prisma.service';
import { EmailService } from '../../shared/services/email.service';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class PasswordResetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
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
  async forgotPassword(
    email: string,
  ): Promise<{ success: boolean; message: string }> {
    // Check if email exists using UsersService
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // For security, don't reveal if email exists
      return {
        success: true,
        message:
          'If this email exists, a password reset link will be sent shortly.',
      };
    }

    try {
      // Generate OTP and reset token
      const otp = this.generateOtp();
      const resetToken = this.generateResetToken();
      const expiryTime = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

      // Delete any existing password reset records for this email
      await this.prisma.passwordReset.deleteMany({ where: { email } });

      // Save new password reset request
      await this.prisma.passwordReset.create({
        data: {
          email,
          otp,
          resetToken,
          isUsed: false,
          expiresAt: expiryTime,
        },
      });

      // Create reset link
      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&otp=${otp}`;

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

      if (!emailSent) {
        throw new Error('Failed to send email');
      }

      return {
        success: true,
        message:
          'Password reset link and OTP sent to your email. Please check your inbox.',
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to process password reset request. Please try again later.',
      );
    }
  }

  /**
   * Verify OTP using token and generate reset token
   */
  async verifyOtp(
    token: string,
    otp: string,
  ): Promise<{ success: boolean; message: string; resetToken: string }> {
    // Validate inputs
    if (!token || !otp) {
      throw new BadRequestException('Token and OTP are required');
    }

    // Find the password reset record by token
    const passwordReset = await this.prisma.passwordReset.findFirst({
      where: {
        resetToken: token,
        isUsed: false,
      },
    });

    if (!passwordReset) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Check if OTP matches
    if (passwordReset.otp !== otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    // Check if expired
    if (new Date() > passwordReset.expiresAt) {
      throw new BadRequestException(
        'OTP has expired. Please request a new one.',
      );
    }

    // Mark as used
    await this.prisma.passwordReset.update({
      where: { id: passwordReset.id },
      data: { isUsed: true },
    });

    // Get the user
    const user = await this.usersService.findByEmail(passwordReset.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Generate temporary reset token (JWT) with userId, expires in 15 minutes
    const resetToken = this.jwtService.sign(
      { userId: user.id, type: 'password_reset' },
      { expiresIn: '15m' },
    );

    return {
      success: true,
      message: 'OTP verified successfully',
      resetToken,
    };
  }

  /**
   * Get password reset record by token
   */
  async getPasswordResetByToken(token: string): Promise<PasswordReset | null> {
    const passwordReset = await this.prisma.passwordReset.findFirst({
      where: {
        resetToken: token,
        isUsed: false,
      },
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
    await this.prisma.passwordReset.updateMany({
      where: { email, isUsed: false },
      data: { isUsed: true },
    });
  }

  /**
   * Reset password using reset token
   */
  async resetPassword(
    resetToken: string,
    newPassword: string,
  ): Promise<{ success: boolean; message: string }> {
    if (!resetToken || !newPassword) {
      throw new BadRequestException(
        'Reset token and new password are required',
      );
    }

    try {
      // Verify the JWT reset token
      const decoded = this.jwtService.verify(resetToken);

      if (decoded.type !== 'password_reset') {
        throw new BadRequestException('Invalid reset token');
      }

      const userId = decoded.userId;

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user password
      await this.usersService.updatePassword(userId, hashedPassword);

      return {
        success: true,
        message:
          'Password reset successfully. You can now login with your new password.',
      };
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new BadRequestException(
          'Reset token has expired. Please request a new one.',
        );
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(
        'Failed to reset password. Please try again.',
      );
    }
  }
}
