import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";

export interface UpdateTeacherRequest {
  id: string;
  name: string;
  email: string;
  role: "TEACHER";
  password: string;
}

export async function updateTeacher({
  email,
  name,
  password,
  role,
  id,
}: UpdateTeacherRequest) {
  const response: AxiosResponse = await api.put(`/teachers/${id}`, {
    email,
    name,
    password,
    role,
  });

  return response;
}
