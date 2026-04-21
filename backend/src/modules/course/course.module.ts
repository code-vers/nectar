import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { CourseDao } from './course.dao';
import { CourseService } from './course.service';
import { Course } from './entity/course.entity';
import { CourseContent } from './entity/courseContent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CourseContent])],
  controllers: [CourseController],
  providers: [CourseService, CourseDao],
})
export class CourseModule {}
