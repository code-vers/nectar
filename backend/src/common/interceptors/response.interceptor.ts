// src/common/interceptors/response.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { throwError } from 'rxjs';

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  timestamp: string;
  path: string;
  correlationId: string;
  errors?: Record<string, any>;
}

@Injectable()
export class ResponseTransformerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('ResponseTransformerInterceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const correlationId = request.headers['x-correlation-id'] as string || uuidv4();

    // Attach correlation ID to response headers
    response.setHeader('x-correlation-id', correlationId);

    const startTime = Date.now();
    const { method, originalUrl, ip } = request as any;

    return next.handle().pipe(
      map((data) => {
        const statusCode = response.statusCode || 200;
        const duration = Date.now() - startTime;

        const apiResponse: ApiResponse = {
          success: true,
          statusCode,
          message: data?.message || 'Request successful',
          data: data?.data ?? data,
          timestamp: new Date().toISOString(),
          path: originalUrl,
          correlationId,
        };

        // Log successful request
        this.logger.log(
          `[${correlationId}] ${method} ${originalUrl} - ${statusCode} - ${duration}ms - IP: ${ip}`,
        );

        return apiResponse;
      }),
      catchError((error) => {
        const statusCode = error?.getStatus?.() || 500;
        const duration = Date.now() - startTime;

        const apiResponse: ApiResponse = {
          success: false,
          statusCode,
          message: error?.message || 'Internal server error',
          timestamp: new Date().toISOString(),
          path: originalUrl,
          correlationId,
          errors: this.sanitizeError(error),
        };

        // Log error request
        this.logger.error(
          `[${correlationId}] ${method} ${originalUrl} - ${statusCode} - ${duration}ms - Error: ${error?.message} - IP: ${ip}`,
          error?.stack,
        );

        response.status(statusCode);
        return throwError(() => apiResponse);
      }),
    );
  }

  /**
   * Sanitize error response to avoid exposing sensitive information
   */
  private sanitizeError(error: any): Record<string, any> | undefined {
    const sanitized: Record<string, any> = {};

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
}