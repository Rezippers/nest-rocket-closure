import {MigrationInterface, QueryRunner} from "typeorm";

export class addProductProductMediaAndRezippersfile1685513729934 implements MigrationInterface {
    name = 'addProductProductMediaAndRezippersfile1685513729934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rezippers_files" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "key" character varying NOT NULL, "author_id" integer, CONSTRAINT "REL_24e8ec6df130839030b0a9f041" UNIQUE ("author_id"), CONSTRAINT "PK_80536542409eb11177f55579ce4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_medias" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "product_id" integer, "file_id" integer, CONSTRAINT "REL_14137b3aa6a330f72ca30c5b5a" UNIQUE ("file_id"), CONSTRAINT "PK_f6bb95adc18b37fb51705f6b816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rezippers_files" ADD CONSTRAINT "FK_24e8ec6df130839030b0a9f0418" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_medias" ADD CONSTRAINT "FK_febadf3a96ceaff3bfcee685b2b" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_medias" ADD CONSTRAINT "FK_14137b3aa6a330f72ca30c5b5a4" FOREIGN KEY ("file_id") REFERENCES "rezippers_files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_medias" DROP CONSTRAINT "FK_14137b3aa6a330f72ca30c5b5a4"`);
        await queryRunner.query(`ALTER TABLE "product_medias" DROP CONSTRAINT "FK_febadf3a96ceaff3bfcee685b2b"`);
        await queryRunner.query(`ALTER TABLE "rezippers_files" DROP CONSTRAINT "FK_24e8ec6df130839030b0a9f0418"`);
        await queryRunner.query(`DROP TABLE "product_medias"`);
        await queryRunner.query(`DROP TABLE "rezippers_files"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
