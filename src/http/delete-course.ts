import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";

export interface DeleteCourseRequest {
  courseId: string;
}

export async function deleteCourse({ courseId }: DeleteCourseRequest) {
  const response: AxiosResponse = await api.delete(`/courses/${courseId}`);

  return response;
}
