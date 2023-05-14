import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PasswordHelper } from '../helpers/password.helper';
import { User } from '../modules/users/users.entity';
import { UsersService } from '../modules/users/users.service';

import { JwtPayload } from './dto/jwt-payload.dto';
import { SignInInput } from './dto/sign-in-input.dto';
import { SignInResult } from './dto/sign-in-result.dto';
import { SignUpInput } from './dto/sign-up-input.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async signUp(input: SignUpInput): Promise<User> {
    const { email, password, name } = input;

    const user = await this.usersService.save(email, password, name);

    return user;
  }

  async signIn(input: SignInInput): Promise<SignInResult> {
    const user = await this.usersRepo.findOne({ email: input.email });
    if (!user) return new SignInResult();

    const valid = await PasswordHelper.comparePassword(
      input.password,
      user.password,
    );
    if (!valid) return new SignInResult();

    const payload: JwtPayload = {
      id: user.id,
    };
    const token = this.jwtService.sign(payload);

    return { ...user, token };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    return this.usersRepo.findOne(payload.id);
  }
}
