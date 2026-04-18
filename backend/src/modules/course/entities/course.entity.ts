import {
  CourseCategory,
  CourseStatus,
  Level,
} from 'src/common/enums/courses.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  course_title: string;

  @Column()
  course_description: string;

  @Column()
  category: CourseCategory;

  @Column()
  status: CourseStatus;

  @Column()
  type: Level;

  @Column()
  course_banner: string;
}
