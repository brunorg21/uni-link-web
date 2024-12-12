import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";

export interface DeleteSubjectRequest {
  subjectId: string;
}

export async function deleteSubject({ subjectId }: DeleteSubjectRequest) {
  const response: AxiosResponse = await api.delete(`/subjects/${subjectId}`);

  return response;
}
