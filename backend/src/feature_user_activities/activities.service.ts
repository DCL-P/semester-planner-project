import { BadRequestException, Injectable } from "@nestjs/common";
import { ActivitiesRepository, ActivitiesDto } from "./activities.repository.js";

@Injectable()
export class ActivitiesService {
    constructor(private readonly activitiesRepository: ActivitiesRepository) {}

    async remove(id: number) {

        if (!id) throw new BadRequestException("Couldn't find the activity")

        return this.activitiesRepository.remove(id);
    }

    async create(activity: ActivitiesDto) {

        if(!activity) {
            throw new Error("No activity found")
        }

        if(!activity.week){
            throw new Error("No week added")
        }

        return this.activitiesRepository.create(activity);
    }

    async update(id: number, activitiesDto: ActivitiesDto) {

        if (!id) throw new BadRequestException("Couldn't find the activity")

        if (!activitiesDto.week || !activitiesDto.title || !activitiesDto.description || !activitiesDto.week || !activitiesDto.end) {
            throw new BadRequestException("You are missing some fields")
        }

        return this.activitiesRepository.update(id, activitiesDto);

    }

    async fetchAll(){
        return this.activitiesRepository.fetchAll();
    }

    async fetchAllWeeks(){
        const allWeeks = this.activitiesRepository.fetchAllWeeks();

        console.log(allWeeks);
        return allWeeks;
    }

    async fetchWeekTasks(week: number){
        const allTasks = this.activitiesRepository.fetchWeekTasks(week);

        return allTasks;
    }

    async fetchOneByID(ID: number){
        const task = this.activitiesRepository.fetchByID(ID);

        return task;
    }
}