import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersService } from './services/user.service.js';
import { UsersRepository } from './repositories/user.repository.js';
import { vi } from 'vitest';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

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