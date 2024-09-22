import { ISubjects } from "./subjects";

export interface ITeacher {
  id: number;
  name: string;
  subjects: ISubjects[];
}
