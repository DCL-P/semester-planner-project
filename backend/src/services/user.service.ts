import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/user.repository.js';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async getUsers() {
    return this.usersRepository.findAll();
  }

  async getUser(id: number) {
    return this.usersRepository.findById(id);
  }
}