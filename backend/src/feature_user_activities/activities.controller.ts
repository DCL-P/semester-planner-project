import { Controller, HttpCode, HttpStatus, Delete, Body, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ActivitiesService } from "./activities.service.js";
import type { ActivitiesDto } from "./activities.repository.js";

@Controller('activities')
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number){
        return this.activitiesService.remove(id);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/create')
    async create(@Body() createActivityDto: ActivitiesDto) {
        return this.activitiesService.create(createActivityDto)
    }
}