import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";

interface UpdateSubjectRequest {
  name: string;
  teacherId: string;
  subjectId: string;
  courseId: string;
  semester: number;
}

export async function updateSubject({
  name,
  teacherId,
  subjectId,
  courseId,
  semester,
}: UpdateSubjectRequest) {
  const response: AxiosResponse = await api.put(`/subjects/${subjectId}`, {
    name,
    teacherId,
    courseId,
    semester,
  });

  return response;
}
