import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('app.port') ?? 8081;
  const apiPrefix = configService.get<string>('app.apiPrefix') ?? 'api';
  const corsOrigin = configService.get<string>('app.cors.origin') ?? '*';
  const corsMethods =
    configService.get<string>('app.cors.methods') ??
    'GET,POST,PUT,PATCH,DELETE';

  app.setGlobalPrefix(apiPrefix);

  app.enableCors({
    origin: corsOrigin,
    methods: corsMethods,
  });

  await app.listen(port);
  console.log(`🚀 App running on: http://localhost:${port}/${apiPrefix}`);
}

bootstrap();
