import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';

import { UsersService } from '../src/feature_login/user.service.js';
import { UsersRepository } from '../src/feature_login/user.repository.js';

describe('UsersService', () => {
  let service: UsersService;

  const mockRepository = {
    findAll: vi.fn(),
    findById: vi.fn(),
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

  it('should return all users', async () => {
    const users = [
      {
        id: 1,
        name: 'Robbin',
        email: 'robbin@example.com',
      },
    ];

    mockRepository.findAll.mockResolvedValue(users);

    const result = await service.getUsers();

    expect(result).toEqual(users);
    expect(mockRepository.findAll).toHaveBeenCalled();
  });
});