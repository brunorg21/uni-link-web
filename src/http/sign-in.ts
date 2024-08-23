import { AxiosResponse } from "axios";
import { api } from "../lib/axios";
import { User } from "../models/user";

interface SignInProps {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: User;
  token: string;
}

export async function signIn({ email, password }: SignInProps) {
  const response: AxiosResponse<SignInResponse> = await api.post("/session", {
    email,
    password,
  });

  return response.data;
}
