import { Injectable } from "@nestjs/common";
import { ActivitiesRepository } from "./activities.repository.js";

@Injectable()
export class ActivitiesService {
    constructor(private readonly activitiesRepository: ActivitiesRepository) {}

    async remove(id: number) {
        return this.activitiesRepository.remove(id);
    }
}