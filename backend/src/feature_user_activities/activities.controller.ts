import { Controller, HttpCode, HttpStatus, Delete, Body, Param, ParseIntPipe, Post, Render, Get } from "@nestjs/common";
import { ActivitiesService } from "./activities.service.js";
import type { ActivitiesDto } from "./activities.repository.js";

@Controller('activities')
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}

    @Get('/create-activity')
    @Render('partials/create-task.hbs')
    activity() {
        return {};
    }

    @Get('/overview')
    @Render('partials/week-overview.hbs')
    placeholder() {
    return {};
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number){
        return this.activitiesService.remove(id);
    }

    @Post('/create')
    @Render('partials/create-task.hbs')
    async create(@Body() createActivityDto: ActivitiesDto) {
        return this.activitiesService.create(createActivityDto)
    }

    @Post('/update/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateActivityDto: ActivitiesDto)  {
        return this.activitiesService.update(id, updateActivityDto)
    }
}