import { ISubjects } from "./subjects";

export interface IClasses {
  id: string;
  subjectId: string;
  classScheduleId: string;
  classDate: Date;
  classroomId: string;
  subject: ISubjects
}
