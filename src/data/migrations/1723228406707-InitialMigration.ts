import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1723228406707 implements MigrationInterface {
    name = 'InitialMigration1723228406707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "address"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email")`);
    }

}
