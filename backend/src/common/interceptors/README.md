# Production-Grade Response Interceptor

## Overview

The `ResponseTransformerInterceptor` is a global NestJS interceptor that standardizes all API responses across the application. It provides consistent response formatting, error handling, logging, and request tracking.

## Features

### ✅ Standardized Response Format
All API responses follow a consistent structure:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request successful",
  "data": { /* actual response data */ },
  "timestamp": "2026-04-18T12:30:45.123Z",
  "path": "/api/users",
  "correlationId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### ✅ Error Handling
- Automatically caught exceptions are formatted consistently
- Sensitive information is sanitized (no stack traces in production)
- Validation errors are preserved for client troubleshooting
- HTTP status codes are properly preserved

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "timestamp": "2026-04-18T12:30:45.123Z",
  "path": "/api/users",
  "correlationId": "550e8400-e29b-41d4-a716-446655440000",
  "errors": {
    "message": ["email must be an email", "password must be longer than 8 characters"]
  }
}
```

### ✅ Request Tracking
- Unique correlation IDs for request tracing
- Can be passed via `X-Correlation-Id` header
- Automatically generated if not provided
- Included in response headers for easy tracking across services

### ✅ Comprehensive Logging
- All requests/responses logged with Winston
- Request method, path, duration, status code tracked
- IP address captured for security auditing
- Error stack traces logged (development only)

**Log Format:**
```
[550e8400-e29b-41d4-a716-446655440000] GET /api/users - 200 - 45ms - IP: 192.168.1.1
```

### ✅ Performance Tracking
- Request processing duration in milliseconds
- Helps identify slow endpoints

## Integration

The interceptor is **automatically registered globally** in [src/app.module.ts](../../app.module.ts) using NestJS's `APP_INTERCEPTOR` token. No additional setup is required.

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

## Usage Examples

### Success Response
When a controller returns data:

```typescript
@Get(':id')
async findOne(@Param('id') id: number) {
  const user = await this.usersService.findOne(id);
  return user;
}
```

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request successful",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "timestamp": "2026-04-18T12:30:45.123Z",
  "path": "/api/users/1",
  "correlationId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Custom Response with Message
```typescript
@Post()
async create(@Body() dto: CreateUserDto) {
  const user = await this.usersService.create(dto);
  return {
    message: 'User created successfully',
    data: user,
  };
}
```

**Response:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "User created successfully",
  "data": { /* user object */ },
  "timestamp": "2026-04-18T12:30:45.123Z",
  "path": "/api/users",
  "correlationId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Error Response
```typescript
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  const user = await this.usersService.findOne(id);
  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }
  return user;
}
```

**Response (404):**
```json
{
  "success": false,
  "statusCode": 404,
  "message": "User with ID 999 not found",
  "timestamp": "2026-04-18T12:30:45.123Z",
  "path": "/api/users/999",
  "correlationId": "550e8400-e29b-41d4-a716-446655440000"
}
```

## Request Tracking

### Using Correlation IDs
Pass `X-Correlation-Id` header for request tracing:

```bash
curl -X GET http://localhost:3000/api/users \
  -H "X-Correlation-Id: my-custom-trace-id-12345"
```

Response will include the same correlation ID:
```bash
X-Correlation-Id: my-custom-trace-id-12345
```

## Security Considerations

### Sanitization in Production
- ❌ Stack traces are **NOT** exposed in production
- ✅ Stack traces are exposed in development for debugging
- ❌ Sensitive error details are removed
- ✅ User-friendly error messages are preserved

### Environment Detection
```typescript
if (process.env.NODE_ENV === 'development' && error?.stack) {
  sanitized.stack = error.stack;
}
```

### IP Logging
- All requests are logged with client IP address
- Useful for security auditing and rate limiting

## Logging Integration

### Log Files
Logs are written to:
- `logs/error.log` - Errors only
- `logs/combined.log` - All logs

### Log Output Example
```
[550e8400-e29b-41d4-a716-446655440000] GET /api/users - 200 - 45ms - IP: 192.168.1.1
[550e8400-e29b-41d4-a716-446655440000] POST /api/users - 400 - 15ms - Error: Validation failed - IP: 192.168.1.1
```

## Performance Impact

- **Minimal overhead**: Uses RxJS operators (`map`, `catchError`)
- **No blocking operations**: Non-blocking UUID generation
- **Streaming compatible**: Works with file uploads and streaming responses

## Testing

The interceptor is compatible with NestJS testing utilities:

```typescript
const module: TestingModule = await Test.createTestingModule({
  controllers: [UsersController],
  providers: [UsersService, ResponseTransformerInterceptor],
}).compile();
```

## API Response Interface

```typescript
export interface ApiResponse<T = any> {
  success: boolean;           // true/false
  statusCode: number;         // HTTP status code (200, 404, 500, etc.)
  message: string;            // User-friendly message
  data?: T;                   // Response data (optional)
  timestamp: string;          // ISO 8601 timestamp
  path: string;               // Request path
  correlationId: string;      // Unique request identifier
  errors?: Record<string, any>; // Validation/error details (optional)
}
```

## Customization

### Modify Global Response Format
Edit [response.interceptor.ts](./response.interceptor.ts) and update the `ApiResponse` interface or the `map` operator.

### Add Custom Headers
Add to the `intercept` method:
```typescript
response.setHeader('X-Custom-Header', 'value');
```

### Change Logging Behavior
Modify the `WinstonLogger` configuration in [src/common/logger/winston.logger.ts](../logger/winston.logger.ts).

## Files Modified

1. **[response.interceptor.ts](./response.interceptor.ts)** - Enhanced interceptor with production features
2. **[src/app.module.ts](../../app.module.ts)** - Global registration of interceptor
3. **package.json** - Added `uuid` dependency

## Dependencies

- `uuid` - For generating correlation IDs
- `nest-winston` - For structured logging
- `winston` - Core logging library
