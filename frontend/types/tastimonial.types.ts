export interface testimonial {
  id: string;
  user: {
    first_name: string;
    last_name: string;
     image: string
  }
  rating: number;
  comment: string;
  
}