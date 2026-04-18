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

  @Column({ name: 'course_title' })
  course_title: string;

  @Column({ name: 'course_description' })
  course_description: string;

  @Column()
  category: CourseCategory;

  @Column()
  status: CourseStatus;

  @Column()
  type: Level;

  @Column({ name: 'course_banner' })
  course_banner: string;
  @Column()
  level: Level;

  @Column({ name: 'total_hours', nullable: true })
  total_hours?: number;

  @Column({ name: 'total_enroll', nullable: true })
  total_enroll?: number;
}
