import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';

import { UsersService } from '../src/feature_login/user.service.js';
import { UsersRepository } from '../src/feature_login/user.repository.js';
import { AuthService } from '../src/feature_login/auth.service.js';
import { create } from 'domain';

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
    create: vi.fn()
  };

  beforeEach(async () => {
    vi.clearAllMocks();
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

 it('should create an account', async () => {
    const newUser = {
      username: 'Robert',
      email: 'robbintest@example.com',
      password: '12345',
    };

    // The user doesnt exist
    mockUsersService.findOne.mockResolvedValue(undefined);

    // this is what userservice returns
    mockUsersService.create.mockResolvedValue({
      id: 3,
      ...newUser,
    });

    const result = await service.signUp(newUser);

    expect(result).toEqual({
      id: 3,
      username: 'Robert',
      email: 'robbintest@example.com',
      password: '12345',
    });

    expect(mockUsersService.findOne).toHaveBeenCalledWith('Robert');

    expect(mockUsersService.create).toHaveBeenCalledWith(newUser);
  });

  it('should not create an account if username already exists', async () => {
    const existingUser = {
      id: 1,
      username: 'Robbin',
      email: 'robbin@example.com',
      password: '123',
    };

    const newUser = {
      username: 'Robbin',
      email: 'new@example.com',
      password: '12345',
    };

    // the username already exists
    mockUsersService.findOne.mockResolvedValue(existingUser);

    await expect(
      service.signUp(newUser),
    ).rejects.toThrow('Username already exists');

    expect(mockUsersService.create).not.toHaveBeenCalled();
  });
});