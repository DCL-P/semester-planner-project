import { Module } from '@nestjs/common';
import { UsersService } from './user.service.js';
import { UsersRepository } from './user.repository.js';
import { UsersController } from './users.controller.js';

@Module({})
export class UsersModule {
    controllers: [UsersController]
    providers: [UsersService, UsersRepository]
}
