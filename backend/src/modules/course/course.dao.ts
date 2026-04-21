import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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

    @InjectDataSource() private readonly dataSource: DataSource,
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

  // All course - filter + search + pagination

  // async findAllCourses(filters: {
  //   category?: CourseCategory;
  //   search?: string;
  //   status?: CourseStatus;
  //   level?: Level;
  //   page?: number;
  //   limit?: number;
  // }): Promise<[Course[], number]> {
  //   const { category, search, status, level, page = 1, limit = 10 } = filters;
  //   const query = this.courseContentRepository.createQueryBuilder('course');
  //   if (category) {
  //     query.andWH;
  //   }
  // }

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

  //  all update operation

  // update course content by course id and content id

  async updateCourseContent(
    contentId: number,
    courseId: number,
    updateData: Partial<CourseContent>,
  ) {
    const updated = await this.courseContentRepository.update(
      { id: contentId, course_id: courseId },
      updateData,
    );
    return updated;
  }

  // update course by course id
  async updateCourse(id: number, updateData: Partial<Course>) {
    const updated = await this.courseRepository.update({ id }, updateData);
    return updated;
  }

  //  delete Course With Content by course id

  async deleteCourseWithContent(courseId: number): Promise<Course> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // get course for returning after deletion
      const course = await queryRunner.manager.findOne(Course, {
        where: { id: courseId },
      });
      if (!course) {
        throw new Error('Course not found');
      }
      // delete course content
      await queryRunner.manager.delete(CourseContent, { course_id: courseId });
      // delete course
      await queryRunner.manager.delete(Course, { id: courseId });
      await queryRunner.commitTransaction();
      return course;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  // All Delete Oparation

  // Delete Course

  async deleteCourse(id: number): Promise<void> {
    await this.courseRepository.delete({ id });
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
  // delete whole content by course id
  async deleteWholeContentByCourseId(courseId: number): Promise<void> {
    await this.courseContentRepository.delete({ course_id: courseId });
  }
}
