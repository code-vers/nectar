import { Injectable } from '@nestjs/common';
import {
  ContentType,
  Course,
  CourseCategory,
  CourseContent,
  CourseContentStatus,
  CourseStatus,
  Level,
  Prisma,
} from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import {
  CreateCourseContentDto,
  CreateCourseDto,
} from './dto/create-course.dto';

@Injectable()
export class CourseDao {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.prisma.course.create({
      data: createCourseDto as any,
    });
  }

  async createContent(
    contentItems: CreateCourseContentDto[],
  ): Promise<CourseContent[]> {
    // Prisma createMany doesn't return the created items in all DBs,
    // but for Postgres it can with skipDuplicates: true and then fetching?
    // Actually, it's better to use create if we need the returned items,
    // but here we can use createMany and then fetch them if needed.
    // The original code used this.courseContentRepository.save(contents) which returns items.

    // In Prisma, to get returned items, we can use a transaction with multiple creates
    // or just return the count and then fetch.
    // However, for simplicity and matching return type:
    const contents = await this.prisma.$transaction(
      contentItems.map((item) =>
        this.prisma.courseContent.create({ data: item as any }),
      ),
    );
    return contents;
  }

  async findAllCourses(filters: {
    category?: CourseCategory;
    status?: CourseStatus;
    level?: Level;
    search?: string;
    page?: number;
    limit?: number;
    skip?: number;
  }): Promise<[Course[], number]> {
    const {
      category,
      status,
      level,
      search,
      page = 1,
      limit = 10,
      skip,
    } = filters;

    const where: Prisma.CourseWhereInput = {};

    if (category) where.category = category as any;
    if (status) where.status = status as any;
    if (level) where.level = level as any;
    if (search) {
      where.OR = [
        { course_title: { contains: search, mode: 'insensitive' } },
        { course_description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const skipValue = skip !== undefined ? skip : (page - 1) * limit;

    const [courses, count] = await Promise.all([
      this.prisma.course.findMany({
        where,
        skip: skipValue,
        take: limit,
      }),
      this.prisma.course.count({ where }),
    ]);

    return [courses, count];
  }

  async findCourseById(id: number): Promise<Course | null> {
    return await this.prisma.course.findUnique({
      where: { id },
      include: { contents: true },
    });
  }

  // find course content by course id
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
  ): Promise<[CourseContent[], number]> {
    const {
      status,
      content_type,
      search,
      page = 1,
      limit = 10,
      skip,
    } = filters;

    const where: Prisma.CourseContentWhereInput = {
      course_id: courseId,
    };

    if (status) where.status = status as any;
    if (content_type) where.content_type = content_type as any;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const skipValue = skip !== undefined ? skip : (page - 1) * limit;

    const [contents, count] = await Promise.all([
      this.prisma.courseContent.findMany({
        where,
        orderBy: { order_index: 'asc' },
        skip: skipValue,
        take: limit,
      }),
      this.prisma.courseContent.count({ where }),
    ]);

    return [contents, count];
  }

  //  find course content by id and course id
  async findCourseContentByIdAndCourseId(
    contentId: number,
    courseId: number,
  ): Promise<CourseContent | null> {
    return await this.prisma.courseContent.findFirst({
      where: { id: contentId, course_id: courseId },
    });
  }

  // update course content by course id and content id
  async updateCourseContent(
    contentId: number,
    courseId: number,
    updateData: Partial<CourseContent>,
  ) {
    return await this.prisma.courseContent.updateMany({
      where: { id: contentId, course_id: courseId },
      data: updateData as any,
    });
  }

  // update course by course id
  async updateCourse(id: number, updateData: Partial<Course>) {
    return await this.prisma.course.update({
      where: { id },
      data: updateData as any,
    });
  }

  //  delete Course With Content by course id
  async deleteCourseWithContent(courseId: number): Promise<Course> {
    return await this.prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const course = await tx.course.findUnique({
          where: { id: courseId },
        });
        if (!course) {
          throw new Error('Course not found');
        }

        await tx.courseContent.deleteMany({
          where: { course_id: courseId },
        });

        await tx.course.delete({
          where: { id: courseId },
        });

        return course;
      },
    );
  }

  // All Delete Oparation
  // Delete Course
  async deleteCourse(id: number): Promise<void> {
    await this.prisma.course.delete({ where: { id } });
  }

  async deleteCourseContent(
    courseId: number,
    contentId: number,
  ): Promise<void> {
    await this.prisma.courseContent.deleteMany({
      where: {
        id: contentId,
        course_id: courseId,
      },
    });
  }

  // delete whole content by course id
  async deleteWholeContentByCourseId(courseId: number): Promise<void> {
    await this.prisma.courseContent.deleteMany({
      where: { course_id: courseId },
    });
  }
}
