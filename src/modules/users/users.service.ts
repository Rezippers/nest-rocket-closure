import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PasswordHelper } from '../../helpers/password.helper';

import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async save(email: string, password: string, name: string): Promise<User> {
    await this.validateSave(email, password, name);

    const u = new User();
    Object.assign(u, { email, name });
    u.password = await PasswordHelper.hashPassword(password);

    return this.usersRepo.save(u);
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepo.find();
    return users;
  }

  async findOneByName(name: string): Promise<User> {
    const user = await this.usersRepo.findOne({ name });
    return user;
  }

  private async validateSave(
    email: string,
    password: string,
    name: string,
  ): Promise<void> {
    if (!email) throw new Error('É obrigatório informar o email.');
    if (!name) throw new Error('É obrigatório informar o nome.');

    PasswordHelper.validatePassword(password);

    const userWithSameEmail = await this.usersRepo.findOne({ email });
    if (userWithSameEmail) throw new Error('Este email já está em uso.');
  }
}
