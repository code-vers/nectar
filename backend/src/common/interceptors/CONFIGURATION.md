// src/common/interceptors/CONFIGURATION.md
# Response Interceptor - Configuration & Best Practices

## Current Configuration

The interceptor is automatically enabled globally in the application through [src/app.module.ts](../../app.module.ts):

```typescript
@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformerInterceptor,
    },
  ],
})
export class AppModule {}
```

## Environment Variables

The interceptor respects the following environment variable:

### NODE_ENV
```bash
# Development: Stack traces are included in error responses
NODE_ENV=development

# Production: Stack traces are hidden (security)
NODE_ENV=production
```

**Default:** `development` (for local development)

---

## Customization Guide

### 1. Changing the Response Format

Edit [response.interceptor.ts](./response.interceptor.ts) and modify the `ApiResponse` interface:

```typescript
export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  timestamp: string;
  path: string;
  correlationId: string;
  errors?: Record<string, any>;
  // Add custom fields below
  version: string;  // Example
  environment: string;  // Example
}
```

Then update the response object:
```typescript
const apiResponse: ApiResponse = {
  success: true,
  statusCode,
  message: data?.message || 'Request successful',
  data: data?.data ?? data,
  timestamp: new Date().toISOString(),
  path: originalUrl,
  correlationId,
  version: '1.0.0',  // Example
  environment: process.env.NODE_ENV,  // Example
};
```

### 2. Customizing Error Sanitization

Modify the `sanitizeError` method to control what error information is exposed:

```typescript
private sanitizeError(error: any): Record<string, any> | undefined {
  const sanitized: Record<string, any> = {};

  // Example: Always include custom error codes
  if (error?.errorCode) {
    sanitized.errorCode = error.errorCode;
  }

  // Include validation errors if present
  if (error?.getResponse?.()) {
    const response = error.getResponse() as any;
    if (response.message) {
      sanitized.message = response.message;
    }
    if (response.error) {
      sanitized.error = response.error;
    }
  }

  // Don't expose stack traces in production
  if (process.env.NODE_ENV === 'development' && error?.stack) {
    sanitized.stack = error.stack;
  }

  return Object.keys(sanitized).length > 0 ? sanitized : undefined;
}
```

### 3. Adding Custom HTTP Headers

Add headers in the `intercept` method:

```typescript
// Add custom headers (example: API version)
response.setHeader('X-API-Version', '1.0.0');
response.setHeader('X-Request-ID', correlationId);
response.setHeader('X-Response-Time', `${duration}ms`);
```

### 4. Conditional Logging

Modify logging behavior based on status code:

```typescript
const isError = statusCode >= 400;
const logLevel = statusCode >= 500 ? 'error' : isError ? 'warn' : 'log';

this.logger[logLevel](
  `[${correlationId}] ${method} ${originalUrl} - ${statusCode} - ${duration}ms`,
);
```

### 5. Adding Request/Response Size Limits

Track payload sizes:

```typescript
const requestSize = JSON.stringify(request.body).length;
const responseSize = JSON.stringify(apiResponse).length;

this.logger.log(
  `[${correlationId}] ${method} ${originalUrl} - Request: ${requestSize}B Response: ${responseSize}B`
);
```

---

## Performance Optimization

### 1. Lazy Correlation ID Generation
The interceptor uses lazy UUID generation only when needed:

```typescript
const correlationId = request.headers['x-correlation-id'] as string || uuidv4();
```

### 2. Conditional Logging
Only log errors to file, standard responses to console:

```typescript
// In winston.logger.ts
new winston.transports.File({
  filename: 'logs/error.log',
  level: 'error',  // Only errors written
}),
```

### 3. Memory-Efficient Error Sanitization
Errors are sanitized inline without creating new objects:

```typescript
if (process.env.NODE_ENV === 'development' && error?.stack) {
  sanitized.stack = error.stack;
}
```

---

## Best Practices

### ✅ DO

1. **Use custom messages for better UX**
   ```typescript
   return {
     message: 'User registered successfully!',
     data: user,
   };
   ```

2. **Let the interceptor handle errors**
   ```typescript
   // ✅ Good - Throws exception (caught by interceptor)
   throw new NotFoundException('User not found');
   ```

