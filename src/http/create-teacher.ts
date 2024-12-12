import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import Cookies from "universal-cookie";

export interface CreateTeacherRequest {
  name: string;
  email: string;
  role: "TEACHER" | "STUDENT";
  password: string;
  courseId?: string;
}

export async function createTeacher({
  email,
  name,
  password,
  role,
  courseId,
}: CreateTeacherRequest) {
  const cookies = new Cookies();
  const response: AxiosResponse = await api.post("/teachers", {
    email,
    name,
    password,
    role,
    courseId,
  });

  return response;
}
