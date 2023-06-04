import {MigrationInterface, QueryRunner} from "typeorm";

export class changeOwnerToUser1685849798294 implements MigrationInterface {
    name = 'changeOwnerToUser1685849798294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."stores" DROP CONSTRAINT "FK_c03f4f73d83362cabb34dfa9418"`);
        await queryRunner.query(`ALTER TABLE "public"."stores" RENAME COLUMN "owner_id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "public"."stores" RENAME CONSTRAINT "REL_c03f4f73d83362cabb34dfa941" TO "UQ_29f39971656b4bf7832b7476d10"`);
        await queryRunner.query(`ALTER TABLE "public"."stores" ADD CONSTRAINT "FK_29f39971656b4bf7832b7476d10" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."stores" DROP CONSTRAINT "FK_29f39971656b4bf7832b7476d10"`);
        await queryRunner.query(`ALTER TABLE "public"."stores" RENAME CONSTRAINT "UQ_29f39971656b4bf7832b7476d10" TO "REL_c03f4f73d83362cabb34dfa941"`);
        await queryRunner.query(`ALTER TABLE "public"."stores" RENAME COLUMN "user_id" TO "owner_id"`);
        await queryRunner.query(`ALTER TABLE "public"."stores" ADD CONSTRAINT "FK_c03f4f73d83362cabb34dfa9418" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
