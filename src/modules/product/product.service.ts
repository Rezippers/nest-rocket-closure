import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ILike, Repository} from "typeorm";

import {Store} from "../store/entities/store.entity";
import {StoreService} from "../store/store.service";
import {User} from "../users/users.entity";

import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {Product} from "./product.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly storeService: StoreService,
    ) {
    }

    async create(user: User, createProductDto: CreateProductDto): Promise<Product> {
        const userStore: Store = await this.storeService.findOneByUser(user, createProductDto.storeId);
        if (!userStore) throw new HttpException('Loja não encontrada.', HttpStatus.NOT_FOUND);

        const product: Product = this.productRepository.create({...createProductDto});
        product.store = userStore;

        return this.productRepository.save(product);
    }

    findAll(name: string): Promise<Product[]> {
        // TODO: Melhorar para usar full-text-search ou elastic search (analisar qual é mais adequado, em questão de caso de uso, performance e custo)
        return this.productRepository.find({ where: { name: ILike(`%${name}%`)}, relations: ['store', 'media', 'media.file']});
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
