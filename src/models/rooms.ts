import { IAlocations } from "./alocations";
import { IClasses } from "./classes";

export interface IRooms {
  id: string;
  name: string;
  type: "LAB" | "CLASSROOM";
  capacity: number;
  computers?: number;
  alocations: IAlocations[];
  classes: IClasses[];
}
