import { Module } from '@nestjs/common';
import { UsersService } from './user.service.js';
import { UsersRepository } from './user.repository.js';
import { AuthController } from './users.controller.js';
import { AuthService } from './auth.service.js';

@Module({})
export class UsersModule {
    controllers: [AuthController]
    providers: [AuthService, UsersService, UsersRepository]
}
