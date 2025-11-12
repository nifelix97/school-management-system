export interface Course {
  id: string;
  title: string;
  date: string; // e.g. "2025-03-01"
  time: string; // e.g. "14:30"
  instructor: string;
  type: "Lecture" | "Lab" | "Exam" | "Holiday" | "Event";
  color: string;
}
