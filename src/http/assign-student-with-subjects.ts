import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";

export interface AssignStudentWithSubjectsRequest {
  id: string;
  semester: number;
}

export async function assignStudent({
  id,
  semester,
}: AssignStudentWithSubjectsRequest) {
  const response: AxiosResponse = await api.put(
    `/users/assignStudentWithSubject/${id}`,
    {
      semester,
    }
  );

  return response;
}
