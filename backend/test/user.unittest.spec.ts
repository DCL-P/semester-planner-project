import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';

import { UsersService } from '../src/feature_login/user.service.js';
import { UsersRepository } from '../src/feature_login/user.repository.js';
import { AuthService } from '../src/feature_login/auth.service.js';

describe('UsersService', () => {
  let service: UsersService;

  const mockRepository = {
    findOne: vi.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return one user', async () => {
    const users = [
      {
        id: 1,
        username: 'Robbin',
        email: 'robbin@example.com',
        password: '123',
      },
    ];

    mockRepository.findOne.mockResolvedValue(users);

    const result = await service.findOne(users[0].username);
    console.log(result);

    expect(result).toEqual(users);
    expect(mockRepository.findOne).toHaveBeenCalled();
  });
});

describe('AuthService', () => {
  let service: AuthService;

  // you don't mock the function you are testing, but mocking de functions the function in authservice calls
  const mockUsersService = {
    findOne: vi.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should login user', async () => {
    const user = {
      id: 1,
      username: 'Robbin',
      email: 'robbin@example.com',
      password: '123',
    };

    mockUsersService.findOne.mockResolvedValue(user);

    const result = await service.signIn('Robbin', '123');

    expect(result).toEqual({
      id: 1,
      username: 'Robbin',
      email: 'robbin@example.com',
    });

    expect(mockUsersService.findOne).toHaveBeenCalledWith('Robbin');
  });
});