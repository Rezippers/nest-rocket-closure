import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {RezippersFileModule} from "../rezippers-file/rezippers-file.module";

import {ProductController} from './product.controller';
import {Product} from "./product.entity";
import {ProductService} from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), RezippersFileModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
