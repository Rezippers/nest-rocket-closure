import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {Product} from "../product/product.entity";
import {ProductModule} from "../product/product.module";
import {RezippersFileModule} from "../rezippers-file/rezippers-file.module";

import {ProductMediaController} from './product-media.controller';
import {ProductMedia} from "./product-media.entity";
import {ProductMediaService} from './product-media.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductMedia, Product]),
        RezippersFileModule,
        ProductModule
    ],
    controllers: [ProductMediaController],
    providers: [ProductMediaService],
})
export class ProductMediaModule {
}
