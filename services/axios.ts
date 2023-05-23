import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('AUTH_TOKEN');
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const { response } = error;
    console.log(response);
    if (response.status === 401) {
      localStorage.removeItem('AUTH_TOKEN');
    }
    throw Error;
  }
);

export default axiosInstance;
