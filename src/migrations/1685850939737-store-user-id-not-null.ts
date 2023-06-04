import {MigrationInterface, QueryRunner} from "typeorm";

export class storeUserIdNotNull1685850939737 implements MigrationInterface {
    name = 'storeUserIdNotNull1685850939737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."stores" DROP CONSTRAINT "FK_29f39971656b4bf7832b7476d10"`);
        await queryRunner.query(`ALTER TABLE "public"."stores" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."stores" ADD CONSTRAINT "FK_29f39971656b4bf7832b7476d10" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."stores" DROP CONSTRAINT "FK_29f39971656b4bf7832b7476d10"`);
        await queryRunner.query(`ALTER TABLE "public"."stores" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."stores" ADD CONSTRAINT "FK_29f39971656b4bf7832b7476d10" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
