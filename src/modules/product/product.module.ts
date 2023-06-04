import {Module} from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import {TypeOrmModule} from "@nestjs/typeorm";

import {AuthOptionsService} from "../auth/auth-options.service";
import {ConfigModule} from "../config/config.module";
import {StoreModule} from "../store/store.module";

import {ProductController} from './product.controller';
import {Product} from "./product.entity";
import {ProductService} from './product.service';

@Module({
  imports: [
    PassportModule.registerAsync({
      imports: [ConfigModule],
      useClass: AuthOptionsService,
    }),
    TypeOrmModule.forFeature([Product]),
    StoreModule
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
