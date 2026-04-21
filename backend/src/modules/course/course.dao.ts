import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCourseContentDto,
  CreateCourseDto,
} from './dto/create-course.dto';
import { Course } from './entity/course.entity';
import { CourseContent } from './entity/courseContent.entity';

@Injectable()
export class CourseDao {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(CourseContent)
    private readonly courseContentRepository: Repository<CourseContent>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);
    return await this.courseRepository.save(course);
  }

  async createContent(
    contentItems: CreateCourseContentDto[],
  ): Promise<CourseContent[]> {
    const contents = this.courseContentRepository.create(contentItems);
    return await this.courseContentRepository.save(contents);
  }
  async deleteCourseContent(
    courseId: number,
    contentId: number,
  ): Promise<void> {
    await this.courseContentRepository.delete({
      id: contentId,
      course_id: courseId,
    });
  }

  // find course by id

  async findCourseById(id: number): Promise<Course | null> {
    const course = await this.courseRepository.findOne({ where: { id } });
    return course;
  }

  //  find course content by id and course id
  async findCourseContentByIdAndCourseId(
    contentId: number,
    courseId: number,
  ): Promise<CourseContent | null> {
    const content = await this.courseContentRepository.findOne({
      where: { id: contentId, course_id: courseId },
    });
    return content;
  }

  // delete whole content by course id
  async deleteWholeContentByCourseId(courseId: number): Promise<any> {
    const course = await this.courseRepository.delete({ id: courseId });
    return course;
  }
}
