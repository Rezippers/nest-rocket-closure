import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";

import {RequestUser} from "../../decorators/request.decorator";
import {User} from "../users/users.entity";

import {CreateProductDto} from "./dto/create-product.dto";
import {UpdateProductDto} from './dto/update-product.dto';
import {Product} from "./product.entity";
import {ProductService} from './product.service';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) {}

    @Post()
    @UseGuards(AuthGuard())
    create(@RequestUser() user: User, @Body() createProductDto: CreateProductDto) {
        return this.productService.create(user, createProductDto);
    }

    @Get()
    findAll(@Query('name') name: string): Promise<Product[]> {
        return this.productService.findAll(name);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Product> {
        return this.productService.findOneWithMedia(+id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard())
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(+id, updateProductDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    remove(@Param('id') id: string) {
        return this.productService.remove(+id);
    }
}
