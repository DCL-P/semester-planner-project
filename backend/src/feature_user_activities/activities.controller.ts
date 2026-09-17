import { Controller, HttpCode, HttpStatus, Delete, Body, Param, ParseIntPipe, Post, Render, Get } from "@nestjs/common";
import { ActivitiesService } from "./activities.service.js";
import type { ActivitiesDto } from "./activities.repository.js";

@Controller('activities')
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}


    @Get('/create')
    @Render('partials/')

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

    @HttpCode(HttpStatus.OK)
    @Post('/update/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateActivityDto: ActivitiesDto)  {
        return this.activitiesService.update(id, updateActivityDto)
    }
}