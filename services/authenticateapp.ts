import axios from 'axios';

const authenticateAppInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
});

authenticateAppInstance.defaults.headers['Content-Type'] = 'application/json';

authenticateAppInstance.defaults.withCredentials = true;

export default authenticateAppInstance;
