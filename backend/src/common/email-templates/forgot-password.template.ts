export const forgotPasswordTemplate = (firstName: string, lastName: string, otp: string, resetLink: string, expiryMinutes: number = 30): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - Nectar LMS</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            padding: 30px 20px;
        }
        .greeting {
            font-size: 16px;
            margin-bottom: 20px;
        }
        .otp-section {
            background-color: #f9f9f9;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
        }
        .otp-label {
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }
        .otp-code {
            font-size: 36px;
            font-weight: bold;
            color: #667eea;
            letter-spacing: 5px;
            text-align: center;
            font-family: 'Courier New', monospace;
        }
        .reset-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 4px;
            margin: 20px 0;
            font-weight: 600;
        }
        .reset-button:hover {
            opacity: 0.9;
        }
        .info {
            background-color: #fffbea;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            font-size: 14px;
            color: #856404;
        }
        .footer {
            background-color: #f5f5f5;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #ddd;
        }
        .divider {
            border-top: 1px solid #ddd;
            margin: 25px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔐 Password Reset Request</h1>
        </div>
        
        <div class="content">
            <div class="greeting">
                <p>Hello <strong>${firstName} ${lastName}</strong>,</p>
                <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
            </div>

            <div class="otp-section">
                <div class="otp-label">Your One-Time Password (OTP)</div>
                <div class="otp-code">${otp}</div>
            </div>

            <p style="text-align: center; margin: 20px 0;">
                <a href="${resetLink}" class="reset-button">Reset Password</a>
            </p>

            <div class="info">
                <strong>⏱️ Important:</strong> This OTP and reset link will expire in <strong>${expiryMinutes} minutes</strong>. Please use it immediately.
            </div>

            <div class="divider"></div>

            <p style="font-size: 14px; color: #666;">
                <strong>Didn't request a password reset?</strong><br>
                If you didn't request this email, your account may be at risk. Please contact our support team immediately or ignore this email if you believe this is a mistake.
            </p>

            <p style="font-size: 14px; color: #666; margin-top: 20px;">
                <strong>Need help?</strong><br>
                Contact our support team at support@nectarlms.com
            </p>
        </div>

        <div class="footer">
            <p>&copy; 2026 Nectar LMS. All rights reserved.</p>
            <p>This is an automated email, please do not reply to this message.</p>
        </div>
    </div>
</body>
</html>
  `;
};
