export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: {
    name: string;
    email: string;
  };
}

export const getEmailConfig = (): EmailConfig => {
  return {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    // Port 587 uses STARTTLS (secure: false), Port 465 uses SSL/TLS (secure: true)
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASSWORD || '',
    },
    from: {
      name: process.env.EMAIL_FROM_NAME || 'Nectar LMS',
      email: process.env.EMAIL_FROM_ADDRESS || 'noreply@nectarlms.com',
    },
  };
};
