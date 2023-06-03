import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {Product} from "./product.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product: Product = this.productRepository.create({...createProductDto});
        return this.productRepository.save(product);
    }

    findAll(): Promise<Product[]> {
        return this.productRepository.find({});
    }

    findOneWithMedia(id: number): Promise<Product> {
        return this.productRepository.findOne(id, {relations: ['media', 'media.file']});
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        return `This action updates a #${id} product`;
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }
}
