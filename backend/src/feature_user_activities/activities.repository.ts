import { Injectable } from "@nestjs/common";

export interface Activities {
    id: number,
    title: string,
    description: string
    date: Date
}

export interface ActivitiesDto {
    title: string,
    description: string,
    date: Date
}

@Injectable()
export class ActivitiesRepository {
    private readonly activities: Activities[] = [
        {
            id: 1,
            title: "Online les",
            description: "Online les om 09:00",
            date: new Date()
        },
        {
            id: 2,
            title: "Gilde backend",
            description: "Gilde voor de backend om 12:00",
            date: new Date()
        }
    ];

    async findOne(id: number): Promise<Activities | undefined> {
        return this.activities.find(activity => activity.id === id)
    }

    async remove(id: number): Promise<void> {
        const index = this.activities.findIndex(activity => activity.id === id);

        if (index === -1) {
            throw new Error("Activity not found")
        }
        
        this.activities.splice(index, 1);
    }
}