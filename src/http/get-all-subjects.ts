import { api } from "@/lib/axios";
import { ISubjects } from "@/models/subjects";
import { AxiosResponse } from "axios";
import Cookies from "universal-cookie";

interface GetAllSubjectsByTeacherRequest {
  teacherId: string;
}

export async function getAllSubjectsByTeacher({
  teacherId,
}: GetAllSubjectsByTeacherRequest) {
  const cookies = new Cookies();
  const response: AxiosResponse<ISubjects[]> = await api.get(
    `/subjects/teachers/${teacherId}`,
    {
      headers: { Authorization: `Bearer ${cookies.get("access_token")}` },
    }
  );

  return response.data;
}
