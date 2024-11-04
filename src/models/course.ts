import { ISubjects } from "./subjects";

export interface ICourse {
  id: string;
  name: string;
  subjects: ISubjects[];
}
