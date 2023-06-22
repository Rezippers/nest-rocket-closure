import {Controller, HttpException, HttpStatus, Param, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {FileInterceptor} from "@nestjs/platform-express";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {RequestUser} from "../../decorators/request.decorator";
import {Product} from "../product/product.entity";
import {User} from "../users/users.entity";

import {ProductMedia} from "./product-media.entity";
import {ProductMediaService} from './product-media.service';


@Controller('product-media')
@UseGuards(AuthGuard())
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
    async create(@RequestUser() user: User, @Param('productId') productId: string, @UploadedFile() file: Express.Multer.File): Promise<ProductMedia> {
        // TODO: validar tamanho do arquivo
        // TODO: validar tipo do arquivo
        const product: Product = await this.productRepository.findOne(+productId, { relations: ['store'], where: { store: { user } }});
        if (!product) throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

       return this.productMediaService.create(user, product, file);
    }
}
