import { Controller, HttpCode, HttpStatus, Delete, Body, Param, ParseIntPipe, Post, Render, Get, Redirect } from "@nestjs/common";
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

    @Get('/planner')
    @Render('partials/planner.hbs')
    async planner() {
        const allWeeks = await this.activitiesService.fetchAllWeeks();
        console.log(`all weeks: ${allWeeks}`)

        return {
            fetchedWeeks: allWeeks
        };
    }

    @Get('/overview/week/:week')
    @Render('partials/week-overview.hbs')
    async fetchWeekTasks(@Param('week', ParseIntPipe) week: number) {
        const allTasks = await this.activitiesService.fetchWeekTasks(week);
        console.log(allTasks);
        return {
            fetchedWeekTasks: allTasks,
            current_week: week
        };
    }

    @Get('/overview/task/:taskID')
    @Render('partials/task-overview')
    async fetchTask(@Param('taskID', ParseIntPipe) taskID: any){
        const fetched_task = await this.activitiesService.fetchOneByID(taskID);

        return{
            task: fetched_task,  
            //need to be converted so HTML can interpret it and use values for placeholders in the form
            convertedStartDate: fetched_task?.start.toISOString().split('T')[0]  ,  
            convertedEndDate: fetched_task?.end.toISOString().split('T')[0]    
        }
    }

    @Post('/delete/:id')
    @Redirect('/activities/planner')
    async remove(@Param('id', ParseIntPipe) id: number){
        return this.activitiesService.remove(id);
    }

    @Post('/create')
    @Redirect('/activities/planner')
    @Render('partials/create-task.hbs')
    async create(@Body() createActivityDto: ActivitiesDto) {
        return this.activitiesService.create(createActivityDto)
    }

    @Post('/update/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateActivityDto: ActivitiesDto)  {
        return this.activitiesService.update(id, updateActivityDto)
    }
}