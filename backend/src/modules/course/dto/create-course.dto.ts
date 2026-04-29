import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ContentType,
  CourseCategory,
  CourseContentStatus,
  CourseStatus,
  Level,
} from '../../../common/enums/courses.enum';

export class CreateCourseContentDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  content_url: string;

  @IsDefined()
  @IsEnum(ContentType)
  content_type: ContentType;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsNumber()
  order_index?: number;

  @IsDefined()
  @IsEnum(CourseContentStatus)
  status: CourseContentStatus;
}

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
  level: Level;

  @IsString()
  course_banner: string;

  @IsOptional()
  @IsNumber()
  total_hours?: number;

  @IsOptional()
  @IsNumber()
  total_enroll?: number;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmptyObject({ nullable: false }, { each: true })
  // @ValidateNested({ each: true })
  // @Type(() => CreateCourseContentDto)
  content?: CreateCourseContentDto[];
}
