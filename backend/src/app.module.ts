import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from '.onfig/jwt.config';
import { JwtModule,/modules/user/user.module';
import appConfig from './config/app.config';
import { SharedModule } from './modules/shared/shared.module';
import jwtConfig from './c JwtModuleOptions } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, jwtConfig],
      // cache: true,
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        return {
          secret: configService.get<string>('app.jwt.secret'),
          signOptions: {
            expiresIn: configService.get<number>('app.jwt.expiresIn'),
          },
        };
      },
    }),
    DatabaseModule,
    SharedModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
