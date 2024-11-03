import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";

interface CreateSubjectRequest {
  name: string;
  teacherId: string;
}

export async function createSubject({ name, teacherId }: CreateSubjectRequest) {
  const response: AxiosResponse = await api.post("/subjects", {
    name,
    userId: teacherId,
  });

  return response;
}
