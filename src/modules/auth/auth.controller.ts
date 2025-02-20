import {Body, Controller, Post, UnauthorizedException,} from '@nestjs/common';

import {User} from '../users/users.entity';

import {AuthService} from './auth.service';
import {SignInInput} from './dto/sign-in-input.dto';
import {SignInResult} from './dto/sign-in-result.dto';
import {SignUpInput} from './dto/sign-up-input.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() input: SignUpInput): Promise<User> {
    const user = await this.authService.signUp(input);
    return user;
  }

  @Post('signin')
  async signIn(@Body() input: SignInInput): Promise<SignInResult> {
    const result: SignInResult = await this.authService.signIn(input);
    if (!result.token) throw new UnauthorizedException();

    return result;
  }
}
