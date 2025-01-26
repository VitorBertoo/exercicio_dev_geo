import { Point } from "@/interfaces/point";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "./axios";

interface PointsResponse {
  points: Point[];
}

export const readPoints = async (): Promise<Point[]> => {
  try {
    const response = await axiosInstance.get<PointsResponse>("/points");

    return response.data.points;
  } catch (error) {
    if (axios.isAxiosError(error))
      toast.error(error.response?.data.message || "Autenticação é necessária.");
    else toast.error("Erro ao recuperar pontos!");

    return [];
  }
};
