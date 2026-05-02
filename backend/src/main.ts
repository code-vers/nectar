import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

const contentRequiredFields = [
  'course_id',
  'title',
  'description',
  'content_url',
  'content_type',
  'status',
];

//@Todo: move to validation-formatter.utils.ts
function flattenValidationMessages(
  errors: ValidationError[],
  parentPath = '',
): any[] { // string[] এর বদলে any[]
  const results: any[] = [];

  errors.forEach((error) => {
    const currentPath = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;

    if (error.children?.length) {
      results.push(...flattenValidationMessages(error.children, currentPath));
    }

    if (error.constraints) {
      Object.values(error.constraints).forEach((constraint) => {
        results.push({
          field: currentPath,
          message: constraint, 
        });
      });
    }
  });

  return results;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException({
          message: flattenValidationMessages(errors),
        }),
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get(ConfigService);

  const port = configService.get<number>('app.port');
  const apiPrefix = configService.get<string>('app.apiPrefix') ?? 'api';
  // const corsOrigin = configService.get<string>('app.cors.origin');

  // Global prefix
  app.setGlobalPrefix(apiPrefix);

  // CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'https://nectar-dun.vercel.app'],
    methods: configService.get<string>('app.cors.methods'),
  });

  await app.listen(process.env.PORT ?? 8080);
  console.log(`🚀 App running on: http://localhost:${port}/${apiPrefix}`);
}
void bootstrap();
