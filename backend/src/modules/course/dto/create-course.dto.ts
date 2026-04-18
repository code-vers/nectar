import { IsString } from 'class-validator';
import {
  CourseCategory,
  CourseStatus,
  Level,
} from 'src/common/enums/courses.enum';

export class CreateCourseDto {
  @IsString()
  course_title: string;

  @IsString()
  course_description: string;

  @IsString()
  course_category: CourseCategory;

  @IsString()
  course_type: Level;

  @IsString()
  course_status: CourseStatus;
}
