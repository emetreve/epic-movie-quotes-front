import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('AUTH_TOKEN');
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default axiosInstance;
