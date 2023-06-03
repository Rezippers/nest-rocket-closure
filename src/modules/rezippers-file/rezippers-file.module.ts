import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {ConfigModule} from "../config/config.module";
import {S3ClientFactory} from "../s3/s3-client.factory";

import {RezippersFile} from "./rezippers-file.entity";
import {RezippersFileService} from './rezippers-file.service';

@Module({
  imports: [TypeOrmModule.forFeature([RezippersFile]), ConfigModule],
  providers: [RezippersFileService, S3ClientFactory],
  exports: [RezippersFileService],
})
export class RezippersFileModule {}
