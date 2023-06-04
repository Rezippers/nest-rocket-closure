import {Field} from "@nestjs/graphql";
import {ApiProperty} from "@nestjs/swagger";
import {IsAscii, IsNumber, Min, MinLength} from "class-validator";
import Decimal from "decimal.js";

import {DecimalScalar} from "../../../shared/scalars/decimal.scalar";
import {Product} from "../product.entity";


export class CreateProductDto implements Partial<Product> {
    @ApiProperty()
    @Field()
    @IsNumber()
    readonly storeId: number;

    @ApiProperty()
    @Field()
    @MinLength(3)
    readonly name: string;

    @ApiProperty()
    @Field()
    @IsAscii()
    readonly description: string;

    @ApiProperty()
    @Field(() => DecimalScalar)
    @Min(0)
    readonly price: Decimal;
}
