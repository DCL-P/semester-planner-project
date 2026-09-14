import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userID: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    date: Date;
}
