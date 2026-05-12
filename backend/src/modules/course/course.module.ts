import { Module } from '@nestjs/common';
import { JwtAuthService } from '../shared/services/jwt.service';
import { CourseController } from './course.controller';
import { CourseDao } from './course.dao';
import { CourseService } from './course.service';

@Module({
  imports: [],
  controllers: [CourseController],
  providers: [CourseService, CourseDao, JwtAuthService],
})
export class CourseModule {}