3. **Use correlation IDs for tracing**
   ```bash
   curl -H "X-Correlation-Id: my-trace-id" http://localhost:3000/api/users
   ```

4. **Check logs for debugging**
   ```bash
   cat logs/combined.log | grep correlation-id-here
   ```

### ❌ DON'T

1. **Don't manually format responses**
   ```typescript
   // ❌ Bad - Bypasses interceptor
   return res.status(200).json({
     success: true,
     data: user,
   });
   ```

2. **Don't expose sensitive data in errors**
   ```typescript
   // ❌ Bad - Exposes database details
   throw new Error(`Database connection to ${dbHost}:${dbPort} failed`);
   
   // ✅ Good - Generic message
   throw new InternalServerErrorException('Database error');
   ```

3. **Don't ignore correlation IDs**
   ```typescript
   // ✅ Good - Use for request tracing
   this.logger.log(`User ${userId} created`, correlationId);
   ```

4. **Don't catch exceptions without re-throwing**
   ```typescript
   // ❌ Bad - Hides errors
   try {
     return await this.userService.findOne(id);
   } catch (e) {
     // Doesn't throw - interceptor won't handle this
   }
   
   // ✅ Good - Let interceptor handle
   try {
     return await this.userService.findOne(id);
   } catch (e) {
     throw new InternalServerErrorException('Failed to fetch user');
   }
   ```

---

## Extending the Interceptor

### Example: Add Request Metadata

Create a new interceptor that works alongside the response interceptor:

```typescript
// src/common/interceptors/request-metadata.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class RequestMetadataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const startTime = Date.now();

    // Attach metadata to request
    request['metadata'] = {
      startTime,
      userAgent: request.get('user-agent'),
      referer: request.get('referer'),
    };

    return next.handle();
  }
}
```

Register it in AppModule:
```typescript
@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestMetadataInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformerInterceptor,
    },
  ],
})
export class AppModule {}
```

---

## Debugging

### View Logs
```bash
# All logs
tail -f logs/combined.log

# Errors only
tail -f logs/error.log

# Find specific correlation ID
grep "correlation-id-here" logs/combined.log
```

### Check Correlation IDs
```bash
# Make request with custom ID
curl -X GET http://localhost:3000/api/users \
  -H "X-Correlation-Id: test-123"

# Response will include it
curl -v -X GET http://localhost:3000/api/users \
  -H "X-Correlation-Id: test-123" 2>&1 | grep X-Correlation-Id
```

### Monitor Performance
```bash
# Check average response times
grep "POST /api/users" logs/combined.log | awk -F' - ' '{print $3}' | awk '{sum+=$1; count++} END {print "Average:", sum/count "ms"}'
```

---

## Migration Guide (If Upgrading)

### From Old Response Format

**Old:**
```json
{
  "success": true,
  "message": "Request successful",
  "data": { }
}
```

**New:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request successful",
  "data": { },
  "timestamp": "2026-04-18T12:30:45.123Z",
  "path": "/api/users",
  "correlationId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Update API Clients
```typescript
// Old client code
const response = await fetch('/api/users');
const { data } = await response.json();

// New client code
const response = await fetch('/api/users');
const { success, data, correlationId } = await response.json();
if (!success) {
  console.error('Request failed:', correlationId);
  throw new Error('API Error');
}
```

---

## Troubleshooting

### Correlation ID Not Present
- **Cause:** Interceptor not loaded
- **Fix:** Check AppModule has the interceptor registered
- **Debug:** `grep "correlationId" logs/combined.log`

### Stack Traces Visible in Production
- **Cause:** NODE_ENV not set or set to 'development'
- **Fix:** Set `NODE_ENV=production` before starting
- **Debug:** Check in `package.json` start script

### Responses Not Wrapped
- **Cause:** Interceptor order issue
- **Fix:** Ensure ResponseTransformerInterceptor is registered before other interceptors
- **Debug:** Check `app.module.ts` providers array

### Performance Impact
- **Cause:** Excessive logging
- **Fix:** Adjust log levels in `winston.logger.ts`
- **Debug:** Run with `NODE_ENV=production` for optimized logging
