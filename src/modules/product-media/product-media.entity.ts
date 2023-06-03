import {Field, ObjectType} from "@nestjs/graphql";
import {Entity, JoinColumn, ManyToOne, OneToOne} from "typeorm";


import {CustomBaseEntity} from "../../shared/entities/custom-base-entity.entity";
import {Product} from "../product/product.entity";
import {RezippersFile} from "../rezippers-file/rezippers-file.entity";

@ObjectType()
@Entity()
export class ProductMedia extends CustomBaseEntity {

    @Field(() => Product)
    @ManyToOne(() => Product, (product :Product) => product.media)
    product: Product;

    @Field(() => RezippersFile)
    @OneToOne(() => RezippersFile)
    @JoinColumn()
    file: RezippersFile;
}
