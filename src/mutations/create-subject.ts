import { CreateSubjectType } from "@/components/subject-modal";
import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";

export async function createSubject({ name, teacherId }: CreateSubjectType) {
  const response: AxiosResponse = await api.post("/subjects", {
    name,
    userId: teacherId,
  });

  return response;
}
