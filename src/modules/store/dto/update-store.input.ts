import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateStoreInput } from './create-store.input';

@InputType()
export class UpdateStoreInput extends PartialType(CreateStoreInput) {
  @Field(() => Int)
  id: number;
}
