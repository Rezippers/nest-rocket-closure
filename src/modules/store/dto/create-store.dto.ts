import {Field} from "@nestjs/graphql";
import {ApiProperty} from "@nestjs/swagger";
import {MinLength} from "class-validator";

export class CreateStoreDto {
    @ApiProperty()
    @Field()
    @MinLength(3)
    name: string;
}
