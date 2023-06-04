import {Module} from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import {TypeOrmModule} from "@nestjs/typeorm";

import {AuthOptionsService} from "../auth/auth-options.service";
import {ConfigModule} from "../config/config.module";

import {Store} from "./entities/store.entity";
import {StoreController} from './store.controller';
import {StoreService} from './store.service';

@Module({
  imports: [
    PassportModule.registerAsync({
      imports: [ConfigModule],
      useClass: AuthOptionsService,
    }),
    TypeOrmModule.forFeature([Store])
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService]
})
export class StoreModule {}
