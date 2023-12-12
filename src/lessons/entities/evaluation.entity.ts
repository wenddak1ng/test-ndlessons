import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lesson } from './lesson.entity';

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Lesson)
  @JoinColumn()
  lesson: Lesson;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn()
  user: User;
}
