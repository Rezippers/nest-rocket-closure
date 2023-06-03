import {Field, ObjectType} from '@nestjs/graphql';
import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';

import {CustomBaseEntity} from "../../shared/entities/custom-base-entity.entity";
import {User} from '../users/users.entity';

@ObjectType()
@Entity()
export class RezippersFile extends CustomBaseEntity {

    @Field(() => User)
    @OneToOne(() => User, {nullable: true})
    @JoinColumn()
    author: User;

    @Field()
    @Column()
    key: string;
}
