import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";

import {RequestUser} from "../../decorators/request.decorator";
import {User} from "../users/users.entity";

import {CreateProductDto} from "./dto/create-product.dto";
import {UpdateProductDto} from './dto/update-product.dto';
import {Product} from "./product.entity";
import {ProductService} from './product.service';

@Controller('product')
@UseGuards(AuthGuard())
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) {}

    @Post()
    create(@RequestUser() user: User, @Body() createProductDto: CreateProductDto) {
        return this.productService.create(user, createProductDto);
    }

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Product> {
        return this.productService.findOneWithMedia(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(+id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(+id);
    }
}
