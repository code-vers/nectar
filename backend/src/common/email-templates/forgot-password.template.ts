export const forgotPasswordTemplate = (
  firstName: string,
  lastName: string,
  otp: string,
  resetLink: string,
  expiryMinutes: number = 30,
): string => {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Email clients support simple CSS only */
        body { margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f8fafc; padding-bottom: 40px; }
        .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 500px; border-spacing: 0; color: #334155; border-radius: 12px; overflow: hidden; margin-top: 40px; border: 1px solid #e2e8f0; }
        .header { background-color: #cfb167; padding: 32px; text-align: center; color: #ffffff; }
        .content { padding: 32px; text-align: left; line-height: 1.5; }
        .otp-container { background-color: #f1f5f9; border-radius: 8px; padding: 20px; text-align: center; margin: 24px 0; border: 1px dashed #cbd5e1; }
        .otp-code { font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #1e293b; margin: 0; }
        .btn-wrapper { text-align: center; padding: 10px 0; }
        .button { background-color: #cfb167; color: #ffffff !important; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block; }
        .footer { text-align: center; font-size: 12px; color: #94a3b8; padding-top: 20px; }
        .expiry-text { font-size: 13px; color: #64748b; text-align: center; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="wrapper">
        <table class="main">
            <tr>
                <td class="header">
                    <h1 style="margin: 0; font-size: 24px;">Nectar LMS</h1>
                </td>
            </tr>
            <tr>
                <td class="content">
                    <p style="font-size: 18px; font-weight: 600; margin-top: 0;">Hi ${firstName} ${lastName},</p>
                    <p>Password reset requested. Use the OTP below to proceed:</p>
                    
                    <div class="otp-container">
                        <div class="otp-code">${otp}</div>
                    </div>

                    <div class="btn-wrapper">
                        <a href="${resetLink}" class="button">Reset Password</a>
                    </div>

                    <p class="expiry-text">Expires in <strong>${expiryMinutes} minutes</strong>.</p>
                    
                    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;">
                    
                    <p style="font-size: 12px; color: #94a3b8; margin-bottom: 0;">
                        If you didn't request this, you can safely ignore this email.
                    </p>
                </td>
            </tr>
        </table>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Nectar LMS. All rights reserved.
        </div>
    </div>
</body>
</html>
  `;
};