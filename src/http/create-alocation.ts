import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";

export interface CreateAlocationRequest {
  subjectId: string;
  classScheduleIds: string[];
  classroomId: string;
  date: Date;
  userId: string;
}

export async function createAlocation({
  subjectId,
  classScheduleIds,
  classroomId,
  date,
  userId,
}: CreateAlocationRequest) {
  const response: AxiosResponse = await api.post("/alocations", {
    subjectId,
    classScheduleIds,
    classroomId,
    date,
    userId,
  });

  return response;
}
