import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsString } from 'class-validator';
import {
  CourseCategory,
  CourseStatus,
  Level,
} from 'src/common/enums/courses.enum';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @IsString()
  course_title?: string;

  @IsString()
  course_description?: string;

  @IsString()
  category?: CourseCategory;

  @IsString()
  status?: CourseStatus;

  @IsString()
  course_type?: Level;

  @IsString()
  course_banner?: string;

  @IsString()
  total_hours?: number;

  @IsString()
  total_enroll?: number;

  @IsArray()
  content?: object[];
}
