// src/common/interceptors/EXAMPLES.md
# Response Interceptor - Real World Examples

This document shows practical examples of how the global response interceptor transforms responses across your application.

## Example 1: Simple GET Request

### Controller Code
```typescript
// src/modules/users/controllers/users.controller.ts
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
  return await this.usersService.findOne(id);
}
```

### Request
```bash
curl -X GET http://localhost:3000/api/users/1
```

### Automatic Response (Wrapped by Interceptor)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request successful",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  },
  "timestamp": "2026-04-18T12:30:45.123Z",
  "path": "/api/users/1",
  "correlationId": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

## Example 2: Custom Success Message

### Controller Code
```typescript
@Post()
async create(@Body() dto: CreateUserDto): Promise<User> {
  const user = await this.usersService.create(dto);
  return {
    message: 'User created successfully! Welcome to the platform',
    data: user,
  };
}
```

### Request
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "email": "jane@example.com", "password": "secure123"}'
```

### Automatic Response
```json
{
  "success": true,
  "statusCode": 201,
  "message": "User created successfully! Welcome to the platform",
  "data": {
    "id": 2,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "USER"
  },
  "timestamp": "2026-04-18T12:31:10.456Z",
  "path": "/api/users",
  "correlationId": "550e8400-e29b-41d4-a716-446655440001"
}
```

---

## Example 3: Validation Error (400)

### Controller Code
```typescript
@Post()
async create(@Body() dto: CreateUserDto): Promise<User> {
  // ValidationPipe automatically validates DTOs
  return await this.usersService.create(dto);
}
```

### DTO Definition
```typescript
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  @MinLength(8)
  password: string;
}
```

### Request (Invalid Data)
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "",
    "email": "not-an-email",
    "password": "123"
  }'
```

### Automatic Error Response
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Bad Request",
  "timestamp": "2026-04-18T12:32:15.789Z",
  "path": "/api/users",
  "correlationId": "550e8400-e29b-41d4-a716-446655440002",
  "errors": {
    "message": [
      "name should not be empty",
      "email must be an email",
      "password is not strong enough"
    ]
  }
}
```

### What Gets Logged
```
[550e8400-e29b-41d4-a716-446655440002] POST /api/users - 400 - 12ms - Error: Bad Request - IP: 192.168.1.100
```

---

## Example 4: Resource Not Found (404)

### Controller Code
```typescript
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
  const user = await this.usersService.findOne(id);
  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }
  return user;
}
```

### Request
```bash
curl -X GET http://localhost:3000/api/users/999
```

### Automatic Error Response
```json
{
  "success": false,
  "statusCode": 404,
  "message": "User with ID 999 not found",
  "timestamp": "2026-04-18T12:33:20.111Z",
  "path": "/api/users/999",
  "correlationId": "550e8400-e29b-41d4-a716-446655440003"
}
```

### What Gets Logged
```
[550e8400-e29b-41d4-a716-446655440003] GET /api/users/999 - 404 - 8ms - Error: User with ID 999 not found - IP: 192.168.1.100
```

---

## Example 5: Unauthorized Access (401)

### Controller Code
```typescript
@UseGuards(AuthGuard)
@Get()
async findAll(): Promise<User[]> {
  return await this.usersService.findAll();
}
```

### Request (No Auth Token)
```bash
curl -X GET http://localhost:3000/api/users
```

### Automatic Error Response
```json
{
  "success": false,
  "statusCode": 401,
  "message": "Unauthorized",
  "timestamp": "2026-04-18T12:34:30.222Z",
  "path": "/api/users",
  "correlationId": "550e8400-e29b-41d4-a716-446655440004"
}
```

---

## Example 6: Using Correlation IDs for Tracing

### Request with Custom Correlation ID
```bash
curl -X GET http://localhost:3000/api/users/1 \
  -H "X-Correlation-Id: custom-request-trace-12345"
```

### Response (Same ID Tracked)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request successful",
  "data": { /* user data */ },
  "timestamp": "2026-04-18T12:35:45.333Z",
  "path": "/api/users/1",
  "correlationId": "custom-request-trace-12345"
}
```

### Response Headers
```
HTTP/1.1 200 OK
X-Correlation-Id: custom-request-trace-12345
Content-Type: application/json
```

### What Gets Logged
```
[custom-request-trace-12345] GET /api/users/1 - 200 - 25ms - IP: 192.168.1.100
```

---

## Example 7: Database Error (500 - Development vs Production)

### Controller Code
```typescript
@Delete(':id')
async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
  await this.usersService.delete(id);
}
```

### Request
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

### Development Response (NODE_ENV=development)
```json
{
  "success": false,
  "statusCode": 500,
  "message": "Database connection failed",
  "timestamp": "2026-04-18T12:36:50.444Z",
  "path": "/api/users/1",
  "correlationId": "550e8400-e29b-41d4-a716-446655440005",
  "errors": {
    "message": "Database connection failed",
    "stack": "QueryFailedError: connect ECONNREFUSED 127.0.0.1:5432\n    at Connection.query (src/database.ts:150:20)\n    ..."
  }
}
```

### Production Response (NODE_ENV=production)
```json
{
  "success": false,
  "statusCode": 500,
  "message": "Database connection failed",
  "timestamp": "2026-04-18T12:36:50.444Z",
  "path": "/api/users/1",
  "correlationId": "550e8400-e29b-41d4-a716-446655440005"
}
```

**Security Feature:** Stack trace is automatically hidden in production!

---

## Example 8: Auth Request with Correlation ID

### Request
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -H "X-Correlation-Id: login-trace-abc-123" \
  -d '{"email": "john@example.com", "password": "secure123"}'
```

### Response
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  },
  "timestamp": "2026-04-18T12:37:55.555Z",
  "path": "/api/auth/login",
  "correlationId": "login-trace-abc-123"
}
```

### Response Headers
```
HTTP/1.1 200 OK
X-Correlation-Id: login-trace-abc-123
Content-Type: application/json
```

### What Gets Logged
```
[login-trace-abc-123] POST /api/auth/login - 200 - 85ms - IP: 192.168.1.100
```

---

## Summary Table

| Scenario | Status | Interceptor Format | Correlation ID | Logs |
|----------|--------|-------------------|-----------------|------|
| Success | 200 | ✅ Wrapped | ✅ Included | ✅ Logged |
| Created | 201 | ✅ Wrapped | ✅ Included | ✅ Logged |
| Bad Request | 400 | ✅ Wrapped + Errors | ✅ Included | ✅ Logged |
| Unauthorized | 401 | ✅ Wrapped | ✅ Included | ✅ Logged |
| Not Found | 404 | ✅ Wrapped | ✅ Included | ✅ Logged |
| Server Error | 500 | ✅ Wrapped (Safe) | ✅ Included | ✅ Logged |

---

## Key Takeaways

1. **Every response** is automatically wrapped in the standardized format
2. **Correlation IDs** help trace requests across your system
3. **Errors are sanitized** - sensitive data is never exposed in production
4. **All requests are logged** with duration, status, and IP information
5. **Custom messages** can be added by returning `{ message: '...', data: {...} }`
6. **No code changes needed** - applies globally to all endpoints automatically
