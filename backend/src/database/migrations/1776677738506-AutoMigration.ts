import { MigrationInterface, QueryRunner } from 'typeorm';

export class AutoMigration1776677738506 implements MigrationInterface {
  name = 'AutoMigration1776677738506';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "type"`);
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT ARRAY['user']`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT ARRAY['user'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "type" character varying NOT NULL`,
    );
  }
}
