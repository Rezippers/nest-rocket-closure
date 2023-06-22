import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {Product} from "../product/product.entity";
import {RezippersFile} from "../rezippers-file/rezippers-file.entity";
import {RezippersFileService} from "../rezippers-file/rezippers-file.service";
import {User} from '../users/users.entity';

import {ProductMedia} from "./product-media.entity";

@Injectable()
export class ProductMediaService {
    constructor(
        @InjectRepository(ProductMedia)
        private readonly productMediaRepository: Repository<ProductMedia>,
        private readonly rezippersFileService: RezippersFileService,
    ) {}

    async create(user: User, product: Product, media: Express.Multer.File): Promise<ProductMedia> {
        const file: RezippersFile = await this.rezippersFileService.create(user, media)

        const productMedia: ProductMedia =  this.productMediaRepository.create({
            product,
            file,
        });

        return this.productMediaRepository.save(productMedia);
    }
}
