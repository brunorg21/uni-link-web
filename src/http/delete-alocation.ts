import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";

export interface DeleteAlocationRequest {
  alocationId: string;
}

export async function deleteAlocation({ alocationId }: DeleteAlocationRequest) {
  const response: AxiosResponse = await api.delete(
    `/alocations/${alocationId}`
  );

  return response;
}
