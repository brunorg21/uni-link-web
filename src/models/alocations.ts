import { IClasses } from "./classes";
import { IRooms } from "./rooms";

export interface IAlocations {
  id: string;
  classroomId: string;
  classesId: string;
  userId: string;
  classroom?: IRooms;
  class?: IClasses;
  date?: Date;
}
