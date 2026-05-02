import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exception');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal server error' };

    // ValidationPipe থেকে পাঠানো flattened messages বের করা
    const errorDetails =
      typeof exceptionResponse === 'object'
        ? (exceptionResponse as any).message
        : exceptionResponse;

    this.logger.error(
      `${request.method} ${request.originalUrl} ${status} - Error: ${JSON.stringify(errorDetails)}`,
    );

    response.status(status).json({
      success: false,
      statusCode: status,
      message: Array.isArray(errorDetails)
        ? 'Validation failed'
        : exception instanceof HttpException
          ? exception.message
          : 'Internal Server Error',
      errors: errorDetails,
      method: request.method,
      endpoint: request.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}
