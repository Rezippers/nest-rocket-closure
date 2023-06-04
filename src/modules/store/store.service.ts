import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {User} from "../users/users.entity";

import {CreateStoreDto} from './dto/create-store.dto';
import {UpdateStoreDto} from './dto/update-store.dto';
import {Store} from "./entities/store.entity";


@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  create(createStoreDto: CreateStoreDto) {
    return 'This action adds a new store';
  }

  findAll() {
    return `This action returns all store`;
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  findOneByUser(user: User, id: number): Promise<Store> {
    return this.storeRepository.findOne({where: {user, id}});
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
