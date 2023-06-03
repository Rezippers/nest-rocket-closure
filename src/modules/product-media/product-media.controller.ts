import {Controller, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {Product} from "../product/product.entity";

import {ProductMedia} from "./product-media.entity";
import {ProductMediaService} from './product-media.service';


@Controller('product-media')
export class ProductMediaController {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductMedia)
        private readonly productMediaRepository: Repository<ProductMedia>,
        private readonly productMediaService: ProductMediaService,
    ) {}

    @Post(':productId')
    @UseInterceptors(FileInterceptor('file'))
    async create(@Param('productId') productId: string, @UploadedFile() file: Express.Multer.File): Promise<ProductMedia> {
        // TODO: validar tamanho do arquivo
        // TODO: validar tipo do arquivo
        const product: Product = await this.productRepository.findOne(+productId);
        if (!product) throw new Error('Produto não encontrado');

       return this.productMediaService.create(product, file);
    }
}
