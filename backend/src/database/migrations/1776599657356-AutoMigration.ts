import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1776599657356 implements MigrationInterface {
    name = 'AutoMigration1776599657356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "password_resets" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "otp" character varying(6) NOT NULL, "resetToken" character varying, "isUsed" boolean NOT NULL DEFAULT false, "expiresAt" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7e57f540b334d522f9cf5b16ca5" UNIQUE ("email"), CONSTRAINT "PK_4816377aa98211c1de34469e742" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT ARRAY['user']`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT ARRAY['user'`);
        await queryRunner.query(`DROP TABLE "password_resets"`);
    }

}
