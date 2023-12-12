import { ApiResponseProperty } from '@nestjs/swagger';
import { CreateLessonDto } from './create-lesson.dto';
import { CreateEvaluationDto } from './create-evaluation.dto';

export class LessonsResponseDto extends CreateLessonDto {
  @ApiResponseProperty()
  evaluations: CreateEvaluationDto;
}
