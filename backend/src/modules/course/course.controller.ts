import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
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

  // update course by course id
  @Patch(':id')
  updateCourse(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.update(Number(id), updateCourseDto);
  }

  // update coursecontent by course id and content id

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

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
