import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ContentType,
  CourseCategory,
  CourseContentStatus,
  CourseStatus,
  Level,
} from 'src/common/enums/courses.enum';
import { CourseDao } from './course.dao';
import {
  CreateCourseContentDto,
  CreateCourseDto,
} from './dto/create-course.dto';
import {
  UpdateCourseContentDto,
  UpdateCourseDto,
} from './dto/update-course.dto';

@Injectable()
export class CourseService {
  findAll: any;
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

  async findAllCourses(filters: {
    category?: CourseCategory;
    status?: CourseStatus;
    level?: Level;
    search?: string;
    page?: number;
    limit?: number;
    skip?: number;
  }) {
    return this.coursedao.findAllCourses(filters);
  }
  // find course by id

  async findCourseById(id: number) {
    return this.coursedao.findCourseById(id);
  }

  // find all course content by course id
  async findCourseContentByCourseId(
    courseId: number,
    filters: {
      status?: CourseContentStatus;
      content_type?: ContentType;
      search?: string;
      page?: number;
      limit?: number;
      skip?: number;
    },
  ) {
    const course = await this.coursedao.findCourseById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const [data, total] = await this.coursedao.findCourseContentByCourseId(
      courseId,
      filters,
    );

    const limit = filters.limit ?? 10;
    const skip = filters.skip;
    const page =
      skip !== undefined ? Math.floor(skip / limit) + 1 : (filters.page ?? 1);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        skip: skip ?? (page - 1) * limit,
      },
    };
  }
  // all update is here

  // udpate course by  course id

  async updateCourse(id: number, updateCourseDto: UpdateCourseDto) {
    // if course id not exist throw error

    console.log(id, 'id is here');

    const course = await this.coursedao.findCourseById(id);
    if (!course) {
      throw new Error('Course not found');
    }
    return this.coursedao.updateCourse(id, updateCourseDto);
  }

  // update course content

  async updateCourseContent(
    courseId: number,
    contentId: number,
    updateCourseContentDto: Partial<UpdateCourseContentDto>,
  ) {
    // if course id not exist throw error
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
    return this.coursedao.updateCourseContent(
      contentId,
      courseId,
      updateCourseContentDto,
    );
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course data is ${JSON.stringify(updateCourseDto)}`;
  }

  // deleteCourseWithContent by course id

  async deleteCourseWithContent(courseId: number) {
    // if course id not exist throw error
    const course = await this.coursedao.findCourseById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }
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
