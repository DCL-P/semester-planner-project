import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Activity } from './activities.entities.js';
import { activityService } from './activities.service.js';


@Module({
  imports: [
    TypeOrmModule.forFeature([Activity]),
  ],
  providers: [activityService],
})
export class UsersModule {}
