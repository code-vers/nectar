import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ContentType,
  CourseContentStatus,
} from '../../../common/enums/courses.enum';

@Entity('course_contents')
export class CourseContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'course_id' })
  course_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'content_url' })
  content_url: string;

  @Column({ name: 'content_type' })
  content_type: ContentType;

  @Column({ nullable: true })
  duration?: number;

  @Column({ name: 'order_index', nullable: true })
  order_index?: number;

  @Column()
  status: CourseContentStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
