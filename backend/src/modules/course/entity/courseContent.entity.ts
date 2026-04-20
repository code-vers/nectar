import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ContentType,
  CourseContentStatus,
} from '../../../common/enums/courses.enum';

@Entity('course_contents')
export class CourseContent {
  // Define properties and relationships for course content here
  @PrimaryColumn()
  id: number;

  @Column({ name: 'course_id' })
  course_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'content_url' })
  content_url: string;

  //  add content type
  @Column({ name: 'content_type' })
  content_type: ContentType;

  @Column({ nullable: true })
  duration?: number; // Duration in minutes, optional

  @Column({ name: 'order_index', nullable: true })
  order_index?: number; // To maintain the order of contents within a course

  @Column()
  status: CourseContentStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
