import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1776592638600 implements MigrationInterface {
    name = 'AutoMigration1776592638600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "roles" text array NOT NULL DEFAULT ARRAY['user'], "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_contents" ("id" integer NOT NULL, "course_id" integer NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "content_url" character varying NOT NULL, "content_type" character varying NOT NULL, "duration" integer, "order_index" integer, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e56de21b785ba03619207ce8f58" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("id" SERIAL NOT NULL, "course_title" character varying NOT NULL, "course_description" character varying NOT NULL, "category" character varying NOT NULL, "status" character varying NOT NULL, "type" character varying NOT NULL, "course_banner" character varying NOT NULL, "level" character varying NOT NULL, "total_hours" integer, "total_enroll" integer, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "course_contents"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
