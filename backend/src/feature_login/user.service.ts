import { Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository.js';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async findOne(username: string) {
    return this.usersRepository.findOne(username);
  }
}