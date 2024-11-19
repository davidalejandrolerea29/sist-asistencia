export interface Student {
  id: string;
  name: string;
  courseId: string;
  dni: string;
  parentPhone?: string;
}

export interface Course {
  id: string;
  name: string;
  preceptorId: string;
  year: string;
  division: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: {
    classPresent: boolean;
    pePresent: boolean;
    isLate: boolean;
  };
  totalValue: number; // Calculated value: 1 for absence, 0.5 for PE, 0.25 for tardiness
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'preceptor';
  assignedCourses?: string[];
}