export enum ClassStyle {
  LECTURE = "Lecture",
  SEMINAR = "Seminar",
}

export enum GradYear {
  FRESHMAN = "Freshman",
  SOPHOMORE = "Sophomore",
  JUNIOR = "Junior",
  SENIOR = "Senior",
}

export enum NavDisplay {
  SIGN_IN,
  NOTHING,
  DEFAULT,
  PICK_CLASSES,
}

export type Course = {
  id: number;
  description: string;
  tags: string[];
  title: string; // ex: "Introduction to Computing Using Python"
  code: string; // ex: "CS 1110"
  subject: string;
  rating: number;
};

export type ShortCourse = {
  id: number;
  code: string;
  title: string;
};

export type Major = {
  major: string;
  college: string[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  userDetails?: UserDetails;
};

export type UserDetails = {
  likedCourses: number[];
  major: Major;
  year: GradYear;
  futureCourses: number[];
  dislikedCourses: number[];
};

export type ToastMessage = {
  message: string;
  id: string;
};
