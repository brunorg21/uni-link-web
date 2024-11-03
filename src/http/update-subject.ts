import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";

interface UpdateSubjectRequest {
  name: string;
  teacherId: string;
  subjectId: string;
}

export async function updateSubject({
  name,
  teacherId,
  subjectId,
}: UpdateSubjectRequest) {
  const response: AxiosResponse = await api.put(`/subjects/${subjectId}`, {
    name,
    teacherId,
  });

  return response;
}
