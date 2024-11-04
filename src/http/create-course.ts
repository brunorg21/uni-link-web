import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";

interface CreateCourseRequest {
  name: string;
}

export async function createCourse({ name }: CreateCourseRequest) {
  const response: AxiosResponse = await api.post("/courses", {
    name,
  });

  return response;
}
