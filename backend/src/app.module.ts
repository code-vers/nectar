import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseTransformerInterceptor } from './common/interceptors/response.interceptor';
import appConfig from './config/app.config';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';
import { UsersModule } from './modules/users/users.module';
import { AuthGuard } from './common/gurds/auth.guard';
import { SharedModule } from './modules/shared/shared.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        resolve(process.cwd(), '.env'),
        resolve(process.cwd(), 'backend', '.env'),
      ],
      load: [appConfig],
    }),
    PrismaModule,
    SharedModule,
    AuthModule,
    UsersModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
