import {Field, ObjectType} from '@nestjs/graphql';
import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';


import {CustomBaseEntity} from "../../../shared/entities/custom-base-entity.entity";
import {User} from '../../users/users.entity';

@ObjectType()
@Entity()
export class Store extends CustomBaseEntity {
  @Field()
  @Column()
  name: string;

  @Field((type) => User)
  @OneToOne(() => User, {nullable: false})
  @JoinColumn()
  user: User;
}
