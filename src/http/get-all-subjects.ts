import { api } from "@/lib/axios";
import { ISubjects } from "@/models/subjects";
import { AxiosResponse } from "axios";

interface GetAllSubjectsByTeacherRequest {
  teacherId: string;
}

export async function getAllSubjectsByTeacher({
  teacherId,
}: GetAllSubjectsByTeacherRequest) {
  const response: AxiosResponse<ISubjects[]> = await api.get(
    `/subjects/teachers/${teacherId}`
  );

  return response.data;
}
