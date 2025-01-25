import { AuthUser } from "@/interfaces/user";
import axiosInstance from "./axios";

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface UserSignIn {
  email: string;
  password: string;
}

export const signUp = async (user: CreateUserData): Promise<AuthUser> => {
  const response = await axiosInstance.post<AuthUser>("/user", user);

  return response.data;
};

export const signIn = async ({
  email,
  password,
}: UserSignIn): Promise<AuthUser> => {
  const response = await axiosInstance.post<AuthUser>("/user/login", {
    email,
    password,
  });

  return response.data;
};
