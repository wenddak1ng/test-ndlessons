import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Evaluation } from './entities/evaluation.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Evaluation]), UsersModule],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
