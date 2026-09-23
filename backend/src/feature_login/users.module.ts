import { Module } from '@nestjs/common';
import { UsersService } from './user.service.js';
import { UsersRepository } from './user.repository.js';
import { AuthController } from './users.controller.js';
import { AuthService } from './auth.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entities.js';
import { ActivitiesModule } from '../feature_user_activities/activities.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ActivitiesModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    
    UsersService,
    UsersRepository,
  ],
})
export class UsersModule {}