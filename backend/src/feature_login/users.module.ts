import { Module } from '@nestjs/common';
import { UsersService } from './user.service.js';
import { UsersRepository } from './user.repository.js';
import { AuthController } from './users.controller.js';
import { AuthService } from './auth.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entities.js';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [
        AuthService,
        UsersService,
        UsersRepository
    ],
})
export class UsersModule {}