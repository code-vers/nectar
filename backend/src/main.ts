import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonLogger } from './common/logger/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
  logger: WinstonLogger,
});
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

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

  await app.listen(process.env.PORT ?? 8000);
  console.log(`🚀 App running on: http://localhost:${port}/${apiPrefix}`);
}
bootstrap();
