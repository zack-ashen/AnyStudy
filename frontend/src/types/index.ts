export enum ClassStyle {
  LECTURE = 'Lecture',
  SEMINAR = 'Seminar'
}

export enum GradYear {
  FRESHMAN = 'Freshman',
  SOPHOMORE = 'Sophomore',
  JUNIOR = 'Junior',
  SENIOR = 'Senior'
}

export type Course = {
  id: number;
  description: string;
  tags: string[];
  title: string; // ex: "Introduction to Computing Using Python"
  code: string; // ex: "CS 1110"
  subject: string;
  rating: number;
}

export type Review = {
  course: Course;
  overall: number | undefined;
  difficulty: number | undefined;
  workload: number | undefined;
}

export type User = {
  name: string;
  email: string;
  likedCourses: Course[];
  major: string;
  year: GradYear;
  futureCourses: Course[];
  dislikedCourses: Course[];
}