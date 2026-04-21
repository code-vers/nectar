import { MigrationInterface, QueryRunner } from 'typeorm';

export class AutoMigration1776678038476 implements MigrationInterface {
  name = 'AutoMigration1776678038476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT ARRAY['user']`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "course_contents_id_seq" OWNED BY "course_contents"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_contents" ALTER COLUMN "id" SET DEFAULT nextval('"course_contents_id_seq"')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_contents" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "course_contents_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT ARRAY['user'`,
    );
  }
}
