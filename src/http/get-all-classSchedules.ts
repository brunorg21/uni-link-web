import { api } from "@/lib/axios";
import { IClassSchedule } from "@/models/classSchedules";
import { AxiosResponse } from "axios";

export async function getAllClassSchedules() {
  const response: AxiosResponse<IClassSchedule[]> = await api.get(
    `/classSchedules`
  );

  return response.data;
}
