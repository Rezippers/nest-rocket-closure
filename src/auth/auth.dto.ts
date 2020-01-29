import { ApiModelProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsAscii, IsEmail, MinLength } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';
import { User } from '../users/users.entity';

@InputType()
export class SignUpDto implements Partial<User> {
  @ApiModelProperty()
  @Field()
  @IsAlphanumeric()
  @MinLength(1)
  readonly name: string;

  @ApiModelProperty()
  @Field()
  @IsEmail()
  @MinLength(1)
  readonly email: string;

  @ApiModelProperty()
  @Field()
  @IsAscii()
  @MinLength(8)
  readonly password: string;
}

@InputType()
export class LoginDto implements Partial<User> {
  @ApiModelProperty()
  @Field()
  @IsAlphanumeric()
  @MinLength(1)
  readonly name: string;

  @ApiModelProperty()
  @Field()
  @IsAscii()
  @MinLength(8)
  readonly password: string;
}

@ObjectType()
export class LoginResult {
  @Field()
  readonly token: string;
}