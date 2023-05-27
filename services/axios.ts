import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
});

axiosInstance.defaults.headers['Content-Type'] = 'application/json';

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
