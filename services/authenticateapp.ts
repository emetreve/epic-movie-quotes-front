import axios from 'axios';

const authenticateAppInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
});

// authenticateAppInstance.defaults.headers['Content-Type'] = 'application/json';
authenticateAppInstance.interceptors.request.use((config) => {
  config.headers['Accept'] = 'application/json';
  return config;
});

authenticateAppInstance.defaults.withCredentials = true;

export default authenticateAppInstance;
