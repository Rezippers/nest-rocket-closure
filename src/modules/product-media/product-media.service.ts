import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {Product} from "../product/product.entity";
import {RezippersFile} from "../rezippers-file/rezippers-file.entity";
import {RezippersFileService} from "../rezippers-file/rezippers-file.service";

import {ProductMedia} from "./product-media.entity";

@Injectable()
export class ProductMediaService {
    constructor(
        @InjectRepository(ProductMedia)
        private readonly productMediaRepository: Repository<ProductMedia>,
        private readonly rezippersFileService: RezippersFileService,
    ) {}

    async create(product: Product, media: Express.Multer.File): Promise<ProductMedia> {
        // TODO: Receber user da requisição e validar se ele é o dono do produto
        const file: RezippersFile = await this.rezippersFileService.create(null, media)

        const productMedia:ProductMedia =  this.productMediaRepository.create({
            product,
            file,
        });

        return this.productMediaRepository.save(productMedia);
    }
}
