import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseContentDto, CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}

export class UpdateCourseContentDto extends PartialType(
  CreateCourseContentDto,
) {}
