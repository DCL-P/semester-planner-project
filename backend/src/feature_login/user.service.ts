import { Injectable } from '@nestjs/common';
import { CreateUserDto, UsersRepository } from './user.repository.js';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async findOne(username: string) {
    return this.usersRepository.findOne(username);
  }

  async create(user: CreateUserDto) {
    return this.usersRepository.create(user);
  }
}