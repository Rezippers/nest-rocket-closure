import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {TypeOrmModule} from '@nestjs/typeorm';

import {GqlOptionsService} from '../appoptions/gql-options.service';
import {DecimalScalar} from "../shared/scalars/decimal.scalar";
import {TypeOrmOptionsService} from '../typeorm/typeorm-options.service';

import {AuthModule} from './auth/auth.module';
import {ConfigModule} from './config/config.module';
import {HealthModule} from './health/health.module';
import {ProductMediaModule} from './product-media/product-media.module';
import {ProductModule} from "./product/product.module";
import {RezippersFileModule} from './rezippers-file/rezippers-file.module';
import {S3Module} from './s3/s3.module';
import {StoreModule} from './store/store.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmOptionsService,
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useClass: GqlOptionsService,
    }),
    AuthModule,
    HealthModule,
    StoreModule,
    ProductModule,
    RezippersFileModule,
    ProductMediaModule,
    S3Module,
  ],
  providers: [DecimalScalar],
})
export class AppModule {}
