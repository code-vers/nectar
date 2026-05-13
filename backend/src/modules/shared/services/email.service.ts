import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { getEmailConfig } from '../../../config/email.config';

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger('EmailService');

  constructor() {
    const emailConfig = getEmailConfig();
    this.transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass,
      },
      logger: true, // Enable logger
      debug: true, // Enable debug output
    });
  }

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    try {
      const emailConfig = getEmailConfig();
      const mailOptions = {
        from: `${emailConfig.from.name} <${emailConfig.from.email}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      };

      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent successfully to ${options.to}`);
      return true;
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      const errorStack = e instanceof Error ? e.stack : '';
      this.logger.error(
        `Failed to send email to ${options.to}: ${errorMessage}`,
        errorStack,
      );
      return false;
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      this.logger.log('Email service connection verified');
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Email service connection failed: ${errorMessage}`);
      return false;
    }
  }
}
