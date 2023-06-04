import {Module} from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import {TypeOrmModule} from "@nestjs/typeorm";

import {AuthOptionsService} from "../auth/auth-options.service";
import {ConfigModule} from "../config/config.module";
import {Product} from "../product/product.entity";
import {ProductModule} from "../product/product.module";
import {RezippersFileModule} from "../rezippers-file/rezippers-file.module";

import {ProductMediaController} from './product-media.controller';
import {ProductMedia} from "./product-media.entity";
import {ProductMediaService} from './product-media.service';

@Module({
    imports: [
        PassportModule.registerAsync({
            imports: [ConfigModule],
            useClass: AuthOptionsService,
        }),
        TypeOrmModule.forFeature([ProductMedia, Product]),
        RezippersFileModule,
        ProductModule
    ],
    controllers: [ProductMediaController],
    providers: [ProductMediaService],
})
export class ProductMediaModule {
}
