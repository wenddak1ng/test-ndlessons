import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { LessonsResponseDto } from './dto/lessons-response.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiOkResponse({ type: LessonsResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @ApiOkResponse({ type: LessonsResponseDto })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.findOne(id);
  }

  @ApiOkResponse({ type: CreateLessonDto })
  @ApiBody({ type: CreateLessonDto })
  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @ApiOkResponse({ type: CreateEvaluationDto })
  @ApiBody({ type: CreateEvaluationDto })
  @Post(':id/evaluations')
  createEvaluation(
    @Param('id', ParseIntPipe) id: number,
    @Body() createEvaluationDto: CreateEvaluationDto,
  ) {
    return this.lessonsService.createEvaluation(id, createEvaluationDto);
  }
}
