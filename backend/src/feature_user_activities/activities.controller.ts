import { Controller, HttpCode, HttpStatus, Delete, Body, Param, ParseIntPipe } from "@nestjs/common";
import { ActivitiesService } from "./activities.service.js";

@Controller('activities')
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number){
        return this.activitiesService.remove(id);
    }
}