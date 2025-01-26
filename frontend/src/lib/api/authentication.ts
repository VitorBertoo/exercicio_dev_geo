import { AuthUser } from "@/interfaces/user";
import axiosInstance from "./axios";
import axios from "axios";
import { toast } from "react-toastify";

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
  try {
    const response = await axiosInstance.post<AuthUser>("/user", user);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error))
      toast.error(
        error.response?.data.message || "Erro ao cadastrar. tente novamente"
      );
    else toast.error("Erro ao cadastrar. Tente novamente");

    return {} as AuthUser;
  }
};

export const signIn = async ({
  email,
  password,
}: UserSignIn): Promise<AuthUser> => {
  try {
    const response = await axiosInstance.post<AuthUser>("/user/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error))
      toast.error(
        error.response?.data.message || "Erro ao fazer login. tente novamente"
      );
    else toast.error("Erro ao fazer login. Tente novamente");

    return {} as AuthUser;
  }
};
