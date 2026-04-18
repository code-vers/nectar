import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  ContentType,
  CourseCategory,
  CourseContentStatus,
  CourseStatus,
  Level,
} from 'src/common/enums/courses.enum';

export class CreateCourseDto {
  @IsString()
  course_title: string;

  @IsString()
  course_description: string;

  @IsEnum(CourseCategory)
  category: CourseCategory;

  @IsEnum(CourseStatus)
  status: CourseStatus;

  @IsEnum(Level)
  type: Level;

  @IsEnum(Level)
  level: Level;

  @IsString()
  course_banner: string;

  @IsOptional()
  @IsNumber()
  total_hours?: number;

  @IsOptional()
  @IsNumber()
  total_enroll?: number;
}
export class CreateCourseContentDto {
  @IsNumber()
  course_id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  content_url: string;

  @IsEnum(ContentType)
  content_type: ContentType;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsNumber()
  order_index?: number;

  @IsEnum(CourseContentStatus)
  status: CourseContentStatus;
}
