import {
  ApiHideProperty,
  ApiProperty,
  ApiResponseProperty,
} from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional } from 'class-validator';

export class CreateEvaluationDto {
  @ApiResponseProperty()
  id: number;

  @ApiProperty()
  @IsNumberString()
  user_id: number;

  @ApiProperty()
  @IsNumberString()
  score: number;

  @ApiHideProperty()
  @IsOptional()
  @IsNumber()
  lesson_id: number;
}
