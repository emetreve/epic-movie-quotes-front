import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  async (res) => {
    console.log(res);
    return res;
  },
  async (error) => {
    console.log('error', error);
  }
);

export default axiosInstance;
