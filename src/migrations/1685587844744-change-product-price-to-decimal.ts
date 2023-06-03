import {MigrationInterface, QueryRunner} from "typeorm";

export class changeProductPriceToDecimal1685587844744 implements MigrationInterface {
    name = 'changeProductPriceToDecimal1685587844744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."products" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "public"."products" ADD "price" numeric(10,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."products" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "public"."products" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."products" ALTER COLUMN "description" SET NOT NULL`);
    }

}
