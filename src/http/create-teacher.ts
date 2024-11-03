import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";

export interface CreateTeacherRequest {
  name: string;
  email: string;
  role: "TEACHER";
  password: string;
}

export async function createTeacher({
  email,
  name,
  password,
  role,
}: CreateTeacherRequest) {
  const response: AxiosResponse = await api.post("/teachers", {
    email,
    name,
    password,
    role,
  });

  return response;
}
