import {Module} from '@nestjs/common';

import {StoreResolver} from "./store.resolver";
import {StoreService} from "./store.service";


@Module({
  providers: [StoreResolver, StoreService],
})
export class StoreModule {}
