import { IsArray, IsString } from 'class-validator';
import {
  CourseCategory,
  CourseStatus,
  Level,
} from '../../../common/enums/courses.enum';

export class CreateCourseDto {
  @IsString()
  course_title: string;

  @IsString()
  course_description: string;

  @IsString()
  category: CourseCategory;

  @IsString()
  status: CourseStatus;

  @IsString()
  course_type: Level;

  @IsString()
  course_banner: string;

  @IsString()
  total_hours?: number;

  @IsString()
  total_enroll?: number;

  @IsArray()
  content?: object[];
}
