import { Injectable } from "@nestjs/common";
import { ActivitiesRepository, ActivitiesDto } from "./activities.repository.js";

@Injectable()
export class ActivitiesService {
    constructor(private readonly activitiesRepository: ActivitiesRepository) {}

    async remove(id: number) {
        return this.activitiesRepository.remove(id);
    }

    async create(activity: ActivitiesDto) {

        if(!activity.title) {
            throw new Error("Activity doesn't have a title")
        }

        return this.activitiesRepository.create(activity);
    }

    async update(id: number, activitiesDto: ActivitiesDto) {

        if (!id) throw new Error("Couldn't find the activity");
        if (!activitiesDto.title) throw new Error("Activity doesn't have a title");

        return this.activitiesRepository.update(id, activitiesDto);

    }
}