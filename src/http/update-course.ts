import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";

interface UpdateCourseRequest {
  name: string;
  courseId: string;
}

export async function updateCourse({ name, courseId }: UpdateCourseRequest) {
  const response: AxiosResponse = await api.put(`/courses/${courseId}`, {
    name,
  });

  return response;
}
