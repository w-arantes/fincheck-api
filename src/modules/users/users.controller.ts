import { Controller, Get, Req } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  me(@Req() request: any) {
    console.log('userid me:', request.userId);

    return this.usersService.getUserById('userid');
  }
}
