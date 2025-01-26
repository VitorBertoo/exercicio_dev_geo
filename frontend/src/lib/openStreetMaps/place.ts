import { OpenStreetMapResponse } from '@/interfaces/openStreetMapResponse';
import { toast } from 'react-toastify';
import axiosOSMInstance from './openStreetAxios';

export const getPlace = async (
  lat: number,
  lon: number
): Promise<OpenStreetMapResponse | null> => {
  try {
    const response = await axiosOSMInstance.get<OpenStreetMapResponse>('', {
      params: {
        lat,
        lon,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    toast.error('Erro ao recuperar dados do OpenStreetMaps');

    return null;
  }
};
