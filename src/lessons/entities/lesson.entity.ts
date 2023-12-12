import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Evaluation } from './evaluation.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.lesson, {
    eager: true,
  })
  @JoinColumn()
  evaluations: Evaluation[];
}
