import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersRepository {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'Robbin',
      email: 'robbin@example.com',
      password: '123',
    },
    {
      id: 2,
      username: 'Jan',
      email: 'jan@example.com',
      password: '1234'
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async create(user: CreateUserDto) : Promise<User> {
    const newUser: User = {
      id: this.users.length + 1,
      ...user   
    }

    this.users.push(newUser)
    return newUser
  }
}