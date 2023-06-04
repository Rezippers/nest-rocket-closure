import {ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, UseGuards, UseInterceptors,} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth} from '@nestjs/swagger';

import {User} from './users.entity';
import {UsersService} from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':name')
  async findOneByName(@Param('name') name: string): Promise<User> {
    const user = await this.usersService.findOneByName(name);
    if (!user) throw new NotFoundException();
    return user;
  }
}
