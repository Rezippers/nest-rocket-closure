import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { User } from '../../users/users.entity';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { SignInInput } from '../dto/sign-in-input.dto';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let usersRepo: Repository<User>;

  beforeEach(async () => {
    const jwtServiceMockValue = {
      sign: () => 'mock',
    };
    const JwtServiceMock = {
      provide: JwtService,
      useValue: jwtServiceMockValue,
    };
    const usersServiceMockValue = {
      save: () => 'mock',
    };
    const UsersServiceMock = {
      provide: UsersService,
      useValue: usersServiceMockValue,
    };
    const usersRepoMockValue = {
      findOne: () => 'mock',
    };
    const UsersRepoMock = {
      provide: 'UserRepository',
      useValue: usersRepoMockValue,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtServiceMock, UsersServiceMock, UsersRepoMock],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersRepo = module.get<Repository<User>>('UserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    describe('when the user exists', () => {
      it('should return valid token', async () => {
        const input: SignInInput = {
          email: 'a@example.com',
          password: 'secret',
        };
        const user = plainToClass(User, {
          id: 1,
          name: 'a',
          email: 'a@example.com',
        });
        const token = 'j.w.t';
        const result = { ...user, token };

        const findOneByEmail = jest
          .spyOn(usersRepo, 'findOne')
          .mockReturnValue(new Promise<User>((resolve) => resolve(user)));

        const compare = (
          jest.spyOn(bcrypt, 'compare') as jest.SpyInstance
        ).mockReturnValue(new Promise<boolean>((resolve) => resolve(true)));
        const sign = jest.spyOn(jwtService, 'sign').mockReturnValue(token);

        expect(await service.signIn(input)).toEqual(result);
        expect(findOneByEmail.mock.calls[0][0].email).toBe(input.email);

        findOneByEmail.mockRestore();
        compare.mockRestore();
        sign.mockRestore();
      });
    });

    describe('when the user does not exist', () => {
      it('should return empty token', async () => {
        const input: SignInInput = {
          email: 'a@example.com',
          password: 'secret',
        };
        const user = undefined;
        const result = {};

        const findOneByEmail = jest
          .spyOn(usersRepo, 'findOne')
          .mockReturnValue(new Promise<undefined>((resolve) => resolve(user)));

        expect(await service.signIn(input)).toEqual(result);
        expect(findOneByEmail.mock.calls[0][0].email).toBe(input.email);

        findOneByEmail.mockRestore();
      });
    });

    describe('when the password is invalid', () => {
      it('should return empty token', async () => {
        const input: SignInInput = {
          email: 'a@example.com',
          password: 'secret',
        };
        const user = plainToClass(User, {
          id: 1,
          name: 'a',
          email: 'a@example.com',
        });
        const result = {};

        const findOneByEmail = jest
          .spyOn(usersRepo, 'findOne')
          .mockReturnValue(new Promise<User>((resolve) => resolve(user)));
        const compare = (
          jest.spyOn(bcrypt, 'compare') as jest.SpyInstance
        ).mockReturnValue(new Promise<boolean>((resolve) => resolve(false)));

        expect(await service.signIn(input)).toEqual(result);
        expect(findOneByEmail.mock.calls[0][0].email).toBe(input.email);
        expect(compare.mock.calls[0][0]).toBe(input.password);
        expect(compare.mock.calls[0][1]).toBe(user.password);

        findOneByEmail.mockRestore();
        compare.mockRestore();
      });
    });
  });
});
