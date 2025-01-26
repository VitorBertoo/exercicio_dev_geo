import axios from 'axios';

const axiosOSMInstance = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org/reverse',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    format: 'json',
  },
});

export default axiosOSMInstance;
