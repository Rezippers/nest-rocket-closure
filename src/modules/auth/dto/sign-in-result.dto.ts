import {Field, ObjectType} from '@nestjs/graphql';

import {User} from '../../users/users.entity';

@ObjectType()
export class SignInResult {
  @Field()
  readonly token: string;

  @Field()
  user: User;
}
