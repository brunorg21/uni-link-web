import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";

export interface DeleteTeacherRequest {
  id: string;
}

export async function deleteTeacher({ id }: DeleteTeacherRequest) {
  const response: AxiosResponse = await api.delete(`/teachers/${id}`);

  return response;
}
