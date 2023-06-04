import {Field, ObjectType} from "@nestjs/graphql";
import {Transform} from "class-transformer";
import Decimal from "decimal.js";
import {Column, Entity, ManyToOne, OneToMany} from "typeorm";

import {CustomBaseEntity} from "../../shared/entities/custom-base-entity.entity";
import {DecimalToString, DecimalTransformer} from "../../shared/transformers/decimal.transformers";
import {ProductMedia} from "../product-media/product-media.entity";
import {Store} from "../store/entities/store.entity";

@ObjectType()
@Entity()
export class Product extends CustomBaseEntity {
    @Field()
    @Column()
    name: string;

    @Field()
    @Column({nullable: true})
    description?: string;

    @Field()
    @Column({type: "decimal", precision: 10, scale: 2, default: 0, transformer: new DecimalTransformer()})
    @Transform(DecimalToString(), {toPlainOnly: true})
    price: Decimal;

    @Field(() => Store)
    @ManyToOne(() => Store, { nullable: false })
    store: Store

    @Field(() => [ProductMedia])
    @OneToMany(() => ProductMedia, (productMedia: ProductMedia) => productMedia.product)
    media: ProductMedia[];
}
