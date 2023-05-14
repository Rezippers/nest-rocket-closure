import { Module } from '@nestjs/common';

import { StoreResolver, StoreService } from '.';

@Module({
  providers: [StoreResolver, StoreService],
})
export class StoreModule {}
