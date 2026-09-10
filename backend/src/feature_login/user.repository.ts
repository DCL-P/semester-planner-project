import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: 1,
      name: 'Robbin',
      email: 'robbin@example.com',
    },
    {
      id: 2,
      name: 'Jan',
      email: 'jan@example.com',
    },
  ];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }
}