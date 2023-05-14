import {MigrationInterface, QueryRunner} from "typeorm";

export class createStores1684055031159 implements MigrationInterface {
    name = 'createStores1684055031159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stores" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "name" character varying NOT NULL, "owner_id" integer, CONSTRAINT "REL_c03f4f73d83362cabb34dfa941" UNIQUE ("owner_id"), CONSTRAINT "PK_7aa6e7d71fa7acdd7ca43d7c9cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "stores" ADD CONSTRAINT "FK_c03f4f73d83362cabb34dfa9418" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stores" DROP CONSTRAINT "FK_c03f4f73d83362cabb34dfa9418"`);
        await queryRunner.query(`DROP TABLE "stores"`);
    }

}
