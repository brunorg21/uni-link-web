import { ISubjects } from "./subjects";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  createdAt: Date;
  subjects?: ISubjects[];
}
