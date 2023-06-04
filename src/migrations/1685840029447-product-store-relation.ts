import {MigrationInterface, QueryRunner} from "typeorm";

export class productStoreRelation1685840029447 implements MigrationInterface {
    name = 'productStoreRelation1685840029447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."products" ADD "store_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."products" ADD CONSTRAINT "FK_68863607048a1abd43772b314ef" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."products" DROP CONSTRAINT "FK_68863607048a1abd43772b314ef"`);
        await queryRunner.query(`ALTER TABLE "public"."products" DROP COLUMN "store_id"`);
    }

}
