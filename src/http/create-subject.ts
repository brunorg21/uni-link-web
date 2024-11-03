import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";

interface CreateSubjectRequest {
  name: string;
  teacherId: string;
  semester: number;
  courseId: string;
}

export async function createSubject({
  name,
  teacherId,
  courseId,
  semester,
}: CreateSubjectRequest) {
  const response: AxiosResponse = await api.post("/subjects", {
    name,
    userId: teacherId,
    courseId,
    semester,
  });

  return response;
}
