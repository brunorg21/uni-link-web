export interface IRooms {
  id: string;
  name: string;
  type: "LAB" | "CLASSROOM";
  capacity: number;
  computers?: number;
}
