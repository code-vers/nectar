import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  method: string;
  endpoint: string;
  timestamp: string;
  data?: T;
  errors?: ValidationError[] | { message: string };
}

interface ErrorDetail {
  property?: string;
  constraints?: Record<string, string>;
  children?: ErrorDetail[];
}

@Injectable()
export class ResponseTransformerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const startTime = Date.now();

    return next.handle().pipe(
      map((data: any) => {
        const statusCode = response.statusCode || 200;
        this.logger.log(
          `${request.method} ${request.originalUrl} ${statusCode} - ${Date.now() - startTime}ms`,
        );

        return {
          success: true,
          statusCode,
          message: data?.message || 'Request successful',
          data: data?.data !== undefined ? data.data : data,
          method: request.method,
          endpoint: request.originalUrl,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
