import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  CourseCategory,
  CourseStatus,
  Level,
} from '../../../common/enums/courses.enum';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'course_title' })
  course_title: string;

  @Column({ name: 'course_description' })
  course_description: string;

  @Column()
  category: CourseCategory;

  @Column()
  status: CourseStatus;

  @Column()
  level: Level;

  @Column({ name: 'course_banner' })
  course_banner: string;

  @Column({ name: 'total_hours', nullable: true })
  total_hours?: number;

  @Column({ name: 'total_enroll', nullable: true })
  total_enroll?: number;
}
