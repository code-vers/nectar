# Password Reset Feature - Step 1

This document explains the password reset feature implementation for Nectar LMS.

## Overview

The password reset feature allows users to reset their passwords via email with OTP (One-Time Password) verification.

## Step 1: Forgot Password Endpoint ✅

### API Endpoint
- **Route**: `POST /api/auth/password/forgot-password`
- **Request Body**:
```json
{
  "email": "user@example.com"
}
```

- **Response**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Password reset link and OTP sent to your email. Please check your inbox.",
  "method": "POST",
  "endpoint": "/api/auth/password/forgot-password",
  "timestamp": "2026-04-19T10:00:00.000Z"
}
```

### Features
- Sends a 6-digit OTP to the user's email
- Generates a secure reset token valid for 30 minutes
- Email includes both OTP and a reset link with the token
- Returns success message regardless of email existence (for security)

### Email Configuration

Add these environment variables to your `.env` file:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM_NAME=Nectar LMS
EMAIL_FROM_ADDRESS=noreply@nectarlms.com

# Frontend URL (for reset link in email)
FRONTEND_URL=http://localhost:3000
```

### Gmail Setup (Recommended)

1. Enable 2-Step Verification in Google Account
2. Create an "App Password" for Gmail
3. Use the app password in `EMAIL_PASSWORD`

## Database

A new `password_resets` table is created automatically via TypeORM synchronization. It stores:
- Email
- OTP (6-digit code)
- Reset Token
- Expiry timestamp (30 minutes)
- Status (used/unused)

## File Structure

```
src/
├── common/
│   ├── config/
│   │   └── email.config.ts          # Email configuration
│   ├── email-templates/
│   │   └── forgot-password.template.ts  # HTML email template
│   └── services/
│       └── email.service.ts         # Email sending service
└── modules/
    └── password-reset/
        ├── controllers/
        │   └── password-reset.controller.ts
        ├── services/
        │   └── password-reset.service.ts
        ├── entities/
        │   └── password-reset.entity.ts
        ├── dto/
        │   └── forgot-password.dto.ts
        └── password-reset.module.ts
```

## Next Steps

- **Step 2**: Create OTP verification endpoint
- **Step 3**: Create password reset endpoint

## Testing

```bash
# Test forgot password endpoint
curl -X POST http://localhost:8080/api/auth/password/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

## Security Considerations

- OTP is valid for 30 minutes only
- Reset token is unique and secure
- Security: Email existence is not revealed in response
- Each password reset request invalidates previous ones
- Failed/expired tokens cannot be reused
