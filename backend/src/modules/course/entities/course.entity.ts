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
  category: ;
}
