 
 export enum CourseLavel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
 }
 export interface CourseContent {
  id:string;
  course_id:string;
  title: string;
  description: string;
  conten_type: string;
  content_url: string;
  duration: number;
  order_index: number;
  status:boolean;

 }
 
 export  interface Course {
  id:string;
  title: string;
  course_description: string;
  category: string;
  status:boolean;
  course: CourseContent[];
  course_banner:string;
  lavel:CourseLavel;
  totalHours:number;
  totaEnroll:number
   
 }