import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    userID: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    week: number;

    @Column()
    start: Date;

    @Column()
    end: Date;
}
