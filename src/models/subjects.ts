import { ICourse } from "./course";
import { User } from "./user";

export interface ISubjects {
  id: string;
  name: string;
  userId: string;
  user: User;
  semester: number;
  courseId: string;
  course: ICourse;
}
