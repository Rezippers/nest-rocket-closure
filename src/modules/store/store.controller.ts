import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";

import {RequestUser} from "../../decorators/request.decorator";
import {User} from "../users/users.entity";

import {CreateStoreDto} from './dto/create-store.dto';
import {UpdateStoreDto} from './dto/update-store.dto';
import {StoreService} from './store.service';


@Controller('store')
@UseGuards(AuthGuard())
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(@RequestUser() user: User, @Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(user, createStoreDto);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
