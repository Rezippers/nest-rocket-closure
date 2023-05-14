import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@ObjectType()
export abstract class CustomBaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field((type) => Int)
  @VersionColumn()
  readonly version: number;
}
