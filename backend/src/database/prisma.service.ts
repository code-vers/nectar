import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    if (!process.env.DATABASE_URL) {
      const host = process.env.DB_HOST;
      const port = process.env.DB_PORT ?? '5432';
      const username = process.env.DB_USERNAME;
      const password = process.env.DB_PASSWORD;
      const dbName = process.env.DB_NAME;

      if (host && username && password && dbName) {
        process.env.DATABASE_URL = `postgresql://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:${port}/${dbName}?schema=public`;
      }
    }

    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL ?? '',
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
