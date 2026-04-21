import { Injectable } from '@nestjs/common';
import { CourseDao } from './course.dao';
import {
  CreateCourseContentDto,
  CreateCourseDto,
} from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly coursedao: CourseDao) {}

  // create course with content

  async create(createCourseDto: CreateCourseDto) {
    const { content = [], ...courseData } = createCourseDto;

    const course = await this.coursedao.create(courseData as CreateCourseDto);

    const contentWithCourseId = content.map((contentItem) => ({
      ...contentItem,
      course_id: course.id,
    }));

    await this.coursedao.createContent(contentWithCourseId);

    return course;
  }

  //  create course content with course id

  async addContent(
    createCourseContentDto: CreateCourseContentDto,
    courseId: number,
  ) {
    const contentWithCourseId = {
      ...createCourseContentDto,
      course_id: courseId,
    };

    // if course id not exist throw error

    const course = await this.coursedao.findCourseById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    return this.coursedao.createContent([contentWithCourseId]);
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course data is ${JSON.stringify(updateCourseDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }

  // deleteCourseWithContent by course id

  async deleteCourseWithContent(courseId: number) {
    return this.coursedao.deleteCourseWithContent(courseId);
  }

  // delete course content  // removeContent(courseId: number, contentId: number) {
  //   return this.coursedao.deleteCourseContent(courseId, contentId);
  // }

  async deleteCourseContent(courseId: number, contentId: number) {
    //if course id not exist throw error

    const course = await this.coursedao.findCourseById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    // if content id not exist throw error
    const content = await this.coursedao.findCourseContentByIdAndCourseId(
      contentId,
      courseId,
    );
    if (!content) {
      throw new Error('Content not found');
    }

    // if content id not belong to course id throw error
    if (content.course_id !== courseId) {
      throw new Error('Content does not belong to the specified course');
    }

    return this.coursedao.deleteCourseContent(courseId, contentId);
  }

  // async delerte whole content by course id
  async deleteWholeContentByCourseId(courseId: number) {
    // if course id not exist throw error
    const course = await this.coursedao.findCourseById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    // if now content exist for the course id throw error
    const content = await this.coursedao.findCourseContentByIdAndCourseId(
      courseId,
      courseId,
    );
    if (!content) {
      throw new Error('Content not found');
    }

    return this.coursedao.deleteWholeContentByCourseId(courseId);
  }
}
