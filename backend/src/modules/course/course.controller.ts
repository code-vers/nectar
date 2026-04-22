import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ContentType,
  CourseCategory,
  CourseContentStatus,
  CourseStatus,
  Level,
} from 'src/common/enums/courses.enum';
import { CourseService } from './course.service';
import {
  CreateCourseContentDto,
  CreateCourseDto,
} from './dto/create-course.dto';
import {
  UpdateCourseContentDto,
  UpdateCourseDto,
} from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Post(':id/content')
  addContent(
    @Body() CreateCourseContentDto: CreateCourseContentDto,
    @Param('id') id: string,
  ) {
    return this.courseService.addContent(CreateCourseContentDto, Number(id));
  }

  @Get()
  findAllCourses(
    @Query('category') category?: CourseCategory,
    @Query('status') status?: CourseStatus,
    @Query('level') level?: Level,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
  ) {
    return this.courseService.findAllCourses({
      category,
      status,
      level,
      search,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      skip: skip ? Number(skip) : undefined,
    });
  }
  // find course by id with content
  @Get(':id/content')
  findCourseContentByCourseId(
    @Param('id') id: string,
    @Query('status') status?: CourseContentStatus,
    @Query('content_type') content_type?: ContentType,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('skip') skip?: string,
  ) {
    return this.courseService.findCourseContentByCourseId(Number(id), {
      status,
      content_type,
      search,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      skip: skip !== undefined ? Number(skip) : undefined,
    });
  }

  // update course by course id
  @Patch(':id')
  updateCourse(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.updateCourse(Number(id), updateCourseDto);
  }

  // update course content by course id and content id

  @Patch(':courseId/content/:contentId')
  updateCourseContent(
    @Param('courseId') courseId: string,
    @Param('contentId') contentId: string,
    @Body() updateCourseContentDto: UpdateCourseContentDto,
  ) {
    return this.courseService.updateCourseContent(
      Number(courseId),
      Number(contentId),
      updateCourseContentDto,
    );
  }

  // update coursecontent by course id and content id

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
  //   return this.courseService.update(+id, updateCourseDto);
  // }

  // deleteCourseWithContent
  @Delete(':id')
  deleteCourseWithContent(@Param('id') id: string) {
    return this.courseService.deleteCourseWithContent(Number(id));
  }

  // delete course content by course id and content id

  @Delete(':courseId/content/:contentId')
  deleteCourseContent(
    @Param('courseId') courseId: string,
    @Param('contentId') contentId: string,
  ) {
    return this.courseService.deleteCourseContent(
      Number(courseId),
      Number(contentId),
    );
  }

  // delete whole content by course id

  @Delete(':id/content')
  deleteWholeContentByCourseId(@Param('id') id: string) {
    return this.courseService.deleteWholeContentByCourseId(Number(id));
  }
}
