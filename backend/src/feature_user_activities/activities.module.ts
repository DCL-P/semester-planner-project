import { Module } from "@nestjs/common";
import { ActivitiesController } from "./activities.controller.js";
import { ActivitiesService } from "./activities.service.js";
import { ActivitiesRepository } from "./activities.repository.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Activity } from "./activities.entities.js";

@Module({
    imports: [TypeOrmModule.forFeature([Activity])],
    controllers: [ActivitiesController],
    providers: [ActivitiesService, ActivitiesRepository]
})

export class ActivitiesModule {}