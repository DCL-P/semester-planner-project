import { Injectable } from "@nestjs/common";
import { ActivitiesService } from "./activities.service.js"
import { Activity } from "./activities.entities.js"
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


export interface Activities {
    id: number,
    title: string,
    week: number,
    description: string,
    start: Date,
    end: Date
}

export interface ActivitiesDto {
    title: string,
    week: number,
    description: string,
    start: Date,
    end: Date
}

@Injectable()
export class ActivitiesRepository {

    constructor(
        @InjectRepository(Activity)
        private readonly activitiesRepository: Repository<Activity>,
    ) {}

    // [X]
    async update(id: number, activity: ActivitiesDto): Promise<Activities> {
        const record = await this.activitiesRepository.findOneBy({id});

        if(!record) throw new Error("Activity not found")

        record.title = activity.title;
        // to fetch user we'll need a session!
        record.description = activity.description;
        record.week = activity.week;
        record.start = activity.start;
        record.end = activity.end;

        return record;
    }   

    async remove(id: number): Promise<void> {
        const activity = await this.activitiesRepository.findOneBy({ id });

        if (!activity) {
            throw new Error("Activity not found")
        }
        
        await this.activitiesRepository.remove(activity);
    }

    //[X]
    async create(activity: ActivitiesDto): Promise<Activities> {
        const new_activity = this.activitiesRepository.create({
            title: activity.title,
            week: activity.week,
            description: activity.description,
            start: activity.start,
            end: activity.end

        })

        const saved_activity = await this.activitiesRepository.save(new_activity);
        return saved_activity;
    }

    async WeekActivities(): Promise<Activities> {

        
        const new_activity = this.activitiesRepository.create({
            title: activity.title,
            week: activity.week,
            description: activity.description,
            start: activity.start,
            end: activity.end

        })

        const saved_activity = await this.activitiesRepository.save(new_activity);
        return saved_activity;
    }
}