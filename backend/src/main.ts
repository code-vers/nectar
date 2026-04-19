import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get(ConfigService);

  const port = configService.get<number>('app.port');
  const apiPrefix = configService.get<string>('app.apiPrefix') ?? 'api';
  const corsOrigin = configService.get<string>('app.cors.origin');

  // Global prefix
  app.setGlobalPrefix(apiPrefix);

  // CORS
  app.enableCors({
    origin: corsOrigin,
    methods: configService.get<string>('app.cors.methods'),
  });

  await app.listen(process.env.PORT ?? 8080);
  console.log(`🚀 App running on: http://localhost:${port}/${apiPrefix}`);
}
bootstrap();
