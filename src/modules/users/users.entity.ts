import {Field, ObjectType} from '@nestjs/graphql';
import {Exclude} from 'class-transformer';
import {Column, Entity, Index} from 'typeorm';

import {CustomBaseEntity} from "../../shared/entities/custom-base-entity.entity";


@ObjectType()
@Entity()
export class User extends CustomBaseEntity {
  @Field()
  @Column()
  name: string;

  @Field()
  @Index({ unique: true })
  @Column()
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;
}
