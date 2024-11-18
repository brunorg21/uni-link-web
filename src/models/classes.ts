import { IClassSchedule } from "./classSchedules";
import { IRooms } from "./rooms";
import { ISubjects } from "./subjects";

export interface IClasses {
  id: string;
  subjectId: string;
  classScheduleId: string;
  classSchedule: IClassSchedule;
  classDate: Date;
  classroomId: string;
  classroom: IRooms;
  subject: ISubjects;
}
