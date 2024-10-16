import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";

export interface CreateAlocationRequest {
  subjectId: string;
  classScheduleIds: string[];
  classroomId: string;
  date: Date;
}

export async function createAlocation({
  subjectId,
  classScheduleIds,
  classroomId,
  date,
}: CreateAlocationRequest) {
  const response: AxiosResponse = await api.post("/alocations", {
    subjectId,
    classScheduleIds,
    classroomId,
    date,
  });

  return response;
}
