import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpException,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Request, Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  method: string;
  endpoint: string;
  timestamp: string;
  data?: T;
  errors?: {
    message?: string | string[];
  };
}

@Injectable()
export class ResponseTransformerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept( context: ExecutionContext, next: CallHandler ): Observable<ApiResponse> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const startTime = Date.now();

    const method = request.method;
    const endpoint = request.originalUrl;

    return next.handle().pipe(
      map((data) => {
        const statusCode = response.statusCode || 200;
        const executionTime = Date.now() - startTime;

        /**
         * Success colorful log
         */
        this.logger.log( `${method} ${endpoint} ${statusCode} - ${executionTime}ms`);

        return {
          success: true,
          statusCode,
          message: data?.message || 'Request successful',
          data: data?.data ?? data,
          method,
          endpoint,
          timestamp: new Date().toISOString(),
        };
      }),

      catchError((error) => {
        const statusCode =
          error instanceof HttpException ? error.getStatus() : 500;

        const executionTime = Date.now() - startTime;

        /**
         * Error colorful log
         */
        this.logger.error(
          `${method} ${endpoint} ${statusCode} - ${executionTime}ms - ${error.message}`,
        );

        response.status(statusCode);

        return of({
          success: false,
          statusCode,
          message: error?.message || 'Internal server error',
          errors: {
            message: this.extractErrorMessage(error),
          },
          method,
          endpoint,
          timestamp: new Date().toISOString(),
        });
      }),
    );
  }

  private extractErrorMessage(error: any): string | string[] | undefined {
    if (!error?.getResponse) {
      return undefined;
    }

    const errorResponse = error.getResponse();

    if (typeof errorResponse === 'string') {
      return errorResponse;
    }

    if (typeof errorResponse === 'object' && errorResponse.message) {
      return errorResponse.message;
    }

    return undefined;
  }
}
