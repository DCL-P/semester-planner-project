import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './user.service.js';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.getUser(Number(id));
  }
}