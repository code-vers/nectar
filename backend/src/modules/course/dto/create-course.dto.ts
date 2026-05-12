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
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  ContentType,
  CourseCategory,
  CourseContentStatus,
  CourseStatus,
  Level,
} from '@prisma/client';

const normalizeEnumInput = ({ value }: { value: unknown }) =>
  typeof value === 'string'
    ? value.trim().replace(/[\s-]+/g, '_').toUpperCase()
    : value;

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
  @Transform(normalizeEnumInput)
  @IsEnum(ContentType)
  content_type: ContentType;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsNumber()
  order_index?: number;

  @IsDefined()
  @Transform(normalizeEnumInput)
  @IsEnum(CourseContentStatus)
  status: CourseContentStatus;
}

export class CreateCourseDto {
  @IsString()
  course_title: string;

  @IsString()
  course_description: string;

  @Transform(normalizeEnumInput)
  @IsEnum(CourseCategory)
  category: CourseCategory;

  @Transform(normalizeEnumInput)
  @IsEnum(CourseStatus)
  status: CourseStatus;

  @Transform(normalizeEnumInput)
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
  @ValidateNested({ each: true })
  @Type(() => CreateCourseContentDto)
  content?: CreateCourseContentDto[];
}
