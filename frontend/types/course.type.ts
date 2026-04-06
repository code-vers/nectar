 
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

// temporary coursex

 export const courses: Course[] = [
  {
    id: "1",
    title: "Being a Great Resident",
    course_description:
      "Learn how to communicate with property management and follow lease expectations.",
    category: "Life Skills",
    status: true,
    course: [],
    course_banner: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop",
    lavel: CourseLavel.BEGINNER,
    totalHours: 4,
    totaEnroll: 869,
  },
  {
    id: "2",
    title: "Budgeting for Rent",
    course_description:
      "Understand how to plan monthly expenses and manage rent payments.",
    category: "Finance",
    status: true,
    course: [],
    course_banner: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=220&fit=crop",
    lavel: CourseLavel.BEGINNER,
    totalHours: 4,
    totaEnroll: 869,
  },
  {
    id: "3",
    title: "Property Management Foundations",
    course_description:
      "Learn the core systems used in professional property management.",
    category: "Management",
    status: true,
    course: [],
    course_banner: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=220&fit=crop",
    lavel: CourseLavel.INTERMEDIATE,
    totalHours: 4,
    totaEnroll: 869,
  },
  {
    id: "4",
    title: "Being a Great Resident",
    course_description:
      "Learn how to communicate with property management and follow lease expectations.",
    category: "Life Skills",
    status: true,
    course: [],
    course_banner: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop&crop=right",
    lavel: CourseLavel.BEGINNER,
    totalHours: 4,
    totaEnroll: 869,
  },
  {
    id: "5",
    title: "Financial Literacy Basics",
    course_description:
      "Build a strong foundation in personal finance and money management.",
    category: "Finance",
    status: true,
    course: [],
    course_banner: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=220&fit=crop",
    lavel: CourseLavel.BEGINNER,
    totalHours: 4,
    totaEnroll: 869,
  },
  {
    id: "6",
    title: "Effective Communication",
    course_description:
      "Learn how to communicate with property management and follow lease expectations.",
    category: "Life Skills",
    status: true,
    course: [],
    course_banner: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=220&fit=crop",
    lavel: CourseLavel.INTERMEDIATE,
    totalHours: 4,
    totaEnroll: 869,
  },
  {
    id: "7",
    title: "Budgeting for Rent",
    course_description:
      "Learn how to communicate with property management and follow lease expectations.",
    category: "Finance",
    status: true,
    course: [],
    course_banner: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=220&fit=crop",
    lavel: CourseLavel.BEGINNER,
    totalHours: 4,
    totaEnroll: 869,
  },
  {
    id: "9",
    title: "Being a Great Resident",
    course_description:
      "Learn how to communicate with property management and follow lease expectations.",
    category: "Life Skills",
    status: true,
    course: [],
    course_banner: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=220&fit=crop&crop=right",
    lavel: CourseLavel.BEGINNER,
    totalHours: 4,
    totaEnroll: 869,
  },
];