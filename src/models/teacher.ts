import { ISubjects } from "./subjects";

export interface ITeacher {
  id: string;
  name: string;
  password_hash: string;
  email: string;
  role: "TEACHER";
  subjects: ISubjects[];
}
