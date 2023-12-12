import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { Lesson } from './entities/lesson.entity';
import { Evaluation } from './entities/evaluation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,

    @InjectRepository(Evaluation)
    private readonly evaluationsRepository: Repository<Evaluation>,

    private readonly usersService: UsersService,
  ) {}

  public async create(createLessonDto: CreateLessonDto) {
    const insertResult = await this.insertLesson(createLessonDto);

    return insertResult;
  }

  public async createEvaluation(
    id: number,
    createEvaluationDto: CreateEvaluationDto,
  ) {
    createEvaluationDto.lesson_id = id;
    const insertResult = await this.insertEvaluation(createEvaluationDto);

    return insertResult;
  }

  public async findAll() {
    return await this.lessonsRepository.find();
  }

  public async findOne(id: number) {
    return await this.lessonsRepository.findOneBy({
      id: id,
    });
  }

  private async insertLesson(
    createLessonDto: CreateLessonDto,
  ): Promise<Lesson & CreateLessonDto> {
    return await this.lessonsRepository.save(
      Object.assign(new Lesson(), createLessonDto),
    );
  }

  private async insertEvaluation(
    createEvaluationDto: CreateEvaluationDto,
  ): Promise<Evaluation & CreateEvaluationDto> {
    const [user, lesson] = await Promise.all([
      this.usersService.findOne(createEvaluationDto.user_id),
      this.findOne(createEvaluationDto.lesson_id),
    ]);
    if (!user || !lesson) {
      throw new BadRequestException('User or lesson not found');
    }

    const evaluation = new Evaluation();
    evaluation.lesson = lesson;
    evaluation.user = user;

    return await this.evaluationsRepository.save(
      Object.assign(evaluation, createEvaluationDto),
    );
  }
}
