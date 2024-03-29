import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthenticateDTO } from './dtos/auth.dto';
import { SignUpDTO } from './dtos/sign-up-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  authenticate(@Body() authenticateDTO: AuthenticateDTO) {
    return this.authService.authenticate(authenticateDTO);
  }

  @Post('sign-up')
  create(@Body() signUpDTO: SignUpDTO) {
    return this.authService.signUp(signUpDTO);
  }
}
